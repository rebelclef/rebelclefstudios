import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "../content/projects";

type VideoItem = {
  title?: string;
  embedUrl: string;
  thumbnailUrl?: string;
};

function getYouTubeId(url: string) {
  const m = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  return m?.[1];
}

function getVimeoId(url: string) {
  const m = url.match(/vimeo\.com\/video\/([0-9]+)/);
  return m?.[1];
}

function autoThumb(embedUrl: string) {
  const yt = getYouTubeId(embedUrl);
  if (yt) return `https://img.youtube.com/vi/${yt}/hqdefault.jpg`;
  const vimeo = getVimeoId(embedUrl);
  if (vimeo) return `https://vumbnail.com/${vimeo}.jpg`;
  return undefined;
}

function VideoCarousel({
  videos,
  title,
}: {
  videos: VideoItem[];
  title?: string;
}) {
  const [active, setActive] = useState(0);
  const current = videos[active];
  if (!videos.length) return null;

  const stripRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const nudge = (dir: -1 | 1) => {
    const el = stripRef.current;
    if (!el) return;
    const amount = Math.max(240, Math.round(el.clientWidth * 0.65));
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // Trackpad horizontal scroll support: if user scrolls vertically over strip,
  // translate some of that to horizontal movement.
  const onWheel = (e: React.WheelEvent) => {
    const el = stripRef.current;
    if (!el) return;

    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);

    // If it's mostly vertical scrolling, convert part of it to horizontal.
    if (absY > absX) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  };

  // Drag-to-scroll (desktop)
  const onMouseDown = (e: React.MouseEvent) => {
    const el = stripRef.current;
    if (!el) return;
    dragging.current = true;
    startX.current = e.clientX;
    startScroll.current = el.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = stripRef.current;
    if (!el || !dragging.current) return;
    const dx = e.clientX - startX.current;
    el.scrollLeft = startScroll.current - dx;
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  return (
    // ✅ FIX: no internal top-margin — Project() controls spacing so all pages align
    <section className="w-full min-w-0">
      {title ? (
        <h3 className="text-2xl font-semibold uppercase tracking-[0.28em] text-zinc-900">
          {title}
        </h3>
      ) : null}

      <div className={[title ? "mt-3" : "", "min-w-0"].join(" ")}>
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-black">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src={current.embedUrl}
              title={current.title || "Video"}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {current.title ? (
          <div className="mt-3 text-sm font-light text-zinc-700">
            {current.title}
          </div>
        ) : null}
      </div>

      {videos.length > 1 && (
        <div className="relative mt-4 max-w-full">
          {/* Left nudge */}
          <button
            type="button"
            aria-label="Scroll thumbnails left"
            onClick={() => nudge(-1)}
            className="
              absolute left-0 top-1/2 -translate-y-1/2 z-10
              hidden sm:inline-flex
              rounded-full border border-zinc-200 bg-white/80
              p-2 text-zinc-800 backdrop-blur
              shadow-sm
              transition-all duration-200
              hover:scale-[1.04] hover:bg-white
              active:scale-[0.98]
            "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Right nudge */}
          <button
            type="button"
            aria-label="Scroll thumbnails right"
            onClick={() => nudge(1)}
            className="
              absolute right-0 top-1/2 -translate-y-1/2 z-10
              hidden sm:inline-flex
              rounded-full border border-zinc-200 bg-white/80
              p-2 text-zinc-800 backdrop-blur
              shadow-sm
              transition-all duration-200
              hover:scale-[1.04] hover:bg-white
              active:scale-[0.98]
            "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Thumbnail strip */}
          <div
            ref={stripRef}
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            className={[
              "flex max-w-full gap-3 overflow-x-auto",
              "cursor-grab active:cursor-grabbing",
              "touch-pan-x overscroll-x-contain",
              "[-webkit-overflow-scrolling:touch]",
              "pb-4 -mb-4", // ✅ scrollbar sits below thumbnails
              "scrollbar-gutter:stable", // modern browsers
              "pr-10 pl-10 sm:pr-12 sm:pl-12", // room so arrows don’t cover thumbs
            ].join(" ")}
            style={{
              // ensure the wheel handler can preventDefault
              overscrollBehaviorX: "contain",
            }}
          >
            {videos.map((v, i) => {
              const thumb = v.thumbnailUrl ?? autoThumb(v.embedUrl);
              return (
                <button
                  key={`${v.embedUrl}-${i}`}
                  type="button"
                  onClick={() => setActive(i)}
                  className={[
                    "relative flex-none overflow-hidden rounded-xl border transition-all",
                    "h-16 w-28 sm:h-20 sm:w-32 md:h-24 md:w-40",
                    i === active
                      ? "border-[#284a9c]"
                      : "border-zinc-200 hover:border-zinc-300",
                  ].join(" ")}
                  aria-label={`Play ${v.title || `video ${i + 1}`}`}
                  title={v.title || `Video ${i + 1}`}
                >
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={v.title || `Thumbnail ${i + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-xs text-white/70">
                      Thumbnail
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 transition-colors hover:bg-black/10" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

function renderTextWithLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, i) => {
    const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (match) {
      const [, label, href] = match;
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:text-[#284a9c]"
        >
          {label}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function Project() {
  const { slug } = useParams();

  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  useEffect(() => {
    if (project?.embedHtml?.includes("twitter-tweet")) {
      const scriptSrc = "https://platform.twitter.com/widgets.js";
      if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
        const script = document.createElement("script");
        script.src = scriptSrc;
        script.async = true;
        document.body.appendChild(script);
      } else {
        (window as any).twttr?.widgets?.load();
      }
    }
  }, [project]);

  if (!project) {
    return (
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Link
            to="/work"
            className="text-sm text-zinc-600 hover:text-[#284a9c]"
          >
            ← Back to Work
          </Link>
          <h1 className="mt-6 text-3xl font-semibold text-zinc-900">
            Project not found
          </h1>
        </div>
      </section>
    );
  }

  const videoSections = project.videoSections;
  const videos = project.videos;

  // Only use a standalone hero when we're NOT primarily a carousel page.
  const shouldShowCarouselOnly = !videoSections?.length && !!videos?.length;

  // For sectioned pages (Job Hunters) we prefer heroEmbedUrl; fallback to embedUrl if you want.
  const heroUrl = shouldShowCarouselOnly
    ? undefined
    : project.heroEmbedUrl ?? project.embedUrl;
  const heroAspectRatio = project.heroAspectRatio ?? 56.25;
  const isVerticalHero = heroAspectRatio > 100;
  const heroWrapperClass = [
    "mt-8 overflow-hidden",
    isVerticalHero ? "mx-auto max-w-[440px]" : "",
    isVerticalHero ? "" : "rounded-2xl border border-zinc-200 bg-black",
  ]
    .filter(Boolean)
    .join(" ");

  const hasSidebar =
    Boolean(project.longDescription) ||
    Boolean(project.credits?.length) ||
    Boolean(project.accolades?.length) ||
    Boolean(project.links?.length) ||
    Boolean(project.cast?.length);
  const useSidebar = hasSidebar;
  const videosLayout = project.videosLayout ?? "carousel";

  const sidebarContent = (
    <div className="space-y-8">
      {project.accolades?.length ? (
        <div>
          <div className="text-med font-bold uppercase tracking-[0.25em] text-zinc-900">
            {project.accoladesLabel ?? "Accolades"}
          </div>
          <ul className="mt-3 space-y-2 text-sm font-light text-zinc-700">
            {project.accolades.map((a: string) => (
              <li key={a} className="leading-relaxed whitespace-pre-line">
                {renderTextWithLinks(a)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {project.credits?.length ? (
        <div>
          <div className="text-med font-bold uppercase tracking-[0.25em] text-zinc-900">
            Credits
          </div>

          <dl className="mt-3 space-y-3">
            {project.credits.map((c: any, i: number) => (
              <div key={`${c.role ?? "credit"}-${c.name ?? i}`}>
                {c.role ? (
                  <dt className="text-[11px] font-light uppercase tracking-[0.22em] text-zinc-500">
                    {c.role}
                  </dt>
                ) : null}
                {c.name ? (
                  <dd className="mt-1 text-sm font-light text-zinc-900">
                    {c.name}
                  </dd>
                ) : (
                  <dd className="text-sm font-light text-zinc-900">
                    {String(c)}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      {/* CAST */}
      {project.cast?.length ? (
        <div>
          <div className="text-med font-bold uppercase tracking-[0.25em] text-zinc-900">
            Cast
          </div>

          <dl className="mt-3 space-y-3">
            {project.cast.map((c: any, i: number) => (
              <div key={`${c.role ?? "credit"}-${c.name ?? i}`}>
                {c.role ? (
                  <dt className="text-[11px] font-light uppercase tracking-[0.22em] text-zinc-500">
                    {c.role}
                  </dt>
                ) : null}
                {c.name ? (
                  <dd className="mt-1 text-sm font-light text-zinc-900">
                    {c.name}
                  </dd>
                ) : (
                  <dd className="text-sm font-light text-zinc-900">
                    {String(c)}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </div>
  );

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-16">
        <Link
          to="/work"
          className="text-sm text-zinc-600 transition-colors hover:text-[#284a9c]"
        >
          ← Back to Work
        </Link>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900">
          {project.title}
        </h1>

        <div className="mt-2 text-sm text-zinc-600">
          {project.year ? project.year : null}
          {project.year && project.tags?.length ? " • " : null}
          {project.tags?.join(" • ")}
        </div>

        {/* HERO VIDEO (full width) */}
        {project.embedHtml ? (
          <div className="mt-8 flex justify-center">
            {/* Twitter embeds are max 550px, so we scale them up on larger screens */}
            <div
              className="origin-top scale-100 md:scale-[1.55] lg:scale-[1.97] md:mb-60 lg:mb-[20.5rem] rounded-2xl border border-zinc-200 bg-black overflow-hidden"
              dangerouslySetInnerHTML={{ __html: project.embedHtml }}
            />
          </div>
        ) : heroUrl && (
          <div
            className={[
              "mt-8 overflow-hidden",
              heroWrapperClass,
            ].join(" ")}
          >
            <div
              className="relative w-full"
              style={{ paddingTop: `${heroAspectRatio}%` }}
            >
              <iframe
                className="absolute inset-0 h-full w-full"
                src={heroUrl}
                title={project.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* 2-column layout */}
        <div
          className={[
            "mt-8 grid gap-10",
            useSidebar && !shouldShowCarouselOnly ? "lg:grid-cols-12" : "",
          ].join(" ")}
        >
          {/* LEFT: main content */}
          <div
            className={[
              useSidebar && !shouldShowCarouselOnly ? "lg:col-span-8" : "",
              "min-w-0",
            ].join(" ")}
          >
            {/* Description above content ONLY when hero video exists */}
            {project.description && !shouldShowCarouselOnly && (
              <p className="mt-0 text-xl font-bold text-zinc-900">
                {project.description}
              </p>
            )}

            {/* Intro text block (between descriptor and carousels) */}
            {project.longDescription && !project.longDescriptionAfterMedia && (
              <div className="mt-4 max-w-2xl">
                <div className="whitespace-pre-line text-base leading-relaxed text-zinc-700">
                  {renderTextWithLinks(project.longDescription)}
                </div>
              </div>
            )}

            {/* Multi-section carousels (Job Hunters) */}
            {videoSections?.length ? (
              <div className="mt-8 space-y-10">
                {videoSections.map((s) => (
                  <VideoCarousel key={s.title} title={s.title} videos={s.videos} />
                ))}
              </div>
            ) : null}

            {/* Single carousel (Xbox Podcast-style) */}
            {!videoSections?.length && videos?.length ? (
              <>
                {videosLayout === "grid-two" ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {videos.map((v) => (
                      <div key={v.embedUrl} className="w-full">
                        <div
                          className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-black"
                          style={{ paddingTop: "177.78%" }}
                        >
                          <iframe
                            className="absolute inset-0 h-full w-full"
                            src={v.embedUrl}
                            title={v.title || "Video"}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                        {v.title ? (
                          <div className="mt-3 text-sm font-light text-zinc-700">
                            {v.title}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  // ✅ now the first carousel aligns with hero pages (no extra internal mt-4)
                  <div className="flex justify-center">
                    <div className="w-full">
                      <VideoCarousel videos={videos} />
                    </div>
                  </div>
                )}

                <div
                  className={[
                    project.longDescriptionAfterMedia ? "mt-10" : "mt-6",
                    "grid gap-10",
                    useSidebar ? "lg:grid-cols-12" : "",
                  ].join(" ")}
                >
                  <div
                    className={[useSidebar ? "lg:col-span-8" : "", "min-w-0"].join(
                      " "
                    )}
                  >
                    {project.description && (
                      <p className="text-xl font-bold text-zinc-900 max-w-2xl">
                        {project.description}
                      </p>
                    )}

                    {project.longDescription && project.longDescriptionAfterMedia && (
                      <div className="mt-6 max-w-2xl">
                        <div className="whitespace-pre-line text-base leading-relaxed text-zinc-700">
                          {renderTextWithLinks(project.longDescription)}
                        </div>
                      </div>
                    )}
                  </div>

                  {useSidebar ? (
                    <aside className="lg:col-span-4">
                      <div className="lg:sticky lg:top-[120px]">
                        {sidebarContent}
                      </div>
                    </aside>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>

          {/* RIGHT: sidebar */}
          {useSidebar && !shouldShowCarouselOnly && (
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-[120px]">{sidebarContent}</div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
