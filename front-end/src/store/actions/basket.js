import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addShoeToBasketStart = () => {
  return { type: actionTypes.ADD_SHOE_TO_BASKET_START };
};

export const addShoeToBasketFail = error => {
  return { type: actionTypes.ADD_SHOE_TO_BASKET_FAIL, error: error };
};

export const addShoeToBasketSuccess = (newStockLevel, shoe) => {
  return {
    type: actionTypes.ADD_SHOE_TO_BASKET_SUCCESS,
    newStockLevel: newStockLevel,
    shoe: shoe
  };
};
export const addShoeToBasketInit = () => {
  return { type: actionTypes.ADD_SHOE_TO_BASKET_INIT };
};

export const addShoeToBasket = shoe => {
  const id = shoe.id;
  const newStockLevel = parseInt(shoe.stock) - 1;
  return dispatch => {
    dispatch(addShoeToBasketStart());
    axios({
      method: "put",
      url: `http://localhost:8000/shoes/${id}/updatebasket`,
      data: {
        id: id,
        newStockLevel: newStockLevel
      }
    })
      .then(res => {
        dispatch(addShoeToBasketSuccess(res.data[0].stock, shoe));
      })
      .catch(err => {
        addShoeToBasketFail(err);
      });
  };
};
export const removeShoeFromBasketStart = () => {
  return { type: actionTypes.REMOVE_SHOE_FROM_BASKET_START };
};

export const removeShoeFromBasketFail = error => {
  return {
    type: actionTypes.REMOVE_SHOE_FROM_BASKET_FAIL,
    error: error
  };
};

export const removeShoeFromBasketSuccess = (shoe, index, newStockLevel) => {
  return {
    type: actionTypes.REMOVE_SHOE_FROM_BASKET_SUCCESS,
    shoe: shoe,
    index: index,
    newStockLevel
  };
};

export const removeShoeFromBasketInit = () => {
  return { type: actionTypes.REMOVE_SHOE_FROM_BASKET_INIT };
};

export const removeShoeFromBasket = (shoe, index) => {
  const id = shoe.id;
  const newStockLevel = parseInt(shoe.stock) + 1;
  return dispatch => {
    dispatch(removeShoeFromBasketStart());
    axios({
      method: "put",
      url: `http://localhost:8000/shoes/${id}/updatebasket`,
      data: {
        id: id,
        newStockLevel: newStockLevel
      }
    })
      .then(res => {
        dispatch(removeShoeFromBasketSuccess(shoe, index, res.data[0].stock));
      })
      .catch(err => {
        removeShoeFromBasketFail(err);
      });
  };
};
