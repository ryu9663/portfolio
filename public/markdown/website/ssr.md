# SSR에서 고려해야 할 것들

next는 SSR을 할 수 있는 리액트 프레임워크이다. JSX문법으로 렌더링 할 코드를 작성하면, next 서버에서 html을 만들어주고 그 이후 hydration이 진행되면서 리액트(CSR)이 진행된다.

## 반응형을 JS로 작성했을때의 참사

아래 gif를 보면 헤더가 한번 바뀌었다가 렌더링 되는 것을 볼 수 있다.
![hydration 이후에 디자인이 변경되는 gif](https://www.datocms-assets.com/107137/1700627397-ssr-reactive-design.gif)

### 원인

결론부터 말하면 `useWindowsize.tsx` 로 반응형을 작성했기 때문이다.

```typescript
const GeneralTemplate: React.FC<Props> = props => {
  const { width, height } = useWindowSize();
  const isMobileMode = width ? width <= MIN_DESKTOP_SIZE : false;

  return (
    {isMobileMode ? (
        <MobileHeader />
      ) : (
        <GeneralHeader />
      )}
)
```

이렇게 되면 모바일에서는 아래와 같은 이유로 무조건 리렌더링이 일어난다.

1. SSR단계에서 useWindowSize()가 없으므로 width가 undefined이다.
2. `isMobileMode = false` 이기 때문에 `<GeneralHeader />` 를 렌더링하게 된다.
3. hydration이 시작되면서 useWindowSIze()가 작동하고, `isMobileMode=true` 로 변하면서 `<MobileHeader />` 를 렌더링하게 된다.

### 해결책

SSR되는 컴포넌트에 반응형을 작성할 때에는 필히 JS로 작성하지 않아야 한다.
다른 방법도 있을지 모르겠는데, 나는 css media-query로 서버에서 만들어지는 html에서 반응형을 처리하도록 하였다.

```html
<!-- 992px 후 display:none -->
<Container.MobileAndTablet>
  <MobileHeader />
</Container.MobileAndTablet>

<!-- 992px 전까지 display:none -->
<Container.DESKTOP>
  <GeneralHeader />
</Container.DESKTOP>
```

![반응형을 css로 작성한 이후](https://www.datocms-assets.com/107137/1700628428-ssr-reactive-design-after.gif)

## Code Splitting (바로 보이지 않는 것은 CSR하기)

아래 gif에서 검색버튼을 클릭했을때 내려오는 검색창은 초기 html에 필요하지 않고, CSR 시켜도 무방한 컴포넌트이다. 이처럼 첫 렌더링에 필요하지 않은 컴포넌트는 csr 시켜서 초기 html을 조금이라도 가볍게 하는 것이 좋다.

![blog-search](https://www.datocms-assets.com/107137/1698304561-blog-searchtoggle.gif)

next에서 CSR을 시키기 위해서는 dynamic import를 사용하면 된다. (해당 프로젝트를 진행한 next는 과거의 pages directory였는데, [app router에서의 방식](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)도 크게 다르지 않다.)

```typescript
// import BlogSearchButton from '@/components/organisms/header/GeneralHeader/BlogSearch/BlogSearchToggle';

import dynamic from 'next/dynamic';
const BlogSearchToggle = dynamic(
  () => import('@/components/organisms/header/GeneralHeader/BlogSearch/BlogSearchToggle'),
  { ssr: false },
);
```

개발자도구에서 Performance를 분석해보면 `BlogSearchToggle`이 before-hydration에서 제외되어, before-hydration의 로드시간이 소폭 단축한 것이 확인된다.

아래 사진은 다이나믹 임포트 하기 전인데, before-hydration 로드 시간이 3.84초이고 BlogSearchToggle이 before-hydration에 포함된 모습이다.

![다이나믹임포트 이전](https://www.datocms-assets.com/107137/1700631382-before-dynamic-blogsearch.png)

다음 사진은 다이나믹 임포트하여 BlogSearchToggle이 before-hydration에서 제외되면서 로드 시간이 3.68초로 소폭 감소한 것을 볼 수 있다.

![다이나믹임포트 이후](https://www.datocms-assets.com/107137/1700631400-after-dynamic-blogsearch.png)

번들맵을 찍어보았을때도 BlogSearchToggle이 분리된 것이 확인된다.

![번들분리](https://www.datocms-assets.com/107137/1700665325-bundlesplitting.webp)

## 써드파티 툴은 html 이후에 로드하기

일단 빨리 페이지를 로드해서 유저에게 보여주는 것이 중요한데 GTM, 채널톡등 html 이후에 로드되어도 무방한 것들이 있다.

next에서 lazyOnLoad와 afterInteractive는 Next/Script 옵션인데, 다음과 같다.

- lazyOnLoad : 초기 페이지 로딩 속도를 향상시키는 것이 목적이다. 일단 불러오기만 하면 그 이후 동작은 신경 쓸 필요가 없는 라이브러리에 사용 (ex : 채널톡은 불러오기만 하면 그 이후 작동에는 우리 코드가 관여하지 않음 -> lazyOnLoad 사용)

- afterInteractive : 어플리케이션이 인터랙티브 상태에 도달한 후 추가 작업을 수행할 수 있게 하는 것이 목적. (ex : GTM의 작동방식은 코드에 입력함. 즉 우리 코드를 기반으로 추가 작업을 하기 때문에 afterInteractive에 속한다.)

이 둘을 이용하여 써드파티 스크립트가 html 로딩을 차단하지 않도록 할 수 있다.

기존 `_document.tsx`에 있던 코드를 다음과 같이 변경했다.

```typescript
export const ThirdPartyScriptLoader = () => {
    return <> {/* 구글 태그 매니저 */}
      <Script id="gtm" strategy="afterInteractive">
        {code}
      </Script>

      {/* 네이버 프리미엄로그분석 */}
      <Script
        src="..."
        strategy="lazyOnload"
        onLoad={code}
      />

      {/* 채널톡* /}
      <Script id="channel-io" strategy="lazyOnload">
        ...
      </Script></>
}

// _app.tsx
const App = ({ Component, pageProps }: AppProps) => {
 ...
  return (
    <>
    ...
            <Component {...pageProps} />
        <ThirdPartyScriptLoader />
    ...
    </>
  );
};

export default App;
```

SSG를 활성화 시키지 않은 localhost에서도 dcl(Dom Content Loaded)이 1초밖에 단축이 되지 않았다. 유의미한 변화는 없었지만, 그래도 초기 html 로드를 막지 않는 것에 의의를 두자!

써드파티툴이 아주 많은 환경에서 유용한 기술일 것 같다.

![dcl 비포앤애프터](https://www.datocms-assets.com/107137/1700638469-beforeandafterdcl.png)

## 정리

첫번째는 SSR 하는 컴포넌트의 반응형을 JS에서 다루지 않음으로, 스타일로 인한 리렌더링을 막는것이고  
두번째 바로보여주지 않는 컴포넌트들은 CSR로 전환하여 초기 html에서 제외하는 것  
세번째는 써드파티 툴 스크립트 로드가 html 로드를 차단하지 않도록 지연시키는 것이다.
