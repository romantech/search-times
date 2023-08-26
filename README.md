# Search Times

![searchTimes_01](https://user-images.githubusercontent.com/8604840/141826030-73aff288-eb89-4d94-80a1-4b133780e57d.gif)

> _입력한 키워드로 뉴욕타임즈 기사를 검색하는 미니 어플리케이션입니다_

- Live Demo : [http://search-times.vercel.app](http://search-times.vercel.app/)
- 작업기간 3일

# 사용 스택 / 라이브러리

- TypeScript
- React(CRA) + Hooks
- Redux
- Styled-Components
- Ant Design

# 주요 기능

- 뉴욕타임즈 API 활용, 기사(Article) 검색
  - 검색창 키워드 변경시 자동 검색
  - 중복 요청일 경우 이전 요청 취소(Axios Cancel Token 활용)
- 기사 즐겨찾기
  - 원클릭 즐겨찾기 추가 / 해제
  - 즐겨찾기 데이터 로컬 스토리지 저장
- 모바일 지원

# 프로젝트 목적
- 실시간 검색창에 디바운스 적용 실습
- Axios 취소 토큰 실습
