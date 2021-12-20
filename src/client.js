import { ApolloClient, InMemoryCache } from "@apollo/client";
export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache({
    typePolicies: {
      Product: {
        fields: {
          quantity: {
            read(_, { variables }) {
              const obj = JSON.parse(localStorage.getItem(variables.id));
              return obj ? obj["quantity"] : 0;
            },
          },
          attribute: {
            read(_, { variables }) {
              const obj = JSON.parse(localStorage.getItem(variables.id));
              return obj ? obj["attribute"] : null;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});
