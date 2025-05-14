import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

import {
  Menu,
  X,
  Search,
  ShoppingCart,
  Filter,
  TruckElectric,
} from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">My Store</div>

        <div className="flex items-center space-x-4">
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {authUser ? (
              <>
                <button
                  onClick={() => {
                    navigate("/show-order");
                  }}
                >
                  <TruckElectric />
                </button>
                <button
                  onClick={() => {
                    navigate("/show-cart");
                  }}
                >
                  <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600" />
                </button>
                <button
                  className="btn rounded-2xl bg-amber-600 p-2 text-lg"
                  onClick={async () => {
                    await logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
                {authUser.role==='admin' ?<div className="bg-amber-400 border-amber-400 rounded-2xl p-2 cursor-alias">Admin - {authUser.first_name}</div> :
                  <div className="bg-amber-400 border-amber-400 rounded-2xl p-2 cursor-alias">{authUser.first_name}</div>
                }
                
                
              </>
            ) : (
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 space-y-4">
          {/* Search Bar */}
          <div className="flex items-center border rounded-full px-3 py-1 bg-gray-100 focus-within:ring-2 ring-blue-400">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent px-2 py-1 outline-none"
            />
            <button className="ml-2 text-blue-600 hover:text-blue-800">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Auth or Profile */}
          {authUser ? (
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center space-x-2">
                <img
                  src={""}
                  alt={"pic"}
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <span className="font-medium">{authUser.first_name}</span>
              </div>
              <ShoppingCart className="w-6 h-6 text-gray-700" />
            </div>
          ) : (
            <button
              className="bg-blue-600 text-white w-full py-2 rounded-full hover:bg-blue-700"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
