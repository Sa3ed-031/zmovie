import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";

import { STRINGS } from "../../constants/strings";
import { getMediaKey } from "../../utils/media";
import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";

// Shared grid: skeletons while loading, a friendly message when empty
const MovieGrid = ({
  items = [],
  loading = false,
  skeletonCount = 10,
  emptyMessage = STRINGS.common.noResults,
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      {loading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        : items.map((item) => <MovieCard key={getMediaKey(item)} movie={item} />)}
    </div>
  );
};

export default MovieGrid;
