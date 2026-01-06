export default function Reel() {
  return (
    <div className="bg-[#1841aa] py-4 sm:py-6">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <img
            src="/text/reel.png"
            alt="Reel"
            className="mx-auto h-16 object-contain sm:h-20"
          />
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-black">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/MZJBQ75lG4E?autoplay=1&rel=0&modestbranding=1"
              title="Rebel Clef Studios Reel"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}