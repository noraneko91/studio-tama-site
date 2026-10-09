"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, ViewTransition } from "react";
import type { ProjectImage } from "@/data/projects";

// 프로젝트 사진을 엽서 더미처럼 겹쳐서 보여줘요.
// 맨 앞 사진 뒤로 다음 사진들이 살짝씩 비껴 보이고,
// 넘기면 앞 사진이 옆으로 부드럽게 빠지면서 뒤 사진이 앞으로 나와요.
// - 마우스 휠: 액자 위에서 한 칸 내리면 다음 한 장, 올리면 이전 한 장
//   (첫/마지막 사진에서는 원래처럼 페이지가 스크롤돼요)
// - 모바일: 좌우로 밀기 / 키보드: ← → / 화살표 버튼
const FLIP_MS = 500; // 한 장 넘어가는 시간(ms)
// 휠 한 칸 = 사진 한 장. 마우스 휠은 한 번에 크게(보통 40 이상) 움직여서 바로 한 장 넘겨요.
const MOUSE_TICK = 40;
// 트랙패드는 잘게 여러 번 움직여서, 이만큼 모였을 때 한 장 넘겨요 (우르르 넘어가지 않게)
const TRACKPAD_STEP = 120;
const VISIBLE_BEHIND = 3; // 뒤에 겹쳐 보이는 사진 수
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"; // 빠르게 시작해서 부드럽게 멈추는 움직임

// 사진 위치: offset = 이 사진이 맨 앞에서 몇 번째 뒤에 있는지 (음수면 이미 넘긴 사진)
function cardStyle(offset: number): React.CSSProperties {
  if (offset < 0) {
    // 넘긴 사진: 왼쪽으로 미끄러지며 사라짐
    return { transform: "translateX(-45%) rotate(-5deg)", opacity: 0 };
  }
  const depth = Math.min(offset, VISIBLE_BEHIND);
  const tilt = offset === 0 ? 0 : offset % 2 === 1 ? 2.5 : -2; // 엽서처럼 살짝 기울기
  // 비껴 놓이는 간격은 액자 크기에 비례(cqw/cqh)해서 모바일에서도 자연스러워요
  return {
    transform: `translate(${depth * 4.5}cqw, ${-depth * 2.8}cqh) scale(${1 - depth * 0.05}) rotate(${tilt}deg)`,
    opacity: offset > VISIBLE_BEHIND ? 0 : 1,
    filter: `brightness(${1 - depth * 0.25})`,
  };
}

