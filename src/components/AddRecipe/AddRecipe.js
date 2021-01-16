import React, { useEffect } from "react";
import classes from "./AddRecipe.module.css";
import PageTitle from "../PageTitle/PageTitle";
import ListInput from "../ListInput/ListInput";
import Button from "../Button/Button";

const AddRecipe = (props) => {
  useEffect(() => {
    props.resetForm();
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
    <div className={classes.AddRecipe}>
      <PageTitle>Add Recipe</PageTitle>
      <form
        onSubmit={props.saveRecipe}
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
          onChange={props.formChange}
          value={props.name}
          placeholder="Enter Name"
          required={true}
        />
        <label>Category</label>
        <input
          type="text"
          name="category"
          onChange={props.formChange}
          value={props.category}
          placeholder="Enter Category"
          required={true}
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
      </form>
    </div>
  );
};

export default AddRecipe;
