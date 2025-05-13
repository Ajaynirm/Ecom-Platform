import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import { axiosInstance } from "../../lib/axios";

type ApiCartItem = {
  id: number;
  product_id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
};

function ShowCart() {
  const navigate = useNavigate();
  const { cart, setCart, authUser, setTotalCartPrice } = useAuthStore();
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cartItems = cart;
  useEffect(() => {
    const fetchCart = async () => {
      if (!authUser?.id) return;

      try {
        const response = await axiosInstance.get(`/cart/get-cart`, {
          params: {
            customer_id: authUser.id,
          },
        });
        console.log(response.data);
        const mapped = (response.data as ApiCartItem[]).map((item) => ({
          ...item,
          stock_quantity: item.quantity,
        }));

        setCart(mapped);
      } catch (err) {
        console.error("Failed to fetch cart", err);
      }
    };

    fetchCart();
  }, [authUser?.id, setCart]);

  useEffect(() => {
    const tp = cartItems.reduce(
      (sum, item) => sum + item.price * item.stock_quantity,
      0
    );
    setTotalPrice(tp);
    setTotalCartPrice(tp);
  }, [totalPrice]);

  const handlePlaceOrder = () => {
    console.log("Order placed with items:", cartItems);
    setCart([]);
    setOrderPlaced(true);
  };

  const increaseQty = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, stock_quantity: item.stock_quantity + 1 }
        : item
    );
    setCart(updatedCart);
  };

  const decreaseQty = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.stock_quantity > 1
        ? { ...item, stock_quantity: item.stock_quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const removeItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
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
                <li
                  key={item.id}
                  className="py-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <div className="flex items-center mt-1">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => decreaseQty(item.id)}
                        disabled={item.stock_quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4">{item.stock_quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(item.price * item.stock_quantity).toFixed(2)}
                    </p>
                    <button
                      className="text-red-500 text-sm mt-1 hover:underline"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center border-t pt-4 mb-4">
              <span className="font-semibold text-lg">Total:</span>
              <span className="text-green-600 font-bold text-lg">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {!orderPlaced ? (
              <div className="flex flex-col items-center">
                <button
                  onClick={() => navigate("/place-order")}
                  className="w-full py-2 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700"
                >
                  Confirm & Place Order
                </button>
              </div>
            ) : (
              <p className="text-green-600 text-center font-semibold mt-4">
                Your order has been placed successfully!
              </p>
            )}
          </>
        )}
        <div>
          <button
            onClick={() => navigate("/home")}
            className="w-50 py-2 m-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-400"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowCart;
