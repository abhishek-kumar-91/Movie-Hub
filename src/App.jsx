import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import GetStarted from "./Pages/default";
import Header from "./Components/header";
import Home from "./Pages/home";
import Movie from "./Pages/movieDetail";
import MovieList from "./Components/movieList";
import TvShow from "./Pages/tvDetail";
import FavouriteProvider from "./Context API/fav";
import FavouritePage from "./Pages/index";
import NotFound from "./Pages/error";
import SignUp from "./Pages/signUp";
import SignIn from "./Pages/signIn";
import GenreMovies from "./Components/genreMovies";
import UserProfile from "./Pages/profile";
import AboutUs from "./Components/About";

function App() {
  function Layout() {
    const location = useLocation();
    const shouldShowHeader =
      location.pathname !== "/" &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup";

    return (
      <>
        {shouldShowHeader && <Header />}
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favourites" element={<FavouritePage />} />
          <Route path="/search/:term" element={<MovieList />} />
          <Route path="/movies" element={<MovieList type="movie" />} />
          <Route path="/tvshows" element={<MovieList type="tv" />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/tvshow/:id" element={<TvShow />} />
          <Route path="/:genre" element={<GenreMovies />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </>
    );
  }
  return (
    <div className="App bg-gray-900">
      <FavouriteProvider>
        <Router>
          <Layout></Layout>
        </Router>
      </FavouriteProvider>
    </div>
  );
}

export default App;
