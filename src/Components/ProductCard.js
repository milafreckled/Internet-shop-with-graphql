import React, { Component } from "react";
import styled from "styled-components";
import addToCartBtn from "../images/add_to_cart.png";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";
import { addToCart, calculateTotal } from "../redux/actions";
import { Link } from "react-router-dom";
import { getProductById } from "../features/Queries";
import { client } from "../client";
import currenciesMap from "../features/currenciesMap";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = { productData: null };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart = (_productData) => {
    const price = _productData?.product?.prices.find(
      (p) => p?.currency === this.props.currency
    );

    this.props.calculateTotal(price.amount);
    this.props.addToCart(_productData);
    const productData = localStorage.getItem(_productData?.product?.id);
    if (productData) {
      let parsedData = JSON.parse(productData);
      let qty = parsedData["quantity"];
      parsedData["quantity"] = qty + 1;
      localStorage.setItem(
        _productData?.product?.id,
        JSON.stringify(parsedData)
      );
    } else {
      localStorage.setItem(
        _productData?.product?.id,
        '{"quantity": 1, "attribute": null}'
      );
    }
  };
  componentDidMount() {
    const data = client.readQuery({
      query: getProductById,
      variables: { id: this.props.id },
    });
    if (data) {
      this.setState({ productData: data });
    } else {
      client
        .query({
          query: getProductById,
          variables: { id: this.props.id },
        })
        .then(({ error, data }) => {
          if (error) {
            throw new Error(error);
          } else {
            this.setState({ productData: data });
            client.writeQuery({
              query: getProductById,
              variables: { id: this.props.id },
              data: data,
            });
          }
        });
    }
  }

  render() {
    const OutOfStock = styled.p`
      position: absolute;
      left: 25.42%;
      right: 25.71%;
      top: 44.24%;
      bottom: 43.94%;
      font: var(--category-name-font);
      display: flex;
      align-items: center;
      text-transform uppercase;
      color: #8d8f9a;
    `;
    const Card = styled.div`
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      padding: 16px;
      margin: 0 40px 103px;
      width: 386px;
      height: 444px;
      & > .cart-btn {
        display: none;
      }
      &:hover {
        box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
      }
      &:hover > .cart-btn {
        display: inline-block;
        border: none;
        outline: none;
        background: transparent;
        position: absolute;
        z-index: 2;
        width: 52px;
        height: 52px;
        right: 57px;
        bottom: 84px;
        filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.1));
        cursor: pointer;
      }
    `;
    const ContentBox = styled.div`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0px;
      width: 354px;
      height: 58px;
      flex: none;
      order: 2;
      align-self: stretch;
      flex-grow: 0;
      margin-top: 24px;
    `;
    const ImageBox = styled.div`
      max-height: 338px;
      height: 338px;
      width: auto;
      & > img {
        max-height: 100%;
      }
    `;
    const Title = styled.div`
      height: 29px;
      display: flex;
      align-items: center;
      color: #1d1f22;
      font: var(--product-name-font);
    `;
    const Price = styled.div`
      text-align: right;
      font: var(--price-regular-font);
      color: #1d1f22;
    `;

    return (
      <Card>
        <Link to={`/product/${this.props.id}`}>
          <ImageBox>
            {this.props.inStock === false && (
              <OutOfStock>Out of stock</OutOfStock>
            )}
            <img src={this.props.image} alt={this.props.name} />
          </ImageBox>
        </Link>
        <ContentBox>
          <Title>{this.props.name}</Title>
          <Price>
            {this.props.price}
            {currenciesMap[this.props.currency]}
          </Price>
        </ContentBox>
        <button
          className="cart-btn"
          onClick={() => this.handleAddToCart(this.state.productData)}
        >
          <img src={addToCartBtn} alt="add to cart" />
        </button>
      </Card>
    );
  }
}

export default connect(mapStateToProps, { addToCart, calculateTotal })(
  ProductCard
);
