export const mapStateToProps = (store) => {
  return {
    currency: store.currency,
    cartItems: store.cartItems,
    total: store.total,
    activeCategory: store.activeCategory,
  };
};
