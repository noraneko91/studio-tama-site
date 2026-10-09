import type { Metadata } from "next";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { INTRO_KEY } from "./_components/introKey";
import { cormorant, logoSans } from "./fonts";
// 한글 글씨체 Pretendard: 화면에 필요한 글자만 나눠서 불러오는 버전
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "STUDIO TAMA — Space and Visual",
    template: "%s — STUDIO TAMA",
  },
  description:
    "STUDIO TAMA는 서울을 기반으로 리테일, F&B 등 상업 공간을 디자인하는 공간 디자인 스튜디오입니다.",
};

// 화면이 그려지기 전에 실행돼서, 인트로를 이미 봤으면 바로 숨깁니다. (Intro.tsx 참고)
const introScript = `(function(){var d=document.documentElement;if(location.pathname!=="/")return;try{var seen=sessionStorage.getItem("${INTRO_KEY}")==="1";var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;d.dataset.intro=seen||reduce?"done":"playing"}catch(e){d.dataset.intro="done"}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${cormorant.variable} ${logoSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`.intro-overlay{display:none}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col pt-20 font-serif text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
