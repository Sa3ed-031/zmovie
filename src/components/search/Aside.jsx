import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";

import { STRINGS } from "../../constants/strings";

const text = STRINGS.search;

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1950 + 2 }, (_, i) =>
  String(CURRENT_YEAR + 1 - i),
);
const RATINGS = ["5", "6", "7", "8"];

const selectClass =
  "w-full px-3 py-2 rounded-lg cursor-pointer text-on-surface border border-white/10 bg-[#1A1A1C] focus:outline-none focus:border-primary-container";

const FilterSelect = ({ Icon, label, value, onChange, options }) => (
  <label className="flex flex-col gap-2">
    <span className="flex items-center gap-2 text-on-surface">
      <Icon sx={{ fontSize: "1.25rem" }} />
      {label}
    </span>
    <select
      className={selectClass}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">{text.any}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

// filters: { genres: number[], year, minRating, language }
const Aside = ({ filters, genres = [], onChange, className = "" }) => {
  const toggleGenre = (id) =>
    onChange({
      genres: filters.genres.includes(id)
        ? filters.genres.filter((genreId) => genreId !== id)
        : [...filters.genres, id],
    });

  return (
    <aside
      className={`${className} md:w-56 md:sticky md:top-36 lg:top-24 md:self-start md:max-h-[calc(100vh-8rem)] overflow-y-auto shrink-0 p-4 flex-col gap-6 rounded-xl border border-white/10 backdrop-blur-xl bg-surface-container/60`}
    >
      <div>
        <h2 className="text-xl font-semibold text-primary-container">
          {text.filters}
        </h2>
        <p className="text-sm text-on-surface-variant">{text.refine}</p>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 flex items-center gap-2 font-bold text-primary-container">
          <CategoryOutlinedIcon sx={{ fontSize: "1.25rem" }} />
          {text.genres}
        </legend>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
          {genres.map((genre) => (
            <label
              key={genre.id}
              className="flex items-center gap-2 cursor-pointer text-sm text-on-surface"
            >
              <input
                type="checkbox"
                className="cursor-pointer accent-primary-container"
                checked={filters.genres.includes(genre.id)}
                onChange={() => toggleGenre(genre.id)}
              />
              {genre.name}
            </label>
          ))}
        </div>
      </fieldset>

      <FilterSelect
        Icon={CalendarTodayIcon}
        label={text.year}
        value={filters.year}
        onChange={(year) => onChange({ year })}
        options={YEARS.map((year) => ({ value: year, label: year }))}
      />
      <FilterSelect
        Icon={StarPurple500Icon}
        label={text.rating}
        value={filters.minRating}
        onChange={(minRating) => onChange({ minRating })}
        options={RATINGS.map((value) => ({
          value,
          label: text.ratingOption(value),
        }))}
      />
      <FilterSelect
        Icon={TranslateOutlinedIcon}
        label={text.language}
        value={filters.language}
        onChange={(language) => onChange({ language })}
        options={Object.entries(text.languages).map(([value, label]) => ({
          value,
          label,
        }))}
      />
    </aside>
  );
};

export default Aside;
