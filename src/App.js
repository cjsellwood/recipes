import classes from "./App.module.css";
import Nav from "./components/Nav/Nav";
import { Switch, Route, useHistory } from "react-router-dom";
import Recipes from "./components/Recipes/Recipes";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import React, { useState, useEffect } from "react";
import Recipe from "./components/Recipe/Recipe";
import Spinner from "./components/Spinner/Spinner";
import EditRecipe from "./components/EditRecipe/EditRecipe";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  // Run on first load
  useEffect(() => {
    // Retrieve from firebase on first load
    if (!dataFetched) {
      fetch("https://recipes-f31ef-default-rtdb.firebaseio.com/recipes.json")
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log("fetched", response);
          const newRecipes = [];
          if (response === null) {
            return;
          }
          // Create recipes array
          for (let key in response) {
            newRecipes.push({ ...response[key] });
          }
          // setRecipes(newRecipes);
          props.onReplaceRecipes(newRecipes);

          setLoading(false);
          setDataFetched(true);
          // updateCategories(newRecipes);
          props.onUpdateCategories(newRecipes);
        })
        .catch((error) => {
          console.error(error);
        });
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

  // Save to state when submitted
  const saveRecipe = (e) => {
    e.preventDefault();

    // Set unique id for referencing in other uses
    const id = Date.now();
    const addedRecipe = {
      name: props.details.name,
      category: props.details.category,
      time: props.details.time,
      ingredients: props.ingredients,
      method: props.method,
      id,
    };

    // Add to firebase database
    fetch(
      `https://recipes-f31ef-default-rtdb.firebaseio.com/recipes/${id}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addedRecipe),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully Added", data);

        // Add new recipe and update categories
        props.onAddRecipe(addedRecipe);
        props.onUpdateCategories();

        // Redirect to home page
        history.push("/");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
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

    // Add to firebase database
    fetch(
      `https://recipes-f31ef-default-rtdb.firebaseio.com/recipes/${props.recipes[index].id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedRecipe),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully Updated", data);

        // Save edited recipes and update categories
        props.onEditRecipe(editedRecipe, index);
        props.onUpdateCategories();

        // Redirect to home page
        history.push("/");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  // Remove recipe from state and database
  const deleteRecipe = (e, index) => {
    // Delete from firebase database
    setLoading(true);
    fetch(
      `https://recipes-f31ef-default-rtdb.firebaseio.com/recipes/${props.recipes[index].id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully Deleted", data);

        // Delete recipe and update categories
        props.onDeleteRecipe(index);
        props.onUpdateCategories();

        // Redirect to home page
        history.push("/");

        setLoading(false);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <div className={classes.App}>
      <ScrollToTop />
      <header>
        <Nav />
      </header>
      <Switch>
        <Route exact path="/">
          {loading ? <Spinner /> : <Recipes />}
        </Route>
        <Route path="/addrecipe">
          {loading ? (
            <Spinner />
          ) : (
            <AddRecipe formChange={formChange} saveRecipe={saveRecipe} />
          )}
        </Route>
        <Route path="/edit/:id">
          {loading ? (
            <Spinner />
          ) : (
            <EditRecipe
              formChange={formChange}
              saveEditedRecipe={saveEditedRecipe}
              deleteRecipe={deleteRecipe}
            />
          )}
        </Route>
        <Route path="/:id">{loading ? <Spinner /> : <Recipe />}</Route>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetDetails: (key, value) => {
      dispatch(actions.setDetails(key, value));
    },
    onReplaceList: (key, array) => {
      dispatch(actions.replaceList(key, array));
    },
    onUpdateCategories: () => {
      dispatch(actions.updateCategories());
    },
    onReplaceRecipes: (newRecipes) => {
      dispatch(actions.replaceRecipes(newRecipes));
    },
    onAddRecipe: (newRecipe) => {
      dispatch(actions.addRecipe(newRecipe));
    },
    onEditRecipe: (editedRecipe, index) => {
      dispatch(actions.editRecipe(editedRecipe, index));
    },
    onDeleteRecipe: (index) => {
      dispatch(actions.deleteRecipe(index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
