import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./EditRecipe.module.css";

import ListInput from "../ListInput/ListInput";
import PageTitle from "../PageTitle/PageTitle";

const EditRecipe = (props) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const index = pathArray[pathArray.length - 1];

  useEffect(() => {
    props.editFormFill(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ingredientsDisplay = props.ingredients.map((ingredient, index) => {
    return (
      <ListInput
        key={index}
        changeHandler={props.ingredientsChange}
        index={index}
        name={ingredient}
        deleteListInput={props.deleteListInput}
        listName="ingredients"
      />
    );
  });

  const methodDisplay = props.method.map((step, index) => {
    return (
      <ListInput
        key={index}
        changeHandler={props.methodChange}
        index={index}
        name={step}
        deleteListInput={props.deleteListInput}
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
          value={props.name}
          onChange={props.formChange}
          placeholder="Enter Name"
        />
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={props.category}
          onChange={props.formChange}
          placeholder="Enter Category"
        />
        <label>Time</label>
        <input
          type="text"
          name="time"
          value={props.time}
          onChange={props.formChange}
          placeholder="Enter Time"
        />
        <label>Ingredients</label>
        <ul>{ingredientsDisplay}</ul>
        <button type="button" onClick={props.addIngredientInput}>
          Add
        </button>
        <label>Method</label>
        <ol>{methodDisplay}</ol>
        <button type="button" onClick={props.addMethodInput}>
          Add
        </button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditRecipe;
