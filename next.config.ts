import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // 페이지를 이동할 때 부드러운 전환 애니메이션을 켭니다.
    viewTransition: true,
  },
};

export default nextConfig;
