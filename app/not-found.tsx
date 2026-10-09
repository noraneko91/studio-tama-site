import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-start justify-center bg-ink px-6 py-32 text-white md:px-12">
      <p className="mb-4 text-[11px] font-medium tracking-[0.35em] text-white/40">
        404
      </p>
      <h1 className="font-display text-6xl font-light tracking-[-0.03em] md:text-8xl">
        Page not found.
      </h1>
      <p className="mt-6 text-sm text-white/60">
        찾으시는 페이지가 없거나 주소가 바뀌었어요.
      </p>
      <Link
        href="/"
        className="mt-10 border border-white/30 px-8 py-4 text-xs tracking-[0.25em] transition-colors hover:bg-white hover:text-ink"
      >
        BACK TO HOME
      </Link>
    </main>
  );
}
