import { ADD_PRODUCT, ADD_QUANTITY, REMOVE_QUANTITY } from "./actionTypes";
import { initalState } from "./initalState";

const nextId = (items) => {
  return items.reduce((id, item) => Math.max(id, item.id), -1) + 1;
};

const productReducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [
        ...state,
        {
          id: nextId(state),
          ...action.payload,
          price: parseFloat(action.payload.price),
          quantity: parseInt(action.payload.quantity),
        },
      ];

    case ADD_QUANTITY:
      return state.map((product) => {
        if (product.id === action.payload.productId) {
          const current = product.quantity ?? 0;
          return {
            ...product,
            quantity: current + action.payload.quantity,
          };
        } else {
          return product;
        }
      });

    case REMOVE_QUANTITY:
      return state.map((product) => {
        if (product.id === action.payload.productId) {
          const current = product.quantity ?? 0;
          return { ...product, quantity: Math.max(0, current - 1) };
        } else {
          return product;
        }
      });

    default:
      return state;
  }
};

export default productReducer;
