import * as actionTypes from "./actionTypes";
import axios from "axios";

export const orderStart = () => {
  return { type: actionTypes.ORDER_START };
};
export const orderFail = error => {
  return { type: actionTypes.ORDER_FAIL, error: error };
};
export const orderSuccess = orderId => {
  return { type: actionTypes.ORDER_SUCCESS, orderId: orderId };
};

export const orderInit = () => {
  return { type: actionTypes.ORDER_INIT };
};

export const completeOrder = (basket, userId, totalPrice) => {
  return dispatch => {
    dispatch(orderStart());
    axios({
      method: "post",
      url: "http://localhost:8000/orders",
      data: { userId: userId, basket: basket, clientPrice: totalPrice }
    })
      .then(res => {
        basket.forEach(shoe => {
          axios({
            method: "post",
            url: `http://localhost:8000/shoes-orders`,
            data: { shoeId: shoe.id, orderId: res.data[0].id }
          })
            .then(res => {
              fetchOrders(userId);
            })
            .catch(err => {
              dispatch(orderFail(err));
            });
        });
        dispatch(orderSuccess(res.data[0].id));
      })
      .catch(err => {
        orderFail(err);
      });
  };
};

export const fecthOrdersStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START };
};
export const fecthOrdersFail = error => {
  return { type: actionTypes.FETCH_ORDERS_FAIL, error: error };
};
export const fecthOrdersSuccess = orders => {
  return { type: actionTypes.FETCH_ORDERS_SUCCESS, orders: orders };
};

export const fecthOrdersInit = () => {
  return { type: actionTypes.FETCH_ORDERS_INIT };
};

export const fetchOrders = userId => {
  return dispatch => {
    dispatch(fecthOrdersStart());
    axios({
      method: "get",
      url: `http://localhost:8000/orders/users/${userId}`
    })
      .then(res => {
        dispatch(fecthOrdersSuccess(res.data));
      })
      .catch(err => console.log(err));
  };
};
