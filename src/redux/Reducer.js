export const shopAppState = {
  activeCategory: "all", // all / clothes / tech
  cartItems: [],
  cartItemsQty: 0,
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
        cartItems: state.cartItems
          .slice(0, action.payload.index + 1)
          .concat(state.cartItems.slice(action.payload.idx + 1)),
      };
    }
    case "UPDATE_CART": {
      return {
        ...state,
        cartItems: [...action.payload],
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
    case "CALCULATE_QUANTITY": {
      return {
        ...state,
        cartItemsQty: state.cartItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        ),
      };
    }
    case "CALCULATE_TOTAL": {
      return {
        ...state,
        total: Math.abs(state.total + action.payload),
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
// implement  update Quantity and Attribute:
// state.cartItems[action.payload.index].attribute = action.payload.attribute
