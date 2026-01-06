import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Project from "./pages/Project";
import Reel from "./pages/Reel";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Press from "./pages/Press";
import Talent from "./pages/Talent";
import ZimmBuilds from "./pages/ZimmBuilds";
import Footer from "./components/Footer";

// Temporary placeholders so links don't 404.
// Remove these once you create real pages.

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // ✅ avoid flash on reload
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll tracking
  useEffect(() => {
    // Non-home pages should always behave like "scrolled" (white header)
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // sync immediately

    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu with ESC
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const headerIsTransparent = isHome && !scrolled;

  const navItems = [
    { label: "WORK", to: "/work" },
    { label: "TALENT", to: "/talent" },
    { label: "PRESS", to: "/press" },
    { label: "ABOUT", to: "/about" },
    { label: "CONTACT", to: "/contact" },
  ];

  // Subtle letter-spacing animation + consistent typography
  const linkBase =
  "text-[12px] font-light uppercase transition-[color,letter-spacing,text-shadow] duration-300 ease-out tracking-[0.22em] hover:tracking-[0.28em]";

  // Colors:
  // - Home, top: white (hover brand blue)
  // - Scrolled/white header: brand blue (hover slightly darker blue)
  const linkColors = headerIsTransparent
    ? "text-white hover:text-[#284a9c]"
    : "text-[#284a9c] hover:text-[#1f3b7a]";

  return (
    <div className="min-h-dvh">
      <header
        className={[
          "fixed inset-x-0 top-0 z-30",
          "transition-colors duration-300",
          headerIsTransparent
            ? "bg-transparent"
            : "bg-white border-b border-zinc-200",
        ].join(" ")}
      >
        {/* FULL WIDTH: left/right justify to browser edges */}
        <div className="flex w-full items-center px-6 py-3">
          {/* Left: Logo */}
          <div className="flex flex-1 items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Rebel Clef Studios"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Right: Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={[linkBase, linkColors].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Mobile menu button */}
          <div className="flex flex-1 justify-end md:hidden">
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className={[
                "inline-flex items-center justify-center rounded-lg px-3 py-2",
                "transition-colors",
                headerIsTransparent
                  ? "text-white/90 hover:bg-white/10"
                  : "text-[#284a9c] hover:bg-[#284a9c]/10",
              ].join(" ")}
            >
              {menuOpen ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            className={[
              "md:hidden",
              headerIsTransparent
                ? "bg-black/45 backdrop-blur border-t border-white/10"
                : "bg-white border-t border-zinc-200",
            ].join(" ")}
          >
            {/* Container animation */}
            <div
              className={["px-6 py-4", "origin-top"].join(" ")}
              style={{
                transform: "translateY(-6px)",
                opacity: 0,
                animation: "menuIn 220ms ease-out forwards",
              }}
            >
              <div className="flex flex-col items-end gap-3 text-right">
                {navItems.map((item, i) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={["py-2", linkBase, linkColors, "opacity-0"].join(
                      " "
                    )}
                    style={{
                      animation: "itemIn 260ms ease-out forwards",
                      animationDelay: `${60 + i * 55}ms`,
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Keyframes (scoped inlined) */}
            <style>
              {`
                @keyframes menuIn {
                  from { opacity: 0; transform: translateY(-6px); }
                  to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes itemIn {
                  from { opacity: 0; transform: translateY(6px); }
                  to   { opacity: 1; transform: translateY(0); }
                }
              `}
            </style>
          </div>
        )}
      </header>

      {/* Header is fixed, so content needs top padding on ALL pages,
          but on Home we want the hero video to start behind the header.
          So: padding for non-home only. */}
      <main className={isHome ? "" : "pt-[64px] sm:pt-[72px]"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<Project />} />
          <Route path="/reel" element={<Reel />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/talent" element={<Talent />} />
          <Route path="/press" element={<Press />} />
          <Route path="/zimmbuilds" element={<ZimmBuilds />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}