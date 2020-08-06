import React from "react";
import Shoe from "../../Shoe/Shoe";

const orderSummary = props => {
  let shoes = <p>Add something to your basket to continue!</p>;
  if (props.shoes) {
    shoes = props.shoes.map((shoe, index) => {
      return (
        <Shoe
          key={index}
          name={shoe.name}
          brand={shoe.brand}
          color={shoe.colors}
          size={shoe.size}
          shoe={shoe}
        />
      );
    });
  }

  return (
    <div>
      <h1>Order Summary</h1>
      {shoes}
    </div>
  );
};

export default orderSummary;
