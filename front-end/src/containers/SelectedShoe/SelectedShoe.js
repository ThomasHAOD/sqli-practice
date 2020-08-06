import React, { Component } from "react";
import { connect } from "react-redux";

import DetailedShoe from "../../components/Shoe/DetailedShoe/DetailedShoe";
import Styles from "../../components/Styles/Styles";
import HowDoesItFit from "../../components/HowDoesItFit/HowDoesItFit";
import Button from "../../components/UI/Button/Button";
import classes from "./SelectedShoe.module.css";
import * as actions from "../../store/actions/index";

export class SelectedShoe extends Component {
  onAddToBasket = () => {
    this.props.onShoeAdded(this.props.shoe);
    this.props.history.push("/");
    alert("Item added to basket");
  };

  render() {
    let shoe = <h1>No Shoe Selected</h1>;

    if (this.props.shoe) {
      shoe = (
        <DetailedShoe
          name={this.props.shoe.name}
          brand={this.props.shoe.brand}
          color={this.props.shoe.color}
          size={this.props.shoe.size}
          mens={this.props.shoe.mens}
          womens={this.props.shoe.womens}
          kids={this.props.shoe.kids}
          stock={this.props.shoe.stock}
        />
      );
    }

    return (
      <div className={classes.SelectedShoe}>
        <div className={classes.SelectedShoeDetails}>{shoe}</div>
        <Button
          btnType="Success"
          clicked={this.onAddToBasket}
          disabled={!this.props.shoe || this.props.shoe.stock === 0}
        >
          Add To Basket
        </Button>
        <HowDoesItFit />
        <Styles />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { shoe: state.shoes.selectedShoe };
};

const mapDispatchToProps = dispatch => {
  return { onShoeAdded: shoe => dispatch(actions.addShoeToBasket(shoe)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedShoe);
