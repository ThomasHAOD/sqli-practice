import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  purchased: false,
  previousOrders: []
};

const completeOrder = (state, action) => {
  const updatedOrders = [...state.orders, action.orderId];

  const updatedState = { orders: updatedOrders, purchased: true };

  return updatedState;
};

const fetchOrders = (state, action) => {
  const orders = action.orders;

  const updatedState = { ...state, previousOrders: orders };

  return updatedState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMPLETE_ORDER:
      return completeOrder(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrders(state, action);
    default:
      return state;
  }
};

export default reducer;
