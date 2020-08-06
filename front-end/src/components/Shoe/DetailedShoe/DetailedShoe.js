import React from "react";

import classes from "./DetailedShoe.module.css";
import placeholder from "../../../assets/placeholder.jpg";

const detailedShoe = props => {
  let stock = null;
  if (props.stock === 0) {
    stock = (
      <li style={{ color: "red", fontWeight: "bold" }}>
        Sorry, none left! Check back soon!
      </li>
    );
  } else if (props.stock < 5) {
    stock = (
      <li style={{ color: "lightsalmon", fontWeight: "bold" }}>
        Running Low: only {props.stock} left!
      </li>
    );
  }
  return (
    <div className={classes.Shoe}>
      <h1>{props.name}</h1>
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
            {stock}
            {props.mens ? <li>Mens</li> : null}
            {props.womens ? <li>Womens</li> : null}
            {props.kids ? <li>Kids</li> : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default detailedShoe;
