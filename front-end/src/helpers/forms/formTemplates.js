export const signInForm = {
  signIn: {
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
        maxLength: 15
      },
      valid: false,
      touched: false
    }
  }
};

export const signUpForm = {
  signUp: {
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
        maxLength: 15
      },
      valid: false,
      touched: false
    }
  }
};

export const detailsForm = {
  firstName: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your First Name"
    },
    value: "",
    validation: {
      required: true,
      minLength: 2,
      maxLength: 20
    },
    valid: false,
    touched: false
  },
  lastName: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your Last Name"
    },
    value: "",
    validation: {
      required: true,
      minLength: 2,
      maxLength: 25
    },
    valid: false,
    touched: false
  },
  street: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your Street Address"
    },
    value: "",
    validation: {
      required: true,
      minLength: 5,
      maxLength: 20
    },
    valid: false,
    touched: false
  },
  town: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your Town"
    },
    value: "",
    validation: {
      required: true,
      minLength: 2,
      maxLength: 20
    },
    valid: false,
    touched: false
  },
  postCode: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your Post Code"
    },
    value: "",
    validation: {
      required: true,
      minLength: 5,
      maxLength: 10
    },
    valid: false,
    touched: false
  }
};
