import React, { Fragment } from "react";

const ContactDetails = props => {
  return (
    <Fragment>
      <li>
        Name: {props.user.firstName} {props.user.lastName}
      </li>

      <li>
        Address: {props.user.houseNumber} {props.user.street}
      </li>
      <li>{props.user.town}</li>
      <li>{props.user.postCode}</li>
    </Fragment>
  );
};

export default ContactDetails;
