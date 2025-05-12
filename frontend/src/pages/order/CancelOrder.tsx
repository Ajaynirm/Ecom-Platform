import React, { useState } from "react";

export default function CancelOrder() {
  const [confirmationText, setConfirmationText] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    console.log("Order deleted");
    setIsDeleted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Cancel Order
        </h2>

        {!isDeleted ? (
          <>
            <p className="mb-4 text-gray-700">
              To confirm order cancellation, please type{" "}
              <strong>"delete"</strong> below:
            </p>

            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="Type 'delete' here"
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <button
              onClick={handleDelete}
              disabled={confirmationText.toLowerCase() !== "delete"}
              className={`w-full py-2 rounded-lg text-white font-semibold ${
                confirmationText.toLowerCase() === "delete"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Cancel Order
            </button>
          </>
        ) : (
          <p className="text-green-600 font-semibold text-center">
            Order has been successfully cancelled.
          </p>
        )}
      </div>
    </div>
  );
}
