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
        "This is one that'll make viewers want to stand up for the little guys who just want to make the world smarter.",
      source: "TODAY SHOW",
      href: "https://www.today.com/popculture/pbs-stars-take-junk-tv-avengers-style-6C9737221",
    },
    {
      quote: "The talented folks over at Gritty Reboots have killed it again.",
      source: "BUZZFEED",
      href: "https://www.buzzfeed.com/brodiemanthe1st/gritty-reboots-does-calvin-hobbes-2txu",
    },
    {
      quote:
        "All in all, it’s a whole lot more impressive than the real iPhone ads.",
      source: "ADWEEK",
      href: "https://www.adweek.com/creativity/iphone-5s-giant-screen-truly-game-changer-143963/",
    },
    {
      quote:
        "Shot and presented in a manner so similar to many recent Hollywood tentpole films.",
      source: "THE HOLLYWOOD REPORTER",
      href: "https://www.hollywoodreporter.com/movies/movie-features/calvin-hobbes-spoof-movie-trailer-433011/",
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
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-24 pt-8 pb-20 sm:pt-10 sm:pb-24">
        <div className="space-y-14">
          {quotes.map((q, idx) => (
            <div key={idx} className="mx-auto max-w-2xl text-center">
              <p className="text-2xl font-light leading-relaxed text-zinc-900 sm:text-3xl">
                “{q.quote}”
              </p>

              <div className="mt-6">
                <a
                  href={q.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-xs font-light uppercase tracking-[0.25em] text-zinc-600 transition-colors hover:text-[#284a9c]"
                >
                  • {q.source} •
                </a>
              </div>

              {/* Divider */}
              {idx !== quotes.length - 1 && (
                <hr className="my-10 border-t border-zinc-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}