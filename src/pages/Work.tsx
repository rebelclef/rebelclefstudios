import { Link } from "react-router-dom";
import { useEffect, useMemo, useState, useRef } from "react";
import { projects } from "../content/projects";

type SortMode = "newest" | "oldest" | "a-z";

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
      { threshold: 0.1 }
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

export default function Work() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortMode>("newest");
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setVisibleCount(12);
  }, [search, sort]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    const scored = projects
      .filter((p) => {
        if (!term) return true;
        return (
          p.title.toLowerCase().includes(term) ||
          p.tags.some((t) => t.toLowerCase().includes(term)) ||
          (p.description ?? "").toLowerCase().includes(term)
        );
      })
      .sort((a, b) => {
        // newest first (by date, then year)
        const dateValue = (p: typeof projects[number]) => {
          if (p.date) {
            const ts = Date.parse(p.date);
            if (!Number.isNaN(ts)) return ts;
          }
          if (p.year) return new Date(p.year, 0, 1).getTime();
          return 0;
        };

        if (sort === "a-z") {
          return a.title.localeCompare(b.title);
        }
        if (sort === "oldest") {
          return dateValue(a) - dateValue(b);
        }
        return dateValue(b) - dateValue(a);
      });

    return scored;
  }, [search, sort]);

  return (
    <div className="min-h-screen bg-[#1841aa]">
      <div className="mx-auto max-w-6xl px-6 py-4 sm:py-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <img
          src="/text/work.png"
          alt="Work"
          className="h-16 object-contain sm:h-20"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects"
            className="w-full min-w-[220px] rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20 sm:w-auto"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="w-full min-w-[160px] rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20 sm:w-auto"
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="a-z">Sort: A–Z</option>
          </select>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, visibleCount).map((p, idx) => (
          <FadeInSection key={p.slug} delayMs={idx * 50}>
            <Link to={`/work/${p.slug}`} className="group">
              <div className="overflow-hidden rounded-2xl bg-zinc-100">
                <div className="aspect-video">
                  <img
                    src={p.thumbnailUrl}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="mt-4 text-lg font-medium text-white">
                {p.title}
              </div>

              <div className="mt-1 text-sm text-blue-200">
                {p.year ? `${p.year} • ` : ""}
                {p.tags.join(" • ")}
              </div>
            </Link>
          </FadeInSection>
        ))}
      </div>

      {visibleCount < filtered.length && (
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="
              inline-flex items-center
              rounded-xl
              border border-white/80
              px-8 py-3
              text-sm font-light
              uppercase tracking-widest
              text-white
              transition-all duration-300
              hover:bg-white hover:text-[#1841aa] hover:border-white hover:scale-[1.05]"
          >
            More
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
