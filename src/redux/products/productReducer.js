import { ADD_PRODUCT, ADD_QUANTITY, REMOVE_QUANTITY } from "./actionTypes";
import { initalState } from "./initalState";

// ฟังก์ชันหา ID ถัดไปสำหรับสินค้าใหม่
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
          // บังคับแปลงเป็นตัวเลขเพื่อป้องกันปัญหาการคำนวณราคาและสต็อกผิดพลาด
          price: parseFloat(action.payload.price) || 0,
          quantity: parseInt(action.payload.quantity, 10) || 0,
        },
      ];

    case ADD_QUANTITY:
      return state.map((product) => {
        // ตรวจสอบว่า payload ส่งมาเป็น Object หรือแค่ ID
        const targetId = action.payload.productId || action.payload;
        const addAmount = action.payload.quantity || 1;

        if (product.id === targetId) {
          const current = product.quantity ?? 0;
          return {
            ...product,
            quantity: current + addAmount,
          };
        }
        return product;
      });

    case REMOVE_QUANTITY:
      return state.map((product) => {
        // ตรวจสอบ ID สินค้าที่ต้องการลดสต็อก
        const targetId = action.payload.productId || action.payload;

        if (product.id === targetId) {
          const current = product.quantity ?? 0;
          // ป้องกันสต็อกติดลบ
          return { ...product, quantity: Math.max(0, current - 1) };
        }
        return product;
      });

    default:
      return state;
  }
};

export default productReducer;
