import React from "react";

import classes from "./Shoe.module.css";
import placeholder from "../../assets/placeholder.jpg";

const shoe = props => {
  return (
    <div className={classes.Shoe} onClick={() => props.clicked(props.shoe)}>
      <h3>{props.name}</h3>
      <div className={classes.Details}>
        <img
          src={placeholder}
          className={classes.Image}
          alt="placeholder shoe"
        />
        <div>
          <ul className={classes.List}>
            <li>Brand: {props.brand}</li>
            <li>Color: {props.color}</li>
            <li>Size: {props.size}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default shoe;
