import type { NextConfig } from "next";

// GitHub Pages로 배포할 때만 PAGES_BASE_PATH(예: "/studio-tama-site")가 설정돼요.
// (.github/workflows/pages.yml 참고) 평소 개발할 때는 아무 영향이 없어요.
const pagesBasePath = process.env.PAGES_BASE_PATH ?? "";
const isGitHubPages = pagesBasePath !== "";

const nextConfig: NextConfig = {
  ...(isGitHubPages && {
    // 서버 없이 HTML 파일로 미리 만들어 out 폴더에 저장
    output: "export",
    basePath: pagesBasePath,
    // /about → /about/index.html 로 만들어서 GitHub Pages에서 바로 열리게
    trailingSlash: true,
    // 이미지 자동 최적화는 서버가 필요해서 원본 이미지를 그대로 사용
    images: { unoptimized: true },
  }),
  env: {
    // 이미지 경로 앞에 붙일 주소 (lib/asset.ts에서 사용)
    NEXT_PUBLIC_BASE_PATH: pagesBasePath,
  },
  experimental: {
    // 페이지를 이동할 때 부드러운 전환 애니메이션을 켭니다.
    viewTransition: true,
  },
};

export default nextConfig;
