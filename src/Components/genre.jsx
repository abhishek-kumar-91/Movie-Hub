import React from "react";
import { GenreList } from "../config/GenreList";
import { Link } from "react-router-dom";

function Genres() {
  return (
    <div className="flex gap-2 md:gap-5 p-2 px-5 md:px-16 ">
      {GenreList.map((item) => (
        <Link key={item.id} to={`/${item.genreId}`} className="block">
          <div
            className="border-[2px] border-gray-600
            rounded-lg hover:scale-110 transition-all duration-300
            ease-in-out cursor-pointer relative shadow-xl 
            shadow-gray-800 
            "
          >
            <video
              src={item.video}
              autoPlay
              loop
              playsInline
              muted
              className="absolute z-0  top-0 rounded-md 
            opacity-0 hover:opacity-50"
            />
            <img src={item.image} className="w-full z-[1] opacity-100" />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Genres;
