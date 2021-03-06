import React from "react";
import classes from "./Recipe.module.css";
import { useLocation, Link } from "react-router-dom";
import PageTitle from "../PageTitle/PageTitle";

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
        <PageTitle>{props.recipes[index].name}</PageTitle>
        <div className={classes.DetailsContainer}>
          <p>{props.recipes[index].category}</p>
          <p>{props.recipes[index].time} {props.recipes[index].time !== "" ? "Min" : null}</p>
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
        <Link to={`/edit/${index}`}>Edit</Link>
      </section>
    );
  }
};

export default Recipe;
