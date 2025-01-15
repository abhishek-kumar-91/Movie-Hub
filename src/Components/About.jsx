import React, { useState, useRef } from "react";
import FAQAccordion from "./FAQAccordion";
import QuickTour from "../assets/Videos/MovieMania.mp4";

const AboutUs = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoPlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="container max-lg:mx-auto bg-gray-900 pb-4 px-16 mx-10 flex flex-col flex-grow min-h-screen">
      <h1 className="text-3xl font-bold pt-20 ">About Us</h1>
      <p className="my-4  text-lg text-[#d1d4bf] leading-relaxed">
        Movie Hub is your ultimate destination for everything related to
        movies and TV shows. Discover new releases, explore genres, watch
        trailers, and more.
      </p>
      <div className="relative h-0 pb-[50%]">
        <video
          ref={videoRef}
          src={QuickTour}
          className="absolute top-0 left-0 w-4/5 h-full"
          controls={false}
        />
        <button
          onClick={handleVideoPlayPause}
          className="absolute bottom-12 left-4 bg-transparent text-white  px-4 rounded"
        >
          {isPlaying ? (
            <i className="fa-solid fa-pause"></i>
          ) : (
            <i className="fa-solid fa-play"></i>
          )}
        </button>
      </div>
      <h1 className="text-2xl font-bold pt-4 mt-2 ">FAQ's</h1>

      <FAQAccordion />
    </div>
  );
};

export default AboutUs;
