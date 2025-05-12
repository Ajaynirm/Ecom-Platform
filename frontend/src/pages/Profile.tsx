import { useAuthStore } from "../store/AuthStore.js";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();
  if (!authUser) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-center p-10 m-5 font-extrabold font-stretch-90% btn h-10">
          Login to see profile
        </div>
        <button
          className="flex flex-row justify-center p-10 m-10 "
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  } else {
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Prof Header */}

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto text-center">
          <img alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
          <h1 className="text-2xl font-bold mt-4">{authUser.fullName} </h1>
          <p className="text-gray-600">{authUser.email}</p>
        </div>

        {/* User Det Section */}
        <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Profile Information</h2>
          <div className="text-gray-700">
            <p>
              <strong>Full Name:</strong> {authUser.fullName}
            </p>
            <p>
              <strong>Email:</strong>
              {authUser.email}
            </p>
            <p>
              <strong>Enrolled Courses:</strong> AI for Beginners, Advanced
              React
            </p>
            <p>
              <strong>Quiz Progress:</strong> 10% Completed
            </p>
          </div>
        </div>

        {/* Settings Logout */}
        <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg text-center flex flex-row justify-around">
          <div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600">
              Edit Profile
              <div className="hidden">{/* <UserButton /> */}</div>
            </button>
          </div>

          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}
