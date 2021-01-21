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
import * as actions from "./store/actions/recipeForm";

const App = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [categories, setCategories] = useState({});

  const updateCategories = (recipesObject) => {
    // Create object of categories for filtering
    const newCategories = {};
    for (let i = 0; i < recipesObject.length; i++) {
      newCategories[recipesObject[i].category.toLowerCase()] = true;
    }
    setCategories(newCategories);
  };

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
          setRecipes(newRecipes);

          setLoading(false);
          setDataFetched(true);
          updateCategories(newRecipes);
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

  // Duplicate recipes deeply
  const duplicateRecipes = (recipes) => {
    const newRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
      const recipeObj = {
        name: recipes[i].name,
        category: recipes[i].category,
        time: recipes[i].time,
        ingredients: [...recipes[i].ingredients],
        method: [...recipes[i].method],
      };
      newRecipes.push(recipeObj);
    }
    return newRecipes;
  };

  const history = useHistory();

  // Save to state when submitted
  const saveRecipe = (e) => {
    e.preventDefault();

    // Set unique id for referencing in other uses
    const id = Date.now();
    console.log(props);
    console.log(props.ingredients);
    const addedRecipe = {
      name: props.details.name,
      category: props.details.category,
      time: props.details.time,
      ingredients: props.ingredients,
      method: props.method,
      id,
    };
    console.log(addedRecipe);

    // Duplicate recipes and add new categories
    const newRecipes = duplicateRecipes(recipes);

    // Add new recipe
    newRecipes.push(addedRecipe);

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
        setRecipes(newRecipes);
        updateCategories(newRecipes);
        // Redirect to home page
        history.push("/");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  // Reset edit form when first going to add recipe page
  const resetForm = () => {
    props.onResetRecipeForm();
  };

  // Add values to states for form editing from recipes at index of editing
  const editFormFill = (index) => {
    props.onSetDetails("name", recipes[index].name);
    props.onSetDetails("category", recipes[index].category);
    props.onSetDetails("time", recipes[index].time);
    props.onReplaceList("ingredients", recipes[index].ingredients);
    props.onReplaceList("method", recipes[index].method);
  };

  // Save edited recipe on submit
  const saveEditedRecipe = (e, index) => {
    e.preventDefault();
    const addedRecipe = {
      name: props.details.name,
      category: props.details.category,
      time: props.details.time,
      ingredients: props.ingredients,
      method: props.method,
      id: recipes[index].id,
    };

    // Duplicate recipes
    const newRecipes = duplicateRecipes(recipes);

    // Replace unedited with new values
    newRecipes.splice(index, 1, addedRecipe);

    // Add to firebase database
    fetch(
      `https://recipes-f31ef-default-rtdb.firebaseio.com/recipes/${recipes[index].id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addedRecipe),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully Updated", data);

        // Set new values
        setRecipes(newRecipes);
        updateCategories(newRecipes);

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
      `https://recipes-f31ef-default-rtdb.firebaseio.com/recipes/${recipes[index].id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(addedRecipe),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully Deleted", data);

        // Redirect to home page
        history.push("/");

        setLoading(false);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

    // Duplicate recipes
    const newRecipes = duplicateRecipes(recipes);
    newRecipes.splice(index, 1);
    setRecipes(newRecipes);
    updateCategories(newRecipes);
  };

  // Control filter sidebar open and closing
  const [filterOpen, setFilterOpen] = useState(false);
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  // Change checkboxes in filter
  const changeChecked = (e) => {
    const newCategories = { ...categories };
    newCategories[e.target.name] = !newCategories[e.target.name];
    setCategories(newCategories);
  };

  // #TODO
  // Redux
  // Search maybe

  // console.log("recipes", recipes);
  // console.log("Props App", props);

  return (
    <div className={classes.App}>
      <ScrollToTop />
      <header>
        <Nav />
      </header>
      <Switch>
        <Route exact path="/">
          {loading ? (
            <Spinner />
          ) : (
            <Recipes
              recipes={recipes}
              toggleFilter={toggleFilter}
              filterOpen={filterOpen}
              categories={categories}
              changeChecked={changeChecked}
            />
          )}
        </Route>
        <Route path="/addrecipe">
          {loading ? (
            <Spinner />
          ) : (
            <AddRecipe
              formChange={formChange}
              saveRecipe={saveRecipe}
              resetForm={resetForm}
            />
          )}
        </Route>
        <Route path="/edit/:id">
          {loading ? (
            <Spinner />
          ) : (
            <EditRecipe
              editFormFill={editFormFill}
              recipes={recipes}
              formChange={formChange}
              saveEditedRecipe={saveEditedRecipe}
              deleteRecipe={deleteRecipe}
            />
          )}
        </Route>
        <Route path="/:id">
          {loading ? <Spinner /> : <Recipe recipes={recipes} />}
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    details: state.recipeForm.details,
    ingredients: state.recipeForm.ingredients,
    method: state.recipeForm.method,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetDetails: (key, value) => {
      dispatch(actions.setDetails(key, value));
    },
    onResetRecipeForm: () => {
      dispatch(actions.resetRecipeForm());
    },
    onReplaceList: (key, array) => {
      dispatch(actions.replaceList(key, array));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
