import type { Metadata } from "next";
import Link from "next/link";
import { categories, projects, years } from "@/data/projects";
import ProjectCard from "../_components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
};

type Props = {
  searchParams: Promise<{
    category?: string | string[];
    year?: string | string[];
  }>;
};

// 분류와 연도를 함께 담은 주소를 만들어요. 예) /projects?category=retail&year=2025
function filterHref(category?: string, year?: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (year) params.set("year", year);
  const query = params.toString();
  return query ? `/projects?${query}` : "/projects";
}

export default async function ProjectsPage({ searchParams }: Props) {
  // 주소의 ?category=retail, ?year=2025 같은 값으로 목록을 거릅니다.
  const params = await searchParams;
  const active = categories.find((item) => item.slug === params.category);
  const activeYear = years.find((year) => year === params.year);

  const inCategory = (label?: string) =>
    projects.filter((project) => !label || project.category === label);
  const inYear = (year?: string) =>
    projects.filter((project) => !year || project.year === year);

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
    ...years.map((year) => ({
      label: year,
      href: filterHref(active?.slug, year),
      count: inCategory(active?.label).filter((p) => p.year === year).length,
      current: activeYear === year,
    })),
  ];

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
    </main>
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
