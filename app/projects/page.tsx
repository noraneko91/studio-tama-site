import type { Metadata } from "next";
import { Suspense } from "react";
import ProjectsBrowser, {
  ProjectsView,
} from "../_components/ProjectsBrowser";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <main className="flex-1 px-6 pb-32 pt-16 md:px-12 md:pt-24">
      <div className="mb-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="rise mb-4 text-[11px] font-medium tracking-[0.35em] text-white/40">
            PROJECTS
          </p>
          <h1 className="rise font-display text-6xl font-light leading-none tracking-[-0.03em] [animation-delay:100ms] md:text-8xl">
            Selected Works
          </h1>
        </div>
        <p className="rise max-w-sm text-sm leading-7 text-white/60 [animation-delay:250ms]">
          리테일부터 F&amp;B까지, STUDIO TAMA가 디자인한 공간들입니다.
        </p>
      </div>

      {/* 필터 값은 브라우저에서 읽어요. 읽기 전에는 전체 목록을 먼저 보여줍니다. */}
      <Suspense fallback={<ProjectsView />}>
        <ProjectsBrowser />
      </Suspense>
    </main>
  );
}
