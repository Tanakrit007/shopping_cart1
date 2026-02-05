import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  // Count total items in cart by summing quantities (default 0)
  const cartCount = useSelector((state) =>
    state.products.reduce((sum, p) => sum + (p.quantity ?? 0), 0)
  );

  const handlePageChange = (pageType) => {
    dispatch({ type: pageType });
  };

  return (
    <div className="navbar bg-indigo-700 text-white shadow-md sticky top-0 z-50 h-10">
      <div className="flex-1 px-6">
        <Link to="/" className="text-sm font-semibold text-white">
          ShoppingCart
        </Link>
      </div>
      <div className="flex-none px-6">
        <div className="flex items-center space-x-4">
          <button onClick={() => handlePageChange("HOME")} className="text-sm text-white hover:underline">Home</button>
          <button onClick={() => handlePageChange("CART")} className="relative btn btn-ghost btn-circle h-8 w-8 bg-transparent border-0 text-white">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-xs indicator-item bg-pink-500">{cartCount}</span>
            </div>
          </button>
          <Link to="/profile" className="avatar">
            <div className="w-8 rounded-full ring-2 ring-white">
              <img alt="User" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
