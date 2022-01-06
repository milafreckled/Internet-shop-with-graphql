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
} from "../redux/actions";
import { sizeMap } from "../features/sizeMap";
import { handleAttributeClick, handleQuantity } from "./functions";

class ProductInOverlay extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      quantity:
        JSON.parse(localStorage.getItem(this.props.data.product.id))[
          "quantity"
        ] ?? 0,
      activeAttribute:
        JSON.parse(localStorage.getItem(this.props.data.product.id))[
          "attribute"
        ] ?? "",
    };
  }

  render() {
    const { currency } = this.props;
    const { activeAttribute, quantity } = this.state;
    const currencySign = currenciesMap[currency];
    const product = this.props.data?.product;
    return (
      quantity > 0 && (
        <ProductWrapper key={product?.id}>
          <LeftSection>
            <p className="product-name">
              {product?.brand}
              <br />
              {product?.name}
            </p>
            <p className="product-price">
              {product?.prices.find((p) => p.currency === currency).amount}
              {currencySign}
            </p>
            <div className="attributes-wrapper">
              {product?.attributes?.slice(0, 1).map((a) =>
                a.name === "Color"
                  ? a?.items.map((item) => (
                      <div
                        onClick={() =>
                          handleAttributeClick(
                            this,
                            product.id,
                            item.displayValue
                          )
                        }
                        className={
                          item.displayValue === activeAttribute
                            ? "active-color"
                            : ""
                        }
                        style={{
                          backgroundColor: item.displayValue.toLowerCase(),
                        }}
                      ></div>
                    ))
                  : a?.items.map((item) => (
                      <div
                        className={
                          item.displayValue === activeAttribute ? "active" : ""
                        }
                        onClick={() =>
                          handleAttributeClick(
                            this,
                            product.id,
                            item.displayValue
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
              onClick={() => handleQuantity(this, "+", product?.id)}
            >
              +
            </div>
            <p className="quantity">{quantity}</p>
            <div
              className="minus-box"
              onClick={() => handleQuantity(this, "-", product?.id)}
            >
              -
            </div>
          </MiddleSection>
          <RightSection>
            <img src={product?.gallery[0]} alt={product?.name} />
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
})(ProductInOverlay);
