"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/data/site";
import InstagramIcon from "./InstagramIcon";
import Logo from "./Logo";

// 상단 메뉴 구성이에요. children이 있으면 마우스를 올렸을 때 하위 메뉴가 내려옵니다.
const menu = [
  {
    label: "STUDIO",
    href: "/about",
    match: ["/about", "/services"],
    children: [
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    label: "PROJECTS",
    href: "/projects",
    match: ["/projects"],
    children: [
      { label: "All Projects", href: "/projects" },
      { label: "Retail", href: "/projects?category=retail" },
      { label: "F&B", href: "/projects?category=fnb" },
    ],
  },
  {
    label: "CONTACT",
    href: "/contact",
    match: ["/contact"],
    children: [],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (paths: string[]) =>
    paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  return (
    <header className="site-header fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-ink text-white">
      <div className="flex h-20 items-center justify-between px-6 md:px-12">
        <Link href="/" className="text-2xl" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden h-full items-center gap-10 text-xs font-medium tracking-[0.25em] md:flex">
          {menu.map((item) => {
            const active = isActive(item.match);
            return (
              <div key={item.label} className="group relative flex h-full items-center">
                <Link
                  href={item.href}
                  className={`flex items-center gap-2.5 transition-colors ${
                    active ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 bg-white transition-opacity ${
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                  {item.label}
                </Link>

                {item.children.length > 0 && (
                  <div className="invisible absolute left-0 top-full min-w-48 -translate-y-1 border border-t-0 border-white/10 bg-ink py-3 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-5 py-2.5 text-sm font-normal tracking-normal transition-colors hover:text-white ${
                          pathname === child.href ? "text-white" : "text-white/50"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-white/50 transition-colors hover:text-white"
          >
            <InstagramIcon className="h-[18px] w-[18px]" />
          </a>
        </nav>

        <button
          type="button"
          className="text-xs font-medium tracking-[0.25em] md:hidden"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-20 flex flex-col justify-between overflow-y-auto bg-ink px-6 pb-10 pt-10 md:hidden">
          <nav className="flex flex-col gap-8">
            {menu.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`font-display text-5xl font-light ${
                    isActive(item.match) ? "text-white" : "text-white/50"
                  }`}
                >
                  {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
                </Link>
                {item.children.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/50">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-10 flex flex-col gap-2 text-sm text-white/60">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
              {site.instagram.handle}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
