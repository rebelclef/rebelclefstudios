import { useRef, useState } from "react";

const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbw3uCDWnMU7gJqRHcDlveZ_4Es9iu1OP45dHMD3-S0CcVlpLk2k0GXlZeDnPQgruGr9/exec";

export default function Contact() {
  const MAP_QUERY = "47.691266,-122.302090";

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  // Honeypot (bots often fill hidden fields)
  const honeyRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // If honeypot is filled, silently succeed (spam bot)
    if (honeyRef.current?.value) {
      setSubmitted(true);
      return;
    }

    setSending(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // Convert FormData -> URLSearchParams (Apps Script-friendly)
      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        // Don't include honeypot in the payload
        if (key === "company") return;
        params.append(key, String(value));
      });

      // Put the fields in the URL so Apps Script receives them reliably as e.parameter
      const url = `${FORM_ENDPOINT}?${params.toString()}`;

      await fetch(url, {
        method: "POST",
        mode: "no-cors",
      });

      form.reset();
      setSubmitted(true);
    } catch {
      alert(
        "Sorry — something went wrong sending your message. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      className="min-h-[100vh] w-full"
      style={{ backgroundColor: "#1841aa" }}
    >
      <div className="mx-auto max-w-6xl px-6 pt-8 pb-4 sm:pt-12 sm:pb-6">
        <div className="text-center">
          <img
            src="/text/get-after-it.png"
            alt="Get after it!"
            className="mx-auto h-16 object-contain sm:h-20"
          />
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* LEFT: Contact form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/50 bg-white/10 p-6 backdrop-blur">
              <h2 className="text-sm font-light uppercase tracking-widest text-white">
                Contact form
              </h2>

              {submitted ? (
                <div className="mt-6 rounded-xl border border-white/15 bg-black/20 p-5 text-white/90">
                  Thanks — message sent. We’ll get back to you soon.
                </div>
              ) : (
                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                  {/* Honeypot (hidden) */}
                  <div className="hidden">
                    <label>
                      Company
                      <input ref={honeyRef} name="company" />
                    </label>
                  </div>

                  {/* Subject line for your email */}
                  <input
                    type="hidden"
                    name="_subject"
                    value="New website message"
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm text-white">
                        Name <span className="text-white/60">*</span>
                      </label>
                      <input
                        name="name"
                        required
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/40"
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-white">
                        Email <span className="text-white/60">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/40"
                        placeholder="you@email.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-white">
                      Message <span className="text-white/60">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      className="mt-2 w-full resize-none rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/40"
                      placeholder="Tell us what you’re making…"
                    />
                    <div className="mt-2 text-xs text-white/60">
                      <span className="text-white/60">*</span> Required
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className={[
                        `
                        inline-flex items-center
                        rounded-xl
                        border border-white
                        px-6 py-3
                        text-sm font-light
                        uppercase tracking-widest
                        text-white
                        transition-all duration-300
                        hover:bg-white hover:text-black hover:border-white hover:scale-[1.05]
                        `,
                        sending
                          ? "opacity-60 cursor-not-allowed hover:bg-transparent hover:text-white hover:-translate-y-0"
                          : "",
                      ].join(" ")}
                    >
                      {sending ? "Sending…" : "Send"}
                    </button>

                    <div className="text-sm text-white">
                      Or email:{" "}
                      <a
                        className="underline underline-offset-4 hover:text-white"
                        href="mailto:info@rebelclefstudios.com"
                      >
                        info@rebelclefstudios.com
                      </a>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT: Text + Map */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/50 bg-white/10 p-6 backdrop-blur">
              <h2 className="text-sm font-light uppercase tracking-widest text-white">
                Location
              </h2>

              <p className="mt-5 text-base leading-[1.75] text-white">
                We’re located in NE Seattle, but our business knows no bounds!
                Let’s make things happen, no matter where you’re reaching out
                from.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/15 bg-black/30">
                <div className="relative w-full" style={{ paddingTop: "65%" }}>
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    title="Map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      MAP_QUERY
                    )}&z=11&output=embed`}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm text-white">
                <div>
                  Phone:{" "}
                  <a
                    className="underline underline-offset-4 hover:text-white"
                    href="tel:+13234574252"
                  >
                    (323) 457-4252
                  </a>
                </div>
                <div>
                  Email:{" "}
                  <a
                    className="underline underline-offset-4 hover:text-white"
                    href="mailto:info@rebelclefstudios.com"
                  >
                    info@rebelclefstudios.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-8" />
      </div>
    </section>
  );
}