import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";
import * as formHelperFunctions from "../../../helpers/forms/formHelperFunctions";
import * as forms from "../../../helpers/forms/formTemplates";
import * as actions from "../../../store/actions/index";

export class SignUp extends Component {
  state = {
    signUp: forms.signUpForm.signUp,
    formIsValid: false
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedSignUp = {
      ...this.state.signUp
    };
    const updatedFormElement = {
      ...updatedSignUp[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = formHelperFunctions.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedSignUp[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedSignUp) {
      formIsValid = updatedSignUp[inputIdentifier].valid && formIsValid;
    }
    this.setState({ signUp: updatedSignUp, formIsValid: formIsValid });
  };

  handleSignUp = (event, email, password) => {
    event.preventDefault();
    this.props.onSignUp(email, password);
    this.props.close();
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.signUp) {
      formElementsArray.push({
        id: key,
        config: this.state.signUp[key]
      });
    }

    let form = (
      <form onSubmit={this.signUpHandler}>
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
          clicked={event =>
            this.handleSignUp(event, this.state.signUp.email.value, this.state.signUp.password.value)
          }
        >
          Sign Up
        </Button>
      </form>
    );

    return (
      <div>
        <h2>Sign Up</h2>
        {form}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (email, password) => dispatch(actions.userSignUp(email, password))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withErrorHandler(SignUp, axios));
