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
import ShowOrders from "./pages/order/ShowOrder";

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
      <Route path="/" element={<HomePage />} /> 
      <Route path="/home" element={ <HomePage />} />
      <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/home" />} />
     
      <Route path="/login" element={ !authUser ? ( <LoginPage /> ) : authUser.role === "admin" ? (<Navigate to="/admin-home" />) : ( <Navigate to="/home" />
    )
  }
/>

      <Route path="/add-product" element={(authUser && authUser.role=='admin') ? <AddProduct /> : <Navigate to="/home" />} />
      <Route path="/show-cart" element={authUser ?<ShowCart /> : <Navigate to={"/home"} />} />

      <Route path="/update-product" element={authUser && authUser.role=='admin' ? <EditProduct /> : <Navigate to="/home" />} />
      <Route path="/delete-product" element={authUser && authUser.role=='admin' ? <DeleteProduct /> : <Navigate to="/home" />} />
      
     
      {/* <Route path="/view-ordered-product" element={<DeleteProduct />} />
      <Route path="/delete-order" element={<DeleteProduct />} /> */}

      {/* <Route path="/delete-customer" element={<DeleteProduct />} /> */}
      <Route path="/show-product" element={<ShowProduct />} />

      <Route path="/show-order" element={authUser ? <ShowOrders /> :  <Navigate to="/home" />} />

      <Route path="/place-order" element={authUser ?<PlaceOrder /> : <Navigate to="/home" />} />
      <Route path="/cancel-order" element={authUser ? <CancelOrder /> : <Navigate to="/home" />} />
      <Route path="/admin-home" element={(authUser && authUser.role=='admin' ) ? <AdminHome />: <Navigate to={"/login"} />} /> 
      <Route path="/profile" element={<Profile />} />
      </Routes>
      <Toaster />
      
    </>
  );
}

export default App;






