import React from "react";
import { useNavigate } from "react-router-dom";
const NotFound = ({ error }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      {error ? (
        <p className="text-lg mb-6">{error}</p>
      ) : (
        <p className="text-lg mb-6">
          Oops! The page you are looking for doesn't exist.
        </p>
      )}
      <img
        src="/src/assets/er1.png"
        alt="404 Illustration"
        className="w-auto h-64 mb-6"
      />
      <button
        onClick={handleGoBack}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default NotFound;
