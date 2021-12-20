import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";
import { client } from "../client";
import { getProductById } from "../features/Queries";
import currenciesMap from "../features/currenciesMap";
import { uniqBy } from "lodash";
import ProductInOverlay from "./ProductInOverlay";
import { Link } from "react-router-dom";

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.cartItems);
    this.state = { items: [] }; // unique items from cart items
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartItems !== this.props.cartItems) {
      this.setState({
        items: uniqBy(this.props.cartItems, (obj) => obj?.product?.id),
      });
    }
  }

  componentDidMount() {
    const uniqueItems = uniqBy(this.props.cartItems, (obj) => obj?.product?.id);
    uniqueItems.forEach((c) => {
      client
        .query({
          query: getProductById,
          variables: { id: c?.product.id },
        })
        .then(({ error, data }) => {
          if (!error) {
            this.setState({
              items: [...this.state.items, data],
            });
          }
        })
        .catch((e) => {
          console.log(JSON.stringify(e, null, 2));
        });
    });
  }

  render() {
    const Overlay = styled.div`
      width: fit-content;
      min-width: 300px;
      height: 540px;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      padding: 8px 16px;
      filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
      position: absolute;
      top: 32px;
      right: 0;
      z-index: 2;
      background: #fff;
    `;
    const Button = styled.button`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 16px 32px;
      width: 145px;
      height: 43px;
      left: 0px;
      top: 0px;
      box-sizing: border-box;
      flex: none;
      order: 0;
      flex-grow: 0;
      font: var(--button-font);
      &.view-bag-btn {
        background: #ffffff;
        border: 1px solid #1d1f22;
        color: #1d1f22;
        margin-right: 4px;
      }
      &.checkout-btn {
        background: #5ece7b;
        color: #fff;
        border: none;
        margin-left: 4px;
      }
    `;
    const ButtonsWrapper = styled.div`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    `;
    const Title = styled.p`
      font: var(--my-bag-bold-font);
      &.left {
        text-align: left;
      }
      &.right {
        text-align: right;
      }
      & span {
        font: var(--my-bag-normal-font);
      }
    `;
    const { cartItems, total, currency } = this.props;
    return (
      <Overlay>
        <Title className="left">
          My Bag,
          <span>
            {cartItems.length} {cartItems.length !== 1 ? `items` : `item`}
          </span>
        </Title>
        {this.state.items.map((c) => (
          <ProductInOverlay data={c} key={c?.product.id} />
        ))}
        <ButtonsWrapper>
          <Title className="left">Total:</Title>
          <Title className="right">
            {total.toFixed(2)}
            {currenciesMap[currency] || currency}
          </Title>
          <Link to="/cart">
            <Button className="view-bag-btn">VIEW BAG</Button>
          </Link>
          <Button className="checkout-btn">CHECKOUT</Button>
        </ButtonsWrapper>
      </Overlay>
    );
  }
}

export default connect(mapStateToProps, null)(CartOverlay);
