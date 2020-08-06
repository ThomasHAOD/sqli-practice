import React from "react";

import Carousel from "react-bootstrap/Carousel";
import classes from "./Styles.module.css";
import placeholder from "../../assets/placeholder.jpg";

const styles = props => {
  return (
    <div className={classes.Styles}>
      <p className={classes.Blurb}>
        Use #GoldenShoe on your instagram, facebook and Twitter posts to be
        featured here and on our social media -
        <br /> and to have a chance to win £50 to spend in store each month!
      </p>
      <Carousel className={classes.Carousel}>
        <Carousel.Item>
          <img className="d-block w-100" alt="placeholder" src={placeholder} />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" alt="placeholder" src={placeholder} />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" alt="placeholder" src={placeholder} />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default styles;
