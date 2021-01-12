import "./App.css";
import Navbar from "./components/Nav";
import { Switch, Route, useHistory } from "react-router-dom";
import Recipes from "./components/Recipes/Recipes";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import React, { useState, useEffect } from "react";
import Recipe from "./components/Recipe/Recipe";

const App = () => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [method, setMethod] = useState([""]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes !== null) {
      setRecipes(JSON.parse(storedRecipes));
    }
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
    const addedRecipe = {
      name,
      category,
      time,
      ingredients,
      method,
    };

    // Duplicate recipes
    const newRecipes = duplicateRecipes(recipes);

    // Add new recipe and add to local storage
    newRecipes.push(addedRecipe);
    setRecipes(newRecipes);
    localStorage.setItem("recipes", JSON.stringify(newRecipes));

    // Redirect to home page

    history.push("/");
  };

  // console.log(recipes);

  // Delete added step from add recipe form
  const deleteInput = (e) => {
    const index = e.target.getAttribute("data-index");
    const key = e.target.getAttribute("data-key");
    console.log(key, index);
    // const newRecipes = duplicateRecipes(recipes);

    // Remove that one input and save recipes
    // newRecipes[index][key].splice(index, 1);
    // setRecipes(newRecipes);
    if (key === "ingredients") {
      const newIngredients = [...ingredients];
      console.log(newIngredients)
      newIngredients.splice(index, 1);
      console.log(newIngredients)
      setIngredients(newIngredients);
    } else {
      const newMethod = [...method];
      newMethod.splice(index, 1);
      setMethod(newMethod);
    }
  };

  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <Switch>
        <Route exact path="/">
          <Recipes recipes={recipes} />
        </Route>
        <Route path="/addrecipe">
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
            deleteInput={deleteInput}
          />
        </Route>
        <Route path="/:id">
          <Recipe recipes={recipes} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
