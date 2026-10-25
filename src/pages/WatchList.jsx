import { Link } from "react-router-dom";

import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import HighQualityOutlinedIcon from "@mui/icons-material/HighQualityOutlined";

import { STRINGS } from "../constants/strings";
import { useWatchlist } from "../context/WatchlistContext";
import MovieGrid from "../components/common/MovieGrid";

export default function Watchlist() {
  const { watchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center gap-4">
        <SubscriptionsOutlinedIcon
          sx={{
            fontSize: "4.5rem",
          }}
        />
        <h2 className="text-3xl font-bold text-gray-300">
          {STRINGS.watchlist.emptyTitle}
        </h2>
        <p className="text-gray-400">{STRINGS.watchlist.emptyText}</p>
        <Link
          to="/movies"
          className="flex items-center gap-1 px-6 py-2 bg-primary-container text-white rounded-lg hover:opacity-80 transition"
        >
          <HighQualityOutlinedIcon />
          {STRINGS.watchlist.explore}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold flex gap-2 items-center text-on-surface">
        <SubscriptionsOutlinedIcon />
        {STRINGS.watchlist.title}
        <span className="text-primary-container">({watchlist.length})</span>
      </h1>
      <MovieGrid items={watchlist} />
    </div>
  );
}
