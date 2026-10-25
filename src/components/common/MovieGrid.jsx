import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";

import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";
import { getMediaKey } from "../../utils/media";
import { STRINGS } from "../../constants/strings";

const MovieGrid = ({
  items = [],
  loading = false,
  skeletonCount = 10,
  emptyMessage = STRINGS.common.noResults,
  inSearchPage = false,
}) => {
  if (!loading && items.length === 0) {
    return (
      <p className="py-12 text-center flex self-center items-center justify-center gap-1 text-gray-400">
        <TheaterComedyIcon
          className="text-primary-container"
          sx={{ fontSize: "1.5rem" }}
        />
        {emptyMessage}
      </p>
    );
  }

  return (
    <div
      className={`${
        inSearchPage
          ? "lg:grid-cols-4 md:grid-cols-3"
          : "lg:grid-cols-5 md:grid-cols-4"
      } sm:grid-cols-3 sm:gap-4 min-[450px]:grid-cols-2 grid grid-cols-1 gap-3`}
    >
      {loading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        : items.map((item) => (
            <MovieCard key={getMediaKey(item)} movie={item} />
          ))}
    </div>
  );
};

export default MovieGrid;
