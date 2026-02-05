import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/products/actions";

export const AddProduct = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "Electronics",
      imageUrl: "",
      price: "",
      quantity: 1,
    },
  });
  const onSubmit = (data) => {
    dispatch(addProduct(data));
    reset();
  };

  const imageUrl = watch("imageUrl");
  const isValidImage = imageUrl && /^https?:\/\//i.test(imageUrl);

  return (
    <div className="bg-white text-slate-800 rounded-lg shadow-lg p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter product name"
            {...register("title", { required: true })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            className="select select-bordered w-full"
            {...register("category", { required: true })}
          >
            <option>Electronics</option>
            <option>Furniture</option>
            <option>Kitchen</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter image URL"
            {...register("imageUrl", { required: true })}
          />
          {imageUrl && (
            <div className="mt-2">
              {isValidImage ? (
                <img src={imageUrl} alt="preview" className="w-48 h-28 object-cover rounded" />
              ) : (
                <p className="text-sm text-red-500">Invalid image URL (must start with http/https)</p>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Enter price"
              {...register("price", { required: true, valueAsNumber: true })}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Enter quantity"
              {...register("quantity", { required: true, valueAsNumber: true })}
            />
          </div>
        </div>
        <button className="btn w-full mt-4 bg-indigo-600 border-indigo-600 hover:bg-indigo-700 text-white">Add Product</button>
      </form>
    </div>
  );
};
