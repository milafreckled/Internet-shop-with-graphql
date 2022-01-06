export function handleAddToCart(component, _productData) {
  const price = _productData?.product?.prices.find(
    (p) => p?.currency === component.props.currency
  );
  component.props.calculateTotal(price?.amount);
  component.props.addToCart(_productData);
  const productData = localStorage.getItem(_productData?.product?.id);
  if (productData) {
    const parsedData = JSON.parse(productData);
    const qty = parsedData["quantity"];
    component.setState({ quantity: qty + 1 });
    parsedData["quantity"] = qty + 1;
    localStorage.setItem(_productData?.product?.id, JSON.stringify(parsedData));
  } else {
    localStorage.setItem(
      _productData?.product?.id,
      '{"quantity": 1, "attribute": null}'
    );
  }
}

export function handleAttributeClick(component, id, attribute) {
  const localState = JSON.parse(localStorage.getItem(id));
  localState["attribute"] = attribute;
  localStorage.setItem(id, JSON.stringify(localState));
  component.setState({ activeAttribute: attribute });
}

export function handleQuantity(component, _sign, _id) {
  const localState = JSON.parse(localStorage.getItem(_id));
  let currentQuantity = localState["quantity"];
  switch (_sign) {
    case "+": {
      if (currentQuantity) {
        currentQuantity += 1;
        localState["quantity"] = currentQuantity;
        localStorage.setItem(_id, JSON.stringify(localState));
        component.props.addToCart(component.props.data);
        component.props.calculateTotal(
          parseFloat(
            component.props.data?.product?.prices.find(
              (p) => p.currency === component.props.currency
            ).amount
          )
        );
      }
      break;
    }
    case "-": {
      if (currentQuantity && currentQuantity > 0) {
        currentQuantity -= 1;
        if (currentQuantity === 0) {
          component.props.removeFromCart(component.props.data);
          localState["attribute"] = null;
        } else {
          component.props.removeSingleItem(component.props.data);
        }
        localState["quantity"] = currentQuantity;
        localStorage.setItem(_id, JSON.stringify(localState));
        component.props.calculateTotal(
          parseFloat(
            -1 *
              component.props.data?.product?.prices.find(
                (p) => p.currency === component.props.currency
              ).amount
          )
        );
      }
      break;
    }
    default:
      return;
  }
  component.setState({ quantity: currentQuantity });
}
