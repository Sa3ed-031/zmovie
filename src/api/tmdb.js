import axios from "axios";

// ############ 1. Axios Initialization ############
// The API key is read ONLY here, from the .env file (see .env.example)
const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "en-US",
  },
});

// Photo URL, without Size
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

// TMDB never serves more than 500 pages
export const MAX_PAGES = 500;

// ############ 2. Helpers #############
const uniqueById = (items = []) => {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.media_type ?? ""}-${item.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

// GET a paginated list and remove duplicate results
const getList = async (url, params) => {
  const response = await apiClient.get(url, { params });
  return { ...response.data, results: uniqueById(response.data.results) };
};

export const findTrailer = (videos = []) =>
  videos.find((video) => video.site === "YouTube" && video.type === "Trailer") ??
  null;

// ############ 3. Common #############
export const fetchPopularByType = (page = 1, type) =>
  getList(`/${type}/popular`, { page });

export const fetchTopRatedByType = (page = 1, type) =>
  getList(`/${type}/top_rated`, { page });

export const fetchTrending = (timeWindow = "week", page = 1) =>
  // timeWindow: 'day' or 'week'
  getList(`/trending/all/${timeWindow}`, { page });

export const searchMulti = async (query, page = 1) => {
  const data = await getList("/search/multi", {
    query,
    page,
    include_adult: false,
  });
  // "multi" also returns people, we only show movies & TV shows
  return {
    ...data,
    results: data.results.filter((item) => item.media_type !== "person"),
  };
};

export const fetchGenres = async (type = "movie") => {
  const response = await apiClient.get(`/genre/${type}/list`);
  return response.data.genres;
};

// details + trailer + cast + similar titles in ONE request
export const fetchDetails = async (type, id) => {
  const response = await apiClient.get(`/${type}/${id}`, {
    params: {
      append_to_response: "videos,credits,recommendations,similar",
      include_video_language: "en,null",
    },
  });
  return response.data;
};

export const fetchTrailer = async (type, id) => {
  const response = await apiClient.get(`/${type}/${id}/videos`, {
    params: { include_video_language: "en,null" },
  });
  return findTrailer(response.data.results);
};

// ############ 4. Movies #############
export const fetchNowPlayingMovies = (page = 1) =>
  getList("/movie/now_playing", { page });

export const fetchUpcomingMovies = (page = 1) =>
  getList("/movie/upcoming", { page });

const DISCOVER_SORT = {
  popularity: { sort_by: "popularity.desc" },
  rating: { sort_by: "vote_average.desc", "vote_count.gte": 300 },
  newest: {
    sort_by: "primary_release_date.desc",
    "primary_release_date.lte": new Date().toISOString().slice(0, 10),
    "vote_count.gte": 10,
  },
};

// filters: { genres: number[], year, minRating, language, sort }
export const discoverMovies = (filters, page = 1) =>
  getList("/discover/movie", {
    page,
    include_adult: false,
    ...(DISCOVER_SORT[filters.sort] ?? DISCOVER_SORT.popularity),
    with_genres: filters.genres.length ? filters.genres.join(",") : undefined,
    primary_release_year: filters.year || undefined,
    with_original_language: filters.language || undefined,
    ...(filters.minRating && {
      "vote_average.gte": filters.minRating,
      "vote_count.gte": 50,
    }),
  });

// ############ 5. TV Shows ############
export const fetchOnTheAirTv = (page = 1) =>
  getList("/tv/on_the_air", { page });

export const fetchAiringTodayTv = (page = 1) =>
  getList("/tv/airing_today", { page });
