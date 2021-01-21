import React, { useRef } from "react";

import classes from "./ListInput.module.css";
import Button from "../Button/Button";
import TextareaAutosize from "react-autosize-textarea";
import { connect } from "react-redux";
import * as actions from "../../store/actions/recipeForm";

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
          onChange={(e) =>
            props.onSetListInput(props.listName, props.index, e.target.value)
          }
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
          clickHandler={() =>
            props.onRemoveListInput(props.listName, props.index)
          }
        >
          Delete
        </Button>
      </div>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveListInput: (key, index) => {
      dispatch(actions.removeListInput(key, index));
    },
    onSetListInput: (key, index, value) => {
      dispatch(actions.setListInput(key, index, value));
    },
  };
};

export default connect(null, mapDispatchToProps)(ListInput);
