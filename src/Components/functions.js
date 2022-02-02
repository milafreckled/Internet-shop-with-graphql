export function handleAddToCart(component, _productData) {
  const { id } = _productData?.product;
  const attribute = component.state.activeAttribute || "";
  const price = _productData?.product?.prices.find(
    (p) => p?.currency === component.props.currency
  );
  component.props.calculateTotal(price?.amount);
  const cartItemsCopy = [...component.props.cartItems];
  const current = cartItemsCopy.find(
    (item) => item.id === id && item.attribute === attribute
  );
  if (current) {
    const idx = cartItemsCopy.indexOf(current);
    const copyOfCurrent = {
      ...current,
      quantity: current.quantity + 1,
    };
    cartItemsCopy[idx] = copyOfCurrent;
    component.props.updateCart(cartItemsCopy);
  } else {
    const copyOfCurrent = {
      ..._productData.product,
      quantity: _productData.product.quantity + 1,
      attribute: attribute,
    };
    component.props.addToCart(copyOfCurrent);
  }
  component.props.calculateQty();
}

export function handleAttributeClick(component, index, attribute, inCart) {
  if (inCart) {
    const cartItemsCopy = [...component.props.cartItems];
    const productWithAttribute = cartItemsCopy.find(
      (item) =>
        item.attribute === attribute && item.id === cartItemsCopy[index].id
    );
    if (productWithAttribute) {
      const foundIndex = cartItemsCopy.indexOf(productWithAttribute);
      const quantity = cartItemsCopy[index].quantity;
      const productDataNew = {
        ...productWithAttribute,
        quantity: productWithAttribute.quantity + quantity,
      };
      const productDataOld = {
        ...cartItemsCopy[index],
        quantity: 0,
      };
      cartItemsCopy[foundIndex] = productDataNew;
      cartItemsCopy[index] = productDataOld;
      component.props.updateCart(cartItemsCopy);
    } else if (cartItemsCopy[index].attribute !== attribute) {
      const productData = {
        ...cartItemsCopy[index],
        attribute: attribute,
      };
      cartItemsCopy[index] = productData;
      component.props.updateCart(cartItemsCopy);
    } else {
      const productData = {
        ...productWithAttribute,
        attribute: null,
      };
      cartItemsCopy[index] = productData;
      component.props.updateCart(cartItemsCopy);
    }
  } else {
    component.setState({ activeAttribute: attribute });
  }
}

export function handleQuantity(component, _sign, idx) {
  const cartItemsCopy = [...component.props.cartItems];
  const current = cartItemsCopy[idx];
  console.log("Current: " + current);
  const priceField = current.prices.find(
    (p) => p?.currency === component.props.currency
  );
  let productPrice = priceField?.amount;
  switch (_sign) {
    case "+": {
      const updatedProduct = { ...current, quantity: current.quantity + 1 };
      console.log("Updated product: " + updatedProduct);
      component.setState({ quantity: component.state.quantity + 1 });
      cartItemsCopy[idx] = updatedProduct;
      component.props.updateCart(cartItemsCopy);
      break;
    }
    case "-": {
      const updatedProduct = { ...current, quantity: current.quantity - 1 };
      component.setState({ quantity: component.state.quantity - 1 });
      if (component.state.quantity === 0) {
        component.props.removeFromCart(idx);
      } else {
        cartItemsCopy[idx] = updatedProduct;
        component.props.updateCart(cartItemsCopy);
      }
      productPrice *= -1;
      break;
    }
    default:
      return;
  }
  component.props.calculateTotal(productPrice);
  component.props.calculateQty();
}
