import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const projects = [
  {
    category: "Cafe",
    title: "Warm Minimal Cafe",
    description: "따뜻한 질감과 여백을 살린 카페 공간 디자인",
  },
  {
    category: "Office",
    title: "Creative Office",
    description: "브랜드의 일하는 방식을 담은 오피스 인테리어",
  },
  {
    category: "Residential",
    title: "Calm Living Space",
    description: "일상의 온도를 낮추는 주거 공간 리모델링",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f1ec] text-[#171717]">
      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-5 mix-blend-difference md:px-12">
        <div
          className={`${cormorant.className} text-4xl font-medium tracking-[0.22em] text-white md:text-5xl`}
        >
          Studio Tama
        </div>

        <nav className="hidden gap-8 text-xs font-medium tracking-[0.25em] text-white md:flex">
          <a href="#about">ABOUT</a>
          <a href="#projects">PROJECTS</a>
          <a href="#service">SERVICE</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </header>

      <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-16 pt-28 md:px-12 md:pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#d9d1c5_0%,#f4f1ec_45%,#9a8f82_100%)]" />

        <div className="absolute right-[-10%] top-[12%] h-[520px] w-[520px] rounded-full bg-white/25 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[10%] h-[420px] w-[420px] rounded-full bg-black/10 blur-3xl" />

        <div className="relative z-10 grid w-full gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <h1
              className={`${cormorant.className} max-w-5xl text-[72px] font-light leading-[0.95] tracking-[-0.05em] text-black/90 md:text-[110px] lg:text-[150px]`}
            >
              Designing
              <br />
              quiet spaces
              <br />
              with feeling.
            </h1>
          </div>

          <div className="max-w-md md:justify-self-end">
            <p className="mb-8 text-lg leading-8 text-black/70">
              공간의 분위기, 브랜드의 결, 사용자의 움직임까지 생각하는 실내건축
              디자인 스튜디오. 빛, 질감, 여백의 균형으로 오래 머물고 싶은 공간을
              만듭니다.
            </p>

            <div className="flex gap-3">
              <a
                href="#projects"
                className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/80"
              >
                프로젝트 보기
              </a>
              <a
                href="#contact"
                className="rounded-full border border-black/30 px-6 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
              >
                문의하기
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-24 md:px-12">
        <div className="grid gap-10 border-t border-black/20 pt-10 md:grid-cols-[0.4fr_1fr]">
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
        <div className="mb-10 flex items-end justify-between border-t border-black/20 pt-10">
          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.35em] text-black/50">
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
              <div className="mb-5 flex h-[420px] items-end overflow-hidden bg-[#d6cec1] p-6 transition duration-500 group-hover:scale-[0.98]">
                <span className="text-[120px] font-light leading-none tracking-[-0.08em] text-black/10">
                  0{index + 1}
                </span>
              </div>

              <p className="mb-2 text-xs font-medium tracking-[0.3em] text-black/40">
                {project.category}
              </p>
              <h3 className="mb-2 text-2xl font-medium tracking-[-0.03em]">
                {project.title}
              </h3>
              <p className="text-sm leading-6 text-black/60">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="service" className="px-6 py-24 md:px-12">
        <div className="grid gap-10 border-t border-black/20 pt-10 md:grid-cols-[0.4fr_1fr]">
          <p className="text-xs font-medium tracking-[0.35em] text-black/50">
            SERVICE
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {["Interior Design", "Space Branding", "Renovation"].map(
              (service) => (
                <div key={service} className="border-t border-black/20 pt-5">
                  <h3 className="mb-4 text-2xl font-medium tracking-[-0.03em]">
                    {service}
                  </h3>
                  <p className="text-sm leading-6 text-black/60">
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
