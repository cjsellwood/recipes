import classes from "./Button.module.css";
import React from "react";

const Button = (props) => {
  return (
    <button
      className={[classes.Button, classes[props.btnStyle]].join(" ")}
      type={props.type}
      onClick={props.clickHandler}
    >
      {props.children}
    </button>
  );
};

export default Button;
