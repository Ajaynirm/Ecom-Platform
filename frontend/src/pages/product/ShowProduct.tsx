import { useAuthStore } from "../../store/AuthStore";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

//dummy image for all products
const image = `https://media.istockphoto.com/id/1249219777/photo/shopping-online-concept-parcel-or-paper-cartons-with-a-shopping-cart-logo-in-a-trolley-on-a.jpg?s=612x612&w=0&k=20&c=EWKEahyVLY8iAHyirCCDESHRGW37lqUJ7In0SssNSLE=`;

const ShowProduct = () => {
  const navigate = useNavigate();
  const { currProduct, authUser } = useAuthStore();

  const product = currProduct;

  const handleSetCart = async () => {
    if (!authUser) {
      toast.error("Login first to use Cart");
      return;
    }
    try {
      const response = await axiosInstance.patch("/cart/update-cart", {
        customer_id: authUser?.id,
        product_id: product?.id,
        quantity: 1,
      });

      if (response.data.success) {
        toast.success("Product Added to cart successfully");
        console.log(response.data);
        // Optionally update local UI state here
      } else {
        toast.error("Failed to update cart");
      }
    } catch (error: any) {
      toast.error("Error updating cart:", error);
    }
  };

  if (!product) return <div className="p-4">Product not found.</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <img
        src={image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-xl"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-xl text-green-600 mt-2">${product.price}</p>
      <p className="text-sm text-gray-500 mt-1">
        Stock: {product.stock_quantity}
      </p>
      <p className="mt-4 text-gray-700">{product.description}</p>

      <div className="flex gap-4 mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
          onClick={() => {
            navigate("/home");
          }}
        >
          Back
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          onClick={() => {
            handleSetCart();
            // setCart({...product,stock_quantity:1});
          }}
        >
          Add to Cart
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          onClick={() => {
            navigate("/show-cart");
          }}
        >
          Show Cart
        </button>
      </div>
    </div>
  );
};

export default ShowProduct;
