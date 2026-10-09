import type { Metadata } from "next";
import { site } from "@/data/site";
import ContactForm from "../_components/ContactForm";
import InstagramIcon from "../_components/InstagramIcon";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-ink text-white">
      <section className="px-6 pb-24 pt-16 md:px-12 md:pb-32 md:pt-24">
        <p className="rise mb-4 text-[11px] font-medium tracking-[0.35em] text-white/40">
          CONTACT
        </p>
        <h1 className="rise font-display text-6xl font-light leading-[0.95] tracking-[-0.03em] [animation-delay:100ms] md:text-[120px]">
          Let’s talk about
          <br />
          <span className="italic">your space.</span>
        </h1>

        <div className="rise mt-20 grid gap-16 border-t border-white/15 pt-12 [animation-delay:250ms] md:grid-cols-2">
          <div className="space-y-10">
            <div>
              <p className="mb-3 text-[11px] tracking-[0.3em] text-white/40">
                EMAIL
              </p>
              <a
                href={`mailto:${site.email}`}
                className="font-display text-4xl transition-colors hover:text-white/60 md:text-5xl"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="mb-3 text-[11px] tracking-[0.3em] text-white/40">
                INSTAGRAM
              </p>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-4 font-display text-4xl transition-colors hover:text-white/60 md:text-5xl"
              >
                <InstagramIcon className="h-8 w-8 md:h-10 md:w-10" />
                {site.instagram.handle}
              </a>
              <p className="mt-2 text-sm text-white/50">
                DM으로도 문의하실 수 있어요.
              </p>
            </div>
            <div>
              <p className="mb-3 text-[11px] tracking-[0.3em] text-white/40">
                LOCATION
              </p>
              <p className="font-display text-4xl md:text-5xl">
                {site.location}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] tracking-[0.3em] text-white/40">
              PROJECT INQUIRY
            </p>
            <p className="mb-10 text-sm leading-7 text-white/60">
              문의 내용을 남겨주시면 확인 후 연락드리겠습니다.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
