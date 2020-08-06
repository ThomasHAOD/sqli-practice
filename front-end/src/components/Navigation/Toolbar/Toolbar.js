import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.css";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import BasketSummary from "../../Basket/BasketWidget/BasketWidget";
import Logo from "../../../assets/Golden-shoe-logo.png";
import Button from "../../UI/Button/Button";

const toolbar = props => {
  let info = (
    <Button btnType={"Success"} clicked={props.signUp}>
      Sign Up
    </Button>
  );

  if (props.signedIn) {
    info = (
      <BasketSummary className={classes.Sign} showBasket={props.showBasket} />
    );
  }
  return (
    <header className={classes.Toolbar}>
      {info}

      <Link to="/">
        <img className={classes.Logo} src={Logo} alt="golden-shoe.logo" />
      </Link>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
      <DrawerToggle clicked={props.drawerToggleClicked} />
    </header>
  );
};

const mapStateToProps = state => {
  return {
    signedIn: state.users.signedIn
  };
};

export default connect(mapStateToProps)(toolbar);
