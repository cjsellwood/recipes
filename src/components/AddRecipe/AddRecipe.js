import React, { useEffect } from "react";
import classes from "./AddRecipe.module.css";
import PageTitle from "../PageTitle/PageTitle";
import ListInput from "../ListInput/ListInput";
import Button from "../Button/Button";
import { connect } from "react-redux";
import * as actions from "../../store/actions/recipeForm";

const AddRecipe = (props) => {
  useEffect(() => {
    props.resetForm();
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
          value={props.details.name}
          placeholder="Enter Name"
          required={true}
        />
        <label>Category</label>
        <input
          type="text"
          name="category"
          onChange={props.formChange}
          value={props.details.category}
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

const mapStateToProps = (state) => {
  return {
    details: state.recipeForm.details,
    ingredients: state.recipeForm.ingredients,
    method: state.recipeForm.method,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddListInput: (key) => {
      dispatch(actions.addListInput(key));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
