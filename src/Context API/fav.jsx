import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../config/AuthContext.jsx";

export const store = createContext();
const FavouriteProvider = ({ children }) => {
  const { user, getFavorites, addToFavorites, removeFromFavorites } = useAuth();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch the user's favorite items and update the state with the fetched items
      getFavorites()
        .then(setFavourites)
        .catch((error) => {
          console.error("Error fetching favorites:", error);
        });
    }
  }, [user]);

  const toggleFavourite = async (itemId) => {
    try {
      //.some() returns true if the id is already present
      if (favourites.some((fav) => fav === itemId)) {
        // If the item is already in favourites, remove it
        await removeFromFavorites(itemId);
        setFavourites((prev) => prev.filter((id) => id !== itemId));
      } else {
        // If the item is not in favourites, add it
        await addToFavorites(itemId);
        setFavourites((prev) => [...prev, itemId]);
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  return (
    <store.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </store.Provider>
  );
};

export default FavouriteProvider;
