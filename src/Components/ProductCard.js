import React, { PureComponent } from "react";
import {
  OutOfStock,
  ContentBox,
  ProductTitle,
  Price,
  Card,
  ImageBox,
} from "./styles";
import addToCartBtn from "../images/add_to_cart.png";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";
import { addToCart, calculateTotal } from "../redux/actions";
import { Link } from "react-router-dom";
import { handleAddToCart } from "./functions";
import currenciesMap from "../features/currenciesMap";
import { getProductById } from "../graphql/queries";

class ProductCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { productData: null };
  }
  componentDidMount() {
    getProductById(this.props.id).then(({ data }) => {
      this.setState({ productData: data });
    });
  }
  render() {
    const { id, inStock, name, images, price, currency } = this.props;
    const { productData } = this.state;

    return (
      <Card className={!inStock && "unavailable"}>
        <Link to={`/product/${id}`}>
          <ImageBox>
            {!inStock && <OutOfStock>Out of stock</OutOfStock>}
            {images.length ? (
              <>
                <img src={images[0]} alt={name} />
              </>
            ) : (
              <img src={images[0]} alt={name} />
            )}
          </ImageBox>
        </Link>
        <ContentBox>
          <ProductTitle>{name}</ProductTitle>
          <Price>
            {price}
            {currenciesMap[currency]}
          </Price>
        </ContentBox>
        <button
          className="cart-btn"
          onClick={() => handleAddToCart(this, productData)}
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
