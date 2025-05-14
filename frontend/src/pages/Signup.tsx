import { useState } from "react";
import { useAuthStore } from "../store/AuthStore.js";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.first_name.trim())
      return toast.error("First name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm() === true) signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Create Account</h1>
          <p className="text-gray-500 mt-2">Get started with your free account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="Vyomika"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="Sofiya"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing up...
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;

