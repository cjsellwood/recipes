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

const App = () => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [method, setMethod] = useState([""]);
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
    console.log(newCategories)
  };

  useEffect(() => {
    // Retrieve recipes from local storage if stored there
    // const storedRecipes = localStorage.getItem("recipes");
    // if (storedRecipes !== null) {
    //   setRecipes(JSON.parse(storedRecipes));
    // }

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
    switch (name) {
      case "name":
        setName(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "time":
        setTime(value);
        break;
      default:
        break;
    }
  };

  // Add new ingredient to list
  const addIngredientInput = () => {
    setIngredients([...ingredients, ""]);
  };

  // Change ingredients state based on input from form
  const ingredientsChange = (e) => {
    const index = e.target.getAttribute("data-index");
    const ingredientsCopy = [...ingredients];
    ingredientsCopy[index] = e.target.value;
    setIngredients(ingredientsCopy);
  };

  // Add new method step to list
  const addMethodInput = () => {
    setMethod([...method, ""]);
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

  // Change ingredients state based on input from form
  const methodChange = (e) => {
    const index = e.target.getAttribute("data-index");
    const ingredientsCopy = [...method];
    ingredientsCopy[index] = e.target.value;
    setMethod(ingredientsCopy);
  };

  const history = useHistory();

  // Save to state when submitted
  const saveRecipe = (e) => {
    e.preventDefault();

    // Set unique id for referencing in other uses
    const id = Date.now();
    const addedRecipe = {
      name,
      category,
      time,
      ingredients,
      method,
      id,
    };

    // Duplicate recipes and add new categories
    const newRecipes = duplicateRecipes(recipes);

    // Add new recipe
    newRecipes.push(addedRecipe);

    // localStorage.setItem("recipes", JSON.stringify(newRecipes));

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

  // Delete added step from add recipe form
  const deleteListInput = (e) => {
    const index = e.target.getAttribute("data-index");
    const key = e.target.getAttribute("data-key");

    if (key === "ingredients") {
      const newIngredients = [...ingredients];
      console.log(newIngredients);
      newIngredients.splice(index, 1);
      console.log(newIngredients);
      setIngredients(newIngredients);
    } else {
      const newMethod = [...method];
      newMethod.splice(index, 1);
      setMethod(newMethod);
    }
  };

  // Reset edit form when first going to add recipe page
  const resetForm = () => {
    setName("");
    setCategory("");
    setTime("");
    setIngredients([""]);
    setMethod([""]);
  };

  // Add values to states for form editing from recipes at index of editing
  const editFormFill = (index) => {
    setName(recipes[index].name);
    setCategory(recipes[index].category);
    setTime(recipes[index].time);
    setIngredients([...recipes[index].ingredients]);
    setMethod([...recipes[index].method]);
  };

  // Save edited recipe on submit
  const saveEditedRecipe = (e, index) => {
    e.preventDefault();
    const addedRecipe = {
      name,
      category,
      time,
      ingredients,
      method,
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
              name={name}
              category={category}
              time={time}
              formChange={formChange}
              ingredients={ingredients}
              ingredientsChange={ingredientsChange}
              addIngredientInput={addIngredientInput}
              method={method}
              methodChange={methodChange}
              addMethodInput={addMethodInput}
              saveRecipe={saveRecipe}
              deleteListInput={deleteListInput}
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
              name={name}
              category={category}
              time={time}
              formChange={formChange}
              ingredients={ingredients}
              ingredientsChange={ingredientsChange}
              addIngredientInput={addIngredientInput}
              method={method}
              methodChange={methodChange}
              addMethodInput={addMethodInput}
              saveEditedRecipe={saveEditedRecipe}
              deleteListInput={deleteListInput}
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

export default App;
