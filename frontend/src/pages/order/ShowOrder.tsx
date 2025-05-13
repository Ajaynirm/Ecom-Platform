import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";

interface Order {
  order_id: number;
  total_price: number;
  created_at: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

const ShowOrders = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/order/get-order", {
          params: { customer_id: authUser.id },
        });
        setOrders(response.data);
      } catch (err) {
        console.log("error : ", err);
      }
    };

    fetchOrders();
  }, [authUser.id]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Your Orders
      </h2>
      <div className="flex flex-row justify-center items-center bg-amber-300 p-4 m-4 rounded-2xl border-2">
        <button
          onClick={() => {
            navigate("/home");
          }}
        >
          Back to Home
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li
              key={order.order_id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-700">
                  Order ID: {order.order_id}
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  Total: ${order.total_price}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Order Date: {new Date(order.created_at).toLocaleDateString()}
              </p>

              <div className="mt-4">
                <h4 className="text-lg font-medium text-gray-800">Products:</h4>
                <ul className="space-y-2 mt-2">
                  <li className="text-gray-700 font-medium">
                    Product: {order.product_name}
                  </li>
                  <li className="text-sm text-gray-600">
                    Quantity: {order.quantity}
                  </li>
                  <li className="text-sm text-gray-600">
                    Price: ${order.unit_price}
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-row justify-center items-center bg-amber-300 p-4 m-4 rounded-2xl border-2">
        <button
          onClick={() => {
            navigate("/home");
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ShowOrders;
