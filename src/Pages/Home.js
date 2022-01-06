import React, { PureComponent } from "react";
import { ProductsLayout, CategoryName } from "./styles";
import Navigation from "../Components/Navigation";
import { getProductList, getFilteredProductList } from "../graphql/queries";
import ProductCard from "../Components/ProductCard";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/mapStateToProps";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { productList: [] };
    this.updateProductList = this.updateProductList.bind(this);
  }
  updateProductList() {
    if (this.props.activeCategory === "all") {
      getProductList().then(({ data }) =>
        this.setState({
          productList: data,
        })
      );
    } else {
      getFilteredProductList(this.props.activeCategory).then(({ data }) =>
        this.setState({
          productList: data,
        })
      );
    }
  }

  componentDidMount() {
    this.updateProductList();
  }

  render() {
    const { productList } = this.state;
    const { activeCategory, currency } = this.props;
    return (
      <>
        <Navigation />
        {activeCategory !== "all" && (
          <CategoryName>{activeCategory}</CategoryName>
        )}
        <ProductsLayout>
          {productList?.category?.products?.length &&
            productList.category.products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                inStock={product.inStock}
                images={product.gallery}
                name={product.name}
                price={
                  product?.prices.find((p) => p.currency === currency)?.amount
                }
              />
            ))}
        </ProductsLayout>
      </>
    );
  }
}

function checkCategory(prevProps, nextProps) {
  return prevProps.activeCategory !== nextProps.activeCategory;
}

export default connect(mapStateToProps, null)(React.memo(Home, checkCategory));
