import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/AuthStore.js';
import { toast } from "react-hot-toast";
import { axiosInstance } from '../../lib/axios.js';

const EditProduct = () => {
  const navigate = useNavigate();
  const { currProduct } = useAuthStore();

  const [formData, setFormData] = useState({
    id: currProduct?.id || "",
    name: currProduct?.name || "",
    description: currProduct?.description || "",
    price: currProduct?.price || "",
    stock_quantity: currProduct?.stock_quantity || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await toast.promise(
        axiosInstance.put(`/products/update/${formData.id}`, formData),
        {
          loading: "Updating product...",
          success: "Product updated successfully!",
          error: "Failed to update product.",
        }
      );
      navigate("/admin-home");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ID (readonly) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product ID</label>
            <input
              type="text"
              value={formData.id}
              readOnly
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
            <input
              type="number"
              value={formData.stock_quantity}
              onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Product
          </button>
        </form>

        <button
          onClick={() => navigate("/admin-home")}
          className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition"
        >
          Back to Admin Home
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
