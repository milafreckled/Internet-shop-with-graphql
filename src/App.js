import React, { Component } from "react";
import "./App.css";
import ErrorBoundary from "./Components/ErrorBoundary";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import ProductDescription from "./Pages/ProductDescription";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./redux/store";
class App extends Component {
  render() {
    const { store, persistor } = configureStore();
    return (
      <ErrorBoundary>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <div className="App">
                <Router>
                  <Routes>
                    <Route exact path={"/"} element={<Home />} />
                    <Route exact path={"/clothes"} element={<Home />} />
                    <Route exact path={"/tech"} element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route
                      path="/product/:id"
                      element={<ProductDescription />}
                    />
                  </Routes>
                </Router>
              </div>
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </ErrorBoundary>
    );
  }
}

export default App;
