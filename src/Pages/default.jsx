import React, { useState, useEffect } from "react";
import back from "/src/assets/img1.jpg";
import { useAuth } from "../config/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function GetStarted() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`absolute z-50 w-full right-6 flex justify-end ${
          user ? "hidden" : ""
        }`}
      >
        <Link to="/signup">
          <button className="bg-red-600 py-2 px-6 my-6 rounded font-bold  transition-all duration-300 ease-in-out transform hover:bg-red-700  ">
            Sign Up
          </button>
        </Link>

        <Link to="/login">
          <button className="bg-red-600 py-2 px-6 my-6 ml-4 rounded font-bold  transition-all duration-300 ease-in-out transform hover:bg-red-700  ">
            Sign In
          </button>
        </Link>
      </div>
      <div
        className="get-started-container flex items-center justify-center h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${back})` }}
      >
        <div className="overlay absolute  top-0 left-0 bottom-0 right-0 bg-black opacity-70 z-1"></div>
        <div className="content z-10 text-center max-w-[600px] p-5 text-white rounded-xl">
          <h1 className="text-5xl mb-5">Welcome to Movie Mania!</h1>
          <p className="text-xl mb-8">
            Your one-stop destination for all movies. Explore top-rated films,
            latest releases, and timeless classics.
          </p>
          {user ? (
            ""
          ) : (
            <p className="text-lg mb-3">
              Please sign in to access full functionality.
            </p>
          )}
          <div className="flex items-center justify-center">
            {/* {!user && (
      <button type="button" className={`text-white bg-[#4285F4] hover:bg-[#4285F4]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2`} onClick={handleGoogleSignIn}>
      <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
      <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd"/>
      </svg>
      Sign in with Google
      </button>
      )} */}
            <button
              type="button"
              className="get-started-button text-center text-whitetext-white bg-gradient-to-r from-red-600 to-pink-700 hover:bg-gradient-to-l font-medium rounded-md text-base px-6 py-2  me-2 mb-2 border-none cursor-pointer transition-colors duration-300 ease-in-out font-serif flex items-center"
              onClick={(e) => {
                e.preventDefault();
                navigate("/home");
              }}
            >
              <span>Get Started</span>{" "}
              <i className="fa-solid fa-chevron-right text-xs ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
