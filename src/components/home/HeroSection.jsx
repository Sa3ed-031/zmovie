import StarIcon from "@mui/icons-material/Star";

import useFetch from "../../hooks/useFetch";
import { IMAGE_BASE_URL, fetchTrailer } from "../../api/tmdb";
import { getMediaType, getReleaseDate, getTitle } from "../../utils/media";
import AddToWatchlistBtn from "../common/AddToWatchlistBtn";
import TrailerButton from "../common/TrailerButton";

const HeroSection = ({ movie, badge, loading }) => {
  const { data: trailer } = useFetch(
    () => (movie ? fetchTrailer(getMediaType(movie), movie.id) : null),
    [movie?.id],
  );

  if (loading || !movie) {
    return (
      <div className="w-full min-h-[60vh] rounded-lg animate-pulse bg-surface-container" />
    );
  }

  const title = getTitle(movie);
  const backgroundImage = movie.backdrop_path
    ? `url(${IMAGE_BASE_URL}original${movie.backdrop_path})`
    : "none";

  return (
    <div
      className="relative w-full min-h-[60vh] p-4 sm:p-8 flex items-end rounded-lg bg-cover bg-center text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.75)), ${backgroundImage}`,
      }}
    >
      <div className="md:max-w-1/2 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 text-sm backdrop-blur-md border rounded-full text-primary-container border-white/10 bg-surface-container/80">
            {badge}
          </span>
          <span className="flex items-center gap-1">
            <StarIcon
              className="text-primary-container"
              sx={{
                fontSize: "1.25rem",
              }}
            />
            {movie.vote_average?.toFixed(1)}
          </span>
          <span>{getReleaseDate(movie) || "---"}</span>
        </div>

        <h1 className="text-3xl leading-relaxed text-left text-on-surface">
          {title}
        </h1>

        <p className="line-clamp-3 text-left">{movie.overview}</p>

        <div className="max-[500px]:flex-col flex items-center gap-4">
          <TrailerButton trailer={trailer} title={title} />
          <AddToWatchlistBtn movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
