# 자동저장 기능 구현시 고려해야 할 것

몇 초 간격으로 자동저장 되도록 하는 기능을 구현하려면 가장 먼저 떠오르는게 setInterval이다. 하지만 setInterval은 react 라이프 사이클과 맞물려 돌아가지 않기 때문에 약간의 수정이 필요하다.

그리고 지원선발 시스템이 상용화 된지 한참 후에 유저가 제출한 설문지의 모든 답변이 초기화 되는 이슈가 제보되었는데, 재현이 되지 않았다. 나중에 알고보니 다중탭 문제였다.

## 자동 저장 구현 방식 : useInterval

```typescript
useEffect(() => {
  const autoSaveTimer = setInterval(autoSaveCallback, 1000 * 10);
  return () => clearInterval(autoSaveTimer);
}, []);
```

10초마다 자동저장하는 기능 구현을 위해, 위와 같이 하면 될 것 같지만 안된다.  
왜냐하면 setInterval은 react 함수 컴포넌트가 리렌더링 된 후에 초기화되지 않고 계속 살아있기 때문이다.

setInterval의 라이프사이클과 react의 라이프 사이클과 맞지 않기 때문에 약간 변형해주어야 하는데 Dan 형님께서 친히 만들어주신 [useInterval.tsx](https://github.com/donavon/use-interval/blob/master/src/index.tsx) 라는 것이 있어서 이것을 사용하면 된다.

useInterval을 사용하면 다음과 같이 작성할 수 있다.

```typescript
useInterval(autoSaveCallback, 10 * 1000);
```

## 다중탭으로 인한 초기화

10초 간격으로 유저의 답변을 자동저장하는 기능이었는데, 두개 이상의 탭에 똑같은 질문지를 2개 켜놓고 한쪽 탭에서만 질문지를 제출하면 '빈 질문지' 와 '작성중인 질문지'가 연달아 자동저장되다가 '작성중인 질문지'를 제출완료 했을때 결과적으로 '빈 질문지'가 마지막으로 자동저장되면서 모든 답변이 초기화 되는 것이었다.

이를 해결하기 위해서 브라우저,서버 양 측에서의 validation을 추가하였다.

### 프론트

프론트단에서는 `document.hidden` 을 이용했다.

```typescript
useInterval(() => {
  if (document.hidden) {
    // 활성화 되어 있지 않으면 암것도 안함.
    return;
  }
  recordApplicationAnswer(survey, 'save');
}, 10 * 1000);
```

### 백엔드

백엔드 단에서는 서버에서 기억하는 상태와 실제 상태를 비교해서 값이 다르면 에러를 반환하기로 하고, 프론트에서는 해당 에러를 받을때 모달을 띄워주기로 했다.

```
  const handleAutoSaveError = (err: AxiosError) => {
    if (isErrorModalShowed) return;

    const { message } = (err as unknown as AxiosError).response?.data;

    switch (message) {
      case '이전 상태가 일치하지 않습니다.':
        return Modal.error({
          title: '지원 안내',
          content:
            '지원자님의 응답을 안전하게 저장하기 위해 마이페이지로 이동합니다. 마이페이지에서 진행 현황을 확인해주세요.',

          okText: '확인',
          onOk: () => {
            history.push(`/mypage`);
            setIsErrorModalShowed(false);
          }
        });
      ...
    }
  };
```

예를 들어 DB에는 질문지의 상태가 `SUBMITTED` 로 기록되어 있는데, 갑자기 `IN_PROGRESS` 가 들어오면 다중탭 에러로 판단하고 모달로 안내하는 것이다.

## 정리

- 다중탭의 경우 활성화되지 않은 탭에서 자동저장이 실행되지 않도록 하는 것
- setInterval이 react의 라이프사이클과 맞지 않기 때문에 useInterval을 만들어 쓰는 것

두가지를 고려해야 한다.
