import React, { useState, useEffect, useContext } from "react";
import { store } from "../Context API/fav";
import Cards from "../Components/card";
import Empty from "../assets/emptyIllustration.png";
import Loading from "../Components/loading";

const Favourites = () => {
  // favourites is the array present in firestore database which consists of id of movies
  // upon clicking fav(icon) getFavourites function gets called and sets the id's in db in favourites using setFavourites state var
  // favouriteItems is the data of the id present in the favourites
  // using this data will be sent to the Cards Component to render the card  of the id's present in the favourites array

  const { favourites } = useContext(store);
  const [favouriteItems, setFavouriteItems] = useState([]);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavouriteItems = async () => {
      if (favourites.length === 0) {
        setLoading(false); // No favourites to fetch
        return;
      }
      setLoading(true);
      const itemsDetails = [];
      for (let itemId of favourites) {
        // console.log("itemId:", itemId, "Type:", typeof itemId);
        try {
          let itemDetail = null;

          if (itemId.startsWith("tv")) {
            const tvId = itemId.slice(2);
            const tvResponse = await fetch(
              `https://api.themoviedb.org/3/tv/${tvId}?api_key=${apiKey}`
            );
            if (tvResponse.ok) {
              itemDetail = await tvResponse.json();
            } else {
              console.error(`Failed to fetch details for TV ID ${tvId}`);
            }
          } else if (itemId.startsWith("movie")) {
            // Check if it's a movie
            const movieId = itemId.slice(5);
            const movieResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
            );
            if (movieResponse.ok) {
              itemDetail = await movieResponse.json();
            } else {
              console.error(`Failed to fetch details for Movie ID ${movieId}`);
            }
          }
          if (itemDetail) {
            itemsDetails.push(itemDetail);
          }
        } catch (error) {
          console.error(`Error fetching details for ID ${itemId}:`, error);
        } finally {
          // Check if all requests are completed
          setLoading(false);
        }
      }
      setFavouriteItems(itemsDetails);
    };

    fetchFavouriteItems();
  }, [favourites, apiKey]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-900 pb-4 px-12 min-h-screen flex flex-col flex-grow">
      <h1 className="mt-0 pt-20 ml-0 text-3xl m-10">Favourites</h1>
      {favouriteItems.length > 0 ? (
        <div className="flex flex-wrap justify-around">
          {favouriteItems.map((item, index) => (
            <Cards
              key={item.id}
              movie={item}
              title={item.title || item.name} //no practical usage as such here
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <img src={Empty} alt="Empty State" className="h-48 mb-8" />
          <p className="text-lg text-gray-300 mb-4 text-center">
            You haven't added any favorite shows yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favourites;
