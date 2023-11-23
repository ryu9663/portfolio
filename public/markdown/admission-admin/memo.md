# 타이머가 매 초 리렌더링 되면서 주변 컴포넌트도 리렌더링 되는 상황

회사에서 동료분이 타이머 깜빡이 해결이 안된다고 하셔서, 메모이제이션을 통해 해결한 사례이다.
![메모이제이션 before](https://www.datocms-assets.com/107137/1700459310-form-memo-before.gif)

**타이머가 업데이트 될 때마다 타이머 state를 참조하는 모든 컴포넌트가 리렌더링 되는 상황이다.**
아래와 같이 props 변화 유무에 따라 컴포넌트를 메모이제이션 하여 해결할 수 있었다.

```typescript
const SurveyBoardContent = ({ survey }: SurveyBoardContentProps) => {
  return (
    <SurveyBoardContentWrapper>
      <CozSurveyTheme>
        <Survey model={survey} />
      </CozSurveyTheme>
    </SurveyBoardContentWrapper>
  );
};

export default React.memo(SurveyBoardContent);
```

![메모이제이션 after](https://www.datocms-assets.com/107137/1700459320-form-memo-after.gif)

---

[이 글의 일부 입니다.](https://www.wnsdufdl.com/post/B1IEFQkSSwKAiQChDCpksQ)
