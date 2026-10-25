export const getMediaType = (item) =>
  item?.media_type ??
  (item?.title === undefined && item?.name ? "tv" : "movie");

export const getTitle = (item) => item?.title ?? item?.name ?? "";

export const getOriginalTitle = (item) =>
  item?.original_title ?? item?.original_name ?? "";

export const getReleaseDate = (item) =>
  item?.release_date || item?.first_air_date || "";

export const getYear = (item) => {
  const date = getReleaseDate(item);
  return date ? new Date(date).getFullYear() : null;
};

export const getDetailsPath = (item) =>
  `${getMediaType(item) === "tv" ? "/tv" : "/movies"}/${item.id}`;

export const getMediaKey = (item) => `${getMediaType(item)}-${item.id}`;
