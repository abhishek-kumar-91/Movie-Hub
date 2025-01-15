// import "./styles.css"
import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import ScrollableCarousel from "../Components/index";
import Footer from "../Components/footer";
import Genres from "../Components/genre";

export default function Home() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const [popularMovies, setPopularMovies] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=en-US`
      );
      let data = await response.json();
      setPopularMovies(data.results);
      //    console.log(data.results);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-gray-900">
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
          showIndicators={!isSmallScreen}
        >
          {popularMovies.map((movie, index) => (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={
                movie.release_date
                  ? `/movie/${movie.id}`
                  : `/tvshow/${movie.id}`
              }
              key={index}
            >
              <div className="posterImage bg-gray-900 h-[600px] max-lg:h-[450px] max-md:h-[350px] max-bs:h-[300px] max-sm:h-[250px] max-xs:h-52">
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`}
                  className="m-auto block w-full"
                />
              </div>
              <div className="posterImage-overlay absolute p-20 bottom-0 h-7/10 flex flex-col w-full justify-end items-start opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[#111827] to-transparent hover:opacity-100 max-lg:p-12 max-lg:h-3/5 max-md:p-8 max-md:h-1/2 max-bs:p-8 max-sm:p-4 max-xs:p-2 max-xs:h-2/5 max-bs:pb-16 max-sm:pt-36 max-md:pb-18">
                <div className="posterImage__title font-black text-6xl mb-3 text-left max-lg:text-5xl max-md:text-4xl max-bs:text-3xl max-xs:text-xl max-sm:text-2xl">
                  {movie ? movie.original_title || movie.original_name : ""}
                </div>
                <div className="posterImage__runtime text-3xl mb-3 max-lg:text-2xl max-md:text-xl max-bs:text-base max-sm:text-sm ">
                  {movie ? movie.release_date || movie.first_air_date : ""}
                  <span className="posterImage__rating ml-12 max-lg:ml-8 max-md:ml-6 max-bs:ml-4 max-sm:ml-2 max-xs:ml-1">
                    {movie ? movie.vote_average.toFixed(2) : ""}
                    <i className="fas fa-star ml-2 text-yellow-400" />{" "}
                  </span>
                </div>
                <div className="posterImage__description italic text-base mb-1 flex text-left w-1/2 max-md:text-sm max-lg:w-3/5 max-md:w-[70%] max-bs:text-xs max-bs:w-4/5 max-sm:hidden">
                  {movie ? movie.overview.slice(0, 200) + "..." : ""}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
      <div className="bg-gray-900">
        <ScrollableCarousel
          fetchUrl={`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&language=en-US`}
          title="Trending Tv Shows"
        />
        <ScrollableCarousel
          fetchUrl={`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&region=IN`}
          title="Now Playing"
        />
        <Genres></Genres>
        <ScrollableCarousel
          fetchUrl={`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`}
          title="Top Rated Movies"
        />
        <ScrollableCarousel
          fetchUrl={`https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US`}
          title="On Air Shows"
        />
      </div>
      <Footer></Footer>
    </div>
  );
}
