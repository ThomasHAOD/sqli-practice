import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import classes from "./Account.module.css";
import ContactDetails from "./ContactDetails/ContactDetails";
import PreviousOrders from "../../components/Order/PreviousOrders/PreviousOrders";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Button from "../../components/UI/Button/Button";

export class Account extends Component {
  render() {
    let details = <h3>Please sign up!</h3>;

    let previousOrders = (
      <Button
        btnType="Success"
        clicked={() => this.props.fetchOrders(this.props.user.id)}
      >
        View Previous Orders
      </Button>
    );
    if (this.props.previousOrders[0]) {
      previousOrders = (
        <div>
          <Button
            btnType="Success"
            clicked={() => this.props.fetchOrders(this.props.user.id)}
          >
            Refresh Orders
          </Button>
          <PreviousOrders orders={this.props.previousOrders} />
        </div>
      );
    }

    if (this.props.user.id) {
      details = (
        <div className={classes.Account}>
          <div className={classes.AccountDetails}>
            <h1>Your Account</h1>
            <h3>Your Details</h3>
            <ul>
              <li>E-mail: {this.props.user.email}</li>
              <li>user_id: {this.props.user.id}</li>
              <ContactDetails user={this.props.user} />
            </ul>
          </div>
          <div className={classes.PreviousOrders}>{previousOrders}</div>
        </div>
      );
    }

    return details;
  }
}

const mapStateToProps = state => {
  return {
    user: state.users.activeUser,
    previousOrders: state.orders.previousOrders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: userId => dispatch(actions.fetchOrders(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Account, axios));
