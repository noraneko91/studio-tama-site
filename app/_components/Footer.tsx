import { site } from "@/data/site";
import InstagramIcon from "./InstagramIcon";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink px-6 pb-5 pt-10 text-white md:px-12">
      <div className="grid gap-6 border-b border-white/10 pb-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo className="text-4xl" />
          <p className="mt-4 font-display text-xl italic text-white/50">
            {site.tagline}
          </p>
        </div>

        <div>
          <p className="mb-4 text-[11px] font-medium tracking-[0.3em] text-white/40">
            CONTACT
          </p>
          <a
            href={`mailto:${site.email}`}
            className="text-sm transition-colors hover:text-white/60"
          >
            {site.email}
          </a>
        </div>

        <div>
          <p className="mb-4 text-[11px] font-medium tracking-[0.3em] text-white/40">
            SOCIAL
          </p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="inline-block transition-colors hover:text-white/60"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </div>

        <div>
          <p className="mb-4 text-[11px] font-medium tracking-[0.3em] text-white/40">
            STUDIO
          </p>
          <p className="text-sm">{site.location}</p>
        </div>
      </div>

      <p className="pt-4 text-xs text-white/40">
        © {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
