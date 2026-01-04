import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { projects } from "../content/projects";

export default function Work() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "a-z">("newest");

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
        if (sort === "a-z") {
          return a.title.localeCompare(b.title);
        }

        // newest first (by date, then year)
        const dateValue = (p: typeof projects[number]) => {
          if (p.date) {
            const ts = Date.parse(p.date);
            if (!Number.isNaN(ts)) return ts;
          }
          if (p.year) return new Date(p.year, 0, 1).getTime();
          return 0;
        };

        return dateValue(b) - dateValue(a);
      });

    return scored;
  }, [search, sort]);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 pb-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
          Work
        </h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects"
            className="w-full min-w-[220px] rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-800 shadow-sm focus:border-[#284a9c] focus:outline-none focus:ring-2 focus:ring-[#284a9c]/20 sm:w-auto"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="w-full min-w-[160px] rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm focus:border-[#284a9c] focus:outline-none focus:ring-2 focus:ring-[#284a9c]/20 sm:w-auto"
          >
            <option value="newest">Sort: Newest</option>
            <option value="a-z">Sort: A–Z</option>
          </select>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Link key={p.slug} to={`/work/${p.slug}`} className="group">
            <div className="overflow-hidden rounded-2xl bg-zinc-100">
              <div className="aspect-video">
                <img
                  src={p.thumbnailUrl}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="mt-4 text-lg font-medium text-zinc-900">
              {p.title}
            </div>

            <div className="mt-1 text-sm text-zinc-500">
              {p.year ? `${p.year} • ` : ""}
              {p.tags.join(" • ")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
