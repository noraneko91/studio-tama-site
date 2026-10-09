"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { categories, projects, years } from "@/data/projects";
import ProjectCard from "./ProjectCard";

// 주소의 ?category=retail, ?year=2025 값을 브라우저에서 읽어 목록을 거릅니다.
// (GitHub Pages처럼 서버가 없는 곳에서도 동작하게 하려고 브라우저에서 처리해요)
export default function ProjectsBrowser() {
  const params = useSearchParams();
  return (
    <ProjectsView
      category={params.get("category") ?? undefined}
      year={params.get("year") ?? undefined}
    />
  );
}

// 분류와 연도를 함께 담은 주소를 만들어요. 예) /projects?category=retail&year=2025
function filterHref(category?: string, year?: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (year) params.set("year", year);
  const query = params.toString();
  return query ? `/projects?${query}` : "/projects";
}

export function ProjectsView({
  category,
  year,
}: {
  category?: string;
  year?: string;
}) {
  const active = categories.find((item) => item.slug === category);
  const activeYear = years.find((item) => item === year);

  const inCategory = (label?: string) =>
    projects.filter((project) => !label || project.category === label);
  const inYear = (value?: string) =>
    projects.filter((project) => !value || project.year === value);

  const list = inCategory(active?.label).filter(
    (project) => !activeYear || project.year === activeYear,
  );

  const categoryTabs = [
    {
      label: "All",
      href: filterHref(undefined, activeYear),
      count: inYear(activeYear).length,
      current: !active,
    },
    ...categories.map((item) => ({
      label: item.label,
      href: filterHref(item.slug, activeYear),
      count: inYear(activeYear).filter((p) => p.category === item.label)
        .length,
      current: active?.slug === item.slug,
    })),
  ];

  const yearTabs = [
    {
      label: "All Years",
      href: filterHref(active?.slug, undefined),
      count: inCategory(active?.label).length,
      current: !activeYear,
    },
    ...years.map((value) => ({
      label: value,
      href: filterHref(active?.slug, value),
      count: inCategory(active?.label).filter((p) => p.year === value).length,
      current: activeYear === value,
    })),
  ];

  return (
    <>
      <div className="rise mb-16 flex flex-col border-b border-white/10 [animation-delay:300ms] md:flex-row md:justify-between">
        <FilterTabs tabs={categoryTabs} />
        <FilterTabs tabs={yearTabs} />
      </div>

      {list.length > 0 ? (
        <div className="grid gap-x-8 gap-y-20 md:grid-cols-3">
          {list.map((project) => (
            <div key={project.slug} className="reveal">
              <ProjectCard
                project={project}
                index={projects.indexOf(project)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="py-20 text-sm text-white/50">
          해당하는 프로젝트가 없어요.
        </p>
      )}
    </>
  );
}

function FilterTabs({
  tabs,
}: {
  tabs: { label: string; href: string; count: number; current: boolean }[];
}) {
  return (
    <nav className="flex gap-8">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          scroll={false}
          className={`-mb-px flex items-center gap-2.5 border-b py-4 text-xs tracking-[0.25em] transition-colors ${
            tab.current
              ? "border-white text-white"
              : "border-transparent text-white/40 hover:text-white"
          }`}
        >
          {tab.label.toUpperCase()}
          <sup className="text-[10px] tracking-normal">{tab.count}</sup>
        </Link>
      ))}
    </nav>
  );
}
