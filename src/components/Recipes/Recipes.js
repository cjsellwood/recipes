import React from "react";
import classes from "./Recipes.module.css";
import { Link } from "react-router-dom";
import PageTitle from "../PageTitle/PageTitle";
import MenuButton from "../MenuButton/MenuButton";
import Filter from "../Filter/Filter";

const Recipes = (props) => {
  const recipesDisplay = props.recipes.map((recipe, index) => {
    return (
      <Link
        to={`/recipes/${index}`}
        className={classes.RecipeItem}
        key={index}
        name={recipe.name}
      >
        <h2>{recipe.name}</h2>
        <div className={classes.DetailsContainer}>
          <p>{recipe.category}</p>
          <p>
            {recipe.time} {recipe.time !== "" ? "Min" : null}
          </p>
        </div>
      </Link>
    );
  });

  const filter = [];
  if (props.filterOpen) {
    filter.push(
      <div
        className={classes.FilterModal}
        key="Filter"
        onClick={props.toggleFilter}
      ></div>
    );
  }

  // Sort Alphabetically
  recipesDisplay.sort((a, b) => {
    const nameA = a.props.name.toUpperCase();
    const nameB = b.props.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return (
    <div className={classes.RecipesWrapper}>
      <section className={classes.RecipesContainer}>
        <PageTitle>Recipes</PageTitle>
        <div>{recipesDisplay}</div>
      </section>
      <MenuButton toggleFilter={props.toggleFilter} />
      {filter}
      <div className={classes.FilterWrapper}>
        <Filter filterOpen={props.filterOpen}></Filter>
      </div>
    </div>
  );
};

export default Recipes;
