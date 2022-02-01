import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";
import currenciesMap from "../features/currenciesMap";
import {
  ProductWrapper,
  LeftSection,
  MiddleSection,
  RightSection,
} from "./styles";

import {
  addToCart,
  removeFromCart,
  removeSingleItem,
  calculateTotal,
  updateCart,
  calculateQty,
} from "../redux/actions";
import { sizeMap } from "../features/sizeMap";
import { Link } from "react-router-dom";
import { handleAttributeClick, handleQuantity } from "./functions";

class ProductInOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.data,
      quantity: this.props.data.quantity,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        product: this.props.data,
        quantity: this.props.data.quantity,
      });
    }
  }
  render() {
    const { currency, index } = this.props;
    const currencySign = currenciesMap[currency];
    const { attribute, name, brand, prices, id, attributes, gallery } =
      this.state.product;
    const { quantity } = this.state;
    return (
      quantity > 0 && (
        <ProductWrapper key={id}>
          <LeftSection>
            <p className="product-name">
              {brand}
              <br />
              {name}
            </p>
            <p className="product-price">
              {prices.find((p) => p.currency === currency).amount}
              {currencySign}
            </p>
            <div className="attributes-wrapper">
              {attributes?.slice(0, 1).map((a) =>
                a.name === "Color"
                  ? a?.items.map((item) => (
                      <div
                        onClick={() =>
                          handleAttributeClick(
                            this,
                            index,
                            item.displayValue,
                            true
                          )
                        }
                        className={
                          item.displayValue === attribute ? "active-color" : ""
                        }
                        style={{
                          backgroundColor: item.displayValue.toLowerCase(),
                        }}
                      ></div>
                    ))
                  : a?.items.map((item) => (
                      <div
                        className={
                          item.displayValue === attribute ? "active" : ""
                        }
                        onClick={() =>
                          handleAttributeClick(
                            this,
                            index,
                            item.displayValue,
                            true
                          )
                        }
                      >
                        {sizeMap[item.displayValue] || item.displayValue}
                      </div>
                    ))
              )}
            </div>
          </LeftSection>
          <MiddleSection>
            <div
              className="plus-box"
              onClick={() => handleQuantity(this, "+", index)}
            >
              +
            </div>
            <p className="quantity">{quantity}</p>
            <div
              className="minus-box"
              onClick={() => handleQuantity(this, "-", index)}
            >
              -
            </div>
          </MiddleSection>
          <RightSection>
            <Link to={`/product/${id}/${index}`}>
              <img src={gallery[0]} alt={name} />
            </Link>
          </RightSection>
        </ProductWrapper>
      )
    );
  }
}

ProductInOverlay.propTypes = {
  data: PropTypes.object,
};

export default connect(mapStateToProps, {
  addToCart,
  removeFromCart,
  removeSingleItem,
  calculateTotal,
  updateCart,
  calculateQty,
})(ProductInOverlay);
