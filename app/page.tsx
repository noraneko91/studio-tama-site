import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const projects = [
  {
    category: "Retail",
    title: "MUSINSA",
    description: "브랜드의 무드와 동선을 구조적으로 담아낸 리테일 공간.",
    image: "/images/project-musinsa-04.png",
  },
  {
    category: "Commercial",
    title: "KOMU",
    description: "차분한 톤과 절제된 소재감이 중심이 되는 상업 공간.",
    image: "/images/project-KOMU-02.png",
  },
  {
    category: "Brand",
    title: "Verish",
    description: "공간의 첫인상을 만드는 브랜드 비주얼과 아이덴티티.",
    image: "/images/project-Verish-07.png",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-5 mix-blend-difference md:px-12">
        <div
          className={`${cormorant.className} text-3xl tracking-[0.2em] text-white`}
        >
          <a href="/">Studio Tama</a>
        </div>

        <nav className="hidden gap-8 text-xs font-medium tracking-[0.25em] text-white md:flex">
          <a href="/about">ABOUT</a>
          <a href="/projects">PROJECTS</a>
          <a href="/service">SERVICE</a>
          <a href="/contact">CONTACT</a>
        </nav>
      </header>

      <section className="relative min-h-screen bg-[#0b0b0b] text-white">
        <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-24 md:px-20">
            <p className="mb-8 text-sm tracking-[0.4em] text-white/40">
              INTERIOR DESIGN STUDIO
            </p>

            <h1
              className={`${cormorant.className} mb-8 text-[72px] leading-[0.9] tracking-[-0.05em] md:text-[120px]`}
            >
              Designing
              <br />
              spaces
              <br />
              with mood.
            </h1>

            <p className="mb-10 max-w-md text-sm leading-8 text-white/60">
              공간의 구조와 분위기를 설계합니다. 단순한 인테리어가 아닌 브랜드
              경험을 만듭니다.
            </p>

            <div className="flex gap-4">
              <a
                href="#projects"
                className="border border-white/20 px-8 py-4 text-sm tracking-[0.2em] transition hover:bg-white hover:text-black"
              >
                PROJECTS
              </a>

              <a
                href="#contact"
                className="border border-white/20 px-8 py-4 text-sm tracking-[0.2em] transition hover:bg-white hover:text-black"
              >
                CONTACT
              </a>
            </div>
          </div>

          <div className="relative h-[100vh]">
            <Image
              src="/images/logo_02.png"
              alt="Studio Tama"
              fill
              priority
              className="object-cover grayscale"
            />
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-24 md:px-12">
        <div className="grid gap-10 border-t border-white/20 pt-10 md:grid-cols-[0.4fr_1fr]">
          <p className="text-xs font-medium tracking-[0.35em] text-black/50">
            ABOUT
          </p>

          <h2 className="max-w-4xl text-3xl font-medium leading-tight tracking-[-0.04em] md:text-5xl">
            우리는 단순히 예쁜 공간이 아니라, 머무는 이유가 생기는 공간을
            만듭니다.
          </h2>
        </div>
      </section>

      <section id="projects" className="px-6 py-24 md:px-12">
        <div className="mb-10 flex items-end justify-between border-t border-white/20 pt-10">
          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.35em] text-white/50">
              PROJECTS
            </p>
            <h2 className="text-4xl font-light tracking-[-0.05em] md:text-6xl">
              Selected Works
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project, index) => (
            <article key={project.title} className="group cursor-pointer">
              <div className="relative mb-5 h-[520px] overflow-hidden bg-[#1a1a1a]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-white/20" />

                <span className="absolute bottom-6 left-6 text-[96px] font-light leading-none tracking-[-0.08em] text-white/30">
                  0{index + 1}
                </span>
              </div>

              <p className="mb-2 text-xs font-medium tracking-[0.3em] text-white/40">
                {project.category}
              </p>
              <h3 className="mb-2 text-2xl font-medium tracking-[-0.03em]">
                {project.title}
              </h3>
              <p className="text-sm leading-6 text-white/60">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="service" className="px-6 py-24 md:px-12">
        <div className="grid gap-10 border-t border-white/20 pt-10 md:grid-cols-[0.4fr_1fr]">
          <p className="text-xs font-medium tracking-[0.35em] text-black/50">
            SERVICE
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {["Interior Design", "Space Branding", "Renovation"].map(
              (service) => (
                <div key={service} className="border-t border-white/20 pt-5">
                  <h3 className="mb-4 text-2xl font-medium tracking-[-0.03em]">
                    {service}
                  </h3>
                  <p className="text-sm leading-6 text-white/60">
                    기획부터 디자인, 시공 방향 제안까지 공간에 맞는 솔루션을
                    제공합니다.
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 md:px-12">
        <div className="rounded-[32px] bg-black px-6 py-16 text-white md:px-12 md:py-24">
          <p className="mb-6 text-xs font-medium tracking-[0.35em] text-white/50">
            CONTACT
          </p>

          <h2 className="mb-8 max-w-4xl text-4xl font-light leading-tight tracking-[-0.05em] md:text-7xl">
            Let’s make your space different.
          </h2>

          <a
            href="mailto:hello@studiotama.com"
            className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/80"
          >
            hello@studiotama.com
          </a>
        </div>
      </section>

      <footer className="flex flex-col gap-4 px-6 py-8 text-xs text-black/50 md:flex-row md:items-center md:justify-between md:px-12">
        <p>© STUDIO TAMA</p>
        <p>Interior Design & Space Branding</p>
      </footer>
    </main>
  );
}
