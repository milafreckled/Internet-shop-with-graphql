import React, { PureComponent } from "react";
import { getProductById } from "../graphql/queries";
import {
  Description,
  Name,
  Price,
  AttributeBox,
  AttributesWrapper,
  DetailsLine,
  AddToCartBtn,
  PageWrapper,
  DescriptionColumn,
  ImageColumn,
  ProductImage,
  Brand,
} from "./styles";
import Navigation from "../Components/Navigation";
import { sizeMap } from "../features/sizeMap";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";
import {
  addToCart,
  calculateTotal,
  updateCart,
  calculateQty,
} from "../redux/actions";
import currenciesMap from "../features/currenciesMap";
import { handleAttributeClick, handleAddToCart } from "../Components/functions";

class ProductDescription extends PureComponent {
  constructor(props) {
    super(props);
    const url = window.location.pathname.split("/");
    const productId = url[url.length - 1];
    this.descriptionRef = React.createRef();
    this.state = {
      id: productId,
      index: -1,
      productData: null,
      activeAttribute: "",
      pictureIdx: 0,
      sideImages: [],
    };
  }

  componentDidMount() {
    getProductById(this.state.id).then(({ data }) => {
      this.setState({
        productData: data,
        sideImages: data.product?.gallery.filter(
          (_, idx) => idx !== this.state.pictureIdx
        ),
      });
      const current = this.props.cartItems.find(
        (item) => item.id === this.state.id
      );
      if (current) {
        this.setState({ index: this.props.cartItems.indexOf(current) });
      } else {
        this.setState({ index: 0 });
      }
      if (data.product?.description) {
        this.descriptionRef.current.innerHTML = data.product.description;
      }
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.cartItems !== prevProps.cartItems) {
      const { id, activeAttribute } = this.state;
      const current = this.props.cartItems.find(
        (item) => item.id === id && item.attribute === activeAttribute
      );
      if (current) {
        this.setState({ index: this.props.cartItems.indexOf(current) });
      }
    }
  }
  render() {
    const product = this.state.productData?.product;
    const currencySign = currenciesMap[this.props.currency];
    const { currency, cartItems } = this.props;
    const { pictureIdx, activeAttribute, productData, sideImages, index } =
      this.state;
    return (
      <>
        <Navigation />
        <PageWrapper>
          <ImageColumn>
            {sideImages.map((image, idx) => (
              <img
                src={image}
                alt={product?.name}
                onClick={() => this.setState({ pictureIdx: idx })}
              />
            ))}
          </ImageColumn>
          <ProductImage>
            <img src={product?.gallery[pictureIdx]} alt={product?.name} />
          </ProductImage>
          <DescriptionColumn>
            <Brand>{product?.brand}</Brand>
            <Name>{product?.name}</Name>
            {product?.attributes && (
              <>
                <DetailsLine>{product?.attributes[0]?.name}</DetailsLine>
                <AttributesWrapper>
                  {product?.attributes.slice(0, 1).map((a) =>
                    a.name !== "Color"
                      ? a?.items?.map((item) => (
                          <AttributeBox
                            key={item?.displayValue}
                            onClick={() => {
                              handleAttributeClick(
                                this,
                                index,
                                item.displayValue,
                                false
                              );
                            }}
                            className={
                              item.displayValue === activeAttribute
                                ? "active"
                                : ""
                            }
                          >
                            {sizeMap[item?.displayValue] || item?.displayValue}
                          </AttributeBox>
                        ))
                      : a?.items.map((item) => (
                          <AttributeBox
                            key={item?.displayValue}
                            style={{
                              backgroundColor: item.displayValue.toLowerCase(),
                            }}
                            onClick={() => {
                              handleAttributeClick(
                                this,
                                index,
                                item.displayValue,
                                false
                              );
                            }}
                            className={
                              item.displayValue === activeAttribute
                                ? "active-color"
                                : ""
                            }
                          ></AttributeBox>
                        ))
                  )}
                </AttributesWrapper>
              </>
            )}
            <DetailsLine>Price:</DetailsLine>
            <Price>
              {product?.prices.find((p) => p.currency === currency).amount}
              {currencySign}
            </Price>

            <AddToCartBtn
              onClick={() => {
                handleAddToCart(this, productData);
              }}
            >
              Add to cart
            </AddToCartBtn>
            <Description ref={this.descriptionRef}></Description>
          </DescriptionColumn>
        </PageWrapper>
      </>
    );
  }
}
export default connect(mapStateToProps, {
  addToCart,
  calculateTotal,
  updateCart,
  calculateQty,
})(ProductDescription);
