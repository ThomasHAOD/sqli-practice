import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Modal from "../../components/UI/Modal/Modal";
import SignIn from "../../containers/Account/SignIn/SignIn";
import SignUp from "../../containers/Account/SignUp/SignUp";
import { Basket } from "../../components/Basket/Basket";
import * as actions from "../../store/actions/index";
import ChatBotButton from "../../components/ChatBotButton/ChatBotButton";

class Layout extends Component {
  state = {
    showSideDrawer: false,
    signingIn: false,
    signingUp: false,
    viewBasket: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  signInHandler = () => {
    this.setState({ signingIn: true });
  };

  signUpHandler = () => {
    this.setState({ signingUp: true });
  };

  signInCancelHandler = () => {
    this.setState({ signingIn: false });
  };

  signUpCancelHandler = () => {
    this.setState({ signingUp: false });
  };

  viewBasketHandler = () => {
    this.setState({ viewBasket: true });
  };

  viewBasketCancelHandler = () => {
    this.setState({ viewBasket: false });
  };

  render() {
    return (
      <Fragment>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
          signIn={this.signInHandler}
          signUp={this.signUpHandler}
          showBasket={this.viewBasketHandler}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
        <Modal
          show={this.state.signingIn}
          modalClosed={this.signInCancelHandler}
        >
          <SignIn />
        </Modal>
        <Modal
          show={this.state.signingUp}
          modalClosed={this.signUpCancelHandler}
        >
          <SignUp close={this.signUpCancelHandler} />
        </Modal>
        <Modal
          show={this.state.viewBasket}
          modalClosed={this.viewBasketCancelHandler}
        >
          <Basket
            close={this.viewBasketCancelHandler}
            shoes={this.props.basket}
            price={this.props.price}
            removeShoeFromBasket={this.props.onRemoveFromBasket}
          />
        </Modal>
        <ChatBotButton />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    basket: state.basket.shoes,
    price: state.basket.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRemoveFromBasket: (shoe, index) =>
      dispatch(actions.removeShoeFromBasket(shoe, index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
