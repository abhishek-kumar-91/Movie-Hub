import React, { useState, useEffect } from "react";
import { useAuth } from "../config/AuthContext.jsx";
import defaultImage from "../assets/default-profile.png";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Loading from "../Components/loading.jsx";

const UserProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <div>No user data available. Please log in.</div>;

  return (
    <div className="relative mx-auto p-4 bg-gray-900 shadow-md rounded-lg min-h-screen flex flex-col items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-600 opacity-50"></div>
      <div className="relative mt-20 flex flex-col items-center p-6 rounded-lg shadow-lg z-10 w-full max-w-md bg-white bg-opacity-80">
        <div className="flex items-center space-x-4 mb-6 mr-8">
          <img
            src={user.photoURL || defaultImage}
            alt={user.displayName}
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user.displayName}
            </h1>
            <p className="text-gray-700">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Profile Details
          </h2>
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700">User ID:</label>
              <span className="text-gray-900 ml-2">{user.uid}</span>
            </div>
            <div className="flex items-center">
              <label className="font-medium text-gray-700">
                Email Verified:
              </label>
              <span className="flex items-center space-x-2 text-gray-900 ml-2">
                {user.emailVerified ? (
                  <>
                    <FaCheckCircle className="text-green-500" />{" "}
                    <span>Yes</span>
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="text-red-500" /> <span>No</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
