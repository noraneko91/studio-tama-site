import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { services } from "@/data/site";
import { asset } from "@/lib/asset";
import Intro from "./_components/Intro";
import ProjectCard from "./_components/ProjectCard";

const featured = projects.slice(0, 3);

export default function Home() {
  return (
    <main className="flex-1">
      {/* 처음 들어올 때 나오는 인트로 */}
      <Intro />

      {/* 첫 화면 */}
      <section className="bg-ink text-white">
        <div className="grid min-h-[calc(100svh-5rem)] grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-end px-6 pb-12 pt-16 md:px-12 md:pb-16 md:pt-24">
            <div>
              <h1 className="font-display text-[64px] font-light leading-[0.9] tracking-[-0.03em] md:text-[112px]">
                <span className="rise block [animation-delay:100ms]">
                  a flash of
                </span>
                <span className="rise block italic [animation-delay:250ms]">
                  creativity
                </span>
              </h1>
              <p className="rise mt-10 max-w-md text-sm leading-7 text-white/60 [animation-delay:450ms]">
                STUDIO TAMA는 서울을 기반으로 상업 공간을 디자인하는
                스튜디오입니다. 브랜드가 가진 이야기를 공간과 비주얼로
                풀어냅니다.
              </p>
            </div>
          </div>

          <div className="relative min-h-[60vh] border-white/10 md:border-l">
            <Image
              src={asset("/images/logo_02.png")}
              alt="STUDIO TAMA 로고"
              fill
              preload
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* 대표 프로젝트 */}
      <section className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 flex items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-[11px] font-medium tracking-[0.35em] text-white/40">
              SELECTED PROJECTS
            </p>
            <h2 className="font-display text-5xl font-light tracking-[-0.03em] md:text-7xl">
              Recent Works
            </h2>
          </div>
          <Link
            href="/projects"
            className="group hidden shrink-0 text-xs tracking-[0.25em] md:block"
          >
            ALL PROJECTS{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="grid gap-x-8 gap-y-20 md:grid-cols-3">
          {featured.map((project, index) => (
            <div
              key={project.slug}
              className={`reveal ${index === 1 ? "md:mt-24" : ""}`}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        <Link
          href="/projects"
          className="mt-16 block border border-white/30 py-5 text-center text-xs tracking-[0.25em] md:hidden"
        >
          ALL PROJECTS →
        </Link>
      </section>

      {/* 스튜디오 소개 */}
      <section className="px-6 pb-24 md:px-12 md:pb-32">
        <div className="grid gap-10 border-t border-white/10 pt-12 md:grid-cols-[1fr_2fr]">
          <p className="text-[11px] font-medium tracking-[0.35em] text-white/40">
            STUDIO
          </p>
          <div className="reveal">
            <h2 className="text-3xl font-medium leading-snug tracking-[-0.03em] md:text-5xl md:leading-tight">
              우리는 단순히 예쁜 공간이 아니라,
              <br className="hidden md:block" /> 머무는 이유가 생기는 공간을
              만듭니다.
            </h2>
            <Link
              href="/about"
              className="group mt-10 inline-block text-xs tracking-[0.25em]"
            >
              ABOUT THE STUDIO{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 서비스 */}
      <section className="border-t border-white/10 bg-ink px-6 py-24 text-white md:px-12 md:py-32">
        <div className="mb-16 flex items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-[11px] font-medium tracking-[0.35em] text-white/40">
              SERVICES
            </p>
            <h2 className="font-display text-5xl font-light tracking-[-0.03em] md:text-7xl">
              What we do
            </h2>
          </div>
          <Link
            href="/services"
            className="group hidden shrink-0 text-xs tracking-[0.25em] md:block"
          >
            ALL SERVICES{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="border-t border-white/15">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="reveal grid gap-3 border-b border-white/15 py-8 md:grid-cols-[80px_1.2fr_1fr] md:items-baseline md:gap-8"
            >
              <span className="text-xs text-white/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-3xl md:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm text-white/50">{service.ko}</p>
              </div>
              <p className="text-sm leading-7 text-white/60">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 문의 유도 */}
      <section className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32">
        <h2 className="reveal font-display text-5xl font-light leading-[0.95] tracking-[-0.03em] md:text-8xl">
          Let’s make
          <br />
          <span className="italic">your space</span> different.
        </h2>
      </section>
    </main>
  );
}
