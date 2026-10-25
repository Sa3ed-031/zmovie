import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import { STRINGS } from "../../constants/strings";
import { useWatchlist } from "../../context/WatchlistContext";

const AddToWatchlistBtn = ({ movie, compact = false }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inList = isInWatchlist(movie);

  if (!movie) return null;

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    inList ? removeFromWatchlist(movie) : addToWatchlist(movie);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={inList}
      className={`w-full rounded-lg flex items-center justify-center gap-1 font-bold leading-tight cursor-pointer transition-all duration-300 ${
        compact ? "px-2 py-1.5 text-xs" : "px-4 py-2 text-sm"
      } ${
        inList
          ? "border border-white bg-white text-gray-900 hover:bg-white/85"
          : "border border-white/60 bg-black/20 text-white hover:bg-white/15"
      }`}
    >
      {inList ? (
        <DoneOutlinedIcon sx={{ fontSize: compact ? "1rem" : "1.25rem" }} />
      ) : (
        <AddOutlinedIcon sx={{ fontSize: compact ? "1rem" : "1.25rem" }} />
      )}
      {inList ? STRINGS.common.removeFromList : STRINGS.common.addToList}
    </button>
  );
};
export default AddToWatchlistBtn;
