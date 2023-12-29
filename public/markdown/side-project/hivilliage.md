# [하이빌리지](https://hivillage.wnsdufdl.com/)

## 소개

내 위치 주변 관광지들을 시각적으로 한눈에 파악할 수 있는 서비스 입니다.  
관광공사의 Tour API와 카카오맵을 이용하여 만들었습니다.

![하이빌리지](https://www.datocms-assets.com/107137/1703218145-hivilliage.png?w=900)

- 컴포넌트는 npm publish 되어 있는 [개인 컴포넌트 라이브러리](https://www.npmjs.com/package/junyeol-components)를 이용했습니다.

- 동일한 내용을 검색시에는 캐시된 데이터를 불러오도록 하여 요청수를 줄였습니다. (캐시 기간 하루)
  ![하이빌리지 캐시](https://www.datocms-assets.com/107137/1703219497-hivilliage-cache.gif?w=900)
