import React, { useState } from 'react';

export default function PlaceOrder() {
  const [confirmationText, setConfirmationText] = useState('');
  const [isPlaced, setIsPlaced] = useState(false);

  const handlePlaceOrder = () => {
    // Simulate order placement logic
    console.log('Order placed');
    setIsPlaced(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Place Order</h2>

        {!isPlaced ? (
          <>
            <p className="mb-4 text-gray-700">
              To confirm placing the order, please type <strong>"place"</strong> below:
            </p>

            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="Type 'place' here"
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              onClick={handlePlaceOrder}
              disabled={confirmationText.toLowerCase() !== 'place'}
              className={`w-full py-2 rounded-lg text-white font-semibold ${
                confirmationText.toLowerCase() === 'place'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Place Order
            </button>
          </>
        ) : (
          <p className="text-green-600 font-semibold text-center">Order has been successfully placed.</p>
        )}
      </div>
    </div>
  );
}
