import React, { Component } from "react";
import styled from "styled-components";
import Navigation from "../Components/Navigation";
import { client } from "../client";
import { getProductList, getFilteredProductList } from "../features/Queries";
import ProductCard from "../Components/ProductCard";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { productList: [], loading: false, error: "" };
    // TODO: implement filtering productList by categories (clothes/tech/all)
    this.updateProductList = this.updateProductList.bind(this);
  }
  updateProductList() {
    if (this.props.activeCategory === "all") {
      client
        .query({
          query: getProductList,
        })
        .then(({ error, data }) => {
          if (error) {
            throw new Error(error);
          }
          window.history.pushState({}, undefined, "/");
          this.setState({
            productList: data,
          });
        })
        .catch((e) => {
          console.log(JSON.stringify(e, null, 2));
        });
    } else {
      client
        .query({
          query: getFilteredProductList,
          variables: { name: this.props.activeCategory },
        })
        .then(({ error, data }) => {
          if (error) {
            throw new Error(error);
          }
          window.history.pushState(
            {},
            undefined,
            `/${this.props.activeCategory}`
          );
          this.setState({
            productList: data,
          });
        })
        .catch((e) => {
          console.log(JSON.stringify(e, null, 2));
        });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.activeCategory !== prevProps.activeCategory) {
      this.updateProductList();
    }
  }
  componentDidMount() {
    this.updateProductList();
  }

  render() {
    const ProductsLayout = styled.section`
      margin: 119px 10px;
      display: flex;
      justify-content: stretch;
      flex-wrap: wrap;
    `;
    const CategoryName = styled.h2`
      font: var(--category-name-font);
      margin-left: 101px;
      text-transform: capitalize;
    `;

    return (
      <>
        <Navigation />
        {this.props.activeCategory !== "all" && (
          <CategoryName>{this.props.activeCategory}</CategoryName>
        )}
        <ProductsLayout>
          {this.state.productList?.category?.products?.length &&
            this.state.productList.category.products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                inStock={product.inStock}
                image={product.gallery[0]}
                name={product.name}
                price={
                  product?.prices.find(
                    (p) => p.currency === this.props.currency
                  )?.amount
                }
              />
            ))}
        </ProductsLayout>
      </>
    );
  }
}
export default connect(mapStateToProps, null)(Home);
