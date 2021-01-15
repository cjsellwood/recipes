import React from 'react'

import classes from "./ListInput.module.css";
import ChevronDown from "../ChevronDown/ChevronDown";
import ChevronUp from "../ChevronUp/ChevronUp";

const ListInput = (props) => {
  return (
    <li>
      <input
        type="text"
        name={props.name}
        onChange={props.changeHandler}
        data-index={props.index}
        value={props.name}
        autoComplete="off"
      />
      <div className={classes.PositionButtons}>
        <button type="button">
          <ChevronUp />
        </button>
        <button type="button">
          <ChevronDown />
        </button>
      </div>
      <button
        type="button"
        data-index={props.index}
        data-key={props.listName}
        onClick={props.deleteListInput}
      >
        Delete
      </button>
    </li>
  );
}

export default ListInput
