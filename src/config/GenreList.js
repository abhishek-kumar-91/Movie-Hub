import fantasy from "./../assets/Images/Fantasy.png";
import action from "./../assets/Images/Action.png";
import adventure from "./../assets/Images/Adventure.png";
import scifi from "./../assets/Images/SciFi.png";

import starwarV from "./../assets/Videos/star-wars.mp4";
import disneyV from "./../assets/Videos/disney.mp4";
import marvelV from "./../assets/Videos/marvel.mp4";
import nationalGeographicV from "./../assets/Videos/national-geographic.mp4";

export const GenreList = [
  {
    id: 1,
    image: fantasy,
    video: disneyV,
    genre: "Fantasy",
    genreId: "14",
  },
  {
    id: 2,
    image: adventure,
    video: nationalGeographicV,
    genre: "Adventure",
    genreId: "12",
  },
  {
    id: 3,
    image: action,
    video: marvelV,
    genre: "Action",
    genreId: "28",
  },
  {
    id: 4,
    genre: "Science Fiction",
    image: scifi,
    video: starwarV,
    genreId: "878",
  },
];

export const GenreNames = {
  14: "Fantasy",
  12: "Adventure",
  28: "Action",
  878: "Science Fiction",
};
