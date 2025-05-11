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
import CartPage from "./pages/order/ShowCart";

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
      {/* <Route path="/" element={<Home />} />  */}
      <Route path="/" element={ <HomePage />} />
      <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/home" />} />
      <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/home" />} />
      
      <Route path="/user-cart" element={<CartPage />} />
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






