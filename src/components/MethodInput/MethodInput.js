import React from "react";
import classes from "./MethodInput.module.css";

const MethodInput = (props) => {
  return (
    <li>
      <input
        type="text"
        name="method"
        onChange={props.methodChange}
        data-index={props.index}
        value={props.step}
        autoComplete="off"
      />
      <div className={classes.PositionButtons}>
        <button type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
            />
          </svg>
        </button>
        <button type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </div>
      <button
        type="button"
        data-index={props.index}
        data-key="method"
        onClick={props.deleteInput}
      >
        Delete
      </button>
    </li>
  );
};

export default MethodInput;
