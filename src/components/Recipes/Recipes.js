import React from "react";
import classes from "./Recipes.module.css";
import { Link } from "react-router-dom";

const Recipes = (props) => {
  const recipesDisplay = props.recipes.map((recipe, index) => {
    return (
      <Link to={`/recipes/${index}`} className={classes.RecipeContainer} key={index}>
        <h2>{recipe.name}</h2>
        <p>{recipe.category}</p>
        <p>{recipe.time}</p>
        {/* <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <ol>
          {recipe.ingredients.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol> */}
      </Link>
    );
  });

  return (
    <section>
      <h1 className={classes.PageTitle}>Recipes</h1>
      {recipesDisplay}
    </section>
  );
};

export default Recipes;
