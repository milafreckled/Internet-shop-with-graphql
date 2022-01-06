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
} from "./styles/ProductDescription";
import Navigation from "../Components/Navigation";
import { sizeMap } from "../features/sizeMap";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";
import { addToCart, calculateTotal } from "../redux/actions";
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
      productData: null,
      activeAttribute: "",
      quantity: 0,
      pictureIdx: 0,
      sideImages: [],
    };
  }

  componentDidMount() {
    getProductById(this.state.id).then(({ data }) => {
      this.setState({
        productData: data,
        quantity: data.product?.quantity,
        activeAttribute: data.product?.attribute,
        sideImages: data.product?.gallery.filter(
          (_, idx) => idx !== this.state.pictureIdx
        ),
      });
      this.descriptionRef.current.innerHTML = data.product?.description;
    });
  }

  render() {
    const product = this.state.productData?.product;
    const currencySign = currenciesMap[this.props.currency];
    const { currency } = this.props;
    const { pictureIdx, activeAttribute, productData, sideImages, id } =
      this.state;

    // TODO: implement main image swicth on click
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
            <DetailsLine>size:</DetailsLine>
            <AttributesWrapper>
              {product?.attributes.slice(0, 1).map((a) =>
                a.name !== "Color"
                  ? a?.items?.map((item) => (
                      <AttributeBox
                        key={item?.displayValue}
                        onClick={() =>
                          handleAttributeClick(this, id, item.displayValue)
                        }
                        className={
                          item.displayValue === activeAttribute ? "active" : ""
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
                        onClick={() =>
                          handleAttributeClick(this, id, item.displayValue)
                        }
                        className={
                          item.displayValue === activeAttribute
                            ? "active-color"
                            : ""
                        }
                      ></AttributeBox>
                    ))
              )}
            </AttributesWrapper>
            <DetailsLine>Price:</DetailsLine>
            <Price>
              {product?.prices.find((p) => p.currency === currency).amount}
              {currencySign}
            </Price>

            <AddToCartBtn onClick={() => handleAddToCart(this, productData)}>
              Add to cart
            </AddToCartBtn>
            <Description ref={this.descriptionRef}></Description>
          </DescriptionColumn>
        </PageWrapper>
      </>
    );
  }
}
export default connect(mapStateToProps, { addToCart, calculateTotal })(
  ProductDescription
);
