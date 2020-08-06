import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "react-bootstrap/Spinner";
import classes from "./ContactData.module.css";
import axios from "axios";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import * as formTemplates from "../../../helpers/forms/formTemplates";
import * as formHelpers from "../../../helpers/forms/formHelperFunctions";

class ContactData extends Component {
  state = {
    accountDetailsForm: formTemplates.detailsForm,
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
  };

  onSubmitDetails = () => {
    let updatedDetails = null;
    if (this.props.activeUser) {
      updatedDetails = {
        id: this.props.activeUser.id,
        email: this.props.activeUser.email,
        firstName: this.state.accountDetailsForm.firstName.value,
        lastName: this.state.accountDetailsForm.lastName.value,
        street: this.state.accountDetailsForm.street.value,
        town: this.state.accountDetailsForm.town.value,
        postCode: this.state.accountDetailsForm.postCode.value
      };
    }
    this.props.onEnterDetails(updatedDetails);
    this.props.close();
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.accountDetailsForm
    };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = formHelpers.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      accountDetailsForm: updatedForm,
      formIsValid: formIsValid
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.accountDetailsForm) {
      formElementsArray.push({
        id: key,
        config: this.state.accountDetailsForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}
          clicked={this.onSubmitDetails}
        >
          CONTNUE
        </Button>
        <Button btnType="Danger" clicked={this.props.close}>
          CANCEL
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    basket: state.basket.shoes,
    price: state.basket.totalPrice,
    activeUser: state.users.activeUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEnterDetails: contactData =>
      dispatch(actions.userUpdateDetails(contactData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
