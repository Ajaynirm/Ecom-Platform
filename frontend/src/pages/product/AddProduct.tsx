import React, { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
const AddLaptop = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    serialNumber: "",
    purchaseDate: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/laptop/add-laptop", formData);
      if (res) {
        toast.success("Laptop added successfully");
      }
    } catch (e) {
      toast.error("Error while adding laptop");
    }
  };
  return (
    <>

      <div className="flex flex-col justify-center items-center">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            {/* id */}
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body" onSubmit={(e) => handleSubmit(e)}>
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
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                  />
                </div>
                {/* model */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">model</span>
                  </label>
                  <input
                    type="text"
                    placeholder="model"
                    className="input input-bordered"
                    required
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
                    onChange={(e) =>
                      setFormData({ ...formData, serialNumber: e.target.value })
                    }
                  />
                </div>

                {/* purchaseDate */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Purchase Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered"
                    required
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        purchaseDate: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Add Laptop
                  </button>
                </div>
              </form>
              <div className=" flex justify-center items-center">
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

export default AddLaptop;