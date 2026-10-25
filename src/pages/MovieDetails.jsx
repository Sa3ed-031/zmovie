import { useParams, Link } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LanguageIcon from "@mui/icons-material/Language";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";

import useFetch from "../hooks/useFetch";
import { STRINGS } from "../constants/strings";
import { getTitle } from "../utils/media";
import { IMAGE_BASE_URL, fetchDetails, findTrailer } from "../api/tmdb";

import Loader from "../components/common/Loader";
import MovieGrid from "../components/common/MovieGrid";
import ErrorMessage from "../components/common/ErrorMessage";
import TrailerButton from "../components/common/TrailerButton";
import CastList from "../components/movie-details/CastList";
import MovieInfo from "../components/movie-details/MovieInfo";
import AddToWatchlistBtn from "../components/common/AddToWatchlistBtn";

// mediaType: "movie" | "tv"
function MovieDetails({ mediaType = "movie" }) {
  const { id } = useParams();
  const {
    data: details,
    loading,
    error,
    refetch,
  } = useFetch(() => fetchDetails(mediaType, id), [mediaType, id], null);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  if (!details) {
    return <ErrorMessage message={STRINGS.details.notFound} hint={null} />;
  }

  const movie = { ...details, media_type: mediaType };
  const title = getTitle(movie);
  const trailer = findTrailer(movie.videos?.results);
  const cast = movie.credits?.cast?.slice(0, 8) ?? [];
  const recommendations = movie.recommendations?.results ?? [];
  const similar = (
    recommendations.length ? recommendations : (movie.similar?.results ?? [])
  )
    .slice(0, 10)
    .map((item) => ({ media_type: mediaType, ...item }));

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
    : null;

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}original${movie.backdrop_path}`
    : null;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-8">
        {backdropUrl && (
          <div
            className="md:h-[50vh] relative w-full h-[30vh] bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          >
            <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
        )}

        <div className="md:flex-row flex flex-col gap-8 relative z-10">
          <div className="md:w-1/3 lg:w-1/4 max-md:max-w-xs max-md:mx-auto w-full shrink-0">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={title}
                loading="lazy"
                className="w-full rounded-xl shadow-2xl border-4 border-gray-800"
              />
            ) : (
              <div className="w-full text-6xl flex items-center justify-center aspect-2/3 rounded-xl bg-gray-700">
                <LiveTvOutlinedIcon className="text-primary-container" />
              </div>
            )}
          </div>

          <div className="md:w-2/3 lg:w-3/4 flex flex-col gap-4 text-gray-100">
            <MovieInfo movie={movie} />

            <div className="max-lg:flex-col flex gap-4 transition-all duration-300">
              <TrailerButton trailer={trailer} title={title} />
              <AddToWatchlistBtn movie={movie} />
            </div>

            <div className="max-sm:flex-col flex gap-4">
              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-2 text-sm flex items-center justify-center gap-1 rounded-lg text-on-surface hover:text-on-surface/70 bg-linear-to-br from-gray-800 via-primary-container/70 to-primary-container transition-all duration-300"
                >
                  <LanguageIcon sx={{ fontSize: "1.25rem" }} />
                  {STRINGS.details.officialSite}
                </a>
              )}
              <Link
                to="/"
                className="w-full p-2 text-sm flex items-center justify-center gap-1 rounded-lg text-on-surface hover:text-on-surface/70 hover:bg-gray-700/80 bg-gray-700 transition-all duration-300"
              >
                <ArrowBackIcon
                  sx={{
                    fontSize: "1.25rem",
                  }}
                />
                {STRINGS.details.backHome}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CastList cast={cast} />

      {similar.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-on-surface">
            {STRINGS.details.similar}
          </h2>
          <MovieGrid items={similar} />
        </section>
      )}
    </div>
  );
}

export default MovieDetails;
