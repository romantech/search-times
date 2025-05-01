/** 메타데이터 키 타입 - 검색 결과의 메타정보를 나타내는 키 */
type MetaKey = 'hits' | 'offset' | 'time';

/** 멀티미디어 기본 정보 인터페이스 - 이미지의 기본 속성 */
interface MultimediaBase {
  height: number; // 이미지 높이 (픽셀)
  url: string; // 이미지 URL
  width: number; // 이미지 너비 (픽셀)
}

/** 멀티미디어 인터페이스 - 기사에 포함된 이미지 정보 */
interface Multimedia {
  caption: string; // 이미지 캡션
  credit: string; // 이미지 출처/크레딧
  default: MultimediaBase; // 기본 이미지 정보
  thumbnail: MultimediaBase; // 썸네일 이미지 정보
}

/** 키워드 인터페이스 - 기사와 관련된 키워드 정보 */
interface Keyword {
  name: string; // 키워드 유형 (예: subject, persons, organizations)
  value: string; // 키워드 값
  rank: number; // 키워드 중요도 순위
}

/** 저자 정보 인터페이스 */
interface Byline {
  original: string; // 원본 저자 정보 문자열 (예: "By JOHN SMITH")
}

/** 헤드라인 인터페이스 - 기사 제목 관련 정보 */
interface Headline {
  main: string; // 메인 헤드라인
  kicker: string; // 헤드라인 위에 표시되는 짧은 소개 텍스트
  print_headline: string; // 인쇄 버전의 헤드라인
}

/** 기사 인터페이스 - 개별 뉴스 기사 정보 */
interface Article {
  abstract: string; // 기사 요약/초록
  byline: Byline; // 저자 정보
  document_type: string; // 문서 유형 (예: article, multimedia)
  headline: Headline; // 헤드라인 정보
  keywords: Keyword[]; // 기사 관련 키워드 목록
  multimedia: Multimedia; // 기사 관련 멀티미디어 정보
  news_desk: string; // 뉴스 데스크 (예: Weekend, Politics, Business)
  print_page: string; // 인쇄 버전의 페이지 번호
  print_section: string; // 인쇄 버전의 섹션 정보
  pub_date: string; // 발행일 (ISO 8601 형식)
  section_name: string; // 섹션 이름 (예: World, U.S., Technology)
  snippet: string; // 기사 내용의 짧은 발췌문
  source: string; // 출처 (예: "The New York Times")
  subsection_name: string; // 하위 섹션 이름
  type_of_material: string; // 자료 유형 (예: Review, News, Opinion)
  uri: string; // 기사의 고유 식별자 URI (예: "nyt://article/...")
  web_url: string; // 기사의 웹 URL
  word_count: number; // 기사의 단어 수
  _id: string; // 기사의 고유 ID (예: "nyt://article/...")
}

/** 응답 인터페이스 - API 응답의 주요 데이터 컨테이너 */
interface Response {
  docs: Article[]; // 검색된 기사 목록
  metadata: Record<MetaKey, number>; // 메타데이터 (hits: 총 검색 결과 수, offset: 페이지 오프셋, time: 검색 소요 시간)
}

/** 기사 검색 응답 인터페이스 - 전체 API 응답 구조 */
interface ArticleSearchResponse {
  status: string; // 응답 상태 (예: "OK")
  copyright: string; // 저작권 정보
  response: Response; // 실제 응답 데이터
}
