import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addquantity, removequantity } from "../redux/products/actions";

const MyCart = () => {
  const products = useSelector((state) => state.products);
  const cartItems = products.filter((p) => (p.quantity ?? 0) > 0);
  const dispatch = useDispatch();

  const increment = (id) => dispatch(addquantity(id, 1));
  const decrement = (id) => dispatch(removequantity(id));

  const subtotal = cartItems.reduce((sum, p) => sum + (p.price || 0) * (p.quantity || 0), 0);
  const shipping = cartItems.length > 0 ? 12.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="p-8 bg-white rounded text-slate-900">Your cart is empty</div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white rounded p-4 shadow">
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-28 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-700">Price: ${item.price}</p>
                    <p className="text-sm text-slate-700">Category: {item.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded">
                    <button onClick={() => decrement(item.id)} className="px-3">-</button>
                    <div className="px-3 text-slate-900">{item.quantity}</div>
                    <button onClick={() => increment(item.id)} className="px-3">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <aside className="lg:col-span-1">
        <div className="bg-white rounded p-4 shadow">
          <h3 className="font-bold mb-2 text-slate-900">Summary</h3>
          <div className="flex justify-between text-sm text-slate-900"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm text-slate-900"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
          <hr className="my-3" />
          <div className="flex justify-between font-bold text-lg text-slate-900"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button className="btn btn-primary w-full mt-4 bg-indigo-600 border-indigo-600 hover:bg-indigo-700 text-white">Check out</button>
        </div>
      </aside>
    </div>
  );
};

export default MyCart;
