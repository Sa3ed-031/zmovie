import StarIcon from "@mui/icons-material/Star";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import { STRINGS } from "../../constants/strings";
import { getOriginalTitle, getTitle, getYear } from "../../utils/media";

const Separator = () => (
  <span aria-hidden="true" className="text-xs text-gray-500">
    •
  </span>
);

const MovieInfo = ({ movie }) => {
  const title = getTitle(movie);
  const originalTitle = getOriginalTitle(movie);

  const formatRuntime = (minutes) => {
    if (!minutes) return STRINGS.details.unknownRuntime;
    return STRINGS.details.runtime(Math.floor(minutes / 60), minutes % 60);
  };

  // Movies have "runtime", TV shows have episode runtimes & seasons
  const runtime = movie.runtime ?? movie.episode_run_time?.[0];

  return (
    <>
      <h1 className="md:text-4xl text-3xl font-bold flex flex-col">
        <span>{title}</span>
        {originalTitle && originalTitle !== title && (
          <span className="text-xl text-gray-400">({originalTitle})</span>
        )}
      </h1>

      {movie.tagline && (
        <p className="text-sm italic text-gray-400">{movie.tagline}</p>
      )}

      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
        <span className="flex gap-1 items-center text-on-surface">
          <StarIcon className="text-yellow-500" sx={{ fontSize: "1.25rem" }} />
          {movie.vote_average?.toFixed(1)} / 10
        </span>
        <Separator />
        <span>{getYear(movie) ?? STRINGS.common.unknownYear}</span>
        <Separator />
        <span>{formatRuntime(runtime)}</span>
        {movie.number_of_seasons > 0 && (
          <>
            <Separator />
            <span>{STRINGS.details.seasons(movie.number_of_seasons)}</span>
          </>
        )}

        <div className="flex flex-wrap gap-1">
          {movie.genres?.map((genre) => (
            <span
              key={genre.id}
              className="text-xs px-2 py-1 rounded-full border backdrop-blur-sm border-blue-400/30 text-white bg-blue-600/30"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 backdrop-blur-sm rounded-xl border border-white/10 bg-black/30">
        <h2 className="text-lg font-semibold flex items-center gap-1 text-on-surface">
          <AutoStoriesIcon sx={{ fontSize: "1.25rem" }} />
          {STRINGS.details.story}
        </h2>
        <p className="text-sm leading-relaxed text-gray-300">
          {movie.overview || STRINGS.details.noOverview}
        </p>
      </div>
    </>
  );
};

export default MovieInfo;
