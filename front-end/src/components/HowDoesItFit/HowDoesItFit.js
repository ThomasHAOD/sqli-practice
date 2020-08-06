import { Slider } from "@material-ui/core";

import React from "react";

import classes from "./HowDoesItFit.module.css";

const howDoesItFit = props => {
  const initialValue = 50;

  const marks = [
    {
      value: 0,
      label: "Snug"
    },
    {
      value: 50,
      label: "Perfect Fit"
    },
    {
      value: 100,
      label: "Loose"
    }
  ];
  return (
    <div className={classes.Slider}>
      <p>How Does it Fit?</p>
      <p className={classes.SubText}>Based on reviews</p>
      <Slider
        marks={marks}
        defaultValue={initialValue}
        disabled
        track={false}
      />
    </div>
  );
};

export default howDoesItFit;
