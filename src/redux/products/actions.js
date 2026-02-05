import { ADD_PRODUCT, ADD_QUANTITY, REMOVE_QUANTITY } from "./actionTypes";

export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

export const addquantity = (productId, quantity) => {
  return {
    type: ADD_QUANTITY,
    payload: { productId, quantity },
  };
};

export const removequantity = (productId) => {
  return {
    type: REMOVE_QUANTITY,
    payload: { productId },
  };
};
