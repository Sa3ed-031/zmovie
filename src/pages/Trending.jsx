import { useState } from "react";

import useFetch from "../hooks/useFetch";
import { fetchTrending } from "../api/tmdb";
import { STRINGS } from "../constants/strings";
import MovieGrid from "../components/common/MovieGrid";
import ErrorMessage from "../components/common/ErrorMessage";
import PaginationButtons from "../components/common/PaginationButtons";

export default function Trending() {
  const [page, setPage] = useState(1);

  const fetchFunction = () => fetchTrending("week", page);
  const { data, loading, error, refetch } = useFetch(fetchFunction, [page]);

  const results = data?.results || [];
  const totalPages = data?.total_pages || 0;

  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-on-surface">
        {STRINGS.trending.title}
      </h1>

      <MovieGrid
        items={results}
        loading={loading}
        emptyMessage={STRINGS.trending.empty}
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
