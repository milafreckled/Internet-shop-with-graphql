import React, { PureComponent } from "react";
import logo from "../images/a-logo.png";
import cart from "../images/cart.png";
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
import { mapStateToProps } from "../redux/mapStateToProps";
import currenciesMap from "../features/currenciesMap";
import { Link } from "react-router-dom";
import { getCurrencies, getCategories } from "../graphql/queries";
import {
  Navbar,
  CategoryLink,
  CategoriesWrapper,
  CurrencyOptions,
  CurrencyDropdown,
  CartBadge,
  CartButton,
  Arrow,
  Logo,
  ActionsWrapper,
} from "./styles";

class Navigation extends PureComponent {
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
    getCategories().then(({ error, data }) => {
      if (!error) {
        this.setState({ categories: data.categories });
      }
    });
    getCurrencies().then(({ error, data }) => {
      if (!error) {
        this.setState({ currencies: data.currencies });
      }
    });
  }
  handleCurrency(currency) {
    return () => {
      this.props.changeCurrency(currency);
      const newPrices = this.props.cartItems.map(
        (p) =>
          p?.product?.prices.find((price) => price.currency === currency).amount
      );
      this.props.recalculateTotal(newPrices);
    };
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
    const { arrowState, overlayVisible, currencies, categories } = this.state;
    const { activeCategory, cartItems, currency } = this.props;
    const { handleCategory, handleCurrency, handleArrow } = this;
    return (
      <Navbar>
        <CategoriesWrapper>
          <CategoryLink
            to="/"
            onClick={handleCategory("all")}
            className={activeCategory === "all" && "active"}
          >
            ALL
          </CategoryLink>
          {categories.map((category) => (
            <CategoryLink
              key={category?.name}
              to={`/${category?.name}`}
              onClick={handleCategory(category?.name)}
              className={activeCategory === category?.name && "active"}
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
            onMouseEnter={handleArrow("selected")}
            onMouseLeave={handleArrow("unselected")}
          >
            <span>
              {currency in currenciesMap ? currenciesMap[currency] : currency}
            </span>

            <Arrow
              src={arrowState === "unselected" ? downArrow : upArrow}
              alt="arrow"
            />

            {arrowState === "selected" && (
              <CurrencyOptions
                onMouseLeave={handleArrow("unselected")}
                onFocus={handleArrow("selected")}
              >
                {currencies.length &&
                  currencies.map((currency, idx) => (
                    <li onClick={handleCurrency(currency)} key={idx}>
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
            {cartItems?.length > 0 && (
              <CartBadge>{cartItems?.length}</CartBadge>
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
