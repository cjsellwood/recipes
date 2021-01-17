import React from "react";
import classes from "./Filter.module.css";

const Filter = (props) => {
  // If filter sidebar is opened push class to change position
  const filterClasses = [classes.FilterContainer];
  if (props.filterOpen) {
    filterClasses.push(classes.Open);
  }

  const checkboxDisplay = [];
  for (let key in props.categories) {
    checkboxDisplay.push(
      <label key={key}>
        <input
          type="checkbox"
          checked={props.categories[key]}
          name={key}
          onChange={props.changeChecked}
        />
        {key}
      </label>
    );
  }
  return (
    <div className={filterClasses.join(" ")}>
      <button className={classes.CloseButton} onClick={props.toggleFilter}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
      <h3>Filter</h3>
      <div className={classes.formWrapper}>
        <form>
          <div>{checkboxDisplay}</div>
        </form>
      </div>
    </div>
  );
};

export default Filter;
