import { gql } from "@apollo/client";
export const getProductList = gql`
  query {
    category {
      name
      products {
        ...productData
      }
    }
  }
  fragment productData on Product {
    id
    inStock
    name
    gallery
    prices {
      amount
      currency
    }
  }
`;

export const getProductById = gql`
  query ($id: String!) {
    product(id: $id) {
      __typename
      ...productDetails
    }
  }
  fragment productDetails on Product {
    id
    inStock
    name
    brand
    description
    gallery
    category
    quantity @client
    attribute @client
    prices {
      amount
      currency
    }
    attributes {
      name
      items {
        displayValue
      }
    }
  }
`;
export const getFilteredProductList = gql`
  query ($name: String!) {
    category(input: { title: $name }) {
      products {
        ...productBaseData
      }
    }
  }
  fragment productBaseData on Product {
    id
    name
    inStock
    gallery
    description
    prices {
      amount
      currency
    }
  }
`;
export const getCurrencies = gql`
  query {
    currencies
  }
`;

export const getCategories = gql`
  query {
    categories {
      name
    }
  }
`;

export const productSubscription = gql`
  query ($id: String!) {
    product(id: $id) {
      __typename
      quantity @client
      attribute @client
    }
  }
`;
