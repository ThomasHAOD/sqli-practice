import React from "react";

import classes from "./PreviousOrders.module.css";

const previousOrders = props => {
  const orders = props.orders.map((order, index) => {
    const orderDate = order.order_date.toString().slice(0, 10);

    return (
      <div key={index} className={classes.PreviousOrder}>
        <h3>Order Number: {order.id}</h3>
        <h3>Total cost: £{order.total_cost}</h3>
        <h3>Date ordered: {orderDate}</h3>
      </div>
    );
  });

  return orders;
};

export default previousOrders;
