import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ViewCounter from "../components/ViewCounter";

// TODO: Add your logo filenames here (must be in public/logos folder)
const CLIENT_LOGOS = [
  "Amazon.png", "Deloitte.png", "Gates_Foundation.png", "IgniteSeattle_logo.png", "Microsoft.png", "NASA.webp",
  "SawStop.webp", "TYRSport.png", "GeekWire.png", "WotC.png", "YouTube.png", "Xbox.png", "Tesla.png", 
];

type ViewcountResponse = {
  total?: number;
};

export default function About() {
  const [y, setY] = useState(0);

  // ✅ total views counter
  const [views, setViews] = useState<number | null>(null);
  const [loadingViews, setLoadingViews] = useState(true);
  const [showLogos, setShowLogos] = useState(false);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY || 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoadingViews(true);

      try {
        // ✅ IMPORTANT:
        // - localhost/127.0.0.1/*: try deployed Vercel
        // - other hosts: try same-origin first, then fall back to Vercel
        const origins: string[] = [];
        const envBase =
          typeof import.meta !== "undefined"
            ? (import.meta as any).env?.VITE_VIEWCOUNT_BASE
            : undefined;
        if (envBase) origins.push(String(envBase).replace(/\/$/, ""));

        const hostname =
          typeof window !== "undefined" ? window.location.hostname : "";
        const origin =
          typeof window !== "undefined" ? window.location.origin : "";
        const isLocalLike =
          hostname === "localhost" ||
          hostname === "127.0.0.1" ||
          hostname.startsWith("192.168.") ||
          hostname.endsWith(".local");

        if (origin) origins.push(origin);
        origins.push("https://rebelclefstudios.vercel.app");

        let data: ViewcountResponse | null = null;
        let lastErr: unknown;

        for (const base of origins) {
          try {
            const url = `${base}/api/viewcount?t=${Date.now()}`;
            const r = await fetch(url, {
              mode: "cors",
              cache: "no-store",
              headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
              },
            });

            if (r.status === 304) throw new Error("304 (no body)");
            if (!r.ok) throw new Error(`HTTP ${r.status}`);

            data = (await r.json()) as ViewcountResponse;
            lastErr = undefined;
            break;
          } catch (err) {
            lastErr = err;
            // If we're on a local-like host, skip same-origin failure quickly and fall through.
            if (isLocalLike) continue;
          }
        }

        if (!data) {
          throw lastErr ?? new Error("Failed to load viewcount");
        }

        if (cancelled) return;

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

  useEffect(() => {
    if (views !== null) {
      const t = setTimeout(() => setShowLogos(true), 3500);
      return () => clearTimeout(t);
    }
  }, [views]);

  // Parallax tuning
  const topParallax = y * 0.25; // slower movement
  const bottomParallax = y * 0.12;

  // Calculate random positions for the logo cloud once
  const logoCloud = useMemo(() => {
    const w = 1000;
    const h = 600;
    const perimeter = (w + h) * 2;

    return CLIENT_LOGOS.map((logo, i) => {
      // Distribute evenly along the perimeter of a rectangle
      // Offset by half a segment to center logos on the sides better
      const d = ((i + 0.5) / CLIENT_LOGOS.length) * perimeter;
      let x, y;

      if (d < w) {
        // Top edge
        x = -w / 2 + d;
        y = -h / 2;
      } else if (d < w + h) {
        // Right edge
        x = w / 2;
        y = -h / 2 + (d - w);
      } else if (d < w * 2 + h) {
        // Bottom edge
        x = w / 2 - (d - (w + h));
        y = h / 2;
      } else {
        // Left edge
        x = -w / 2;
        y = h / 2 - (d - (w * 2 + h));
      }

      return {
        src: `/logos/${logo}`,
        x,
        y,
        scale: 1,
      };
    });
  }, []);

  return (
    <div className="bg-white">
      {/* TOP FULLSCREEN IMAGE HERO */}
      <section className="relative h-[100vh] w-full overflow-hidden">
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

        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div className="-translate-y-8 sm:-translate-y-10">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {loadingViews ? (
                "Loading…"
              ) : views != null ? (
                <div className="relative flex justify-center items-center">
                  {/* Logo Cloud Background */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: 0,
                      height: 0,
                      zIndex: 0,
                      pointerEvents: "none",
                    }}
                  >
                    {logoCloud.map((item, i) => (
                      <img
                        key={i}
                        src={item.src}
                        alt=""
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          width: "200px",
                          maxWidth: "none",
                          opacity: showLogos ? 1 : 0,
                          transition: "opacity 1.5s ease-out, transform 1.5s ease-out",
                          transitionDelay: `${i * 50}ms`,
                          transform: `translate(-50%, -50%) translate(${item.x}px, ${item.y}px) scale(${showLogos ? item.scale : 0.8})`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="relative z-10">
                    <ViewCounter total={views} />
                  </div>
                </div>
              ) : (
                "views and counting…"
              )}
            </h1>
          </div>
        </div>
      </section>

      {/* TEXT BLOCK BETWEEN IMAGES */}
      <section className="mx-auto max-w-4xl px-6 py-4 sm:py-8">
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
              className="underline underline-offset-4 decoration-zinc-400 hover:decoration-zinc-900 transition-colors"
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
              className="underline underline-offset-4 decoration-zinc-400 hover:decoration-zinc-900 transition-colors"
            >
              Gritty Reboots
            </a>
            . To this day, their work has been shared by millions around the
            globe, and accumulated well over 500 million views.
          </p>
        </div>
      </section>

      {/* BOTTOM FULLSCREEN IMAGE CTA */}
      <section className="relative h-[100vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/SpaceX-wide.jpg"
            alt=""
            className="h-full w-full object-cover"
            style={{ transform: `translateY(${bottomParallax}px) scale(1.12)` }}
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
                hover:bg-white hover:text-black hover:border-white hover:-translate-y-[1px]
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
