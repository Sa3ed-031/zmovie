import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Search from "../pages/Search";
import TvShows from "../pages/TvShows";
import Trending from "../pages/Trending";
import WatchList from "../pages/WatchList";
import MovieDetails from "../pages/MovieDetails";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tv" element={<TvShows />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/search" element={<Search />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/watchlist" element={<WatchList />} />
      <Route path="/movies/:id" element={<MovieDetails mediaType="movie" />} />
      <Route path="/tv/:id" element={<MovieDetails mediaType="tv" />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
