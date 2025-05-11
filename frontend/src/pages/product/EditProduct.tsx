import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/AuthStore.js';
import { toast } from "react-hot-toast";
import { axiosInstance } from '../../lib/axios.js';
const UpdateLaptop = () => {
  const navigate = useNavigate();
  const { laptopData } = useAuthStore();

  const [formData, setFormData] = useState({
    _id: laptopData._id || "",
    brand: laptopData.brand || "",
    model: laptopData.model || "",
    serialNumber: laptopData.serialNumber || "",
    purchaseDate: laptopData.purchaseDate || null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    toast.promise(
      res= axiosInstance.post("/laptop/update-laptop", formData),
      {
        loading: "Updating  laptop...",
        success: "Updated successfully!",
        error: "Failed to upload. Please try again.",
      }
    )
      navigate("/manage")
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body" onSubmit={(e) => handleSubmit(e)}>
                {/* laptop id */}
                <label className="label">
                  <span className="label-text">Laptop id</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData._id}
                  onChange={(e) =>
                    setFormData({ ...formData, _id: e.target.value })
                  }
                />

                {/* brand */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Brand</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Brand"
                    className="input input-bordered"
                    required
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                  />
                </div>
                {/* model */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Model</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Model"
                    className="input input-bordered"
                    required
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                  />
                </div>

                {/* serial Number */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Serial Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ex.123e123"
                    className="input input-bordered"
                    required
                    value={formData.serialNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, serialNumber: e.target.value })
                    }
                  />
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Update Laptop
                  </button>
                </div>
              </form>
              <div className="flex justify-center items-center">
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/manage")}
                >
                  Back to Laptop Management
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateLaptop;