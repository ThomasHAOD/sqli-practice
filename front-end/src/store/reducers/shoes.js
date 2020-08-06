import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  shoes: null,
  error: false,
  selectedShoe: null
};

const setShoes = (state, action) => {
  return { ...state, shoes: action.shoes };
};

const fetchShoesFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const selectShoe = (state, action) => {
  return { ...state, selectedShoe: action.shoe };
};

export const updateShoeStock = (state, action) => {
  const updatedShoe = { ...action.shoe, stock: action.newStockLevel };
  const updatedShoes = state.shoes.map(shoe => {
    if (shoe.id === action.shoe.id) {
      return updatedShoe;
    } else {
      return shoe;
    }
  });
  return { ...state, shoes: updatedShoes };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SHOES:
      return setShoes(state, action);
    case actionTypes.FETCH_SHOES_FAILED:
      return fetchShoesFailed(state, action);
    case actionTypes.SELECT_SHOE:
      return selectShoe(state, action);
    case actionTypes.ADD_SHOE_TO_BASKET_SUCCESS:
      return updateShoeStock(state, action);
    case actionTypes.REMOVE_SHOE_FROM_BASKET_SUCCESS:
      return updateShoeStock(state, action);
    default:
      return state;
  }
};

export default reducer;
