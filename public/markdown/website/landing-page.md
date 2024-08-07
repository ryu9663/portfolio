# [코드스테이츠 랜딩페이지](https://www.codestates.com)

![코드스테이츠 홈페이지](https://www.datocms-assets.com/107137/1698302941-2023-10-26-3-48-56.png?w=900)

## 소개

`Next` `Typescript` `Styled-Components` `Zustand` `Storybook`

Notion api로 만든 CMS와 Next를 이용하여 SSG 렌더링을 하였습니다.  
b2c 부트캠프, Non-brand 유입을 목적으로 개설한 블로그, 유관사업등을 소개하는 랜딩페이지입니다.

- Notion api를 사용한 이유 : 랜딩페이지 변경이 빈번한 상황에서, 배포없이 마케터분들이 랜딩페이지의 문구를 직접 변경 할 수 있도록 하기 위함

## 한 일

- 반응형 UI, 웹표준에 근거한 마크업 작업
- 디자인 시스템 구축
- 성능 최적화

  - 써드파티 스크립트(채널톡, gtm 등 마케팅 툴) 다운로드 시점을 html로드 이후로 지연
  - 초기 html의 용량 감소를 위해 첫 렌더링에 필요하지 않은 컴포넌트는 CSR로 변경
  - 모달에 이미지가 있는 경우, 버튼 마우스 호버시 이미지를 사전 로드하여 모달 오픈시 이미지 렌더링 시간 단축
  - JS에서 이루어지던 반응형을 CSS 반응형으로 변경하여 추가 렌더링 방지

- 마케팅 지원
  - 핵클 라이브러리 이용한 컴포넌트, 디바이스 단위의 A/B 테스트
  - 유저트래킹 환경 세팅 : 타 도메인인 랜딩페이지와 지원 플랫폼간의 분절된 유입정보를 연결
    - 유저들의 유입정보를 파악할 수 있게 되어 마케팅팀 전략 재수립의 계기가 됨
