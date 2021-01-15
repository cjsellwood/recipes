import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./EditRecipe.module.css";

const EditRecipe = (props) => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const index = pathArray[pathArray.length - 1];
  console.log(index);

  useEffect(() => {
    props.editFormFill(index);
  }, []);

  return (
    <div className={classes.EditRecipe}>
      <h1>Edit Recipe</h1>
      <form>
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
      </form>
    </div>
  );
};

export default EditRecipe;
