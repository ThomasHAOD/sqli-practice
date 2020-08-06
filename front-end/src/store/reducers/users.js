import * as actionTypes from "../actions/actionTypes";

const initialState = {
  activeUser: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    street: null,
    town: null,
    postCode: null,
    password: null
  },
  error: false,
  signedIn: false,
  loading: false
};

const userSignUpInit = (state, action) => {
  return { ...state, loading: false };
};

const userSignUpStart = (state, action) => {
  return { ...state, loading: true };
};

const userSignUpSuccess = (state, action) => {
  const newUser = {
    id: action.userId,
    email: action.email,
    firstName: null,
    lastName: null,
    houseNumber: null,
    street: null,
    town: null,
    postCode: null,
    password: action.password
  };

  return { ...state, activeUser: newUser, signedIn: true };
};

const userSignUpFail = (state, action) => {
  return { ...state, error: true };
};

const userUpdateDetailsInit = (state, action) => {
  return { ...state, loading: false };
};

const userUpdateDetailsStart = (state, action) => {
  return { ...state, loading: true };
};

const userUpdateDetailsSuccess = (state, action) => {
  const newUser = {
    id: action.id,
    email: action.details.email,
    firstName: action.details.firstName,
    lastName: action.details.lastName,
    street: action.details.street,
    town: action.details.town,
    postCode: action.details.postCode
  };

  return { ...state, activeUser: newUser };
};

const userUpdateDetailsFail = (state, action) => {
  return { ...state, error: true };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGN_UP_INIT:
      return userSignUpInit(state, action);
    case actionTypes.USER_SIGN_UP_START:
      return userSignUpStart(state, action);
    case actionTypes.USER_SIGN_UP_SUCCESS:
      return userSignUpSuccess(state, action);
    case actionTypes.USER_SIGN_UP_FAIL:
      return userSignUpFail(state, action);
    case actionTypes.USER_UPDATE_DETAILS_INIT:
      return userUpdateDetailsInit(state, action);
    case actionTypes.USER_UPDATE_DETAILS_START:
      return userUpdateDetailsStart(state, action);
    case actionTypes.USER_UPDATE_DETAILS_SUCCESS:
      return userUpdateDetailsSuccess(state, action);
    case actionTypes.USER_UPDATE_DETAILS_FAIL:
      return userUpdateDetailsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
