import { NavLink, useNavigate } from "react-router-dom";
import TableRowsIcon from "@mui/icons-material/TableRows";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";

import Logo from "./Logo";
import { STRINGS } from "../../constants/strings";
import { useShowNavbar } from "../../context/NavbarContext";

const links = STRINGS.nav.links;

export default function Navbar() {
  const { showNavbar, setShowNavbar } = useShowNavbar();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();

    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const linkClass = ({ isActive }) =>
    `pb-1 transition-all duration-300 hover:opacity-80 ${
      isActive
        ? "font-bold border-b-2 border-primary-container text-primary-container"
        : "font-medium hover:text-on-surface"
    }`;

  return (
    <header className="p-4 sm:px-8 sticky top-0 left-0 right-0 z-99 flex flex-col gap-4 backdrop-blur-3xl">
      <div className="flex items-center justify-between gap-4">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          <LinksList />
        </nav>

        {renderSearchForm("hidden lg:block w-64")}

        <button
          type="button"
          aria-label={showNavbar ? STRINGS.nav.closeMenu : STRINGS.nav.openMenu}
          aria-expanded={showNavbar}
          className="relative md:hidden cursor-pointer"
          onClick={() => setShowNavbar((prev) => !prev)}
        >
          {showNavbar ? (
            <CloseIcon className="text-primary-container" />
          ) : (
            <TableRowsIcon className="text-primary-container" />
          )}
        </button>
      </div>

      <nav
        className={`${
          showNavbar ? "flex" : "hidden"
        } md:hidden flex-col gap-4 px-[5%] py-4 shadow-md border-t border-white/10`}
      >
        <LinksList />
      </nav>

      {renderSearchForm("lg:hidden w-full")}
    </header>
  );

  function renderSearchForm(className) {
    return (
      <form
        role="search"
        className={`relative ${className}`}
        onSubmit={handleSearch}
      >
        <SearchIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
          sx={{ fontSize: "1.25rem" }}
        />
        <input
          type="search"
          aria-label={STRINGS.nav.searchLabel}
          placeholder={STRINGS.nav.searchPlaceholder}
          className="w-full py-2 pl-10 pr-4 rounded-full text-on-surface focus:outline-none focus:border-primary-container transition-colors duration-300 border border-white/10 bg-[#1A1A1C]"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </form>
    );
  }

  function LinksList() {
    return (
      <>
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.destination}
            end={link.destination === "/"}
            className={linkClass}
            onClick={() => {
              setShowNavbar(false);
            }}
          >
            {link.title}
          </NavLink>
        ))}
      </>
    );
  }
}
