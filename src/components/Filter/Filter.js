import React from "react";
import classes from "./Filter.module.css";

const Filter = (props) => {
  const filterClasses = [classes.FilterContainer];
  console.log(props);
  if (props.filterOpen) {
    filterClasses.push(classes.Open);
  }
  console.log(filterClasses);
  return (
    <div className={filterClasses.join(" ")}>
      <h3>Filter</h3>
      <form>
        <input type="checkbox" />
        <label>Dessert</label>
      </form>
    </div>
  );
};

export default Filter;
