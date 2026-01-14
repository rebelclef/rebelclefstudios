import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../content/projects";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Home() {
  const [reelOpen, setReelOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Parallax refs
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroLayerRef = useRef<HTMLDivElement | null>(null);

  const bottomSectionRef = useRef<HTMLElement | null>(null);
  const bottomLayerRef = useRef<HTMLDivElement | null>(null);

  const rafRef = useRef<number | null>(null);

  // ✅ Hosted hero video URL (set in .env.local and in Vercel env vars)
  const HERO_URL = import.meta.env.VITE_HERO_URL as string | undefined;

  // ✅ Paste your REEL EMBED URL here:
  const REEL_EMBED_URL =
    "https://www.youtube.com/embed/MZJBQ75lG4E?autoplay=1&rel=0&modestbranding=1";

  useEffect(() => {
    // Start 'Enjoy the view' animation after 0.5 seconds
    const textTimer = setTimeout(() => setShowText(true), 500);

    // Text animation duration (2000ms) + stagger (2*200ms)
    const buttonTimer = setTimeout(() => setShowButton(true), 500 + 2000 + 400);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  // Lock body scroll while modal is open + allow ESC to close
  useEffect(() => {
    if (!reelOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setReelOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [reelOpen]);

  // Sort projects newest -> oldest (date preferred, then year) and show 12 (4x3)
  const recent = useMemo(() => {
    return [...projects]
      .sort((a: any, b: any) => {
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (a.year && b.year) return b.year - a.year;
        return 0;
      })
      .slice(0, 12);
  }, []);

  // Parallax update (no sticky, no extra scroll zones)
  useEffect(() => {
    // These control “how much drift”
    const HERO_DRIFT_PX = 70; // try 40 for subtler, 90 for stronger
    const BOTTOM_DRIFT_PX = 50;

    const update = () => {
      rafRef.current = null;
      const vh = window.innerHeight || 1;

      // HERO drift based on hero’s position in viewport (0..1 while visible)
      if (heroSectionRef.current && heroLayerRef.current) {
        const rect = heroSectionRef.current.getBoundingClientRect();

        // progress: 0 when hero top hits bottom of viewport, 1 when hero bottom hits top of viewport
        const raw = (vh - rect.top) / (vh + rect.height);
        const p = clamp(raw, 0, 1);

        // centered drift: -½..+½
        const y = (p - 0.5) * HERO_DRIFT_PX;
        heroLayerRef.current.style.transform = `translate3d(0, ${Math.round(
          y
        )}px, 0) scale(1.12)`;
      }

      // BOTTOM drift based on its position in viewport
      if (bottomSectionRef.current && bottomLayerRef.current) {
        const rect = bottomSectionRef.current.getBoundingClientRect();
        const raw = (vh - rect.top) / (vh + rect.height);
        const p = clamp(raw, 0, 1);

        const y = (p - 0.5) * BOTTOM_DRIFT_PX;
        bottomLayerRef.current.style.transform = `translate3d(0, ${Math.round(
          y
        )}px, 0) scale(1.12)`;
      }
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div>
      {/* HERO */}
      <section
        ref={heroSectionRef}
        className="relative min-h-[100vh] w-full overflow-hidden"
      >
        {/* Parallax layer (we move THIS div, not the <video> directly) */}
        <div
          ref={heroLayerRef}
          className="absolute inset-0 will-change-transform"
        >
          <video
            className="h-full w-full object-cover"
            src={HERO_URL || "/hero.mp4"}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Centered content */}
        <div className="relative z-10 flex min-h-[100vh] flex-col items-center justify-center px-6 text-center">
          <h1
            className="flex gap-x-4 text-5xl font-semibold tracking-tight text-white sm:text-6xl"
          >
            {["Enjoy", "the", "view."].map((word, i) => (
              <span
                key={word}
                className={[
                  "inline-block transition-all duration-[2000ms] ease-out",
                  showText ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90",
                ].join(" ")}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {word}
              </span>
            ))}
          </h1>

          <div
            className={[
              "mt-8 transition-all duration-1000 ease-out",
              showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={() => setReelOpen(true)}
              className="
                inline-flex items-center
                rounded-xl
                border border-white/80
                px-6 py-3
                text-sm font-light
                uppercase tracking-widest
                text-white
                transition-all duration-300
                hover:bg-[#284a9c] hover:text-white hover:border-[#284a9c] hover:scale-[1.05]
              "
            >
              or, watch the reel
            </button>
          </div>
        </div>

        {/* Modal */}
        {reelOpen && (
          <div
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-label="Reel video"
          >
            {/* Backdrop (click to close) */}
            <button
              type="button"
              aria-label="Close reel"
              onClick={() => setReelOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal panel */}
            <div className="relative mx-auto flex h-full max-w-5xl items-center px-6">
              <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-xl">
                <button
                  type="button"
                  onClick={() => setReelOpen(false)}
                  className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white/80 backdrop-blur transition-colors hover:bg-black/70 hover:text-white"
                  aria-label="Close"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <div
                  className="relative w-full"
                  style={{ paddingTop: "56.25%" }}
                >
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={REEL_EMBED_URL}
                    title="Reel"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* RECENT WORK GRID — normal scroll */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {recent.map((p) => (
              <Link
                key={p.slug}
                to={`/work/${p.slug}`}
                className="group relative block aspect-video overflow-hidden bg-zinc-100"
                aria-label={p.title}
                title={p.title}
              >
                <img
                  src={p.thumbnailUrl}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
              </Link>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              to="/work"
              className="
                inline-flex items-center
                rounded-xl
                border border-zinc-300
                px-6 py-3
                text-sm font-light
                uppercase tracking-widest
                text-zinc-800
                transition-all duration-300
                hover:bg-[#284a9c] hover:text-white hover:border-zinc-900 hover:scale-[1.05]
              "
            >
              more →
            </Link>
          </div>
        </div>
      </section>

      {/* BOTTOM IMAGE + TEXT */}
      <section ref={bottomSectionRef} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            ref={bottomLayerRef}
            className="absolute inset-0 will-change-transform"
          >
            <img
              src="/SpaceX_wide.jpg"
              alt=""
              className="h-full w-full object-cover object-[center_50%]"
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-32 sm:py-40">
          <div className="mx-auto max-w-3xl">
            <p className="text-center text-2xl font-light leading-relaxed text-white sm:text-3xl">
              Rebel Clef is an award-winning creative studio passionate
              about visual storytelling. Stay grounded or take flight
              with us and let’s create something to be proud of.
            </p>

            <div className="mt-10 flex justify-center">
              <Link
                to="/contact"
                className="
                  inline-flex items-center
                  rounded-xl
                  border border-white/80
                  px-6 py-3
                  text-sm font-light
                  uppercase tracking-widest
                  text-white
                  transition-all duration-300
                  hover:bg-[#284a9c] hover:text-white hover:border-[#284a9c] hover:scale-[1.05]
                "
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
