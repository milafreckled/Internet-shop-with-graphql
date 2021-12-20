import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";
import currenciesMap from "../features/currenciesMap";
import {
  addToCart,
  removeFromCart,
  removeSingleItem,
  calculateTotal,
} from "../redux/actions";
import { sizeMap } from "../features/sizeMap";
import { handleAttributeClick, handleQuantity } from "./functions";
class ProductInOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAttribute: JSON.parse(
        localStorage.getItem(this.props.data.product?.id)
      )["attribute"],
      quantity: JSON.parse(localStorage.getItem(this.props.data.product?.id))[
        "quantity"
      ],
    };
  }
  render() {
    const ItemWrapper = styled.div`
      flex: 50%;
      display: flex;
      margin-block: 23px;
      max-height: 137px;
    `;
    const LeftPart = styled.div`
      flex: 50%;
      & > .product-name {
        display: flex;
        text-align: left;
        align-items: center;
        width: 136px;
        height: 52px;
        margin-block: 5px;
        word-wrap: break-word;
        font: var(--product-name-font);
      }
      & > .product-price {
        width: 52px;
        height: 26px;
        margin-top: 10px;
        text-align: left;
        font: var(--price-regular-font);
      }
      & > .attributes-wrapper {
        display: flex;
        gap: 4px;
        margin-top: ;
      }
      & > .attributes-wrapper div {
        width: auto;
        min-width: 24px;
        height: 24px;
        border: 1px solid #1d1f22;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      & > .attributes-wrapper div.active {
        background-color: #1d1f22;
        color: white;
      }
      & > .attributes-wrapper div.active-color {
        border: 2px inset var(--text-color);
      }
    `;
    const MiddlePart = styled.div`
      flex: 10%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      height: 100%;
      max-height: 137px;
      & > .plus-box {
        width: 24px;
        height: 24px;
        border: 1px solid #1d1f22;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      & > .minus-box {
        width: 24px;
        height: 24px;
        border: 1px solid #1d1f22;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      & > .quantity {
        flex: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90px;
        margin: 0 auto;
        align-self: center;
        font: var(--price-regular-font);
      }
    `;
    const RightPart = styled.div`
    flex: 40%;
    > img {
      width: 100%;
      height: 100%;
      max-width: 105px;
      max-height: 137px;
    }
}`;
    const currencySign = currenciesMap[this.props.currency];
    const product = this.props.data?.product;
    return (
      this.state.quantity > 0 && (
        <ItemWrapper key={product?.id}>
          <LeftPart>
            <p className="product-name">
              {product?.brand}
              <br />
              {product?.name}
            </p>
            <p className="product-price">
              {
                product?.prices.find((p) => p.currency === this.props.currency)
                  .amount
              }
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
                          item.displayValue === this.state.activeAttribute
                            ? "active-color"
                            : ""
                        }
                        style={{
                          backgroundColor: item.displayValue.toLowerCase(),
                        }}
                      ></div>
                    ))
                  : a.name === "Size"
                  ? a?.items.map((item) => (
                      <div
                        className={
                          item.displayValue === this.state.activeAttribute
                            ? "active"
                            : ""
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
                  : a?.items.map((item) => (
                      <div
                        onClick={() =>
                          handleAttributeClick(
                            this,
                            product.id,
                            item.displayValue
                          )
                        }
                      >
                        {item.displayValue}
                      </div>
                    ))
              )}
            </div>
          </LeftPart>
          <MiddlePart>
            <div
              className="plus-box"
              onClick={() => handleQuantity(this, "+", product?.id)}
            >
              +
            </div>
            <p className="quantity">{this.state.quantity}</p>
            <div
              className="minus-box"
              onClick={() => handleQuantity(this, "-", product?.id)}
            >
              -
            </div>
          </MiddlePart>
          <RightPart>
            <img src={product?.gallery[0]} alt={product?.name} />
          </RightPart>
        </ItemWrapper>
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
