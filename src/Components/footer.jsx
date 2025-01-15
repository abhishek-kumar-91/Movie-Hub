import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [typeEffect] = useTypewriter({
    words: ["Abhishek", "Kumar"],
    loop: {},
    typeSpeed: 150,
    deleteSpeed: 60,
  });
  return (
    <footer className="mt-auto  text-white py-4">
      <div className="m-4 opacity-50 bg-white width-[96%] h-[2px] flex items-center justify-around"></div>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a
            className="hover:text-blue-400 transition cursor-pointer"
            onClick={() => navigate("/about")}
          >
            About
          </a>
          <a className="hover:text-blue-400 transition cursor-pointer">
            Contact
          </a>
          <a className="hover:text-blue-400 transition cursor-pointer">
            Privacy Policy
          </a>
        </div>

        <div className="text-center bg-inherit md:text-left flex items-center mb-4 md:mb-0">
          <a
            href="https://github.com/Avyaaz18/Movie-Mania"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <i className="fa-brands fa-github mr-2"></i>
            Designed by <span className="text-pink-500"> {typeEffect}</span>
            <Cursor cursorColor="white" />
          </a>
        </div>

        <div className="flex space-x-4">
          <i className="fa-brands fa-twitter hover:text-blue-400 transition"></i>
          <i className="fa-brands fa-facebook hover:text-blue-400 transition"></i>
          <i className="fa-brands fa-instagram hover:text-pink-400 transition"></i>
          <i className="fa-brands fa-linkedin hover:text-blue-400 transition"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
