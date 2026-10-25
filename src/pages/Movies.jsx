import { useState } from "react";

import {
  fetchNowPlayingMovies,
  fetchPopularByType,
  fetchTopRatedByType,
  fetchUpcomingMovies,
} from "../api/tmdb";
import useFetch from "../hooks/useFetch";
import { STRINGS } from "../constants/strings";
import MovieGrid from "../components/common/MovieGrid";
import ErrorMessage from "../components/common/ErrorMessage";
import MoviesTVsTaps from "../components/common/MoviesTVsTaps";
import PaginationButtons from "../components/common/PaginationButtons";

const labels = STRINGS.movies.tabs;
const tabs = [
  { key: "now_playing", label: labels.now_playing, fetch: fetchNowPlayingMovies },
  { key: "popular", label: labels.popular, fetch: fetchPopularByType },
  { key: "top_rated", label: labels.top_rated, fetch: fetchTopRatedByType },
  { key: "upcoming", label: labels.upcoming, fetch: fetchUpcomingMovies },
];

export default function Movies() {
  const [activeTab, setActiveTab] = useState("now_playing");
  const [page, setPage] = useState(1);

  const currentTab = tabs.find((tab) => tab.key === activeTab);
  const fetchFunction = () => currentTab.fetch(page, "movie");

  const { data, loading, error, refetch } = useFetch(fetchFunction, [
    activeTab,
    page,
  ]);

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 0;
  const pageTitle = `${currentTab.label}`;

  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4">
        <h1 className="text-2xl font-bold text-on-surface">{pageTitle}</h1>
        <MoviesTVsTaps
          tabs={tabs}
          setPage={setPage}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <MovieGrid
        items={movies}
        loading={loading}
        emptyMessage={STRINGS.movies.empty}
      />

      <PaginationButtons
        loading={loading}
        totalPages={totalPages}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
