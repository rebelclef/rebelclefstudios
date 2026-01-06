import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ViewCounter from "../components/ViewCounter";

const CLIENT_LOGOS = [
  "Deloitte.png",
  "Microsoft.png",
  "NASA.webp",
  "YouTube.png",
  "WotC.png",
  "Xbox.png",
  "TYRSport.png",
  "IgniteSeattle_logo.png",
  "Gates_Foundation.png",
  "Tesla.png",
  "JKLA.png",
  "SawStop.webp",
  "GeekWire.png",
  "KwikLok.png",
];

type ViewcountResponse = {
  total?: number;
};

export default function About() {
  const [y, setY] = useState(0);

  // Total views counter
  const [views, setViews] = useState<number | null>(null);
  const [loadingViews, setLoadingViews] = useState(true);

  // Logo cloud reveal
  const [showLogos, setShowLogos] = useState(false);

  // Scroll/parallax
  useEffect(() => {
    const onScroll = () => setY(window.scrollY || 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch view totals (same-origin to avoid CORS/preflight)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoadingViews(true);

      try {
        const url = `/api/viewcount?t=${Date.now()}`;
        const r = await fetch(url, { cache: "no-store" });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);

        const data = (await r.json()) as ViewcountResponse;

        if (cancelled) return;

        const n = Number(data?.total);
        setViews(Number.isFinite(n) ? n : null);
      } catch (err) {
        if (cancelled) return;
        console.warn("viewcount fetch failed:", err);
        setViews(null);
      } finally {
        if (cancelled) return;
        setLoadingViews(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Reveal the logo cloud a moment after views load
  useEffect(() => {
    if (views == null) return;
    const t = setTimeout(() => setShowLogos(true), 1800);
    return () => clearTimeout(t);
  }, [views]);

  // Parallax tuning
  const topParallax = y * 0.25;
  const bottomParallax = y * 0.12;

  // Calculate logo data
  const logoData = useMemo(() => {
    return CLIENT_LOGOS.map((logo) => {
      let scale = 1;
      if (logo.includes("KwikLok")) scale = 1.3;
      else if (logo.includes("IgniteSeattle")) scale = 0.9;
      else if (logo.includes("Microsoft")) scale = 1.3;
      else if (logo.includes("NASA")) scale = 0.95;
      else if (logo.includes("GeekWire")) scale = 1.25;
      else if (logo.includes("Xbox")) scale = 1.15;
      else if (logo.includes("Tesla")) scale = 1.2;
      else if (logo.includes("YouTube")) scale = 1.1;

      return {
        src: `/logos/${logo}`,
        scale,
      };
    });
  }, []);

  return (
    <div className="bg-white">
      {/* TOP FULLSCREEN IMAGE HERO */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/zimm-dolly.jpg"
            alt=""
            className="h-full w-full object-cover"
            style={{
              transform: `translateY(${topParallax}px) scale(1.12)`,
              filter: showLogos ? "blur(5px)" : "none",
              transition: "filter 1.5s ease-out",
            }}
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-start px-6 pt-24 text-center sm:pt-36">
          <div className="relative">
            {loadingViews ? (
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Loading…
              </h1>
            ) : views != null ? (
              <>
                {/* Counter - Centered exactly where 'Loading...' was */}
                <div className="relative z-10 origin-center scale-[0.65] sm:scale-[0.8] md:scale-100">
                  <ViewCounter total={views} />
                </div>

                {/* Logos - Positioned absolutely below so they don't shift the center */}
                <div className="absolute left-1/2 top-full mt-8 w-[90vw] max-w-7xl -translate-x-1/2 sm:mt-12">
                  <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 [--base-w:5rem] sm:[--base-w:6rem] md:[--base-w:7rem] lg:[--base-w:120px]">
                    {logoData.map((item, i) => (
                      <img
                        key={item.src}
                        src={item.src}
                        alt=""
                        className="transition-all duration-[2000ms] ease-out"
                        style={{
                          width: `calc(var(--base-w) * ${item.scale})`,
                          height: "auto",
                          opacity: showLogos ? 1 : 0,
                          transform: `scale(${showLogos ? 1 : 0.8})`,
                          transitionDelay: `${i * 50}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Views and counting…
              </h1>
            )}
          </div>
        </div>
      </section>

      {/* TEXT BLOCK BETWEEN IMAGES */}
      <section className="mx-auto max-w-4xl px-6 py-6 sm:py-10">
        <div className="space-y-6 text-base leading-[1.75] text-zinc-700 sm:text-lg">
          <p>
            From a young age, David Zimmermann was determined to become either a
            doctor, an astronaut, or a magician. He became none of those, but
            instead developed an appreciation for the “magic” of the movies. He
            is often considered to be a magician in the editing room, however,
            so perhaps his childhood dream really did come true. David enjoys
            getting good exposure (in camera and online), and staying active in
            an attempt to offset the languor of post-production.
          </p>

          <p>
            Before founding Rebel Clef in 2018, David spent more than five years
            as a core member of the Seattle-based creative powerhouse,{" "}
            <a
              href="https://cinesaurus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-zinc-400 transition-colors hover:decoration-zinc-900"
            >
              Cinesaurus
            </a>
            . There, he and the team created a plethora of high-end
            corporate/commercial/branded content, while simultaneously
            developing several YouTube channels such as{" "}
            <a
              href="https://www.youtube.com/@GrittyReboots"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-zinc-400 transition-colors hover:decoration-zinc-900"
            >
              Gritty Reboots
            </a>
            . To this day, their work has been shared by millions around the
            globe, and accumulated well over half a billion views.
          </p>
        </div>
      </section>

      {/* BOTTOM FULLSCREEN IMAGE CTA */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/SpaceX-wide.jpg"
            alt=""
            className="h-full w-full object-cover"
            style={{ transform: `translateY(${bottomParallax - 100}px) scale(1.12)` }}
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Let’s jam.
          </h2>

          <div className="mt-10">
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
                hover:bg-[#1841aa] hover:text-white hover:border-[#1841aa] hover:scale-[1.05]
              "
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
