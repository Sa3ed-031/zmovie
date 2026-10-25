import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import { IMAGE_BASE_URL } from "../../api/tmdb";
import { STRINGS } from "../../constants/strings";

const CastList = ({ cast = [] }) => {
  if (cast.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-on-surface">
        {STRINGS.details.cast}
      </h2>
      {/* Scrolls inside the row only, never the page */}
      <ul className="flex gap-4 overflow-x-auto pb-2 snap-x">
        {cast.map((person) => (
          <li
            key={person.credit_id ?? person.id}
            className="w-28 shrink-0 snap-start flex flex-col gap-2 text-center"
          >
            {person.profile_path ? (
              <img
                src={`${IMAGE_BASE_URL}w185${person.profile_path}`}
                alt={person.name}
                loading="lazy"
                className="w-28 aspect-2/3 object-cover rounded-lg bg-surface-container"
              />
            ) : (
              <div className="w-28 aspect-2/3 flex items-center justify-center rounded-lg bg-surface-container">
                <PersonOutlinedIcon
                  className="text-gray-500"
                  sx={{ fontSize: "2.5rem" }}
                />
              </div>
            )}
            <div>
              <p className="text-sm font-semibold leading-tight line-clamp-2 text-on-surface">
                {person.name}
              </p>
              {person.character && (
                <p className="text-xs leading-tight line-clamp-2 text-gray-400">
                  {person.character}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CastList;
