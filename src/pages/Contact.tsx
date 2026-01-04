import { useRef, useState } from "react";

const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbw3uCDWnMU7gJqRHcDlveZ_4Es9iu1OP45dHMD3-S0CcVlpLk2k0GXlZeDnPQgruGr9/exec";

export default function Contact() {
  const MAP_QUERY = "NE Seattle";

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
      style={{ backgroundColor: "#284a9c" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
          Get after it!
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* LEFT: Contact form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
              <h2 className="text-sm font-light uppercase tracking-widest text-white/80">
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
                      <label className="text-sm text-white/80">
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
                      <label className="text-sm text-white/80">
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
                    <label className="text-sm text-white/80">
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
                        border border-white/80
                        px-6 py-3
                        text-sm font-light
                        uppercase tracking-widest
                        text-white
                        transition-all duration-300
                        hover:bg-white hover:text-black hover:border-white hover:-translate-y-[1px]
                        `,
                        sending
                          ? "opacity-60 cursor-not-allowed hover:bg-transparent hover:text-white hover:-translate-y-0"
                          : "",
                      ].join(" ")}
                    >
                      {sending ? "Sending…" : "Send"}
                    </button>

                    <div className="text-sm text-white/80">
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
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
              <h2 className="text-sm font-light uppercase tracking-widest text-white/80">
                Location
              </h2>

              <p className="mt-5 text-base leading-[1.75] text-white/90">
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
                    )}&output=embed`}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm text-white/80">
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