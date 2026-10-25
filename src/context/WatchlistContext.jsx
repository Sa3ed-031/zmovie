import { createContext, useContext, useState, useEffect } from "react";

import { getMediaKey, getMediaType } from "../utils/media";

const WatchlistContext = createContext();

const readStoredWatchlist = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("watchlist"));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

// Only keep what the cards need (details responses are large: cast, videos...)
const toWatchlistItem = (item) => ({
  id: item.id,
  media_type: getMediaType(item),
  title: item.title,
  name: item.name,
  poster_path: item.poster_path,
  vote_average: item.vote_average,
  release_date: item.release_date,
  first_air_date: item.first_air_date,
});

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(readStoredWatchlist);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const isInWatchlist = (item) =>
    !!item && watchlist.some((m) => getMediaKey(m) === getMediaKey(item));

  const addToWatchlist = (item) => {
    setWatchlist((prev) => {
      if (prev.some((m) => getMediaKey(m) === getMediaKey(item))) return prev;
      return [...prev, toWatchlistItem(item)];
    });
  };

  const removeFromWatchlist = (item) => {
    setWatchlist((prev) =>
      prev.filter((m) => getMediaKey(m) !== getMediaKey(item)),
    );
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
