import React, { Component } from "react";
import Navigation from "../Components/Navigation";
import styled from "styled-components";
import ProductInCart from "../Components/ProductInCart";
import { client } from "../client";
import { getProductById } from "../features/Queries";
import { uniqBy } from "lodash";
import { mapStateToProps } from "../redux/mapStateToProps";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Cart extends Component {
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
    const CartWrapper = styled.div`
      display: flex;
      flex-direction: column;
      margin: 80px 243px 80px 117px;
      background: #fff;
    `;
    const Divider = styled.hr`
      height: 1px;
      width: 100%;
      background: var(--disabled-color);
    `;
    return (
      <>
        <Navigation />
        <CartWrapper>
          <h2 style={{ font: "var(--cart-name-font" }}>CART</h2>
          <Divider />
          {this.state.items.length > 0 ? (
            this.state.items.map((item, idx) => (
              <>
                <ProductInCart data={item} key={item?.product?.id} />
                {idx !== this.state.items.length - 1 && <Divider />}
              </>
            ))
          ) : (
            <h2>
              Nothing here. <Link to="/">Start shopping.</Link>
            </h2>
          )}
        </CartWrapper>
      </>
    );
  }
}
export default connect(mapStateToProps, null)(Cart);
