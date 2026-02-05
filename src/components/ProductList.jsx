import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProductQuantity } from "../redux/products/actions";
import { addToCart } from "../redux/carts/actions";

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleBuyNow = (product) => {
    if (product.quantity > 0) {
      dispatch(addToCart(product));
      dispatch(removeProductQuantity(product.id));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="card bg-white text-slate-900 shadow-xl overflow-hidden"
        >
          <figure>
            <img
              src={product.imageUrl}
              alt={product.title}
              className="h-48 w-full object-cover"
            />
          </figure>
          <div className="card-body p-5">
            <h2 className="card-title text-xl font-bold">{product.title}</h2>

            {/* --- ส่วนที่เพิ่มเข้ามาเพื่อแสดงราคา --- */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-2xl font-bold text-slate-900">
                ${Number(product.price || 0).toLocaleString()}
              </span>
              <span className="text-sm text-slate-500">
                Stock: {product.quantity ?? 0}
              </span>
            </div>
            {/* ---------------------------------- */}

            <div className="card-actions justify-end mt-6">
              <button
                onClick={() => handleBuyNow(product)}
                disabled={(product.quantity ?? 0) <= 0}
                className={`btn btn-sm px-6 ${
                  (product.quantity ?? 0) > 0
                    ? "btn-primary bg-indigo-600 border-none text-white hover:bg-indigo-700"
                    : "btn-disabled bg-gray-200 text-gray-400"
                }`}
              >
                {(product.quantity ?? 0) > 0 ? "Buy Now" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
