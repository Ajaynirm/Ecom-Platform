import { Routes,Route,Navigate } from "react-router-dom"
import { useEffect } from "react";
import { useAuthStore } from "./store/AuthStore";

import Navbar from "./components/NavBar";
import SignUpPage from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/Customer/Home";
import AdminHome from "./pages/Admin/AdminHome";
import PlaceOrder from "./pages/order/PlaceOrder";
import CancelOrder from "./pages/order/CancelOrder";
import AddProduct from "./pages/product/AddProduct";
import EditProduct from "./pages/product/EditProduct";
import DeleteProduct from "./pages/product/DeleteProduct";
import ShowProduct from "./pages/product/ShowProduct";
import ShowCart from "./pages/order/ShowCart";

function App() {
  const { checkAuth ,authUser,isCheckingAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
   
  }, [checkAuth]);

  console.log({ authUser });
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <>
      
      <Navbar />
      <Routes>
      {/* <Route path="/home" element={<ShowProduct />} />  */}
      <Route path="/home" element={ <HomePage />} />
      <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/home" />} />
      //for customer
      <Route
  path="/login"
  element={
    !authUser ? (
      <LoginPage />
    ) : authUser.role === "admin" ? (
      <Navigate to="/admin-home" />
    ) : (
      <Navigate to="/home" />
    )
  }
/>

      //for admin
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/show-cart" element={<ShowCart />} />

      <Route path="/update-product" element={<EditProduct />} />
      <Route path="/delete-product" element={<DeleteProduct />} />
      
     
      {/* <Route path="/view-ordered-product" element={<DeleteProduct />} />
      <Route path="/delete-order" element={<DeleteProduct />} /> */}

      {/* <Route path="/delete-customer" element={<DeleteProduct />} /> */}
      <Route path="/show-product" element={<ShowProduct />} />

      {/* <Route path="/show-order" element={<PlaceOrder />} /> */}

      <Route path="/place-order" element={<PlaceOrder />} />
      <Route path="/cancel-order" element={<CancelOrder />} />
      <Route path="/admin-home" element={<AdminHome />} /> 
      <Route path="/profile" element={<Profile />} />
      </Routes>
      <Toaster />
      
    </>
  );
}

export default App;






