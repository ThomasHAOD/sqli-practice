import React from "react";
import { connect } from "react-redux";

import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import classes from "./BasketWidget.module.css";

const BasketSummary = props => {
  return (
    <div onClick={props.showBasket} className={classes.BasketSummary}>
      <div className={classes.BasketCount}>
        <ShoppingBasketIcon />
        <h4>{props.shoeArray.length}</h4>
      </div>

      <h4>£{props.price.toFixed(2)}</h4>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    shoeArray: state.basket.shoes,
    price: state.basket.totalPrice
  };
};

export default connect(mapStateToProps)(BasketSummary);
