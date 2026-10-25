import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { STRINGS } from "../../constants/strings";

// trailer: a TMDB video object ({ key, site: "YouTube", ... }) or null
const TrailerButton = ({ trailer, title }) => {
  const [open, setOpen] = useState(false);

  // No trailer → no button
  if (!trailer) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full px-4 py-2 text-[18px] rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-all duration-300 hover:opacity-80 shadow-[0_0_20px_rgba(229,9,20,0.4)] text-white bg-primary-container"
      >
        <PlayArrowIcon />
        {STRINGS.common.watchTrailer}
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
        slotProps={{ paper: { sx: { bgcolor: "#000", m: 2, width: "calc(100% - 32px)" } } }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={STRINGS.common.closeTrailer}
          className="absolute top-2 right-2 z-10 p-1 rounded-full cursor-pointer text-white bg-black/60 hover:bg-primary-container transition-colors duration-300"
        >
          <CloseIcon />
        </button>
        <div className="relative w-full aspect-video">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&rel=0`}
            title={STRINGS.common.trailerTitle(title)}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </Dialog>
    </>
  );
};

export default TrailerButton;
