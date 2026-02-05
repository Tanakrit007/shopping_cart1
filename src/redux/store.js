import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pages/pageReducer";
import productReducer from "./products/productReducer";
import cartReducer from "./carts/cartReducer";

// ฟังก์ชันโหลดข้อมูลที่บันทึกไว้
const loadState = () => {
  try {
    const serializedProducts = localStorage.getItem("products");
    const serializedCart = localStorage.getItem("cart");
    // ไม่ต้องโหลดสถานะหน้าเพจจาก localStorage เพื่อให้เปิดแอปมาเจอหน้า Home เสมอ

    return {
      products: serializedProducts ? JSON.parse(serializedProducts) : undefined,
      cart: serializedCart ? JSON.parse(serializedCart) : undefined,
    };
  } catch (e) {
    return undefined;
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    pages: pageReducer,
    products: productReducer,
    cart: cartReducer,
  },
  preloadedState: {
    products: persistedState.products,
    cart: persistedState.cart,
    // สถานะหน้าเพจจะใช้ค่าเริ่มต้นจาก pageReducer ({ home: true })
  },
  devTools: true,
});

// บันทึกสต็อกสินค้าและตะกร้าสินค้าเมื่อมีการเปลี่ยนแปลง
store.subscribe(() => {
  localStorage.setItem("products", JSON.stringify(store.getState().products));
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

export default store;
