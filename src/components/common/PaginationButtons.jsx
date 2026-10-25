import Pagination from "@mui/material/Pagination";
import useMediaQuery from "@mui/material/useMediaQuery";

import { MAX_PAGES } from "../../api/tmdb";

const PaginationButtons = ({ loading, totalPages, page, setPage }) => {
  const isSmallScreen = useMediaQuery("(max-width:640px)");
  const count = Math.min(totalPages, MAX_PAGES);

  if (count <= 1) return null;

  return (
    <Pagination
      className="self-center"
      count={count}
      page={page}
      onChange={(_, value) => setPage(value)}
      disabled={loading}
      variant="outlined"
      size={isSmallScreen ? "small" : "medium"}
      siblingCount={isSmallScreen ? 0 : 1}
      sx={{
        "& .MuiPaginationItem-root": {
          color: "#e9bcb6",
          borderColor: "rgba(229, 9, 20, 0.45)",
        },
        "& .MuiPaginationItem-root:hover": {
          backgroundColor: "rgba(229, 9, 20, 0.16)",
        },
        "& .MuiPaginationItem-root.Mui-selected": {
          backgroundColor: "#e50914",
          color: "#ffffff",
          borderColor: "#e50914",
        },
        "& .MuiPaginationItem-root.Mui-selected:hover": {
          backgroundColor: "#b80710",
        },
      }}
    />
  );
};

export default PaginationButtons;
