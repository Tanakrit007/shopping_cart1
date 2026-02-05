import { ADD_PRODUCT, ADD_QUANTITY, REMOVE_QUANTITY } from "./actionTypes";

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const addProductQuantity = (productId) => ({
  type: ADD_QUANTITY,
  payload: { productId, quantity: 1 },
});

export const removeProductQuantity = (productId) => ({
  type: REMOVE_QUANTITY,
  payload: { productId },
});
