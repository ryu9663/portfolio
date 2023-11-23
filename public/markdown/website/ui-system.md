# UI 시스템

회사에서 랜딩페이지를 자주 업데이트 하고 협업하는 디자이너분은 프로덕트 디자이너가 아닌, 마케팅팀의 브랜드 디자이너였다.  
매번 높은 자유도 때문에 컴포넌트 재사용을 생각할 수 없어서 어느순간 유지보수성을 생각하지 않고 작업하였다. 그렇게 1년간 작업하다가 마케터분들을 아래 이유로 설득하고 UI 시스템이라 부르는 디자인 시스템을 만들었다.

- 디자인은 지원버튼 클릭률에 영향을 주지 않음
- 각 부트캠프마다 디자인이 다르기 때문에 유저로 하여금 브랜드 통일성을 느낄 수 없음(Toss, Naver가 일관된 톤을 유지하는 것을 예시로 듬)

## Polymorphic Component 구현

동료분이 Polymorphic 컨셉을 제안해 주셔서 모두 [이 글](https://kciter.so/posts/polymorphic-react-component)을 읽고, 그 분의 주도하에 Polymorphic 컴포넌트가 탄생하였다.

Polymorphic 컴포넌트는 `as Props`를 통해 무엇이든 될 수 있는 컴포넌트인데 우리가 만든 `Text.tsx` 는 다음과 같다.

```language-typescript
    // p태그
    <Text as="p" size={['body5', 'body4', 'body3']} fontWeight="bold" color="white10">
          {title}
    </Text>
```

### 반응형

협의한 반응형 스타일만 사용하면서 개발 시간이 크게 단축되었고, UI도 통일시킬 수 있었다.

#### before

디자인 시스템을 사용하기 이전에는 다음과 같이 아주 자유도 높은 디자인을 미디어 쿼리를 통해 작성했었다.

```language-typescript
    export const NewMQ = {
      MOBILE: `@media only screen and (max-width: ${NewBreakPoints.MOBILE.maxPx}px)`,
      TABLET: `@media only screen and (min-width: ${NewBreakPoints.TABLET.minPx}px)`,
      DESKTOP: `@media only screen and (min-width: ${NewBreakPoints.DESKTOP.minPx}px)`
    };

    const MainPhraseUnit = styled.span`
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 36px;
      letter-spacing: -0.025em;

      ${NEWMQ.desktop} {
        font-size: 28px;
        line-height: 42px;
      }
    `;
```

#### after

디자인 시스템에는 정해진 사이즈를 배열`[mobile,tablet,desktop]`에 할당하면서 개발 시간이 크게 단축할 수 있었다.

다음은 mobile에는 `font-size: 14px`, tablet에서는 `font-size: 16px`, desktop에서는 `font-size: 18px`으로 스타일을 할당한 p 태그이다.

```language-typescript
    export const FONT_SIZE = {
      // content typo
      ...
      body3: 'font-size: 18px; line-height: 140%; letter-spacing: 0;',
      body4: 'font-size: 16px; line-height: 140%; letter-spacing: 0;',
      body5: 'font-size: 14px; line-height: 140%; letter-spacing: 0;',
      ...
    }

    <Text as="p" size={['body5', 'body4', 'body3']} fontWeight="bold" color="white10">
          {title}
    </Text>
```

### 타입

타입스크립트의 목적은 심플하다.
들어오면 안되는 타입을 개발단계에서 차단하여 관련 버그를 예방하는 것.
즉, 타입으로 안정성을 확보할 수 있기 때문에 대충할 수 없는 영역이고 이는 때로 골치가 아프다.

#### Font Style 타입

일단 Text 컴포넌트에서 이용할 스타일은 `font-size`, `font-weight`, `color` 이다.

```language-typescript
    export type FontSize = keyof typeof FONT_SIZE;
    export type FontWeight = keyof typeof FONT_WEIGHT;
    export type lineHeight = `${number}${'px' | '%'}`;

    type _TextProps = {
      size: FontSize | FontSize[];
      fontWeight?: FontWeight;
      color?: Color;
    };
```

#### as

`as Props`를 위한 타입은 간단하다.

```language-typescript
    export type AsProp<T extends React.ElementType> = {
      as?: T;
    };
```

#### Ref를 할당할 수 있는 PolymorphicComponentProps Type

ref를 props로 주고 받으려면 forwardRef로 컴포넌트를 호출해야한다. 이 과정에서 forwardRef와 타입이 꼬이지 않게 ref 타입을 명시해주어야 한다.

일단 React.ComponentPropsWithRef<T>['ref']를 통해 정확한 ref 타입을 가져온다.
(제너릭 T는 ElementType에 해당하는 것만 할당 가능)

```language-typescript
    // react component의 ref 를 PolymorphicRef에 할당. 제너릭 T는 ElementType에 해당하는 것만 할당 가능
    export type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>['ref'];
```

이렇게 PolymorphicRef를 `{ref?: PolymorphicRef<T>;}`에 할당하고 AsProps,ComponentPropsWithoutRef, 제너릭 `Props` 와 합친다.

```language-typescript
    export type PolymorphicComponentProps<T extends React.ElementType, Props = {}> = AsProp<T> &
      React.ComponentPropsWithoutRef<T> &
      Props & {
        ref?: PolymorphicRef<T>;
      };
```

#### 최종 타입

위에서 만든 모든 타입을 `TextComponent` Type 으로 묶어준다.

```language-typescript
    export type TextProps<T extends React.ElementType> = PolymorphicComponentProps<T, _TextProps>;
    type TextComponent = <T extends React.ElementType = 'span'>(props: TextProps<T>) => React.ReactNode | null;

    export const Text: TextComponent = forwardRef(
      <T extends React.ElementType = 'span'>(
        { size, color = 'black10', as, children, className, ...props }: TextProps<T>,
        ref: PolymorphicRef<T>['ref']
      ) => {
        const isFontSize = typeof size === 'string' ? Object.keys(FONT_SIZE).includes(size) : true;

        return (
          <StyledText
            className={cn({ [size as string]: !isFontSize }, className)}
            size={size}
            color={color}
            ref={ref}
            as={as as React.ElementType}
            {...props}
          >
            {children}
          </StyledText>
        );
      }
    );
```

## 섹션 템플릿화

각 부트캠프 섹션들이 분명 비슷한데도 디테일이 상이하여 결국에는 재사용하지 못하고 매번 새로 만드는 일이 비일비재 했고 이 또한 개선하였다.

ex) 디테일이 상이한 커리큘럼 섹션
![curriculums](https://www.datocms-assets.com/107137/1700449870-curriculums.png)

섹션들을 템플릿화 하고 나서 개발, 디자인 시간이 크게 단축되었고 각 부트캠프의 UI도 통일되어 더욱 일관성있는 브랜딩을 가져갈 수 있었다.
![be](https://www.datocms-assets.com/107137/1698302312-2023-10-26-3-38-26.png)
![blockchain](https://www.datocms-assets.com/107137/1698302325-2023-10-26-3-38-41.png)
![uxui](https://www.datocms-assets.com/107137/1698302338-2023-10-26-3-38-52.png)

## 정리

UI 시스템의 특징은 크게 두가지이다.

- Polymorphic 컨셉으로 만든 `Text.tsx`
- 자주쓰이는 섹션 템플릿 화

위 두가지를 통해 스타일 작성 시간을 크게 단축할 수 있었고, 디자이너분도 디자인 설계하는데 시간이 크게 단축되었다고 하셨다.

서로가 서로를 배려하다보니 아무 발전도 하지 못한 지난 1년이었다.

갈등은 더 심각한 갈등을 피하기 위한 것이다. 갈등이 없으면 아무 발전도 없다. 라는 것을 몸소 느꼈다.
