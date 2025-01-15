import React, { useState, useEffect } from "react";
import { useAuth } from "../config/AuthContext";

const StarRating = ({ movieId }) => {
  const { handleRating, getUserRating, user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    const fetchUserRating = async () => {
      if (user) {
        const userRating = await getUserRating(movieId);
        setRating(userRating);
      }
    };

    fetchUserRating();
  }, [user, movieId, getUserRating]);

  const handleRate = async (rate) => {
    if (!user) return;
    setRating(rate);
    await handleRating(movieId, rate);
  };

  return (
    <div className="star-rating flex items-center">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              className="hidden"
              onClick={() => handleRate(ratingValue)}
            />
            <i
              className={`fas fa-star cursor-pointer ${
                ratingValue <= (hover || rating)
                  ? "text-yellow-500"
                  : "text-gray-400"
              }`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            ></i>
          </label>
        );
      })}
      {rating > 0 && <span className="ml-2">{`${rating}/5`}</span>}
    </div>
  );
};

export default StarRating;
