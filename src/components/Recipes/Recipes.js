import React, { useState } from "react";
import classes from "./Recipes.module.css";
import { Link } from "react-router-dom";
import PageTitle from "../PageTitle/PageTitle";
import MenuButton from "../MenuButton/MenuButton";
import Filter from "../Filter/Filter";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index"

const Recipes = (props) => {
  // List of recipes to display with category filter applied
  const recipesDisplay = props.recipes
    // Filter if category set to true in categories state
    .filter((recipe) => props.categories[recipe.category.toLowerCase()])
    .map((recipe, index) => {
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

  // Sort Alphabetically
  recipesDisplay.sort((a, b) => {
    const nameA = a.props.name.toLowerCase();
    const nameB = b.props.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  // Control filter sidebar open and closing
  const [filterOpen, setFilterOpen] = useState(false);
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  // Add dark background next to filter slide out menu if open
  const filter = [];
  if (filterOpen) {
    filter.push(
      <div
        className={classes.FilterModal}
        key="Filter"
        onClick={toggleFilter}
      ></div>
    );
  }

  // Change checkboxes in filter
  const changeChecked = (e) => {
    // const newCategories = { ...props.categories };
    // newCategories[e.target.name] = !newCategories[e.target.name];
    props.onToggleCategory(e.target.name);
  };

  return (
    <div className={classes.RecipesWrapper}>
      <section className={classes.RecipesContainer}>
        <PageTitle>Recipes</PageTitle>
        <div>{recipesDisplay}</div>
      </section>
      <MenuButton toggleFilter={toggleFilter} aria={"Open Menu"}/>
      {filter}
      <div className={classes.FilterWrapper}>
        <Filter
          filterOpen={filterOpen}
          toggleFilter={toggleFilter}
          categories={props.categories}
          changeChecked={changeChecked}
        ></Filter>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
    categories: state.recipes.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleCategory: (name) => {
      dispatch(actions.toggleCategory(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
