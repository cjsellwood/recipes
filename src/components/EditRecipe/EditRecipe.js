import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./EditRecipe.module.css";

import ListInput from "../ListInput/ListInput";
import PageTitle from "../PageTitle/PageTitle";
import Button from "../Button/Button";
import { connect } from "react-redux";
import * as actions from "../../store/actions/recipeForm";

const EditRecipe = (props) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const index = pathArray[pathArray.length - 1];

  useEffect(() => {
    // Add values to states for form editing from recipes at index of editing
    props.onSetDetails("name", props.recipes[index].name);
    props.onSetDetails("category", props.recipes[index].category);
    props.onSetDetails("time", props.recipes[index].time);
    props.onReplaceList("ingredients", props.recipes[index].ingredients);
    props.onReplaceList("method", props.recipes[index].method);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ingredientsDisplay = props.ingredients.map((ingredient, index) => {
    return (
      <ListInput
        key={index}
        setListInput={props.setListInput}
        index={index}
        name={ingredient}
        removeListInput={props.removeListInput}
        listName="ingredients"
      />
    );
  });

  const methodDisplay = props.method.map((step, index) => {
    return (
      <ListInput
        key={index}
        setListInput={props.setListInput}
        index={index}
        name={step}
        removeListInput={props.removeListInput}
        listName="method"
      />
    );
  });

  return (
    <div className={classes.EditRecipe}>
      <PageTitle>Edit Recipe</PageTitle>
      <form
        onSubmit={(e) => props.saveEditedRecipe(e, index)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={props.details.name}
          onChange={props.formChange}
          placeholder="Enter Name"
          required={true}
        />
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={props.details.category}
          onChange={props.formChange}
          placeholder="Enter Category"
          required={true}
        />
        <label>Time</label>
        <div className={classes.TimeContainer}>
          <input
            type="number"
            name="time"
            onChange={props.formChange}
            value={props.details.time}
            placeholder="Enter Time"
          />
          <p>Minutes</p>
        </div>
        <label>Ingredients</label>
        <ul>{ingredientsDisplay}</ul>
        <Button
          type="button"
          btnStyle="Add"
          ariaLabel="Add Ingredient"
          clickHandler={() => props.onAddListInput("ingredients")}
        >
          Add
        </Button>
        <label>Method</label>
        <ol>{methodDisplay}</ol>
        <Button
          type="button"
          btnStyle="Add"
          clickHandler={() => props.onAddListInput("method")}
          ariaLabel="Add Method Step"
        >
          Add
        </Button>
        <Button type="submit" btnStyle="Save" ariaLabel="Save Recipe">
          Save
        </Button>
        <Button
          type="button"
          btnStyle="DeleteRecipe"
          clickHandler={(e) => props.deleteRecipe(e, index)}
          ariaLabel="Delete Recipe"
        >
          Delete
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    details: state.recipeForm.details,
    ingredients: state.recipeForm.ingredients,
    method: state.recipeForm.method,
    recipes: state.recipes.recipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddListInput: (key) => {
      dispatch(actions.addListInput(key));
    },
    onSetDetails: (key, value) => {
      dispatch(actions.setDetails(key, value));
    },
    onReplaceList: (key, array) => {
      dispatch(actions.replaceList(key, array));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);
