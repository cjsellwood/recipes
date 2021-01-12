import React from "react";
import classes from "./AddRecipe.module.css";
import IngredientInput from "../IngredientInput/IngredientInput";
import MethodInput from "../MethodInput/MethodInput";

const AddRecipe = (props) => {
  const ingredientsDisplay = props.ingredients.map((ingredient, index) => {
    return (
      <IngredientInput
        key={index}
        ingredientsChange={props.ingredientsChange}
        index={index}
        ingredient={ingredient}
      />
    );
  });

  const methodDisplay = props.method.map((step, index) => {
    return (
      <MethodInput
        key={index}
        methodChange={props.methodChange}
        index={index}
        step={step}
      />
    );
  });

  return (
    <div className={classes.AddRecipe}>
      <h1 className={classes.MainHeading}>Add a New Recipe</h1>
      <form>
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={props.formChange}
          value={props.name}
          placeholder="Enter Name"
        />
        <label>Category</label>
        <input
          type="text"
          name="category"
          onChange={props.formChange}
          value={props.category}
          placeholder="Enter Category"
        />
        <label>Time</label>
        <input
          type="number"
          name="time"
          onChange={props.formChange}
          value={props.time}
          placeholder="Enter Time"
        />
        <label>Ingredients</label>
        <ul>{ingredientsDisplay}</ul>
        <button type="button" onClick={props.addIngredientInput}>
          Add
        </button>
        <label>Method</label>
        <ol>
          {methodDisplay}

        </ol>
        <button type="button" onClick={props.addMethodInput}>Add</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddRecipe;
