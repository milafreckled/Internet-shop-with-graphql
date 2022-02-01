import React, { PureComponent } from "react";
import Navigation from "../Components/Navigation";
import { CartWrapper, CartTitle, Divider } from "./styles";
import ProductInCart from "../Components/ProductInCart";
import { getProductById } from "../graphql/queries";
import { uniqBy } from "lodash";
import { mapStateToProps } from "../redux/mapStateToProps";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { items: this.props.cartItems }; // unique items from cart items
  }

  componentDidUpdate(prevProps) {
    if (this.props.cartItems !== prevProps.items) {
      this.setState({ items: this.props.cartItems });
    }
  }

  render() {
    const { items } = this.state;
    const { cartItemsQty } = this.props;
    return (
      <>
        <Navigation />
        <CartWrapper>
          <CartTitle>CART</CartTitle>
          <Divider />
          {Number(cartItemsQty) > 0 ? (
            items.map((item, idx) => (
              <>
                <ProductInCart index={idx} data={item} key={item?.id} />
                {idx !== items.length - 1 && <Divider />}
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
