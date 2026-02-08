import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from "./actionTypes";
import { initalState } from "./initalState";

const nextId = (items) => items.reduce((id, item) => Math.max(id, item.id), -1) + 1;

const cartReducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingProduct = state.find((p) => p.productId === action.payload.id);
      if (existingProduct) {
        return state.map((p) =>
          p.productId === action.payload.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [
        ...state,
        {
          ...action.payload,
          id: nextId(state),
          productId: action.payload.id,
          quantity: 1,
        },
      ];
    }
    case REMOVE_FROM_CART:
      return state.filter((p) => p.id !== action.payload);

    case INCREASE_QUANTITY:
      return state.map((p) =>
        p.id === action.payload ? { ...p, quantity: p.quantity + 1 } : p
      );

    case DECREASE_QUANTITY:
      // ลดจำนวนลง และกรองเอาเฉพาะสินค้าที่มีจำนวนมากกว่า 0 ไว้เท่านั้น
      return state
        .map((p) =>
          p.id === action.payload ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0); //

    default:
      return state;
  }
};
export default cartReducer;