import * as actionTypes from "./actionTypes";
import axios from "axios";

export const userSignUpStart = () => {
  return { type: actionTypes.USER_SIGN_UP_START };
};

export const userSignUpInit = () => {
  return { type: actionTypes.USER_SIGN_UP_INIT };
};

export const userSignUpSuccess = (id, email, password) => {
  return { type: actionTypes.USER_SIGN_UP_SUCCESS, userId: id, email: email, password: password };
};

export const userSignUpFail = error => {
  return { type: actionTypes.USER_SIGN_UP_FAIL, error: error };
};

export const userSignUp = (email, password) => {
  return dispatch => {
    dispatch(userSignUpStart());
    axios({
      method: "post",
      url: "http://localhost:5000/users",
      data: {
        email: email,
        password: password
      }
    })
      .then(res => {
        dispatch(userSignUpSuccess(res.data[0].id, email, password));
      })
      .catch(err => {
        dispatch(userSignUpFail(err));
      });
  };
};

export const userUpdateDetailsStart = () => {
  return { type: actionTypes.USER_UPDATE_DETAILS_START };
};

export const userUpdateDetailsInit = () => {
  return { type: actionTypes.USER_UPDATE_DETAILS_INIT };
};

export const userUpdateDetailsSuccess = (id, details) => {
  return {
    type: actionTypes.USER_UPDATE_DETAILS_SUCCESS,
    id: id,
    details: details
  };
};

export const userUpdateDetailsFail = error => {
  return { type: actionTypes.USER_UPDATE_DETAILS_FAIL, error: error };
};

export const userUpdateDetails = details => {
  const { id, firstName, lastName, street, town, postCode } = details;

  return dispatch => {
    dispatch(userUpdateDetailsStart());
    axios({
      method: "put",
      url: `http://localhost:5000/users/${id}`,
      data: {
        id: id,
        firstName: firstName,
        lastName: lastName,
        street: street,
        town: town,
        postCode: postCode
      }
    })
      .then(res => {
        dispatch(userUpdateDetailsSuccess(id, details));
      })
      .catch(err => {
        dispatch(userSignUpFail(err));
      });
  };
};
