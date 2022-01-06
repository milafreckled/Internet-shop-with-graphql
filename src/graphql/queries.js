import { client } from "../client.js";
import { loader } from "graphql.macro";
const getProductByIdQuery = loader("./getProductById.graphql");
const getCategoriesQuery = loader("./getCategories.graphql");
const getCurrenciesQuery = loader("./getCurrencies.graphql");
const getProductListQuery = loader("./getProductList.graphql");
const getFilteredProductListQuery = loader("./getFilteredProductList.graphql");

export const getProductById = (productId) =>
  client
    .query({
      query: getProductByIdQuery,
      variables: { id: productId },
    })
    .catch((e) => {
      console.log(JSON.stringify(e, null, 2));
    });

export const getCategories = () =>
  client
    .query({
      query: getCategoriesQuery,
    })
    .catch((e) => {
      console.log(JSON.stringify(e, null, 2));
    });

export const getCurrencies = () =>
  client
    .query({
      query: getCurrenciesQuery,
    })
    .catch((e) => {
      console.log(JSON.stringify(e, null, 2));
    });

export const getProductList = () =>
  client
    .query({
      query: getProductListQuery,
    })
    .catch((e) => {
      console.log(JSON.stringify(e, null, 2));
    });

export const getFilteredProductList = (categoryName) =>
  client
    .query({
      query: getFilteredProductListQuery,
      variables: { name: categoryName },
    })
    .catch((e) => {
      console.log(JSON.stringify(e, null, 2));
    });
