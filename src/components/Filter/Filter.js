import React from "react";
import classes from "./Filter.module.css";

const Filter = (props) => {
  // If filter sidebar is opened push class to change position
  const filterClasses = [classes.FilterContainer];
  if (props.filterOpen) {
    filterClasses.push(classes.Open);
  }

  // Display labels with checkboxes for filtering
  const checkboxDisplay = [];
  for (let key in props.categories) {
    checkboxDisplay.push(
      <label key={key} name={key}>
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

  // Sort alphabetically
  checkboxDisplay.sort((a, b) => {
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
  return (
    <div className={filterClasses.join(" ")}>
      <button
        className={classes.CloseButton}
        onClick={props.toggleFilter}
        aria-label="Close Menu"
      >
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