export default function ProjectGallery({
  images,
  title,
  transitionName,
}: {
  images: ProjectImage[];
  title: string;
  transitionName: string;
}) {
  const [index, setIndex] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const last = images.length - 1;

  // 넘어가는 중에 또 넘겨도 기다리지 않고 바로 다음 장으로 이어져요
  const go = useCallback(
    (next: number) => {
      const target = Math.max(0, Math.min(last, next));
      if (target === indexRef.current) return;
      indexRef.current = target;
      setIndex(target);
    },
    [last],
  );

  // 마우스 휠과 터치 (휠은 페이지 스크롤을 막아야 해서 직접 등록해요)
  // 참고: React의 onWheel로는 페이지 스크롤을 막을 수 없어요
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let wheelSum = 0;
    let wheelReset = 0;
    const onWheel = (event: WheelEvent) => {
      // 마우스가 액자 위에 있을 때만 사진을 넘겨요
      const rect = frame.getBoundingClientRect();
      const insideFrame =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!insideFrame) return;

      const direction = Math.sign(event.deltaY);
      const atEdge =
        (direction > 0 && indexRef.current === last) ||
        (direction < 0 && indexRef.current === 0);
      if (direction === 0 || atEdge) {
        wheelSum = 0;
        return; // 끝에 도달하면 페이지가 스크롤되게 둬요
      }
      event.preventDefault();

      // 브라우저마다 휠 단위가 달라서 픽셀 기준으로 맞춰요 (줄 단위 → 약 33px)
      const deltaY =
        event.deltaMode === 1 ? event.deltaY * 33 : event.deltaY;

      // 마우스 휠 한 칸: 바로 한 장
      if (Math.abs(deltaY) >= MOUSE_TICK) {
        wheelSum = 0;
        go(indexRef.current + direction);
        return;
      }

      // 트랙패드: 조금씩 모아서 한 장
      wheelSum += deltaY;
      window.clearTimeout(wheelReset);
      wheelReset = window.setTimeout(() => (wheelSum = 0), 200);
      if (Math.abs(wheelSum) >= TRACKPAD_STEP) {
        go(indexRef.current + Math.sign(wheelSum));
        wheelSum = 0;
      }
    };

    let startX = 0;
    let startY = 0;
    const onTouchStart = (event: TouchEvent) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    };
    const onTouchEnd = (event: TouchEvent) => {
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        go(indexRef.current + (dx < 0 ? 1 : -1));
      }
    };

    // 휠은 액자가 아니라 window에 걸어요. 사진이 3D로 넘어가는 동안 브라우저가
    // 액자 위 휠을 코드 확인 없이 바로 스크롤해버리는 경우가 있어서예요.
    window.addEventListener("wheel", onWheel, { passive: false });
    frame.addEventListener("touchstart", onTouchStart, { passive: true });
    frame.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.clearTimeout(wheelReset);
      window.removeEventListener("wheel", onWheel);
      frame.removeEventListener("touchstart", onTouchStart);
      frame.removeEventListener("touchend", onTouchEnd);
    };
  }, [go, last]);

  // 키보드 ← →
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(indexRef.current + 1);
      if (event.key === "ArrowLeft") go(indexRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    // 액자는 세로 4:5 비율로, PC에서는 화면 높이에 맞춰 가운데 정렬해요.
    <div className="mx-auto flex w-full flex-col gap-5 md:w-fit">
      <ViewTransition name={transitionName} share="project-morph">
        <div
          ref={frameRef}
          className="relative aspect-[4/5] w-[86%] max-w-full [container-type:size] md:h-[calc(100svh-13rem)] md:min-h-[420px] md:w-auto"
        >
          {images.map((image, i) => {
            const ratio = image.width / image.height;
            return (
              <div
                key={image.src}
                aria-hidden={i !== index}
                className="absolute inset-0 m-auto overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
                style={{
                  // 엽서 크기 = 사진 비율 그대로, 액자 안에 꽉 차게
                  width: `min(100cqw, ${ratio} * 100cqh)`,
                  height: `min(100cqh, 100cqw / ${ratio})`,
                  // 옆으로 미끄러지는 모습이 보이다가 끝에서 투명해져요
                  transition: `transform ${FLIP_MS}ms ${EASE}, opacity ${FLIP_MS * 0.7}ms ease-in, filter ${FLIP_MS}ms ${EASE}`,
                  // 앞 사진일수록 위에 쌓여요
                  zIndex: images.length - i,
                  ...cardStyle(i - index),
                }}
              >
                <Image
                  src={image.src}
                  alt={`${title} ${i + 1}`}
                  fill
                  preload={i === 0}
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </ViewTransition>

      {/* 몇 번째 사진인지 + 넘김 버튼 */}
      <div className="flex items-center gap-6">
        <p className="font-display text-2xl tabular-nums">
          {String(index + 1).padStart(2, "0")}
          <span className="text-white/40">
            {" "}
            / {String(images.length).padStart(2, "0")}
          </span>
        </p>
        <div className="relative h-px flex-1 bg-white/15">
          <div
            className="absolute inset-y-0 left-0 bg-white transition-all duration-700"
            style={{ width: `${((index + 1) / images.length) * 100}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="이전 사진"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="h-10 w-10 border border-white/20 transition-colors hover:border-white disabled:opacity-30 disabled:hover:border-white/20"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="다음 사진"
            onClick={() => go(index + 1)}
            disabled={index === last}
            className="h-10 w-10 border border-white/20 transition-colors hover:border-white disabled:opacity-30 disabled:hover:border-white/20"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
