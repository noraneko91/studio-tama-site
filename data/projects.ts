// 프로젝트 목록이에요. 여기에 항목을 추가하면 목록 페이지와 상세 페이지가 자동으로 생겨요.
// slug는 주소에 쓰여요. 예) slug: "verish" → /projects/verish

import { asset } from "@/lib/asset";

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "Retail" | "F&B";
  type: string;
  location?: string;
  year: string;
  area?: string;
  photo?: string;
  summary: string;
  cover: ProjectImage;
  images: ProjectImage[];
};

function img(name: string, width: number, height: number): ProjectImage {
  return { src: asset(`/images/${name}`), width, height };
}

const projectList: Project[] = [
  {
    slug: "long-distance-club",
    title: "LONG DISTANCE CLUB",
    client: "LDC",
    category: "Retail",
    type: "Multi-brand Select Shop",
    year: "2026", // 임시 연도
    location: "Singwang-ro, Jeju",
    area: "1F · 260㎡",
    photo: "@keemdg",
    summary:
      "스테인리스와 우드, 선명한 블루 포인트로 러닝 브랜드의 에너지를 담아낸 롱디스턴스클럽 제주 셀렉트숍. 곡선형 집기가 매장 안의 흐름을 자연스럽게 이끕니다.",
    cover: img("project-LDC-02.png", 795, 1112),
    images: [
      img("project-LDC-01.png", 822, 1099),
      img("project-LDC-03.png", 814, 1117),
      img("project-LDC-04.png", 798, 1090),
      img("project-LDC-05.png", 820, 1116),
    ],
  },
  {
    slug: "hieta",
    title: "HIETA",
    client: "hieta",
    category: "Retail",
    type: "Pop-up Store",
    location: "The Hyundai Seoul B2F, Yeouido",
    year: "2026",
    area: "33㎡",
    photo: "@keemdg",
    summary:
      "더현대 서울에서 열린 hieta의 2026 여름 팝업 스토어. 별 모양 오브제와 핑크·버건디 컬러로 브랜드의 경쾌한 무드를 33㎡ 공간에 담았습니다.",
    cover: img("project-hieta-01.png", 795, 1021),
    images: [
      img("project-hieta-03.png", 793, 549),
      img("project-hieta-02.png", 834, 1036),
      img("project-hieta-04.png", 801, 1021),
    ],
  },
  {
    slug: "musinsa",
    title: "MUSINSA",
    client: "MUSINSA",
    category: "Retail",
    type: "Brand Space",
    year: "2026", // 임시 연도
    summary:
      "높은 층고와 철골 구조를 그대로 드러내고, 브랜드와 프로그램이 바뀌어도 유연하게 대응할 수 있도록 구성한 무신사의 브랜드 공간.",
    cover: img("project-musinsa-04.png", 926, 773),
    images: [
      img("project-musinsa-01.png", 952, 1182),
      img("project-musinsa-02.png", 952, 1182),
      img("project-musinsa-03.png", 891, 1182),
      img("project-musinsa-05.png", 926, 773),
      img("project-musinsa-06.png", 926, 773),
      img("project-musinsa-07.png", 1062, 821),
    ],
  },
  {
    slug: "verish",
    title: "VERISH",
    client: "VERISH",
    category: "Retail",
    type: "Flagship Store",
    year: "2026", // 임시 연도
    location: "Anguk, Seoul",
    summary:
      "따뜻한 우드와 석재, 노출 콘크리트 천장이 어우러진 베리시 플래그십 스토어. 제품이 차분하게 돋보이도록 소재와 빛의 균형을 맞췄습니다.",
    cover: img("project-Verish-01.png", 867, 1167),
    images: [
      img("project-Verish-03.png", 1121, 770),
      img("project-Verish-02.png", 867, 1167),
      img("project-Verish-05.png", 836, 1114),
      img("project-Verish-04.png", 1147, 654),
      img("project-Verish-06.png", 1097, 830),
      img("project-Verish-07.png", 1141, 784),
      img("project-Verish-08.png", 852, 1149),
    ],
  },
  {
    slug: "andersson-bell",
    title: "ANDERSSON BELL",
    client: "ADSB",
    category: "Retail",
    type: "Store",
    year: "2025", // 임시 연도
    summary:
      "컬러풀한 바닥과 메탈 프레임, 텍스처가 살아있는 벽면으로 브랜드의 실험적인 무드를 담아낸 앤더슨벨 매장.",
    cover: img("project-ADSB-01.png", 914, 1158),
    images: [
      img("project-ADSB-02.png", 1169, 765),
      img("project-ADSB-03.png", 880, 1149),
    ],
  },
  {
    slug: "komu",
    title: "KOMU",
    client: "KOMU",
    category: "F&B",
    type: "Restaurant",
    year: "2025", // 임시 연도
    summary:
      "원목 가구와 큰 창으로 들어오는 빛이 편안한 분위기를 만드는 다이닝 공간. 오픈 키친과 바 좌석으로 공간에 생기를 더했습니다.",
    cover: img("project-KOMU-02.png", 840, 777),
    images: [img("project-KOMU-01.png", 1062, 777)],
  },
  {
    slug: "pp-bakery",
    title: "PP BAKERY",
    client: "PP BAKERY",
    category: "F&B",
    type: "Bakery & Café",
    year: "2025", // 임시 연도
    summary:
      "스테인리스, 우드, 미러 소재를 조합해 빛이 부드럽게 머무는 베이커리 카페.",
    cover: img("project-PPBakery-01.png", 867, 1167),
    images: [img("project-PPBakery-02.png", 867, 1167)],
  },
];

// 최신 연도가 먼저 오도록 자동 정렬해요. 같은 연도끼리는 위 목록에 적은 순서를 지켜요.
export const projects = [...projectList].sort(
  (a, b) => Number(b.year) - Number(a.year),
);

// 프로젝트가 있는 연도 목록 (최신순). 예) ["2026", "2025"]
export const years = [...new Set(projects.map((project) => project.year))];

// 프로젝트 분류예요. slug는 주소에 쓰여요. 예) /projects?category=retail
export const categories = [
  { slug: "retail", label: "Retail" },
  { slug: "fnb", label: "F&B" },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
