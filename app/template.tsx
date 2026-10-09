import { ViewTransition } from "react";

// template은 페이지를 이동할 때마다 새로 그려져요.
// 그래서 여기서 페이지가 들어오고 나가는 애니메이션을 정합니다. (globals.css의 page-enter / page-exit)
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
