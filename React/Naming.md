## 리액트 이벤트 핸들러 네이밍 컨벤션

### 발단

리액트를 사용하면서 매번 주먹구구식으로 함수 이름을 짓는 것 같아 공식적인 네이밍 컨벤션을 찾아보았다. 공식 문서는 아니지만 국룰 정도에 해당하는 포스팅을 찾을 수 있었다.

[Event Handler Naming in React](https://jaketrent.com/post/naming-event-handlers-react)

### Props

props 이름은 prefix로 `on*`을 붙인다. (e.g., `onClick`). 이는 내장 이벤트 핸들러 규칙과 일치한다. 이를 통해 props가 비슷한 용도로 사용되는 이벤트 핸들러 기능을 수용할 것이라 선언하는 효과를 얻을 수 있다.

### Functions

함수는 `on*`을 `handle*` prefix로 사용한다. (e.g, `handleClick`)

```jsx
<MyComponent onClick={this.handleClick} />
```

`on`은 props에 실제 이벤트가 연결되어 있음을 의미하고, `handle`은 이벤트가 발생했을 때 호출될 함수임을 의미한다.

I keep the verb from the actual action. I like the mapping of the name better that way. Often the semantic action that occurs is identified some other way internal to the event handler.

예시에서 보듯 같은 동사(`Click`)가 쓰인 것이 포인트다. 기능에 따라 함수를 다른 이름으로 짓고 싶을 수도 있다. 이를테면, 클릭 후 경고 대화상자가 닫아져야 한다면 `handleDismiss`로 호출하고 싶을 수도 있다. 포스팅의 저자는 같은 동사(click)를 사용하여 실제 동작(dismiss)과 다르게 네이밍하는 것을 선호한다고 한다. 동일한 이름을 사용하는 것으로 의미론적 액션에 대한 혼란을 줄여주고 식별을 쉽게하기 때문이란다. 하지만 이 부분은 크게 와닿지 않았다. 좀 더 고민해봐야 할 부분인 것 같다. (원문: **I keep the verb from the actual action. I like the mapping of the name better that way. Often the semantic action that occurs is identified some other way internal to the event handler.**)

### 더 복잡한 네이밍

조금 더 복잡한 상황이라면 다음과 같이 네이밍할 수 있다.

e.g., alerts와 form이 있는 상황

- `onAlertClick={handleAlertClick}`
- `onFormSubmit={handleFormSubmit}`

단어순으로는 명사(`Alert`)를 먼저 쓰고, 동사(`Click`)를 붙인다. 그리고나서 이를 중심으로 다른 이벤트가 추가되면 알파벳순으로 그룹화한다.

- `onAlertClick={handleAlertClick}`
- `onAlertHover={handleAlertHover}`

```jsx
<MyComponent
  onAlertClick={handleAlertClick}
  onAlertHover={handleAlertHover}
  onFormSubmit={handleFormSubmit}
/>
```

### 컴포넌트 분리

컴포넌트 분리는 논의할 사항이 많은 주제다. 특히 이벤트 핸들러 네이밍과도 관련이 깊다. 한 컴포넌트 안에서 많은 이벤트 핸들러를 정의한 경우엔 추상화 및 캡슐화가 필요할 확률이 높다.

e.g.,

```jsx
<Form
  onRegistrationSubmit={handleRegistrationSubmit}
  onLoginSubmit={handleLoginSubmit}
/>
```

이는 다음과 같이 분리할 수 있다.

```jsx
<RegistrationForm onSubmit={handleRegistrationSubmit} />
<LoginForm onSubmit={handleLoginSubmit} />
```

### 내장 핸들러

리액트에는 `onClick`, `onSubmit`과 같은 내장 핸들러들이 존재한다. 이러한 내장 핸들러를 컴포넌트에 전달할 때 이 이름들을 사용할 땐 주의해야 한다.

e.g.,

이를테면 아래와 같이 전개 연산자를 이용하여 props를 전달할 때 의도치않은 동작이 발생할 수 있다. 아래 코드에선 이벤트 버블링으로 인해 `button` 태그의 `onClick` 이벤트가 먼저 실행된 후 `div`의 `onClick` 이벤트가 실행된다.

```jsx
function MyComponent(props) {
  return <div {...props}>Stuff that might really need the onClick...</div>;
}
```

### 요약

- props는 `on`을 붙여, 함수는 `handle`을 붙여 작명한다.
- props와 함수 이름의 동사부분은 통일하는 것이 좋다.
- 네이밍이 복잡해지는 경우 명사-동사 순으로 작성한다.
- 한 컴포넌트 안에 너무 많은 핸들러가 있다면 추상화 및 캡슐화를 시도해보자.
- 내장 핸들러와 같은 이름으로 명명된 핸들러를 사용할 땐 주의하자.
