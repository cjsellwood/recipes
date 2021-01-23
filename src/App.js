import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import classes from "./App.module.css";

import Nav from "./components/Nav/Nav";
import Recipes from "./components/Recipes/Recipes";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import EditRecipe from "./components/EditRecipe/EditRecipe";
import Recipe from "./components/Recipe/Recipe";
import Spinner from "./components/Spinner/Spinner";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import { connect } from "react-redux";
import * as actions from "./store/actions/index";

const App = (props) => {
  // Run on first load
  useEffect(() => {
    // Retrieve from firebase on first load
    if (!props.dataFetched) {
      props.onFetchRecipes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle change in forms simple input values
  const formChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    props.onSetDetails(name, value);
  };

  const history = useHistory();

  // Save to state and firebase when submitted
  const saveRecipe = (e) => {
    e.preventDefault();

    // Set unique id for referencing in other uses
    const addedRecipe = {
      name: props.details.name,
      category: props.details.category,
      time: props.details.time,
      ingredients: props.ingredients,
      method: props.method,
      id: Date.now(),
    };

    // Add to firebase database
    props.onStoreRecipe(addedRecipe, history);
  };

  // Save edited recipe on submit
  const saveEditedRecipe = (e, index) => {
    e.preventDefault();
    const editedRecipe = {
      name: props.details.name,
      category: props.details.category,
      time: props.details.time,
      ingredients: props.ingredients,
      method: props.method,
      id: props.recipes[index].id,
    };

    // Add to firebase database and state
    props.onEditStoredRecipe(editedRecipe, index, history);
  };

  // Remove recipe from state and database
  const deleteRecipe = (e, index) => {
    // Delete from firebase database
    props.onDeleteStoredRecipe(props.recipes, index, history);

    // Redirect to home page
    history.push("/");
  };

  return (
    <div className={classes.App}>
      <ScrollToTop />
      <header>
        <Nav />
      </header>
      <Switch>
        <Route exact path="/">
          {props.loading ? <Spinner /> : <Recipes />}
        </Route>
        <Route path="/addrecipe">
          {props.loading ? (
            <Spinner />
          ) : (
            <AddRecipe formChange={formChange} saveRecipe={saveRecipe} />
          )}
        </Route>
        <Route path="/edit/:id">
          {props.loading ? (
            <Spinner />
          ) : (
            <EditRecipe
              formChange={formChange}
              saveEditedRecipe={saveEditedRecipe}
              deleteRecipe={deleteRecipe}
            />
          )}
        </Route>
        <Route path="/:id">{props.loading ? <Spinner /> : <Recipe />}</Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    details: state.recipeForm.details,
    ingredients: state.recipeForm.ingredients,
    method: state.recipeForm.method,
    categories: state.recipes.categories,
    recipes: state.recipes.recipes,
    dataFetched: state.recipes.dataFetched,
    loading: state.recipes.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetDetails: (key, value) => {
      dispatch(actions.setDetails(key, value));
    },
    onFetchRecipes: () => {
      dispatch(actions.fetchRecipes());
    },
    onStoreRecipe: (addedRecipe, history) => {
      dispatch(actions.storeRecipe(addedRecipe, history));
    },
    onEditStoredRecipe: (editedRecipe, index, history) => {
      dispatch(actions.editStoredRecipe(editedRecipe, index, history));
    },
    onDeleteStoredRecipe: (recipes, index, history) => {
      dispatch(actions.deleteStoredRecipe(recipes, index, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
