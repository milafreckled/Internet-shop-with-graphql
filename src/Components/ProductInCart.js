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
import leftArrow from "../images/arrow-left.png";
import rightArrow from "../images/arrow-right.png";
import { handleAttributeClick, handleQuantity } from "./functions";
import { Link } from "react-router-dom";

class ProductInOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAttribute:
        JSON.parse(localStorage.getItem(this.props.data.product.id))[
          "attribute"
        ] ?? "",
      quantity:
        JSON.parse(localStorage.getItem(this.props.data.product.id))[
          "quantity"
        ] ?? 0,
      pictureIdx: 0,
    };
  }

  render() {
    const product = this.props.data?.product;
    const pictureIdx = this.state.pictureIdx;
    const picturesLength = product?.gallery?.length;
    const Arrow = styled.img`
      position: absolute;
      width: 6px;
      height: 12px;
      z-index: 1;
      transform: matrix(-1, 0, 0, 1, 0, 0);
      &.right {
        right: 0;
        left: 90%;
        top: 50%;
        transform: translateY(-50%);
        bottom: 25%;
      }
      &.left {
        left: 10%;
        right: 25%;
        top: 50%;
        transform: translateY(-50%);
        bottom: 25%;
      }
    `;
    const ItemWrapper = styled.div`
      display: flex;
      margin-block: 21px;
      position: relative;
    `;
    const LeftPart = styled.div`
      flex: 1 1 60%;
      align-self: center;
    `;
    const Brand = styled.h2`
      margin-block-start: 0;
      margin-block-end: 0;
      font: var(--product-description-name-font);
    `;
    const Name = styled.h2`
      font: var(--product-description-subname-font);
    `;
    const Price = styled.p`
      font: var(--price-bold-font);
    `;
    const AttributesWrapper = styled.div`
      display: flex;
      max-width: 300px;
      margin-top: 27px;
    `;
    const AttributeBox = styled.div`
      cursor: pointer;
      width: 63px;
      border: 1px solid var(--text-color);
      font: var(--attribute-font);
      height: 100%;
      min-height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 4px;
      &.active {
        background: var(--text-color);
        color: #fff;
      }
      &.active-color {
        border: 2px inset var(--text-color);
      }
    `;
    const MiddlePart = styled.div`
      flex: 0 0 10%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      min-height: 185px;
      max-width: 45px;
      position: relative;
      align-self: center;
      left: -2%;
      & > .plus-box {
        position: absolute;
        top: 0%;
        width: 45px;
        height: 45px;
        border: 1px solid #1d1f22;
        box-sizing: border-box;
        text-align: center;
        overflow: visible;
        cursor: pointer;
      }
      & > .minus-box {
        position: absolute;
        top: calc(100% - 45px);
        width: 45px;
        height: 45px;
        border: 1px solid #1d1f22;
        box-sizing: border-box;
        text-align: center;
        overflow: visible;
        cursor: pointer;
      }
      & > .quantity {
        flex: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        align-self: center;
        font: var(--price-regular-font);
      }
    `;
    const RightPart = styled.div`
      align-self: center;
      position: relative;
      flex: 0 0 30%;
      max-width: 141px;
      > .product-img {
        & img {
          height: 100%;
          max-height: 185px;
          max-width: 141px;
          float: right;
        }
      }
    `;
    return (
      this.state.quantity > 0 && (
        <ItemWrapper>
          <LeftPart>
            <Brand>{product?.brand}</Brand>
            <Name>{product?.name}</Name>
            <Price>
              {
                product?.prices.find((p) => p.currency === this.props.currency)
                  .amount
              }
              {currenciesMap[this.props.currency]}
            </Price>
            <AttributesWrapper>
              {product?.attributes?.slice(0, 1).map((a) =>
                a.name === "Color"
                  ? a?.items.map((item) => (
                      <AttributeBox
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
                      ></AttributeBox>
                    ))
                  : a.name === "Size"
                  ? a?.items.map((item) => (
                      <AttributeBox
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
                      </AttributeBox>
                    ))
                  : a?.items.map((item) => (
                      <AttributeBox
                        onClick={() =>
                          handleAttributeClick(
                            this,
                            product.id,
                            item.displayValue
                          )
                        }
                      >
                        {item.displayValue}
                      </AttributeBox>
                    ))
              )}
            </AttributesWrapper>
          </LeftPart>
          <MiddlePart>
            <div
              className="plus-box"
              onClick={() => handleQuantity(this, "+", product?.id)}
            >
              <p> +</p>
            </div>
            <p className="quantity">{this.state.quantity}</p>
            <div
              className="minus-box"
              onClick={() => handleQuantity(this, "-", product?.id)}
            >
              <p> -</p>
            </div>
          </MiddlePart>
          <RightPart>
            {product?.gallery.length > 1 && (
              <>
                <Arrow
                  className="left"
                  src={leftArrow}
                  onClick={() =>
                    this.setState({
                      pictureIdx:
                        this.state.pictureIdx > 0
                          ? pictureIdx - 1
                          : picturesLength - 1,
                    })
                  }
                />
                <Arrow
                  className="right"
                  src={rightArrow}
                  onClick={() =>
                    this.setState({
                      pictureIdx:
                        this.state.pictureIdx < picturesLength - 1
                          ? pictureIdx + 1
                          : 0,
                    })
                  }
                />
              </>
            )}

            <Link className="product-img" to={`/product/${product?.id}`}>
              <img src={product?.gallery[pictureIdx]} alt={product?.name} />
            </Link>
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
