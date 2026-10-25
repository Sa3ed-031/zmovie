import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import AppRouter from "./router/AppRouter";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { WatchlistProvider } from "./context/WatchlistContext";
import { NavbarProvider, useShowNavbar } from "./context/NavbarContext";

function App() {
  return (
    <NavbarProvider>
      <WatchlistProvider>
        <Layout />
      </WatchlistProvider>
    </NavbarProvider>
  );
}

function Layout() {
  const { showNavbar, setShowNavbar } = useShowNavbar();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      className="min-h-screen flex flex-col justify-between gap-4"
      onClick={() => {
        if (showNavbar) setShowNavbar(false);
      }}
    >
      <Navbar />
      <main className="w-full max-w-[1600px] mx-auto flex-1 p-4 sm:px-7">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
