import React from "react";

import { Chip } from "@material-ui/core";
import classes from "./Search.module.css";

const search = () => {
  const search = {
    color: ["Red", "Brown", "Black"],
    size: [2, 3, 4, 5, 6, 7, 8, 9],
    brand: ["Psych", "Shoes Galore", "Clerks"]
  };

  const searchableCategories = Object.keys(search).map(
    (searchKey, keyIndex) => {
      const category = <h3>{searchKey.toString().toUpperCase()}</h3>;
      const searchTerms = search[searchKey].map((option, index) => {
        return (
          <Chip
            color="primary"
            //   onDelete={handleDelete}
            label={option}
            key={index}
            category={searchKey}
          />
        );
      });
      return (
        <div className={classes.Category} key={keyIndex}>
          {category}
          <section>{searchTerms}</section>
        </div>
      );
    }
  );

  const searchedArray = [1, "Blue", "Reebok"];

  let searchedItems = (
    <p>Please hit an option below to add it to your search!</p>
  );

  if (searchedArray[0]) {
    searchedItems = searchedArray.map((option, index) => {
      return (
        <Chip
          color="primary"
          //   onDelete={handleDelete}
          label={option}
          key={index}
        />
      );
    });
  }

  return (
    <div className={classes.Search}>
      <div className={classes.SearchBox}>
        <h3>Your Search</h3>
        {searchedItems}
      </div>
      {searchableCategories}
    </div>
  );
};

export default search;
