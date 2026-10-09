"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { INTRO_KEY } from "./introKey";

const COUNT_DURATION = 1800; // 숫자가 000 → 100 까지 올라가는 시간(ms)
const HOLD = 400; // 100이 된 뒤 잠깐 멈추는 시간(ms)
const CURTAIN = 1000; // 화면이 위로 걷히는 시간(ms)

const letters = ["T", "A", "("];
const lettersAfter = [")", "A"];

// html 태그의 data-intro 값으로 상태를 표시해요.
// playing: 인트로 재생 중 / leaving: 걷히는 중 / done: 끝 (globals.css에서 사용)
export default function Intro() {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const skip = useRef<() => void>(() => {});

  useLayoutEffect(() => {
    const root = document.documentElement;

    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {}
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (seen || reduceMotion) {
      root.dataset.intro = "done";
      return;
    }
    root.dataset.intro = "playing";

    let frame = 0;
    let left = false;
    const timers: number[] = [];

    const leave = () => {
      if (left) return;
      left = true;
      cancelAnimationFrame(frame);
      setCount(100);
      setLeaving(true);
      root.dataset.intro = "leaving";
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}
      timers.push(
        window.setTimeout(() => {
          root.dataset.intro = "done";
        }, CURTAIN),
      );
    };
    skip.current = leave;

    // 숫자 카운터: 처음엔 빠르게, 끝에서는 천천히 올라가요.
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / COUNT_DURATION, 1);
      setCount(Math.round((1 - Math.pow(1 - progress, 3)) * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        timers.push(window.setTimeout(leave, HOLD));
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      root.dataset.intro = "done";
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      onClick={() => skip.current()}
      className={`intro-overlay fixed inset-0 z-[60] flex cursor-pointer flex-col justify-between overflow-hidden bg-ink px-6 py-8 text-white md:px-12 md:py-10 ${
        leaving ? "intro-leave" : ""
      }`}
    >
      <div className="intro-flash pointer-events-none absolute inset-0 bg-white" />

      <div className="intro-fade flex justify-between text-[11px] tracking-[0.35em] text-white/40">
        <span>STUDIO TAMA</span>
        <span>SEOUL, KOREA</span>
      </div>

      <div className="intro-logo flex items-baseline justify-center font-logo text-[20vw] font-medium leading-none tracking-[0.02em] md:text-[200px]">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="intro-char inline-block"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            {letter}
          </span>
        ))}
        <span
          className="intro-char relative inline-block font-display font-normal italic"
          style={{ animationDelay: `${letters.length * 90}ms` }}
        >
          m
          <span className="intro-star absolute -top-[0.5em] left-1/2 -translate-x-1/2 font-logo text-[0.55em] not-italic">
            *
          </span>
        </span>
        {lettersAfter.map((letter, i) => (
          <span
            key={i}
            className="intro-char inline-block"
            style={{ animationDelay: `${(letters.length + 1 + i) * 90}ms` }}
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="intro-fade flex items-end justify-between text-[11px] tracking-[0.35em] text-white/40">
        <span>( SPACE and VISUAL )</span>
        <span className="font-display text-5xl tabular-nums tracking-normal text-white md:text-7xl">
          {String(count).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
