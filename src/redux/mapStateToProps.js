export const mapStateToProps = (store) => {
  return {
    currency: store.currency,
    cartItems: store.cartItems,
    cartItemsQty: store.cartItemsQty,
    total: store.total,
    activeCategory: store.activeCategory,
  };
};
