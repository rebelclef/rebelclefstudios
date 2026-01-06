import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1841aa] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Main content */}
        <div className="flex flex-col items-center text-center">
          {/* Links */}
          <div className="flex gap-8 text-sm font-light uppercase tracking-widest">
            <Link
              to="/about"
              className="text-white/90 transition-colors hover:text-white"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white/90 transition-colors hover:text-white"
            >
              Contact
            </Link>
          </div>

          {/* Contact info */}
          <div className="mt-8 space-y-2 text-sm text-white/80">
            <a
              href="mailto:info@rebelclefstudios.com"
              className="block underline underline-offset-4 hover:text-white"
            >
              info@rebelclefstudios.com
            </a>

            <a
              href="tel:+13234574252"
              className="block underline underline-offset-4 hover:text-white"
            >
              (323) 457-4252
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-white/15 pt-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Rebel Clef Studios. All rights reserved.
        </div>
      </div>
    </footer>
  );
}