const shopAppState = {
  activeCategory: "all", // all / clothes / tech
  cartItems: [],
  cartItemsNumber: 0,
  currency: "USD",
  total: 0,
};
// (state, action) => newState
export default function Reducer(state = shopAppState, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (i) => i?.product?.id !== action.payload?.product?.id
        ),
      };
    }
    case "REMOVE_SINGLE_ITEM": {
      return {
        ...state,
        cartItems: state.cartItems
          .slice(
            0,
            state.cartItems.findIndex(
              (i) => i?.product?.id === action.payload?.product?.id
            )
          )
          .concat(
            state.cartItems.slice(
              state.cartItems.findIndex(
                (i) => i?.product?.id === action.payload?.product?.id
              ) + 1
            )
          ),
      };
    }
    case "CALCULATE_TOTAL": {
      return {
        ...state,
        total: state.total + action.payload,
      };
    }
    case "RECALCULATE_TOTAL": {
      return {
        ...state,
        total: action.payload.reduce((total, price) => total + price, 0),
      };
    }
    case "CHANGE_CURRENCY": {
      return {
        ...state,
        currency: action.payload,
      };
    }
    case "CHANGE_CATEGORY": {
      return {
        ...state,
        activeCategory: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
