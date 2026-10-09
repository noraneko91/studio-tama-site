import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { getProject, projects } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

// 프로젝트 목록에 있는 slug만 페이지로 만들고, 나머지 주소는 404로 보냅니다.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project?.title,
    description: project?.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  const details = [
    { label: "CLIENT", value: project.client },
    { label: "CATEGORY", value: project.category },
    { label: "TYPE", value: project.type },
    { label: "LOCATION", value: project.location },
    { label: "AREA", value: project.area },
    { label: "YEAR", value: project.year },
    { label: "PHOTO", value: project.photo },
  ].filter((detail) => detail.value);

  return (
    <main className="flex-1">
      <div className="px-6 pt-10 md:px-12 md:pt-14">
        <Link
          href="/projects"
          className="group text-xs tracking-[0.25em] text-white/50 transition-colors hover:text-white"
        >
          <span className="inline-block transition-transform group-hover:-translate-x-1">
            ←
          </span>{" "}
          ALL PROJECTS
        </Link>
      </div>

      <div className="grid gap-12 px-6 pb-24 pt-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:px-12 md:pb-32">
        <aside className="md:sticky md:top-32 md:self-start">
          <p className="mb-4 text-[11px] font-medium tracking-[0.35em] text-white/40">
            {String(index + 1).padStart(2, "0")} — {project.category}
          </p>
          <h1 className="font-display text-6xl font-light leading-none tracking-[-0.03em] md:text-7xl">
            {project.title}
          </h1>
          <p className="mt-8 max-w-md text-sm leading-7 text-white/70">
            {project.summary}
          </p>

          <dl className="mt-10 border-t border-white/10">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex justify-between gap-6 border-b border-white/10 py-4 text-sm"
              >
                <dt className="text-[11px] tracking-[0.3em] text-white/40">
                  {detail.label}
                </dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="flex flex-col gap-4 md:gap-6">
          <ViewTransition name={`project-${project.slug}`} share="project-morph">
            <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
              <Image
                src={project.cover.src}
                alt={project.title}
                fill
                preload
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </ViewTransition>

          {project.images.map((image, i) => (
            <Image
              key={image.src}
              src={image.src}
              alt={`${project.title} ${i + 2}`}
              width={image.width}
              height={image.height}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="reveal h-auto w-full bg-white/5"
            />
          ))}
        </div>
      </div>

      {/* 다음 프로젝트 */}
      <Link
        href={`/projects/${next.slug}`}
        className="group flex items-center justify-between gap-8 border-t border-white/10 bg-ink px-6 py-16 text-white md:px-12 md:py-24"
      >
        <div>
          <p className="mb-4 text-[11px] font-medium tracking-[0.35em] text-white/40">
            NEXT PROJECT
          </p>
          <p className="font-display text-5xl font-light tracking-[-0.03em] md:text-8xl">
            {next.title}{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </p>
        </div>
        <ViewTransition name={`project-${next.slug}`} share="project-morph">
          <div className="relative hidden aspect-[4/5] w-48 shrink-0 overflow-hidden md:block lg:w-60">
            <Image
              src={next.cover.src}
              alt={next.title}
              fill
              sizes="240px"
              className="object-cover grayscale transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
            />
          </div>
        </ViewTransition>
      </Link>
    </main>
  );
}
