import React, { useState } from "react";
// import "./styles.css";
import cineImage from "../assets/Cine.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../config/AuthContext.jsx";

const Header = () => {
  const [term, setTerm] = useState("");
  const { user, logOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${term}`);
    setTerm("");
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setShowUserMenu(false);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleProfile = () => {
    navigate("/profile");
    setShowUserMenu(false);
  };

  return (
    <div className="header fixed  top-0 w-full h-16 bg-black bg-opacity-50 z-50 flex justify-between max-bs:h-12">
      <div className="headerLeft px-6 flex items-center h-full max-md:px-0">
        <Link to="/home">
         <h1 className="text-lg">Movie<span className="text-red-500 font-extrabold">Hub</span></h1>
        </Link>
        <Link to="/movies" style={{ textDecoration: "none" }}>
          <span className="px-4 text-base text-center hover:text-neutral-400 max-bs:text-sm max-bs:px-2 ">
            Movies
          </span>
        </Link>
        <Link to="/tvshows" style={{ textDecoration: "none" }}>
          <span className="px-4 text-base text-center hover:text-neutral-400 max-bs:text-sm max-bs:px-3 max-sm:w-auto">
            TV Shows
          </span>{" "}
        </Link>
      </div>
      <div className="searchBar w-auto max-md:w-72 max-bs:w-52 max-sm:hidden flex justify-between mr-2 max-sm:mr-0">
        <form
          onSubmit={handleSearch}
          className="flex items-center flex-grow min-w-64 h-full "
        >
          <div className="inputWithIcon h-1/2 relative w-full">
            <input
              className="h-full w-full rounded-2xl p-3 pr-8 border-x-slate-300 border outline-none text-sm text-gray-400"
              type="text"
              id="form"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search for movies..."
            />
            <i className="fas fa-search absolute right-4 top-1/2 text-gray-400 pointer-events-none cursor-pointer -translate-y-1/2 max-bs:text-sm"></i>
          </div>
        </form>
        {user ? (
          <div className="relative flex items-center max-bs:w-7 ml-2 ">
            <i
              className="fa-regular fa-heart mr-2 hover:opacity-45 cursor-pointer"
              onClick={() => navigate("/favourites")}
            ></i>
            <button
              className="user-icon-button w-10 h-10 max-md:w-7 max-md:h-7 rounded-full flex items-center justify-center bg-gray-700 text-white hover:bg-blue-500 transition-colors duration-200 ease-in focus:outline-none cursor-pointer"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <i className="fa-solid fa-user max-md:text-sm"></i>
            </button>
            {showUserMenu && (
              <div className="max-bs:absolute max-bs:bottom-16 max-bs:left-7">
                <i className="fa-solid fa-caret-up absolute right-3 top-14"></i>
                <div className="absolute right-0 top-14 mt-2 w-40 max-md:w-32 max-bs:w-24 bg-white shadow-lg rounded border border-gray-200">
                  <div className="py-1 flex flex-col px-4 max-md:px-2 max-bs:px-0">
                    <button
                      onClick={handleProfile}
                      className="block w-full text-left px-2 py-2 max-md:py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      <i className="fa-regular fa-user mr-2"></i>Profile
                    </button>
                    <div className="bg-slate-400 w-full h-[1px] mx-1 opacity-80"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-2 py-2 max-md:py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      <i className="fa-solid fa-right-from-bracket mr-2"></i>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative flex items-center max-bs:w-7 ml-1">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
              onClick={() => navigate("/signup")}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
