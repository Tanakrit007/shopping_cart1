import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  // คำนวณจำนวนสินค้าทั้งหมดในตะกร้า
  const cartCount = useSelector((state) =>
    state.cart.reduce((sum, p) => sum + (p.quantity ?? 0), 0),
  );

  const handlePageChange = (pageType) => {
    dispatch({ type: pageType });
  };

  return (
    <div className="navbar bg-indigo-700 text-white shadow-md sticky top-0 z-50 px-4 lg:px-10">
      <div className="flex-1">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-white hover:text-indigo-200 transition-colors"
        >
          ShoppingCart
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0 items-center gap-2 lg:gap-6">
          {/* ปุ่ม Home */}
          <li>
            <button
              onClick={() => handlePageChange("HOME")}
              className="text-sm font-medium hover:bg-indigo-600 rounded-lg px-4 py-2 transition-all"
            >
              Home
            </button>
          </li>

          {/* ปุ่ม Cart พร้อมตัวเลข Badge */}
          <li>
            <button
              onClick={() => handlePageChange("CART")}
              className="relative btn btn-ghost btn-circle hover:bg-indigo-600 transition-all"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="badge badge-sm indicator-item bg-pink-500 border-none text-white font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>
          </li>

          {/* รูปโปรไฟล์ */}
          <li>
            <Link to="/profile" className="avatar p-0 ml-2">
              <div className="w-9 rounded-full ring ring-indigo-400 ring-offset-base-100 ring-offset-2">
                <img
                  alt="User"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
