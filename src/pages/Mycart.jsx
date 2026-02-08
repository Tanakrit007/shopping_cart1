import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../redux/carts/actions";
import { addProductQuantity, removeProductQuantity } from "../redux/products/actions";

const MyCart = () => {
  const cartItems = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products); //
  const dispatch = useDispatch();

  // คำนวณราคารวมทั้งหมดในตะกร้า
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0
  ); //
  const shipping = cartItems.length > 0 ? 12.99 : 0; //
  const total = subtotal + shipping; //

  const handleIncrement = (item) => {
    // ตรวจสอบสต็อกหน้าหลักก่อนเพิ่มจำนวน
    const productInStock = products.find((p) => p.id === item.productId);
    if (productInStock && productInStock.quantity > 0) {
      dispatch(increaseQuantity(item.id));
      dispatch(removeProductQuantity(item.productId));
    } else {
      alert("สินค้าในสต็อกหมดแล้ว ไม่สามารถเพิ่มได้มากกว่านี้");
    }
  };

  const handleDecrement = (item) => {
      dispatch(decreaseQuantity(item.id));
      dispatch(addProductQuantity(item.productId));  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id));
    // คืนสต็อกทั้งหมดตามจำนวนที่อยู่ในตะกร้า
    for (let i = 0; i < item.quantity; i++) {
      dispatch(addProductQuantity(item.productId));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6 text-white text-left">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="p-10 bg-white rounded-xl shadow text-center text-slate-500 font-bold">
            ตะกร้าสินค้าของคุณว่างเปล่า
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => {
              const productInStock = products.find((p) => p.id === item.productId);
              return (
                <div key={item.id} className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-5">
                    <div className="w-24 h-20 flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                      <p className="text-sm text-slate-400">{item.category}</p>
                      <p className="text-indigo-600 font-bold text-md mt-1">
                        ${Number(item.price || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* ส่วนจัดการจำนวนสินค้า และราคารวมรายชิ้น */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center bg-slate-100 rounded-lg p-1">
                        <button
                          onClick={() => handleDecrement(item)}
                          className="btn btn-ghost btn-xs text-slate-900 hover:bg-slate-200"
                        >-</button>
                        <span className="px-3 font-bold text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrement(item)}
                          disabled={!productInStock || productInStock.quantity <= 0}
                          className={`btn btn-ghost btn-xs text-slate-900 hover:bg-slate-200 ${!productInStock || productInStock.quantity <= 0 ? "opacity-30 cursor-not-allowed" : ""}`}
                        >+</button>
                      </div>
                      
                      {/* ยอดเงินรวมเฉพาะสินค้าตัวนี้ (Line Total) */}
                      <p className="text-sm font-bold text-slate-500 pr-2">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemove(item)}
                      className="btn btn-circle btn-ghost btn-sm text-error hover:bg-red-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* สรุปราคารวมทั้งหมด (Order Summary) */}
      <aside className="lg:col-span-1 mt-14">
        <div className="bg-white rounded-xl p-6 shadow-sm text-slate-900 border border-slate-100 text-left">
          <h3 className="text-xl font-bold mb-4 border-b pb-2">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Shipping</span>
              <span>${shipping.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-xl text-indigo-700">
              <span>Total</span>
              <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
          <button className="btn btn-primary w-full mt-6 bg-indigo-600 border-none hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transition-all active:scale-95">
            Checkout Now
          </button>
        </div>
      </aside>
    </div>
  );
};

export default MyCart;