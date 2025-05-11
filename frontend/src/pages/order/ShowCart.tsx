import React, { useState } from 'react';

export default function CartPage() {
  // Example cart items — in a real app, you'd get these from context, props, or backend
  const [cartItems] = useState([
    { id: 1, name: 'Product A', price: 49.99, quantity: 2 },
    { id: 2, name: 'Product B', price: 29.99, quantity: 1 },
    { id: 3, name: 'Product C', price: 19.99, quantity: 3 },
  ]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [confirmationText, setConfirmationText] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    console.log('Order placed with items:', cartItems);
    setOrderPlaced(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 mb-4">
              {cartItems.map((item) => (
                <li key={item.id} className="py-2 flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center border-t pt-4 mb-4">
              <span className="font-semibold text-lg">Total:</span>
              <span className="text-green-600 font-bold text-lg">${totalPrice.toFixed(2)}</span>
            </div>

            {!orderPlaced ? (
              <>
                

                <button
                  onClick={handlePlaceOrder}
                  disabled={confirmationText.toLowerCase() !== 'place'}
                  className={`w-full py-2 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700`}
                >
                  Confirm & Place Order
                </button>
              </>
            ) : (
              <p className="text-green-600 text-center font-semibold mt-4">
                Your order has been placed successfully!
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
