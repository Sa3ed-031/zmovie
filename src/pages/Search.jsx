import { useSearchParams } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { useState } from "react";

import useFetch from "../hooks/useFetch";
import { STRINGS } from "../constants/strings";
import { getReleaseDate, getYear } from "../utils/media";
import { discoverMovies, fetchGenres, searchMulti } from "../api/tmdb";

import Aside from "../components/search/Aside";
import MovieGrid from "../components/common/MovieGrid";
import ErrorMessage from "../components/common/ErrorMessage";
import PaginationButtons from "../components/common/PaginationButtons";

const text = STRINGS.search;

const EMPTY_FILTERS = {
  genres: [],
  year: "",
  minRating: "",
  language: "",
  sort: "default",
};

// TMDB's search endpoint can't filter by genre/rating/language,
// so while searching, filters & sorting are applied to the current page.
const applyFilters = (items, filters) =>
  items.filter(
    (item) =>
      filters.genres.every((id) => item.genre_ids?.includes(id)) &&
      (!filters.year || getYear(item) === Number(filters.year)) &&
      (!filters.minRating || item.vote_average >= Number(filters.minRating)) &&
      (!filters.language || item.original_language === filters.language),
  );

const sortItems = (items, sort) => {
  if (sort === "rating")
    return [...items].sort((a, b) => b.vote_average - a.vote_average);
  if (sort === "newest")
    return [...items].sort((a, b) =>
      getReleaseDate(b).localeCompare(getReleaseDate(a)),
    );
  return items;
};

const mergeGenres = (...lists) => {
  const byId = new Map(lists.flat().map((genre) => [genre.id, genre]));
  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
};

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.trim() || "";
  const isSearch = Boolean(query);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [showFilters, setShowFilters] = useState(false);

  // New search → back to the first page
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setPage(1);
  }

  const { data: genreLists } = useFetch(() =>
    Promise.all([fetchGenres("movie"), fetchGenres("tv")]),
  );
  const [movieGenres = [], tvGenres = []] = genreLists || [];
  // Search returns movies & TV shows, Discover returns movies only
  const genres = isSearch ? mergeGenres(movieGenres, tvGenres) : movieGenres;

  const { data, loading, error, refetch } = useFetch(
    () => (isSearch ? searchMulti(query, page) : discoverMovies(filters, page)),
    // Discover filters on the server, so it refetches when filters change
    [query, page, isSearch ? "" : JSON.stringify(filters)],
  );

  const results = data?.results || [];
  const totalPages = data?.total_pages || 0;
  const totalResults = data?.total_results || 0;
  const visible = isSearch
    ? sortItems(applyFilters(results, filters), filters.sort)
    : results;

  const updateFilters = (patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    if (!isSearch) setPage(1);
  };

  const genreName = (id) => genres.find((genre) => genre.id === id)?.name ?? id;
  const activeChips = [
    ...filters.genres.map((id) => ({
      key: `genre-${id}`,
      label: genreName(id),
      remove: () =>
        updateFilters({ genres: filters.genres.filter((g) => g !== id) }),
    })),
    filters.year && {
      key: "year",
      label: filters.year,
      remove: () => updateFilters({ year: "" }),
    },
    filters.minRating && {
      key: "rating",
      label: text.ratingOption(filters.minRating),
      remove: () => updateFilters({ minRating: "" }),
    },
    filters.language && {
      key: "language",
      label: text.languages[filters.language],
      remove: () => updateFilters({ language: "" }),
    },
  ].filter(Boolean);

  const sortOptions = [
    {
      value: "default",
      label: isSearch ? text.sortOptions.relevance : text.sortOptions.popularity,
    },
    { value: "rating", label: text.sortOptions.rating },
    { value: "newest", label: text.sortOptions.newest },
  ];

  return (
    <div className="min-h-[58vh] flex flex-col md:flex-row gap-6">
      <button
        type="button"
        onClick={() => setShowFilters((prev) => !prev)}
        aria-expanded={showFilters}
        className="md:hidden self-start px-4 py-2 flex items-center gap-2 rounded-full cursor-pointer text-on-surface border border-white/10 bg-[#1A1A1C]"
      >
        <TuneOutlinedIcon sx={{ fontSize: "1.25rem" }} />
        {showFilters ? text.hideFilters : text.showFilters}
      </button>

      <Aside
        className={showFilters ? "flex" : "hidden md:flex"}
        filters={filters}
        genres={genres}
        onChange={updateFilters}
      />

      <section className="flex-1 min-w-0 flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-normal text-primary-container break-words">
          {isSearch
            ? text.resultsFor(query, totalResults)
            : text.discoverTitle(totalResults)}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-3 flex-wrap items-center">
            {activeChips.map((chip) => (
              <span
                key={chip.key}
                className="flex items-center gap-2 bg-[#1A1A1C] text-on-surface pl-4 pr-2 py-1.5 rounded-full text-sm border border-white/10"
              >
                {chip.label}
                <button
                  type="button"
                  onClick={chip.remove}
                  aria-label={text.removeFilter(chip.label)}
                  className="cursor-pointer hover:text-primary-container transition-all duration-300"
                >
                  <CloseOutlinedIcon sx={{ fontSize: "1.1rem" }} />
                </button>
              </span>
            ))}
            {activeChips.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  updateFilters({ ...EMPTY_FILTERS, sort: filters.sort })
                }
                className="cursor-pointer text-primary-container text-sm font-medium hover:underline"
              >
                {text.clearAll}
              </button>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-on-surface-variant">
            {text.sortBy}:
            <select
              value={filters.sort}
              onChange={(event) => updateFilters({ sort: event.target.value })}
              className="px-3 py-2 rounded-full cursor-pointer bg-[#1A1A1C] border border-white/10 text-on-surface focus:outline-none focus:border-primary-container"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {isSearch && activeChips.length > 0 && !loading && (
          <p className="text-sm text-gray-400">
            {text.pageFilterNote(visible.length, results.length)}
          </p>
        )}

        {error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : (
          <MovieGrid
            items={visible}
            loading={loading}
            emptyMessage={text.empty}
          />
        )}

        <PaginationButtons
          loading={loading}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
        />
      </section>
    </div>
  );
}
