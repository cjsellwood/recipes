import React from "react";
import classes from "./Recipes.module.css";
import { Link } from "react-router-dom";

const Recipes = (props) => {
  const recipesDisplay = props.recipes.map((recipe, index) => {
    return (
      <Link to={`/recipes/${index}`} className={classes.RecipeItem} key={index}>
        <h2>{recipe.name}</h2>
        <div className={classes.DetailsContainer}>
          <p>{recipe.category}</p>
          <p>{recipe.time} Min</p>
        </div>
      </Link>
    );
  });

  return (
    <section className={classes.RecipesContainer}>
      <h1>Recipes</h1>
      <div>{recipesDisplay}</div>
    </section>
  );
};

export default Recipes;
