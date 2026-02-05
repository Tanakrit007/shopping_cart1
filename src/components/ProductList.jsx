import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addquantity } from "../redux/products/actions";

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const addToCart = (id) => dispatch(addquantity(id, 1));
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="relative overflow-hidden rounded-lg bg-white text-slate-900 shadow-lg">
          <div className="absolute top-2 right-2">
            <span className="badge badge-sm bg-pink-500 text-white">New</span>
          </div>
          <figure>
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
          </figure>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm bg-indigo-50 text-indigo-700 px-2 py-1 rounded">{product.category}</span>
              <span className="text-lg font-semibold text-slate-900">${product.price}</span>
            </div>
            <h3 className="text-xl font-bold mt-2 text-slate-900">{product.title}</h3>
            <p className="text-sm text-slate-700 mt-1">Available: {product.quantity ?? product.available ?? 0}</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => addToCart(product.id)} className="btn btn-sm bg-indigo-600 border-indigo-600 hover:bg-indigo-700 text-white">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
