import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./EditRecipe.module.css";

import ListInput from "../ListInput/ListInput";
import PageTitle from "../PageTitle/PageTitle";
import Button from "../Button/Button";

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
        <div className={classes.TimeContainer}>
          <input
            type="number"
            name="time"
            onChange={props.formChange}
            value={props.time}
            placeholder="Enter Time"
          />
          <p>Minutes</p>
        </div>
        <label>Ingredients</label>
        <ul>{ingredientsDisplay}</ul>
        <Button
          type="button"
          btnStyle="Add"
          clickHandler={props.addIngredientInput}
        >
          Add
        </Button>
        <label>Method</label>
        <ol>{methodDisplay}</ol>
        <Button
          type="button"
          btnStyle="Add"
          clickHandler={props.addMethodInput}
        >
          Add
        </Button>
        <Button type="submit" btnStyle="Save">
          Save
        </Button>
        <Button
          type="button"
          btnStyle="DeleteRecipe"
          clickHandler={(e) => props.deleteRecipe(e, index)}
        >
          Delete
        </Button>
      </form>
    </div>
  );
};

export default EditRecipe;
