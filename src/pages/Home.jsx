import { Link } from "react-router-dom";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import useFetch from "../hooks/useFetch";
import { STRINGS } from "../constants/strings";
import { fetchNowPlayingMovies, fetchTrending } from "../api/tmdb";

import MovieGrid from "../components/common/MovieGrid";
import HeroSection from "../components/home/HeroSection";
import ErrorMessage from "../components/common/ErrorMessage";

export default function Home() {
  const { data: nowPlaying, loading: nowPlayingLoading } = useFetch(() =>
    fetchNowPlayingMovies(1),
  );

  const { data, loading, error, refetch } = useFetch(() =>
    fetchTrending("week", 1),
  );

  const trending = data?.results || [];

  // Newest movie in theaters with a backdrop, otherwise the top trending title
  const newRelease = nowPlaying?.results?.find((movie) => movie.backdrop_path);
  const heroMovie =
    newRelease ?? trending.find((item) => item.backdrop_path) ?? null;

  return (
    <div className="flex flex-col gap-6">
      <HeroSection
        movie={heroMovie}
        badge={newRelease ? STRINGS.home.newRelease : STRINGS.home.trending}
        loading={nowPlayingLoading || (!newRelease && loading)}
      />
      <section className="w-full py-4 relative z-20 flex flex-col gap-8 transition-all duration-300">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl flex gap-2 font-semibold text-on-surface">
            {STRINGS.home.trendingNow}
            <WhatshotIcon
              className="text-primary-container"
              sx={{ fontSize: "1.5rem" }}
            />
          </h2>
          <Link
            to="/trending"
            className="flex items-center gap-1 cursor-pointer transition-colors duration-300 hover:underline hover:text-primary-container text-on-surface-variant"
          >
            {STRINGS.home.seeAll}
            <ArrowForwardIcon
              sx={{
                fontSize: "1.25rem",
              }}
            />
          </Link>
        </div>

        {error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : (
          <MovieGrid items={trending.slice(0, 10)} loading={loading} />
        )}
      </section>
    </div>
  );
}
