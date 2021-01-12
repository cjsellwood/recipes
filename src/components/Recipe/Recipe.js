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
        <h2>{props.recipes[index].name}</h2>
        <p>{props.recipes[index].category}</p>
        <p>{props.recipes[index].time}</p>
        <ul>
          {props.recipes[index].ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
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
