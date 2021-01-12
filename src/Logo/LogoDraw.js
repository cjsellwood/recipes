import React from "react";
import "./LogoDraw.module.css";
import classes from "./LogoDraw.module.css";
import Cake from "./cake.png";

const LogoDraw = () => {
  return (
    <div className={classes.LogoDraw}>
      <div className={classes.Book}>
        <img src={Cake} alt="Cake" />
      </div>
      <div className={classes.Binding1}></div>
      <div className={classes.Binding2}></div>
      <div className={classes.Binding3}></div>
      <div className={classes.Binding4}></div>
      <div className={classes.Binding5}></div>
      <div className={classes.Binding6}></div>
      <div className={classes.Binding7}></div>
      <div className={classes.Binding8}></div>
      <div className={classes.Binding9}></div>
      <div className={classes.Binding10}></div>
    </div>
  );
};

export default LogoDraw;
