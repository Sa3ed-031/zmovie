import { useState } from "react";

import {
  fetchAiringTodayTv,
  fetchOnTheAirTv,
  fetchPopularByType,
  fetchTopRatedByType,
} from "../api/tmdb";
import useFetch from "../hooks/useFetch";
import { STRINGS } from "../constants/strings";
import MovieGrid from "../components/common/MovieGrid";
import ErrorMessage from "../components/common/ErrorMessage";
import MoviesTVsTaps from "../components/common/MoviesTVsTaps";
import PaginationButtons from "../components/common/PaginationButtons";

const labels = STRINGS.tv.tabs;
const tabs = [
  { key: "airing_today", label: labels.airing_today, fetch: fetchAiringTodayTv },
  { key: "on_the_air", label: labels.on_the_air, fetch: fetchOnTheAirTv },
  { key: "popular", label: labels.popular, fetch: fetchPopularByType },
  { key: "top_rated", label: labels.top_rated, fetch: fetchTopRatedByType },
];

export default function TvShows() {
  const [activeTab, setActiveTab] = useState("airing_today");
  const [page, setPage] = useState(1);

  const currentTab = tabs.find((tab) => tab.key === activeTab);
  const fetchFunction = () => currentTab.fetch(page, "tv");

  const { data, loading, error, refetch } = useFetch(fetchFunction, [
    activeTab,
    page,
  ]);

  // These endpoints don't send media_type, so tell the cards they're TV shows
  const shows = (data?.results || []).map((show) => ({
    ...show,
    media_type: "tv",
  }));
  const totalPages = data?.total_pages || 0;
  const pageTitle = `${currentTab.label}`;

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

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
        items={shows}
        loading={loading}
        emptyMessage={STRINGS.tv.empty}
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
