import { Link } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";

import { IMAGE_BASE_URL } from "../../api/tmdb";
import { STRINGS } from "../../constants/strings";
import { getDetailsPath, getTitle, getYear } from "../../utils/media";
import defaultImage from "../../assets/images/hero.png";
import AddToWatchlistBtn from "../common/AddToWatchlistBtn";

const MovieCard = ({ movie }) => {
  const title = getTitle(movie) || STRINGS.common.noTitle;

  // Info & button are always visible (no hover-only actions on touch devices)
  return (
    <Link
      to={getDetailsPath(movie)}
      className="relative flex flex-col shadow-md rounded-lg overflow-hidden hover:shadow-xl hover:scale-103 transition-all duration-300 bg-surface-container border border-white/5 group"
    >
      <div className="relative">
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
              : defaultImage
          }
          alt={title}
          className="w-full aspect-2/3 object-cover group-hover:opacity-75 transition-all duration-300"
          loading="lazy" // Optimization
        />
        {!movie.poster_path && (
          <div className="absolute inset-0 p-3 flex items-center justify-center text-center bg-black/60">
            <span className="text-base font-bold line-clamp-4 text-on-surface">
              {title}
            </span>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-1 flex-col gap-2 text-white">
        <h3 className="text-sm font-semibold line-clamp-1" title={title}>
          {title}
        </h3>
        <div className="mt-auto text-sm flex items-center justify-between text-gray-400">
          <span className="flex items-center gap-1">
            <StarIcon className="text-yellow-500" sx={{ fontSize: "1.1rem" }} />
            {movie.vote_average?.toFixed(1) || "0.0"}
          </span>
          <span>{getYear(movie) ?? STRINGS.common.unknownYear}</span>
        </div>
        <AddToWatchlistBtn movie={movie} compact />
      </div>
    </Link>
  );
};

export default MovieCard;
