import Image from "next/image";
import { asset } from "@/lib/asset";

// 브랜드 로고 TA(m*)A예요. public/images/logo_02.png(1210×1210)에서 로고 부분만 잘라 보여줘요.
// 로고 위치: 가로 312~897px, 세로 496~705px (585×209)
// 크기는 글자 크기(text-2xl, text-4xl 등)를 따라가요. 로고 높이 = 1.25em
const scale = 1.25 / 209; // 원본 1px → em

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-block overflow-hidden align-middle ${className}`}
      style={{ width: `${585 * scale}em`, height: `${209 * scale}em` }}
    >
      <Image
        src={asset("/images/logo_02.png")}
        alt="STUDIO TAMA"
        width={1210}
        height={1210}
        sizes="260px"
        className="absolute max-w-none"
        style={{
          width: `${1210 * scale}em`,
          height: `${1210 * scale}em`,
          left: `${-312 * scale}em`,
          top: `${-496 * scale}em`,
        }}
      />
    </span>
  );
}
