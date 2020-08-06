import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  shoes: [],
  totalPrice: 0
};

const addShoeToBasketSuccess = (state, action) => {
  const updatedShoe = { ...action.shoe, stock: action.newStockLevel };
  const updatedShoeAdded = state.shoes.concat(updatedShoe);

  const updatedShoes = updatedShoeAdded.map(shoe => {
    if (shoe.id === action.shoe.id) {
      return updatedShoe;
    } else {
      return shoe;
    }
  });

  const updatedState = {
    shoes: updatedShoes,
    totalPrice: state.totalPrice + action.shoe.price
  };
  return updateObject(state, updatedState);
};

const removeShoeFromBasketSuccess = (state, action) => {
  const updatedShoe = { ...action.shoe, stock: action.newStockLevel };
  const updatedShoes = state.shoes
    .filter((shoe, index) => index !== action.index)
    .map(shoe => {
      if (shoe.id === action.shoe.id) {
        return updatedShoe;
      } else {
        return shoe;
      }
    });

  const updatedState = {
    shoes: updatedShoes,
    totalPrice: state.totalPrice - action.shoe.price
  };
  return updatedState;
};

const clearBasket = (state, action) => {
  return {
    shoes: [],
    totalPrice: 0
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SHOE_TO_BASKET_SUCCESS:
      return addShoeToBasketSuccess(state, action);
    case actionTypes.REMOVE_SHOE_FROM_BASKET_SUCCESS:
      return removeShoeFromBasketSuccess(state, action);
    case actionTypes.ORDER_SUCCESS:
      return clearBasket(state, action);
    default:
      return state;
  }
};

export default reducer;
