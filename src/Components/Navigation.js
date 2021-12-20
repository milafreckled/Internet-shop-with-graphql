import React, { Component } from "react";
import styled from "styled-components";
import logo from "../images/a-logo.png";
import cart from "../images/cart.png";
import { getCurrencies, getCategories } from "../features/Queries";
import { connect } from "react-redux";
import {
  addToCart,
  changeCurrency,
  changeCategory,
  recalculateTotal,
} from "../redux/actions";
import downArrow from "../images/down-arrow.png";
import upArrow from "../images/up-arrow.png";
import CartOverlay from "./CartOverlay";
import { client } from "../client";
import { mapStateToProps } from "../redux/mapStateToProps";
import currenciesMap from "../features/currenciesMap";
import { Link } from "react-router-dom";
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowState: "unselected",
      overlayVisible: false,
      currencies: [],
      currency: this.props.currency,
      categories: [],
    };
    this.handleCurrency = this.handleCurrency.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleArrow = this.handleArrow.bind(this);
  }

  componentDidMount() {
    client
      .query({
        query: getCurrencies,
      })
      .then(({ error, data }) => {
        if (error) {
          throw new Error(error);
        } else {
          this.setState({ currencies: data.currencies });
        }
      });
    client
      .query({
        query: getCategories,
      })
      .then(({ error, data }) => {
        if (error) {
          throw new Error(error);
        } else {
          this.setState({ categories: data.categories });
        }
      });
  }
  handleCurrency(currency) {
    this.setState({ currency: currency });
    this.props.changeCurrency(currency);
    const newPrices = this.props.cartItems.map(
      (p) =>
        p?.product?.prices.find((price) => price.currency === currency).amount
    );
    console.log(newPrices);
    this.props.recalculateTotal(newPrices);
  }
  handleCategory(category) {
    return () => this.props.changeCategory(category);
  }
  handleArrow(state) {
    return () =>
      this.setState({
        arrowState: state,
      });
  }
  render() {
    const Navbar = styled.nav`
      display: flex;
      overflow: hidden;
      padding: 24px 101px 0;
      left: 0;
      top: 0;
      min-height: 80px;
    `;
    const CategoriesWrapper = styled.ul`
      padding-inline-start: 0;
      list-style: none;
      display: flex;
      top: 28.5px;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      max-width: 234px;
      font: var(--navigation-regular-font);
      text-transform: uppercase;
    `;
    const ActionsWrapper = styled.ul`
      list-style: none;
      justify-content: flex-end;
      height: 40px;
      right: 101px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      padding: 0px;
      position: absolute;
      width: 204px;
    `;
    const CurrencyDropdown = styled.button`
      width: 32px;
      height: 29px;
      left: 149px;
      top: 5.5px;
      flex: none;
      order: 2;
      flex-grow: 0;
      margin: 0px 22px;
      font: var(--price-regular-font);
      cursor: pointer;
      outline: none;
      background: transparent;
      border: none;
      display: flex;
    `;
    const CartButton = styled.button`
      background: transparent;
      border: none;
      outline: none;
      width: 20px;
      height: 20px;
      right: 0px;
      top: calc(50% - 20px / 2);
      flex: none;
      order: 3;
      flex-grow: 0;
      margin: 0px 22px;
      cursor: pointer;
    `;
    const CartBadge = styled.div`
      color: #fff;
      position: absolute;
      width: 20px;
      height: 20px;
      left: 90%;
      right: 6.11%;
      bottom: 43.75%;
      border-radius: 50%;
      background-color: #1d1f22;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    const Logo = styled.div`
      position: relative;
      align-self: center;
      left: 50%;
      right: 50%;
      transform: translate(-50%, -50%);
      display: block;
      width: 41px;
      height: 41px;
      top: 23px;
    `;
    const CategoryLink = styled.a`
      display: block;
      text-decoration: none;
      padding: 0 16px 32px;
      &.active {
        border-bottom: 2px solid var(--primary-color);
        color: var(--primary-color);
        font: var(--navigation-active-font);
      }
    `;
    const CurrencyOptions = styled.div`
      filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
      position: absolute;
      height: fit-content;
      width: 114px;
      z-index: 2;
      overflow: visible;
      top: 32px;
      display: flex;
      flex-direction: column;
      padding: 20px 40px 0 20px;
      border: none;
      outline: none;
      background: #fff;
      text-align: right;
      & li {
        white-space: nowrap;
        display: inline-block;
        width: 100%;
        position: relative;
        margin-bottom: 21px;
      }
    `;
    const Arrow = styled.img`
      cursor: pointer;
      display: inline;
      width: 6px;
      height: 3px;
      margin: 6px 0 0 3px;
      align-self: center;
      vertical-align: middle;
    `;
    const { arrowState, overlayVisible, currencies, currency, categories } =
      this.state;
    return (
      <Navbar>
        <CategoriesWrapper>
          <CategoryLink
            onClick={this.handleCategory("all")}
            className={this.props.activeCategory === "all" && "active"}
          >
            ALL
          </CategoryLink>
          {categories.map((category) => (
            <CategoryLink
              key={category?.name}
              onClick={this.handleCategory(category?.name)}
              className={
                this.props.activeCategory === category?.name && "active"
              }
            >
              {category?.name}
            </CategoryLink>
          ))}
        </CategoriesWrapper>

        <Logo>
          <Link to="/">
            <img src={logo} alt="brand-logo" />
          </Link>
        </Logo>

        <ActionsWrapper>
          <CurrencyDropdown
            onMouseEnter={this.handleArrow("selected")}
            onMouseLeave={this.handleArrow("unselected")}
          >
            <span>
              {" "}
              {currency in currenciesMap ? currenciesMap[currency] : currency}
            </span>

            <Arrow
              src={arrowState === "unselected" ? downArrow : upArrow}
              alt="arrow"
            />

            {arrowState === "selected" && (
              <CurrencyOptions
                onMouseLeave={this.handleArrow("unselected")}
                onFocus={this.handleArrow("selected")}
              >
                {currencies?.length &&
                  currencies?.map((currency, idx) => (
                    <li onClick={() => this.handleCurrency(currency)} key={idx}>
                      {currency in currenciesMap && currenciesMap[currency]}{" "}
                      {currency}
                    </li>
                  ))}
              </CurrencyOptions>
            )}
          </CurrencyDropdown>

          <CartButton
            onMouseEnter={() =>
              this.setState({
                overlayVisible: true,
              })
            }
            onMouseLeave={() =>
              this.setState({
                overlayVisible: false,
              })
            }
          >
            {this.props.cartItems?.length > 0 && (
              <CartBadge>{this.props.cartItems?.length}</CartBadge>
            )}
            <img src={cart} alt="shopping-cart" />
            {overlayVisible && <CartOverlay />}
          </CartButton>
        </ActionsWrapper>
      </Navbar>
    );
  }
}

export default connect(mapStateToProps, {
  addToCart,
  changeCurrency,
  changeCategory,
  recalculateTotal,
})(Navigation);
