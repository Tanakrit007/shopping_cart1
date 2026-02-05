import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/carts/actions";
import {
  addProductQuantity,
  removeProductQuantity,
} from "../redux/products/actions";

const MyCart = () => {
  const cartItems = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // ปรับการคำนวณราคาให้รองรับกรณีข้อมูลราคาผิดพลาด
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0,
  );
  const shipping = cartItems.length > 0 ? 12.99 : 0;
  const total = subtotal + shipping;

  const handleIncrement = (item) => {
    const productInStock = products.find((p) => p.id === item.productId);
    if (productInStock && productInStock.quantity > 0) {
      dispatch(increaseQuantity(item.id));
      dispatch(removeProductQuantity(item.productId));
    } else {
      alert("สินค้าในสต็อกหมดแล้ว!");
    }
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.id));
      dispatch(addProductQuantity(item.productId));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id));
    for (let i = 0; i < item.quantity; i++) {
      dispatch(addProductQuantity(item.productId));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6 text-white">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="p-10 bg-white rounded-xl shadow text-center text-slate-500">
            ตะกร้าว่างเปล่า
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => {
              const productInStock = products.find(
                (p) => p.id === item.productId,
              );
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-24 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        {item.title}
                      </h3>
                      <p className="text-indigo-600 font-semibold text-md">
                        Price: ${Number(item.price || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center bg-slate-100 rounded-lg p-1">
                      <button
                        onClick={() => handleDecrement(item)}
                        className="btn btn-ghost btn-xs text-slate-900"
                      >
                        -
                      </button>
                      <span className="px-3 font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(item)}
                        disabled={
                          !productInStock || productInStock.quantity <= 0
                        }
                        className={`btn btn-ghost btn-xs text-slate-900 ${!productInStock || productInStock.quantity <= 0 ? "opacity-30" : ""}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item)}
                      className="btn btn-circle btn-ghost btn-sm text-error"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <aside className="lg:col-span-1 mt-14 bg-white rounded-xl p-6 text-slate-900 shadow-sm">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">Order Summary</h3>
        <div className="flex justify-between mb-2 text-slate-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2 text-slate-600">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 flex justify-between font-bold text-xl text-indigo-700">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="btn btn-primary w-full mt-6 bg-indigo-600 border-none text-white shadow-lg">
          Checkout Now
        </button>
      </aside>
    </div>
  );
};
export default MyCart;
