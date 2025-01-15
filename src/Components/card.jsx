import React, { useEffect, useState, useContext } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useAuth } from "../config/AuthContext.jsx";
import { Link } from "react-router-dom";
import { store } from "../Context API/fav";

const Cards = ({ movie, title, index }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { favourites, toggleFavourite } = useContext(store);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (!movie || !movie.poster_path) {
    return null;
  }

  const truncateText = (text, charLimit) => {
    if (!text) return "";
    if (text.length <= charLimit) return text;
    return text.slice(0, charLimit) + "...";
  };

  return (
    <>
      {isLoading ? (
        <div className="inline-block transition-transform duration-200 relative rounded-xl overflow-hidden m-[0.19rem] cursor-pointer min-w-[200px] h-[300px] z-0 border border-solid border-gray-700 hover:scale-125 hover:z-40 hover:shadow-xl">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={movie.release_date ? `/movie/${movie.id}` : `/tvshow/${movie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="inline-block transition-transform duration-200 relative rounded-xl overflow-hidden m-[0.19rem] cursor-pointer min-w-[200px] h-[300px] border z-0 border-solid border-gray-700 hover:scale-125 hover:z-40 hover:shadow-xl">
            <img
              className="cards__img h-[300px]"
              src={`https://image.tmdb.org/t/p/original${
                movie ? movie.poster_path : ""
              }`}
            />
            {title === "Trending Tv Shows" && (
              <div className="ranking absolute top-4 left-0 bg-gray-600 text-white text-xs p-1 rounded-tr-2xl w-1/2 rounded-br-2xl text-center ">
                #{index + 1} Trending
              </div>
            )}
            {user ? (
              <div
                className={`absolute top-4 left-44 cursor-pointer  ${
                  favourites.includes(
                    !movie.release_date ? `tv${movie.id}` : `movie${movie.id}`
                  )
                    ? "text-red-500"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavourite(
                    !movie.release_date ? `tv${movie.id}` : `movie${movie.id}`
                  );
                }}
              >
                <i
                  className={`fa-${
                    favourites.includes(
                      !movie.release_date ? `tv${movie.id}` : `movie${movie.id}`
                    )
                      ? "solid"
                      : "regular"
                  } fa-heart max-md:text-sm z-50`}
                ></i>
              </div>
            ) : (
              ""
            )}
            <div className="absolute bottom-0 p-4 pt-0 flex flex-col justify-end w-[85%] h-full bg-gradient-to-l from-transparent to-black bg-opacity-50 opacity-0 transition-opacity duration-200 hover:opacity-100">
              <div className="font-black text-xl mb-2">
                {movie
                  ? truncateText(
                      movie.original_title
                        ? movie.title || movie.original_title
                        : movie.name || movie.original_name,
                      35
                    )
                  : ""}
              </div>
              <div className="text-xs mb-1">
                {movie
                  ? movie.release_date
                    ? movie.release_date
                    : movie.first_air_date
                  : ""}
                <span className="float-right">
                  {movie && movie.vote_average
                    ? movie.vote_average.toFixed(2)
                    : ""}
                  <i className="fas fa-star ml-1 hover:text-yellow-400" />
                </span>
              </div>
              <div className=" italic text-xs mb-1 ">
                {movie ? truncateText(movie.overview, 100) : ""}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Cards;
