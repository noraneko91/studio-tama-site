import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] px-8 py-32 text-white md:px-20">
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
      <p className="mb-6 text-sm tracking-[0.4em] text-white/40">PROJECTS</p>
      <h1 className="text-6xl font-light tracking-[-0.05em] md:text-8xl">
        projects Studio Tama
      </h1>
    </main>
  );
}
