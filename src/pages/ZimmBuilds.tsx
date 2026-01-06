export default function ZimmBuilds() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-16 pt-8 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
        Thanks for your purchase!
      </h1>

      <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <img
          src="/ZimmsBoardButter.webp"
          alt="Zimm's Board Butter"
          className="mx-auto w-full max-w-5xl"
          loading="lazy"
        />
      </div>

      <div className="mx-auto mt-8 max-w-3xl space-y-4 text-left text-base leading-relaxed text-zinc-700">
        <p>
          <strong className="font-bold">Zimm’s Board Butter</strong> is a handmade blend of FDA approved food safe mineral oil and beeswax,
          perfect for revitalizing and protecting your wood products. Cutting boards, butcher blocks,
          etc. tend to dry out and fade over time, so use this to breathe new life into your piece and
          make it “pop” again!
        </p>
        <p>
          <strong className="font-bold">Directions for use</strong>: Using a clean cloth or paper towel, apply a liberal
          amount of board butter to your wooden item. Let stand overnight, then buff out any excess
          with a dry cloth/towel. For best results, reapply as needed.
        </p>
        <p className="text-center">
          <strong className="font-bold">
            Follow{" "}
            <a
              href="https://www.instagram.com/zimmbuilds/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              @zimmbuilds
            </a>{" "}
            on Instagram!
          </strong>
        </p>
        <p>
          PS - I know what you’re thinking… Rebel Clef Studios? How did I get here?? Well, {" "}
            <a
              href="https://www.instagram.com/zimmbuilds/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              @zimmbuilds
            </a>{" "}
          is just my woodworking side hobby. If you’re interested in what I actually do for work, click{" "}
          <a
            href="https://www.rebelclefstudios.com/reel/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#1841aa] underline underline-offset-4"
          >
            here
          </a>
          !
        </p>
      </div>
    </div>
  );
}
