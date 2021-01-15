import React from "react";
import classes from "./PageTitle.module.css";

const PageTitle = (props) => {
  return <h1 className={classes.PageTitle}>{props.children}</h1>;
};

export default PageTitle;
