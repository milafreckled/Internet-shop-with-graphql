// actions will be used later for mapToDispatchProps
export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});
export const updateCart = (cartItems) => ({
  type: "UPDATE_CART",
  payload: cartItems,
});
export const removeFromCart = (index) => ({
  type: "REMOVE_FROM_CART",
  payload: index,
});
export const removeSingleItem = (product) => ({
  type: "REMOVE_SINGLE_ITEM",
  payload: product,
});
export const changeCurrency = (currency) => ({
  type: "CHANGE_CURRENCY",
  payload: currency,
});
export const calculateTotal = (price) => ({
  type: "CALCULATE_TOTAL",
  payload: price,
});
export const recalculateTotal = (newPrices) => ({
  type: "RECALCULATE_TOTAL",
  payload: newPrices,
});
export const calculateQty = () => ({
  type: "CALCULATE_QUANTITY",
});
export const changeCategory = (category) => ({
  type: "CHANGE_CATEGORY",
  payload: category,
});
