import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/account" clicked={props.clicked}>
        Account
      </NavigationItem>
      <NavigationItem link="/" exact clicked={props.clicked}>
        Store
      </NavigationItem>
    </ul>
  );
};

export default navigationItems;
