import { useEffect, useRef, useState } from "react";

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

export default function Press() {
  const quotes = [
    {
      quote:
        "Creative people know no bounds when the universe serves as their daily muse.",
      source: "NEIL DEGRASSE TYSON",
      href: "https://x.com/neiltyson/status/236081620082376705",
    },
    {
      quote: "[It is] impressive how much craft and care went into this video.",
      source: "A.V. CLUB",
      href: "https://www.avclub.com/the-trailer-for-live-action-adventure-time-is-surprisin-1798272932",
    },
    {
      quote: "This world would be a better place if this video were real.",
      source: "Gizmodo",
      href: "https://gizmodo.com/the-pbs-avengers-assemble-to-save-us-all-from-stupid-tv-486423461",
    },
    {
      quote:
        "Shot and presented in a manner so similar to many recent Hollywood tentpole films.",
      source: "THE HOLLYWOOD REPORTER",
      href: "https://www.hollywoodreporter.com/movies/movie-features/calvin-hobbes-spoof-movie-trailer-433011/",
    },
    {
      quote:
        "This is one that'll make viewers want to stand up for the little guys who just want to make the world smarter.",
      source: "TODAY SHOW",
      href: "https://www.today.com/popculture/pbs-stars-take-junk-tv-avengers-style-6C9737221",
    },
    {
      quote:
        "All in all, it’s a whole lot more impressive than the real iPhone ads.",
      source: "ADWEEK",
      href: "https://www.adweek.com/creativity/iphone-5s-giant-screen-truly-game-changer-143963/",
    },
    {
      quote: "The talented folks over at Gritty Reboots have killed it again.",
      source: "BUZZFEED",
      href: "https://www.buzzfeed.com/brodiemanthe1st/gritty-reboots-does-calvin-hobbes-2txu",
    },
    {
      quote: "This ad parody is actually better than the original.",
      source: "GIZMODO",
      href: "https://gizmodo.com/this-ipad-mini-ad-parody-is-actually-better-than-the-or-5957719",
    },
    {
      quote: "It’s epic, emotional, and — you guessed it — pretty darn gritty.",
      source: "HUFFINGTON POST",
      href: "https://www.huffpost.com/entry/adventure-time-movie-trailer-gritty-reboots_n_5951468",
    },
  ];

  return (
    <section className="min-h-screen bg-[#1841aa] py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <img
            src="/text/press.png"
            alt="Press"
            className="mx-auto h-16 object-contain sm:h-20"
          />
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {quotes.map((q, idx) => (
            <FadeInSection key={idx} delayMs={idx * 80}>
              <a
                href={q.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between rounded-3xl bg-white/10 p-6 ring-1 ring-white/20 backdrop-blur-lg transition-all duration-300 hover:bg-white/20 hover:ring-white/30"
              >
                <blockquote className="text-xl font-medium leading-relaxed text-white/90">
                  <p>“{q.quote}”</p>
                </blockquote>
                <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                    {q.source}
                  </span>
                  <span className="text-white/50 transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
              </a>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}