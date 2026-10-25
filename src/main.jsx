import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./index.css";

import App from "./App.jsx";

// MUI uses the same font & colors as the rest of the site
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#e50914" },
  },
  typography: {
    fontFamily: '"Cairo", ui-sans-serif, system-ui, "Segoe UI", Roboto, Arial, sans-serif',
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
