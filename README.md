# SEARCH TIMES 미니 프로젝트

![searchTimes_01](https://user-images.githubusercontent.com/8604840/141694271-6a9308e0-0bf7-44fc-84c8-6f1ae291e81a.gif)

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
- 모바일 대응
