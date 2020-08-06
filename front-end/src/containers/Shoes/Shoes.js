import React, { Component } from "react";
import { connect } from "react-redux";

import Shoe from "../../components/Shoe/Shoe";
import * as actions from "../../store/actions/index";
import Spinner from "react-bootstrap/Spinner";
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

export class Shoes extends Component {

  state = {
    searchTerm: ''
  }

  componentDidMount() {
    this.props.onFetchShoes();
  }

  inputChangeHandler = e => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  shoeSelectHandler = shoe => {
    this.props.onShoeSelect(shoe);
    this.props.history.push("/selected-shoe");
  };

  searchShoeHandler = () => {
    this.props.onSearchShoe(this.state.searchTerm)
  }

  render() {
    let shoes = (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
    if (this.props.shoes) {
      shoes = this.props.shoes.map((shoe, index) => {
        return (
          <Shoe
            key={index}
            name={shoe.name}
            brand={shoe.brand}
            color={shoe.color}
            size={shoe.size}
            clicked={this.shoeSelectHandler}
            shoe={shoe}
          />
        );
      });
    }

    return <div style={{ textAlign: "center" }}>
      <div style={{ width: '50%', margin: 'auto' }}>
        <Input label="Search" changed={e => this.inputChangeHandler(e)} />
        <Button btnType="Success" clicked={this.searchShoeHandler}>Search</Button>
      </div>
      {shoes}
    </div >;
  }
}

const mapStateToProps = state => {
  return {
    shoes: state.shoes.shoes
  };
};

const dispatchStateToProps = dispatch => {
  return {
    onFetchShoes: () => dispatch(actions.fetchShoes()),
    onShoeSelect: shoe => dispatch(actions.selectShoe(shoe)),
    onSearchShoe: shoe => dispatch(actions.searchShoe(shoe))
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(Shoes);
