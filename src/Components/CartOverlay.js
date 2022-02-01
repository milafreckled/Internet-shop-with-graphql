import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";
import currenciesMap from "../features/currenciesMap";
import { groupBy } from "lodash";
import ProductInOverlay from "./ProductInOverlay";
import { Link } from "react-router-dom";
import { Overlay, Button, ButtonsWrapper, Title } from "./styles";

class CartOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.cartItems,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartItems !== this.props.cartItems) {
      this.setState({
        items: this.props.cartItems,
      });
    }
  }

  render() {
    const { total, currency, cartItemsQty } = this.props;
    const { items } = this.state;
    return (
      <Overlay>
        <Title className="left">
          My Bag,{" "}
          <span>
            {cartItemsQty} {cartItemsQty !== 1 ? `items` : `item`}
          </span>
        </Title>
        {items.map((c, idx) => (
          <ProductInOverlay index={idx} data={c} key={c?.product?.id} />
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
