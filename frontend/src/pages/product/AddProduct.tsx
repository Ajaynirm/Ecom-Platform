import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/products/create-product",
        formData
      );
      if (res) {
        toast.success("Product added successfully");
      }
    } catch (e) {
      toast.error("Error while adding product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Product Name"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              className="h-20 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Brief about product"
              required
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="$100"
              required
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
              onChange={(e) =>
                setFormData({ ...formData, stock_quantity: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => navigate("/admin-home")}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Admin Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
