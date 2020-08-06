import React from "react";
import AssistantIcon from "@material-ui/icons/Assistant";
import classes from "./ChatBotButton.module.css";

const chatBotButton = () => (
  <div className={classes.ChatBot}>
    <AssistantIcon className={classes.Icon} />
  </div>
);

export default chatBotButton;
