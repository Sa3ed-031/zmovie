import GitHubIcon from "@mui/icons-material/GitHub";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";

import Logo from "./Logo";
import { LINKS, STRINGS } from "../../constants/strings";

const footerLinks = [
  {
    title: STRINGS.footer.builtBy,
    href: LINKS.portfolio,
    Icon: CodeOutlinedIcon,
  },
  { title: STRINGS.footer.github, href: LINKS.github, Icon: GitHubIcon },
];

export default function Footer() {
  return (
    <footer className="w-full p-6 flex flex-col items-center justify-center gap-4 text-center text-sm border-t border-white/5 text-on-surface-variant">
      <Logo />
      <div className="flex sm:flex-row flex-col items-center gap-4">
        {footerLinks.map(({ title, href, Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-colors duration-300 text-on-surface-variant hover:text-primary-container"
          >
            <Icon sx={{ fontSize: "1.1rem" }} />
            {title}
          </a>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 max-w-xl">
        <a href={LINKS.tmdb} target="_blank" rel="noopener noreferrer">
          <img src="/tmdb-logo.svg" alt="TMDB" className="h-4 w-auto" />
        </a>
        <p className="text-xs text-gray-400">
          {STRINGS.footer.tmdbAttribution}
        </p>
      </div>

      <p className="text-xs">
        {STRINGS.footer.copyright(new Date().getFullYear())}
      </p>
    </footer>
  );
}
