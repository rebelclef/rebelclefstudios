import { useEffect, useMemo, useRef, useState } from "react";

type TalentPhoto = {
  src: string;
  alt?: string;
  href?: string;
};

type TalentProfile = {
  name: string;
  portraitUrl: string;
  portraitHref?: string;
  stats: Array<[string, string]>;
  photos: TalentPhoto[];
};

function FadeInSection({
  children,
  delayMs = 0,
}: {
  children: React.ReactNode;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 ease-out",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

function PhotoCarousel({ photos }: { photos: TalentPhoto[] }) {
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);

  if (!photos.length) return null;
  const current = photos[active];

  const prev = () => setActive((v) => (v - 1 + photos.length) % photos.length);
  const next = () => setActive((v) => (v + 1) % photos.length);

  // Swipe support
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const x0 = startX.current;
    startX.current = null;
    if (x0 == null) return;
    const x1 = e.changedTouches[0]?.clientX ?? x0;
    const dx = x1 - x0;
    if (dx > 50) prev();
    if (dx < -50) next();
  };

  const LargeInner = (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl bg-black"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <img
        src={current.src}
        alt={current.alt || "Talent photo"}
        className="absolute inset-0 h-full w-full object-contain"
        loading="lazy"
      />

      {/* Open icon for linked images */}
      {current.href && (
        <span
          className="
            absolute right-3 top-3
            rounded-full border border-white/40 bg-black/30
            p-2 text-white/90 backdrop-blur
            opacity-100 md:opacity-0 md:group-hover:opacity-100
            transition-all duration-300
          "
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 3h7v7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 14L21 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}

      {/* Left arrow */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          prev();
        }}
        aria-label="Previous photo"
        className="
          absolute left-3 top-1/2 -translate-y-1/2
          rounded-full border border-white/40 bg-black/30
          p-2 text-white/90 backdrop-blur
          transition-all duration-300
          hover:bg-black/50 hover:scale-[1.05]
          opacity-100 md:opacity-0 md:group-hover:opacity-100
        "
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          next();
        }}
        aria-label="Next photo"
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          rounded-full border border-white/40 bg-black/30
          p-2 text-white/90 backdrop-blur
          transition-all duration-300
          hover:bg-black/50 hover:scale-[1.05]
          opacity-100 md:opacity-0 md:group-hover:opacity-100
        "
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="grid aspect-[3/4] h-full grid-rows-[1fr_auto] gap-2 lg:aspect-auto">
      {/* Main image area */}
      <div className="min-h-0">
        {current.href ? (
          <a
            href={current.href}
            target="_blank"
            rel="noreferrer"
            className="group block h-full"
            aria-label="Open linked photo"
            title="Open"
          >
            <div className="h-full">{LargeInner}</div>
          </a>
        ) : (
          <div className="group h-full">{LargeInner}</div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setActive(i)}
            className={[
              "relative h-16 w-16 flex-none overflow-hidden rounded-xl bg-zinc-900",
              "border transition-colors",
              i === active
                ? "border-white"
                : "border-white/20 hover:border-white/50",
            ].join(" ")}
            aria-label={`View photo ${i + 1}`}
          >
            <img
              src={p.src}
              alt={p.alt || `Thumbnail ${i + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Talent() {
  const talent: TalentProfile[] = useMemo(
    () => [
      {
        name: "Maria P.",
        portraitUrl: "/talent/MariaP/MariaP_headshot.webp",
        portraitHref: "https://www.instagram.com/_angelinamaria_/",
        stats: [
          ["Height", "5’6”"],
          ["Ethnicity", "Ambiguous, Hispanic/Latino"],
          ["Age Range", "25–35"],
          ["Dress", "4 US"],
          ["Shoe", "8.5 US"],
          ["Hair", "Black"],
          ["Eyes", "Brown"],
        ],
        photos: [
          {
            src: "/talent/MariaP/Toyota_01.webp",
            href: "https://www.youtube.com/watch?v=ZW7Ub688rJE",
          },
          {
            src: "/talent/MariaP/Toyota_02.webp",
            href: "https://www.toyota.com/4runner/photo-gallery/exterior/",
          },
          {
            src: "/talent/MariaP/SeattleMet_01.webp",
            href: "https://www.instagram.com/p/CtxB2XGyR9u/",
          },
          {
            src: "/talent/MariaP/SeattleMet_02.webp",
            href: "https://www.seattlemet.com/travel-and-outdoors/launch-kayak-paddleboard-seattle-water-paddle-beach",
          },
          { src: "/talent/MariaP/HaptXG1_01.webp", href: "https://haptx.com/" },
          {
            src: "/talent/MariaP/HaptXG1_02.webp",
            href: "https://www.youtube.com/watch?v=huNdXJuDMUQ",
          },
          {
            src: "/talent/MariaP/Lux-hot-tub-boat.webp",
            href: "https://www.youtube.com/shorts/WYhZvpPmlLU",
          },
        ],
      },
    ],
    []
  );

  return (
    <section className="min-h-screen bg-[#1841aa]">
      <div className="mx-auto max-w-6xl px-6 pt-8 pb-4 sm:pt-12 sm:pb-6">
        <header className="mx-auto max-w-3xl text-center">
          <img
            src="/text/talent.png"
            alt="Talent"
            className="mx-auto h-16 object-contain sm:h-20"
          />
          <p className="mt-6 text-base font-light leading-relaxed text-blue-100">
            We've recently expanded our talent and model representation to
            serve productions across the PNW, and we're continually seeking new clients to partner with.
          </p>
          <div className="mt-10 text-sm text-blue-300/50">* * *</div>
        </header>

        <div className="mt-12 space-y-14">
          {talent.map((t, idx) => (
            <FadeInSection key={t.name} delayMs={idx * 80}>
              <article className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-12 lg:items-stretch">
                {/* Portrait */}
                <div className="lg:col-span-4">
                  <a
                    href={t.portraitHref}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <div className="overflow-hidden rounded-2xl bg-white/10">
                      <div className="relative aspect-[3/4] w-full min-h-[320px]">
                        <img
                          src={t.portraitUrl}
                          alt={t.name}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </a>
                </div>

                {/* Stats */}
                <div className="lg:col-span-3">
                  <h2 className="text-2xl font-medium tracking-tight text-white">
                    {t.name}
                  </h2>
                  <dl className="mt-5 grid gap-y-3">
                    {t.stats.map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-[11px] uppercase tracking-[0.22em] text-blue-200">
                          {label}
                        </dt>
                        <dd className="mt-1 text-sm text-blue-50">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Carousel */}
                <div className="lg:col-span-5">
                  <PhotoCarousel photos={t.photos} />
                </div>
              </article>
            </FadeInSection>
          ))}
        </div>
      </div>
      <div className="h-16 sm:h-20" />
    </section>
  );
}
