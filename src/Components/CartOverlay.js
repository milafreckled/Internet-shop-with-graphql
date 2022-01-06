import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";
import currenciesMap from "../features/currenciesMap";
import { uniqBy } from "lodash";
import ProductInOverlay from "./ProductInOverlay";
import { Link } from "react-router-dom";
import { getProductById } from "../graphql/queries";
import { Overlay, Button, ButtonsWrapper, Title } from "./styles";

class CartOverlay extends PureComponent {
  constructor(props) {
    super(props);
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
      getProductById(c?.product?.id).then(({ data }) => {
        this.setState({ items: [...this.state.items, data] });
      });
    });
  }

  render() {
    const { cartItems, total, currency } = this.props;
    const { items } = this.state;
    return (
      <Overlay>
        <Title className="left">
          My Bag,{" "}
          <span>
            {cartItems.length} {cartItems.length !== 1 ? `items` : `item`}
          </span>
        </Title>
        {items.map((c) => (
          <ProductInOverlay data={c} key={c?.product?.id} />
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
