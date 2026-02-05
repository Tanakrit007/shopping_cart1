import React from "react";
import { useSelector } from "react-redux";
import ProductList from "../components/ProductList";
import { AddProduct } from "../components/AddProduct";

const Home = () => {
  const products = useSelector((state) => state.products);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2">
        <ProductList />
      </div>
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <AddProduct />
        </div>
      </div>
    </div>
  );
};

export default Home;
