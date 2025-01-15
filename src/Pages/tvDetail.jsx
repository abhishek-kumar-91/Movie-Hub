import React, { useEffect, useState } from "react";
// import "./styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import Loading from "../Components/loading";
import NotFound from "./error";
import { useAuth } from "../config/AuthContext";
import StarRating from "../Components/starRating";
import CastDetails from "../Components/castDetails";

const TvShow = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const [currentMovieDetail, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&append_to_response=videos`
        );
        setMovie(data);

        if (data.videos && data.videos.results.length > 0) {
          const officialTrailer = data.videos.results.find(
            (vid) => vid.name === "Official Trailer"
          );
          setTrailer(officialTrailer || data.videos.results[0]);
        }
      } catch (error) {
        setError("Error fetching movie details. Please try again later.");
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCast = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}&language=en-US`
        );

        setCast(data.cast);
      } catch (error) {
        console.error("Error fetching cast details:", error);
      }
    };

    fetchMovieData();
    fetchCast();
  }, [id]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound error={error}></NotFound>;
  }

  return (
    <div className="movie w-full bg-black relative flex flex-col items-center">
      <div className="movie__intro w-4/5 max-xs:w-11/12">
        <img
          className="movie__backdrop w-full h-fit object-cover rounded-xl shadow-lg"
          style={{ objectPosition: "0 35%" }}
          src={`https://image.tmdb.org/t/p/original${currentMovieDetail?.backdrop_path}`}
          alt={currentMovieDetail?.title || "Movie backdrop"}
        />
      </div>
      <div className="movie__detail max-xs:w-full max-xs:bottom-[60px] max-bs:w-[95%] max-bs:bottom-[120px] flex items-center relative w-3/4 bottom-[225px] lg:bottom-44 max-md:flex-col max-md:items-center max-md:w-[90%] max-md:bottom-[150px]">
        <div className="movie__detailLeft mr-7">
          <div
            className={`movie__posterBox w-80 max-sm:w-28 max-sm:top-5 max-sm:relative max-bs:w-44 max-lg:w-64 max-md:w-52${
              showModal
                ? "active-poster relative bottom-60 max-lg:top-0 max-bs:bottom-0"
                : ""
            }`}
          >
            <img
              className="movie__poster rounded-xl shadow-2xl relative bottom-12 max-bs:bottom-0 max-xs:bottom-6"
              src={`https://image.tmdb.org/t/p/original${currentMovieDetail?.poster_path}`}
              alt={currentMovieDetail?.title || "Movie poster"}
            />
          </div>
        </div>
        <div className="movie__detailRight movie__detailRight max-xs:w-[98%] text-white flex flex-col h-auto justify-between">
          <div className="movie__detailRightTop">
            <div className="movie__name movie__name max-sm:text-2xl max-xs:text-xl max-bs:text-3xl text-5xl font-semibold drop-shadow-md md:max-lg:text-4xl max-md:text-4xl">
              {currentMovieDetail
                ? currentMovieDetail.original_title
                  ? ""
                  : currentMovieDetail.name || currentMovieDetail.original_name
                : "N/A"}
            </div>
            <div className="movie__rating drop-shadow-md max-xs:text-sm">
              {currentMovieDetail?.vote_average ? (
                <>
                  {currentMovieDetail.vote_average.toFixed(2)}{" "}
                  <i className="fas fa-star hover:text-yellow-400" />
                  <span className="movie__voteCount max-bs:text-xs ml-4 text-xl text-gray-400 md:max-lg:text-base max-md:text-sm">
                    ({currentMovieDetail.vote_count} votes)
                  </span>
                </>
              ) : (
                "No rating available"
              )}
              <StarRating movieId={`tv${id}`} user={user} />
            </div>
            <div className="movie__runtime drop-shadow-md max-xs:text-sm">
              {currentMovieDetail?.number_of_seasons
                ? `No. of seasons: ${currentMovieDetail.number_of_seasons}(${currentMovieDetail.number_of_episodes} episodes) `
                : "No seasons available"}
            </div>
            <div className="movie__releaseDate drop-shadow-md max-xs:text-sm">
              Air date: {currentMovieDetail?.first_air_date || "N/A"}
            </div>
            <div className="movie__releaseDate drop-shadow-md max-xs:text-sm">
              Last Air date: {currentMovieDetail?.last_air_date || "N/A"}
            </div>
            <div className="movie__genres max-xs:hidden my-5 drop-shadow-md">
              {currentMovieDetail?.genres?.length > 0 ? (
                currentMovieDetail.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="movie__genre max-md:text-xs md:max-lg:text-base p-2 rounded-3xl mr-4 text-base cursor-pointer text-white transition-colors duration-200 ease-in-out border-2 border-solid border-white hover:bg-[#f39c12]"
                  >
                    {genre.name}
                  </span>
                ))
              ) : (
                <span>No genres available</span>
              )}
            </div>
            <div className="movie__detailRightBottom my-8 drop-shadow-md">
              <div className="synopsisText max-bs:text-base text-2xl mb-5 font-semibold drop-shadow-md md:max-lg:text-xl max-md:text-base">
                Synopsis
              </div>
              <div className="ml-auto max-xs:text-sm">
                {currentMovieDetail?.overview || "No synopsis available"}
              </div>
            </div>
            <button
              className="watch-trailer-btn max-xs:hidden max-sm:text-sm m-2 mb-4 w-auto h-auto py-3 px-6 text-xl text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 border-none rounded-md cursor-pointer font-serif"
              onClick={openModal}
            >
              Watch Trailer
            </button>
            {showModal && trailer && (
              <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50">
                <div className="modal-content relative w-full max-w-screen-md max-lg:max-w-screen-sm max-md:max-w-[580px] max-bs:max-w-[420px] max-sm:max-w-[290px] max-xs:max-w-[240px]">
                  <div className="relative overflow-hidden w-full h-full max-w-full pb-[60%]">
                    <YouTube
                      videoId={trailer.key}
                      className="youtube absolute top-0 left-0 w-full h-full border-none"
                      containerClassName="youtube-container"
                      opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                          autoplay: 0,
                          controls: 1,
                          cc_load_policy: 0,
                          fs: 0,
                          iv_load_policy: 3,
                          modestbranding: 1,
                          rel: 0,
                          showinfo: 0,
                        },
                      }}
                    />
                  </div>
                  <button
                    className="close-modal-btn max-sm:text-sm m-2 w-auto h-auto py-2 px-6 text-base text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 border-none rounded-md cursor-pointer font-serif"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <CastDetails cast={cast} showModal={showModal} />
      <button
        type="button"
        className="my-4 max-bs:my-2 text-center text-whitetext-white bg-gradient-to-r from-red-600 to-pink-700 hover:bg-gradient-to-l font-medium rounded-md text-base px-6 py-2  me-2  border-none cursor-pointer transition-colors duration-300 ease-in-out font-serif flex items-center"
        onClick={(e) => {
          e.preventDefault();
          navigate("/home");
        }}
      >
        <i className="fa-solid fa-chevron-left text-xs mr-1"></i>{" "}
        <span>Back</span>
      </button>
    </div>
  );
};

export default TvShow;
