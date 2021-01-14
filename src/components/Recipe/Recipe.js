import React from "react";
import classes from "./Recipe.module.css";
import { useLocation } from "react-router-dom";

const Recipe = (props) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const index = pathArray[pathArray.length - 1];

  // Render nothing when going directly as recipes hasn't loaded yet
  if (props.recipes.length === 0) {
    return null;
  } else {
    return (
      <section className={classes.Recipe}>
        <h1>{props.recipes[index].name}</h1>
        <div className={classes.DetailsContainer}>
          <p>{props.recipes[index].category}</p>
          <p>{props.recipes[index].time} Min</p>
        </div>
        <h2>Ingredients</h2>
        <ul>
          {props.recipes[index].ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2>Method</h2>
        <ol>
          {props.recipes[index].method.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    );
  }
};

export default Recipe;
