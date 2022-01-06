import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  SwitchArrow,
  RightPart,
  MiddlePart,
  LeftPart,
  ItemWrapper,
  Name,
  PriceInCart,
  Brand,
  AttributeBox,
  AttributesWrapper,
} from "./styles";
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

class ProductInCart extends PureComponent {
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

    return (
      this.state.quantity > 0 && (
        <ItemWrapper>
          <LeftPart>
            <Brand>{product?.brand}</Brand>
            <Name>{product?.name}</Name>
            <PriceInCart>
              {
                product?.prices.find((p) => p.currency === this.props.currency)
                  .amount
              }
              {currenciesMap[this.props.currency]}
            </PriceInCart>
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
                <SwitchArrow
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
                <SwitchArrow
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

            <img
              className="product-img"
              src={product?.gallery[pictureIdx]}
              alt={product?.name}
            />
          </RightPart>
        </ItemWrapper>
      )
    );
  }
}

ProductInCart.propTypes = {
  data: PropTypes.object,
};

export default connect(mapStateToProps, {
  addToCart,
  removeFromCart,
  removeSingleItem,
  calculateTotal,
})(ProductInCart);
