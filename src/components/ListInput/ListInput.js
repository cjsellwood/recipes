import React, { useEffect, useRef } from "react";

import classes from "./ListInput.module.css";
import Button from "../Button/Button";
import TextareaAutosize from "react-autosize-textarea"

const ListInput = (props) => {
  const listStyle = [classes.ListInput];

  if (props.listName === "method") {
    listStyle.push(classes.MethodList);
  }

  // Resize text area when amount of text changes
  const textArea = useRef(null);

  return (
    <li className={listStyle.join(" ")}>
      <div>
        <TextareaAutosize
          ref={textArea}
          rows={1}
          type="text"
          name={props.name}
          onChange={props.changeHandler}
          data-index={props.index}
          value={props.name}
          autoComplete="off"
          required={true}
        ></TextareaAutosize>
        <Button
          type="button"
          btnStyle="Delete"
          index={props.index}
          key={props.listName}
          listName={props.listName}
          clickHandler={props.deleteListInput}
        >
          Delete
        </Button>
      </div>
    </li>
  );
};

export default ListInput;
