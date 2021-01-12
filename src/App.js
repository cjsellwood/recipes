import "./App.css";
import Navbar from "./components/Nav";
import { Switch, Route } from "react-router-dom";
import Recipes from "./components/Recipes/Recipes";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import React, { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [method, setMethod] = useState([""]);

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
  
    // Change ingredients state based on input from form
    const methodChange = (e) => {
      const index = e.target.getAttribute("data-index");
      const ingredientsCopy = [...method];
      ingredientsCopy[index] = e.target.value;
      setMethod(ingredientsCopy);
    };
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <Switch>
        <Route exact path="/">
          <Recipes />
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
          />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
