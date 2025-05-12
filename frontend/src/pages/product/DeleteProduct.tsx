import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore.js";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../lib/axios.js";

const DeleteProduct = () => {
  const navigate = useNavigate();
  const { currProduct } = useAuthStore();

  const handleDelete = async () => {
    try {
      await toast.promise(
        axiosInstance.delete(`/products/delete/${currProduct?.id}`),
        {
          loading: "Deleting product...",
          success: "Product deleted successfully!",
          error: "Failed to delete product.",
        }
      );
      navigate("/admin-home");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-red-600">
          Delete Product
        </h2>
        <form className="space-y-4">
          {/* ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product ID
            </label>
            <input
              type="text"
              value={currProduct?.id || ""}
              disabled
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={currProduct?.name || ""}
              disabled
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              value={currProduct?.description || ""}
              disabled
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              value={currProduct?.price || ""}
              disabled
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock Quantity
            </label>
            <input
              type="number"
              value={currProduct?.stock_quantity || ""}
              disabled
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Delete Button */}
          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Confirm Delete
          </button>
        </form>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => navigate("/admin-home")}
            className="text-sm text-blue-600 hover:underline"
          >
            Cancel / Back to Admin Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
