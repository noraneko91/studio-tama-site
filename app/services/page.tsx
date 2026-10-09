import type { Metadata } from "next";
import { process, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <main className="flex-1">
      {/* 서비스 */}
      <section className="bg-ink px-6 pb-24 pt-16 text-white md:px-12 md:pb-32 md:pt-24">
        <p className="rise mb-4 text-[11px] font-medium tracking-[0.35em] text-white/40">
          SERVICES
        </p>
        <h1 className="rise mb-6 font-display text-6xl font-light leading-[0.95] tracking-[-0.03em] [animation-delay:100ms] md:text-[120px]">
          What we do
        </h1>
        <p className="rise mb-20 max-w-xl text-sm leading-7 text-white/60 [animation-delay:250ms]">
          공간의 기획부터 디자인, 오픈까지. 브랜드에 꼭 맞는 상업 공간을
          만듭니다.
        </p>

        <div className="border-t border-white/15">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="reveal grid gap-3 border-b border-white/15 py-10 md:grid-cols-[80px_1.2fr_1fr] md:items-baseline md:gap-8"
            >
              <span className="text-xs text-white/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display text-4xl md:text-5xl">
                  {service.title}
                </h2>
                <p className="mt-1 text-sm text-white/50">{service.ko}</p>
              </div>
              <p className="text-sm leading-7 text-white/60">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 진행 과정 */}
      <section className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32">
        <p className="mb-4 text-[11px] font-medium tracking-[0.35em] text-white/40">
          PROCESS
        </p>
        <h2 className="mb-16 font-display text-5xl font-light tracking-[-0.03em] md:text-7xl">
          How we work
        </h2>
        <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
          {process.map((step, index) => (
            <li key={step.title} className="reveal border-t border-white/40 pt-6">
              <p className="font-display text-7xl font-light text-white/15">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-lg font-medium">
                {step.title}{" "}
                <span className="text-sm font-normal text-white/40">
                  {step.ko}
                </span>
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/60">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
