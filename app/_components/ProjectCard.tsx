import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/data/projects";

// 카드 이미지와 상세 페이지 대표 이미지에 같은 이름(name)을 붙이면,
// 페이지를 이동할 때 이미지가 자연스럽게 커지면서 이어집니다.
export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <ViewTransition name={`project-${project.slug}`} share="project-morph">
        <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
          <Image
            src={project.cover.src}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover grayscale transition duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
          />
        </div>
      </ViewTransition>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-[11px] font-medium tracking-[0.3em] text-white/40">
            {String(index + 1).padStart(2, "0")} — {project.category} ·{" "}
            {project.year}
          </p>
          <h3 className="font-display text-3xl leading-tight">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-white/50">{project.type}</p>
        </div>
        <span className="mt-7 text-xl transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
