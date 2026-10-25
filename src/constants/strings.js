// ############ All UI text lives here ############
// To add a translation later, create another object with the same shape.

export const LINKS = {
  portfolio: "https://sa3ed-portfolio.netlify.app",
  github: "https://github.com/Sa3ed-031",
  tmdb: "https://www.themoviedb.org",
};

export const STRINGS = {
  common: {
    addToList: "Add to list",
    removeFromList: "Remove from list",
    watchTrailer: "Watch Trailer",
    closeTrailer: "Close trailer",
    trailerTitle: (title) => `${title} – Trailer`,
    noTitle: "Untitled",
    unknownYear: "----",
    errorTitle: "Something went wrong!",
    errorHint: "Please check your internet connection or try again.",
    errorGeneric: "Something went wrong while loading data.",
    retry: "Try again",
    noResults: "Nothing to show here.",
  },

  nav: {
    links: [
      { title: "Movies", destination: "/movies" },
      { title: "TV Shows", destination: "/tv" },
      { title: "Trending", destination: "/trending" },
      { title: "My List", destination: "/watchlist" },
    ],
    searchPlaceholder: "Search movies & TV shows...",
    searchLabel: "Search",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  home: {
    newRelease: "NEW RELEASE",
    trending: "TRENDING",
    trendingNow: "Trending Now",
    seeAll: "See All",
  },

  movies: {
    tabs: {
      now_playing: "Now Playing",
      popular: "Popular",
      top_rated: "Top Rated",
      upcoming: "Upcoming",
    },
    empty: "No movies found.",
  },

  tv: {
    tabs: {
      airing_today: "Airing Today",
      on_the_air: "On The Air",
      popular: "Popular",
      top_rated: "Top Rated",
    },
    empty: "No TV shows found.",
  },

  trending: {
    title: "Trending This Week",
    empty: "No trending titles to show.",
  },

  search: {
    resultsFor: (query, count) =>
      `Results for "${query}" · ${count.toLocaleString("en-US")} found`,
    discoverTitle: (count) =>
      `Discover Movies · ${count.toLocaleString("en-US")} found`,
    pageFilterNote: (shown, total) =>
      `Filters narrow the results on this page: showing ${shown} of ${total}.`,
    empty: "No results found. Try another search or loosen the filters.",
    filters: "Filters",
    refine: "Refine your search",
    showFilters: "Show filters",
    hideFilters: "Hide filters",
    genres: "Genres",
    year: "Year",
    rating: "Rating",
    language: "Language",
    sortBy: "Sort by",
    any: "Any",
    clearAll: "Clear All",
    removeFilter: (label) => `Remove filter ${label}`,
    ratingOption: (value) => `${value}+ stars`,
    sortOptions: {
      relevance: "Relevance",
      popularity: "Popularity",
      rating: "Rating",
      newest: "Newest",
    },
    languages: {
      en: "English",
      ar: "Arabic",
      fr: "French",
      es: "Spanish",
      de: "German",
      it: "Italian",
      ja: "Japanese",
      ko: "Korean",
      hi: "Hindi",
      tr: "Turkish",
      zh: "Chinese",
    },
  },

  watchlist: {
    title: "My Watchlist",
    emptyTitle: "Your list is empty",
    emptyText: "Add your favorite movies and shows to watch them later.",
    explore: "Explore Movies",
  },

  details: {
    notFound: "Title not found!",
    story: "Storyline",
    noOverview: "No overview available for this title yet.",
    unknownRuntime: "N/A",
    runtime: (hours, mins) => (hours > 0 ? `${hours}h ${mins}m` : `${mins}m`),
    seasons: (count) => `${count} season${count === 1 ? "" : "s"}`,
    officialSite: "Official Website",
    backHome: "Back to Home",
    cast: "Top Cast",
    similar: "You May Also Like",
  },

  footer: {
    builtBy: "Built by Saeed Al-Haj Hussein",
    github: "GitHub",
    tmdbAttribution:
      "This product uses the TMDB API but is not endorsed or certified by TMDB.",
    copyright: (year) => `© ${year} ZMovie. All rights reserved.`,
  },
};
