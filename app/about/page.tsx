import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "About Us",
};

const approach = [
  {
    title: "Space",
    description:
      "동선과 구조, 소재와 빛으로 공간의 뼈대를 설계합니다. 사람이 어떻게 들어오고, 머물고, 기억하는지에서 출발합니다.",
  },
  {
    title: "Visual",
    description:
      "그래픽과 사이니지, 디스플레이까지 브랜드의 시각 언어를 공간 안에 자연스럽게 녹여냅니다.",
  },
  {
    title: "Detail",
    description:
      "집기 하나, 마감 하나까지 브랜드의 무드에 맞게 다듬어 완성도를 높입니다.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* 소개 */}
      <section className="px-6 pb-24 pt-16 md:px-12 md:pb-32 md:pt-24">
        <p className="rise mb-4 text-[11px] font-medium tracking-[0.35em] text-white/40">
          ABOUT US
        </p>
        <h1 className="rise font-display text-5xl font-light leading-none tracking-[-0.03em] [animation-delay:100ms] md:text-8xl">
          Space <span className="italic">and</span> Visual
        </h1>

        <div className="rise mt-16 grid gap-10 border-t border-white/10 pt-12 [animation-delay:250ms] md:grid-cols-[1fr_2fr]">
          <p className="text-[11px] font-medium tracking-[0.35em] text-white/40">
            WHO WE ARE
          </p>
          <div className="max-w-2xl space-y-6 text-base leading-8 text-white/70 md:text-lg md:leading-9">
            <p>
              STUDIO TAMA는 서울을 기반으로 활동하는 공간 디자인
              스튜디오입니다. 리테일 매장, 플래그십 스토어, 카페와 레스토랑 등
              브랜드가 사람을 만나는 상업 공간을 디자인합니다.
            </p>
            <p>
              우리는 공간(Space)과 비주얼(Visual)을 따로 보지 않습니다. 브랜드가
              가진 이야기를 하나의 흐름으로 엮어, 처음 들어선 순간부터 기억에
              남는 경험을 만듭니다.
            </p>
          </div>
        </div>
      </section>

      {/* 브랜드 이미지 */}
      {/* 큰 화면에서 너무 벌어지지 않게 최대 너비를 정하고 가운데 정렬 */}
      <section className="bg-ink">
        <div className="mx-auto grid max-w-4xl grid-cols-2">
          <div className="relative aspect-square">
            <Image
              src={asset("/images/logo_01.png")}
              alt="( SPACE"
              fill
              sizes="(min-width: 896px) 448px, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square">
            <Image
              src={asset("/images/logo_03.png")}
              alt="and VISUAL )"
              fill
              sizes="(min-width: 896px) 448px, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 작업 방식 */}
      <section className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32">
        <p className="mb-4 text-[11px] font-medium tracking-[0.35em] text-white/40">
          APPROACH
        </p>
        <h2 className="mb-16 font-display text-5xl font-light tracking-[-0.03em] md:text-7xl">
          How we think
        </h2>
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {approach.map((item, index) => (
            <div key={item.title} className="reveal border-t border-white/40 pt-6">
              <p className="mb-6 text-xs text-white/40">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-4 font-display text-4xl">{item.title}</h3>
              <p className="text-sm leading-7 text-white/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 다음 페이지 */}
      <Link
        href="/services"
        className="group block border-t border-white/10 bg-ink px-6 py-20 text-white md:px-12 md:py-28"
      >
        <p className="mb-4 text-[11px] font-medium tracking-[0.35em] text-white/40">
          NEXT
        </p>
        <p className="font-display text-5xl font-light tracking-[-0.03em] md:text-8xl">
          What we do{" "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </p>
      </Link>
    </main>
  );
}
