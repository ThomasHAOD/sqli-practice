import React, { Component } from "react";
import { connect } from "react-redux";

import ContactData from "../Account/ContactData/ContactData";
import * as actions from "../../store/actions/index";
import OrderSummary from "../../components/Order/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import ContactDetails from "../Account/ContactDetails/ContactDetails";
import OrderSuccess from "../../components/Order/OrderSuccess/OrderSuccess";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";

class Checkout extends Component {
  state = { ordering: false, enteringDetails: false, orderSuccess: false };

  placeOrderHandler = () => {
    if (this.props.basket[0]) this.setState({ ordering: true });
  };

  orderCancelHandler = () => {
    this.setState({ ordering: false });
  };
  enterDetailsHandler = () => {
    this.setState({ enteringDetails: true });
  };

  enterDetailsCancelHandler = () => {
    this.setState({ enteringDetails: false });
  };
  orderSuccessHandler = () => {
    this.setState({ orderSuccess: true });
  };

  orderSuccessCancelHandler = () => {
    this.setState({ orderSuccess: false });
  };

  completeOrderHandler = () => {
    this.props.onOrderComplete(
      this.props.basket,
      this.props.userDetails.id,
      this.props.totalPrice.toFixed(2)
    );
    this.orderSuccessHandler();
    this.props.history.push("/account");
  };

  render() {
    let orderOption = <p>Add something to your basket to continue!</p>;
    let contactDetails = null;

    if (this.props.userDetails.street) {
      orderOption = (
        <Button btnType="Success" clicked={this.completeOrderHandler}>
          Place Order
        </Button>
      );
      contactDetails = (
        <ul style={{ listStyle: "none" }}>
          <ContactDetails user={this.props.userDetails} />
        </ul>
      );
    } else if (this.props.basket[0]) {
      orderOption = (
        <Button btnType="Success" clicked={this.enterDetailsHandler}>
          Enter Details
        </Button>
      );
    }

    const summary = (
      <div>
        <OrderSummary
          shoes={this.props.basket}
          cancel={this.orderCancelHandler}
        />
        {contactDetails}
        {orderOption}

        <Modal
          show={this.state.enteringDetails}
          modalClosed={this.enterDetailsCancelHandler}
        >
          <ContactData close={this.enterDetailsCancelHandler} />
        </Modal>
        <Modal
          show={this.state.orderSuccess}
          modalClosed={this.orderSuccessCancelHandler}
        >
          <OrderSuccess />
        </Modal>
      </div>
    );

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    basket: state.basket.shoes,
    totalPrice: state.basket.totalPrice,
    userDetails: state.users.activeUser,
    purchased: state.orders.purchased
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderComplete: (basket, userId, totalPrice) =>
      dispatch(actions.completeOrder(basket, userId, totalPrice))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Checkout, axios));
