import { Cormorant_Garamond, Geist } from "next/font/google";

// 사이트 글씨체
// 영어: Cormorant Garamond (여기서 불러와요)
// 한글: Pretendard (layout.tsx에서 npm 패키지 pretendard의 CSS로 불러와요)
export const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

// 인트로의 TA(m*)A 글자 전용 (로고와 같은 계열의 산세리프)
export const logoSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});
