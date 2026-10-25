import { Link } from "react-router-dom";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";

const Logo = () => {
  return (
    <Link to="/" className="logo-icon  flex items-center gap-2 no-underline">
      <LiveTvOutlinedIcon className="text-primary-container" />

      <span className="text-xl italic font-bold bg-clip-text text-transparent bg-linear-to-r from-primary-container/20 to-primary-container">
        <span className="text-on-surface/75">Z</span>Movie
      </span>
    </Link>
  );
};

export default Logo;
