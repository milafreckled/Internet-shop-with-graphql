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
    this.state = { items: [] }; // unique items from cart items
  }

  componentDidMount() {
    const uniqueItems = uniqBy(this.props.cartItems, (obj) => obj?.product?.id);
    uniqueItems.forEach((c) => {
      getProductById(c?.product.id).then(({ data }) =>
        this.setState({
          items: [...this.state.items, data],
        })
      );
    });
  }

  render() {
    return (
      <>
        <Navigation />
        <CartWrapper>
          <CartTitle>CART</CartTitle>
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
