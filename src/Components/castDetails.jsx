import React from "react";

const castDetails = ({ cast, showModal }) => {
  return (
    <div
      className={`movie-cast max-md:bottom-[150px] max-bs:bottom-[120px] max-xs:bottom-[60px] flex justify-center items-center flex-col mt-4 relative bottom-52${
        showModal ? "active" : "inactive relative"
      }`}
    >
      <h1 className="max-bs:text-base text-2xl mb-5 font-semibold drop-shadow-md md:max-lg:text-xl max-md:text-base ">
        Cast & Crew
      </h1>
      <br />
      <div className="movie__cast max-md:w-11/12 max-bs:w-[98%] w-3/4 flex flex-wrap gap-4 justify-center items-center">
        {cast &&
          cast.slice(0, 10).map(
            (member) =>
              member.profile_path && (
                <div
                  key={member.cast_id || member.id}
                  className="cast-member max-md:w-[150px] max-bs:[130px] flex flex-col items-center text-center min-w-44 max-w-44 h-auto "
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                    alt={member.name}
                    className="cast-member__image h-full min-h-[270px] bg-gray-300 w-full rounded-lg"
                  />
                  <div className="cast-member__name mt-1.5 font-bold">
                    {member.name}
                  </div>
                  <div className="cast-member__character italic text-gray-600">
                    as {member.character}
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default castDetails;
