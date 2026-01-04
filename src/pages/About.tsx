import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY || 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parallax tuning
  const topParallax = y * 0.25; // slower movement
  const bottomParallax = y * 0.12;

  return (
    <div className="bg-white">
      {/* TOP FULLSCREEN IMAGE HERO */}
      <section className="relative h-[100vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/zimm-dolly.jpg"
            alt=""
            className="h-full w-full object-cover"
            style={{ transform: `translateY(${topParallax}px) scale(1.12)` }}
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div>
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Who? What? Why?
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
  corporate/commercial/branded content, while simultaneously developing
  several YouTube channels such as{" "}
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