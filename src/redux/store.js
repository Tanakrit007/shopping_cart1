import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pages/pageReducer";
import productReducer from "./products/productReducer";

// Load persisted products from localStorage (if any)
const loadPersistedProducts = () => {
  try {
    const raw = localStorage.getItem("products");
    if (!raw) return undefined;
    return { products: JSON.parse(raw) };
  } catch (e) {
    return undefined;
  }
};

const preloadedState = loadPersistedProducts();

const store = configureStore({
  reducer: {
    pages: pageReducer,
    products: productReducer,
  },
  preloadedState,
  devTools: true,
});

// Subscribe to store changes and persist products to localStorage
let currentProducts = store.getState().products;
store.subscribe(() => {
  const newProducts = store.getState().products;
  if (newProducts !== currentProducts) {
    currentProducts = newProducts;
    try {
      localStorage.setItem("products", JSON.stringify(newProducts));
    } catch (e) {
      // ignore storage errors
    }
  }
});

export default store;
