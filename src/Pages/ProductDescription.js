import React, { Component } from "react";
import { client } from "../client";
import { getProductById } from "../features/Queries";
import styled from "styled-components";
import Navigation from "../Components/Navigation";
import { sizeMap } from "../features/sizeMap";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";
import { addToCart, calculateTotal } from "../redux/actions";
import currenciesMap from "../features/currenciesMap";
import { handleAttributeClick, handleAddToCart } from "../Components/functions";
class ProductDescription extends Component {
  constructor(props) {
    super(props);
    const url = window.location.pathname.split("/");
    const productId = url[url.length - 1];
    this.state = {
      id: productId,
      productData: null,
      activeAttribute: "",
      quantity: 0,
    };
  }

  componentDidMount() {
    client
      .query({
        query: getProductById,
        variables: { id: this.state.id },
      })
      .then(({ error, data }) => {
        if (error) {
          console.log(JSON.stringify(error, null, 2));
        } else {
          this.setState({
            productData: data,
            quantity: data.product?.quantity,
            activeAttribute: data.product?.activeAttribute,
          });
        }
      })
      .catch((e) => {
        console.log(JSON.stringify(e, null, 2));
      });
  }

  render() {
    const PageWrapper = styled.section`
      display: grid;
      grid-template-columns: 97px repeat(2, 1fr);
      margin: 72px 101px 0;
    `;
    const ImageColumn = styled.div`
      display: flex;
      gap: 32px;
      flex-direction: column;
      max-width: 97px;
      margin-right: 32px;
    `;
    const DescriptionColumn = styled.div`
      margin-left: 32px;
      max-width: 336px;
      word-break: break-word;
    `;
    const DetailsLine = styled.p`
      font: var(--size-price-font);
      text-transform: uppercase;
    `;
    const Brand = styled.h2`
      font: var(--product-decsription-name-font);
    `;
    const Name = styled.h2`
      font: var(--product-decsription-subname-font);
    `;
    const Price = styled.p`
      font: var(--price-bold-font);
    `;
    const AttributesWrapper = styled.div`
      display: flex;
      gap: 4px;
      margin-top: 27px;
    `;
    const AttributeBox = styled.div`
      width: 63px;
      border: 1px solid var(--text-color);
      font: var(--attribute-font);
      height: 100%;
      min-height: 45px;
      margin-right: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active {
        background: var(--text-color);
        color: #fff;
      }
      &.active-color {
        border: 2px inset var(--text-color);
      }
    `;
    const AddToCartBtn = styled.button`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px 32px;
      min-height: 52px;
      width: 292px;
      background: #5ece7b;
      color: white;
      text-transform: uppercase;
      margin 20px 0 40px;
    `;
    const ProductDescription = styled.article`
      font: var(--product-description-font);
      max-height: 103px;
    `;
    const ProductImage = styled.div`
      max-width: calc(100% - 97px);
      & img {
        width: 100%;
        height: 100%;
      }
    `;
    const product = this.state.productData?.product;
    const currencySign = currenciesMap[this.props.currency];
    return (
      <>
        <Navigation />
        <PageWrapper>
          <ImageColumn>
            {product?.gallery.slice(1).map((image) => (
              <img src={image} alt={product?.name} />
            ))}
          </ImageColumn>
          <ProductImage>
            <img src={product?.gallery[0]} alt={product?.name} />
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
                          handleAttributeClick(
                            this,
                            this.state.id,
                            item.displayValue
                          )
                        }
                        className={
                          item.displayValue === this.state.activeAttribute
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
                        onClick={() =>
                          handleAttributeClick(
                            this,
                            this.state.id,
                            item.displayValue
                          )
                        }
                        className={
                          item.displayValue === this.state.activeAttribute
                            ? "active-color"
                            : ""
                        }
                      ></AttributeBox>
                    ))
              )}
            </AttributesWrapper>
            <DetailsLine>Price:</DetailsLine>
            <Price>
              {
                product?.prices.find((p) => p.currency === this.props.currency)
                  .amount
              }
              {currencySign}
            </Price>

            <AddToCartBtn
              onClick={() => handleAddToCart(this, this.state.productData)}
            >
              Add to cart
            </AddToCartBtn>
            <ProductDescription
              dangerouslySetInnerHTML={{ __html: product?.description }}
            />
          </DescriptionColumn>
        </PageWrapper>
      </>
    );
  }
}
export default connect(mapStateToProps, { addToCart, calculateTotal })(
  ProductDescription
);
