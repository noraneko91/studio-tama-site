// public 폴더 파일 경로 앞에 사이트 기본 주소를 붙여요.
// GitHub Pages에서는 주소가 /studio-tama-site/... 로 시작해서 필요해요.
// 예) asset("/images/logo_02.png") → "/studio-tama-site/images/logo_02.png"
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
