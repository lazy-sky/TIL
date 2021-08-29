# React Testing Library 실수를 줄이기 위한 위한 팁

출처: [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 공식 ESLint 플러그인을 사용해라.

- [eslint-plugin-testing-library](https://github.com/testing-library/eslint-plugin-testing-library)
- [eslint-plugin-jest-dom](https://github.com/testing-library/eslint-plugin-jest-dom)

## `render` 리턴 값에 대한 변수 이름으로 `wrapper`를 사용하지 말아라.

```jsx
// ❌
const wrapper = render(<Example prop="1" />);
wrapper.rerender(<Example prop="2" />);

// ✅
const { rerender } = render(<Example prop="1" />);
rerender(<Example prop="2" />);
```

`wrapper`라는 이름은 enzyme의 오래된 코드이며 여기선 필요하지 않다. 애초에 `render`의 리턴 값은 아무것도 “감싸지(wrapping)” 않는다. 차라리 `render`로 부터 필요한 것을 구조 분해하거나, `view`라고 명명하자.

## `cleanup`을 사용하지 말아라.

```jsx
// ❌
import { render, screen, cleanup } from "@testing-library/react";
afterEach(cleanup);

// ✅
import { render, screen } from "@testing-library/react";
```

이제 대부분 주요 테스팅 프레임워크에서 `cleanup`은 자동으로 이루어지고 있다. ([https://testing-library.com/docs/react-testing-library/api/#cleanup](https://testing-library.com/docs/react-testing-library/api/#cleanup))

## `screen`을 사용해라.

```jsx
// ❌
const { getByRole } = render(<Example />);
const errorMessageNode = getByRole("alert");

// ✅
import { render, screen } from "@testing-library/react";
render(<Example />);
const errorMessageNode = screen.getByRole("alert");
```

`screen`은 [DOM Testing Library 6.11.0 버전에서 추가](https://github.com/testing-library/dom-testing-library/releases/tag/v6.11.0)되었다. `screen`을 이용하면 필요한 쿼리를 추가/제거 할 때마다 `render`를 호출해 최신 상태로 구조 분해할 필요가 없다. 그저 `screen`을 입력하고 에디터의 자동완성 마법을 기다리면 된다. 

다만 `container`나 `baseElement`를 세팅한 경우다. `debug` 대신 `screen.debug`를 사용할 수도 있다. `screen`을 사용하는 것은 쿼리와 디버깅 모두에 유용하다.

## 잘못된 단언문을 사용하지 말아라.

```jsx
const button = screen.getByRole("button", { name: /disabled button/i });

// ❌
expect(button.disabled).toBe(true);
// 에러 메세지:
//  expect(received).toBe(expected) // Object.is equality
//
//  Expected: true
//  Received: false

// ✅
expect(button).toBeDisabled();
// 에러 메세지:
//   Received element is not disabled:
//     <button />
```

위에서 사용한 `toBeDisabled` 단언문은 `jest-dom`에 있다. 훨씬 나은 에러 메세지를 받을 수 있으므로 `jest-dom`을 사용하는 것이 낫다. [@testing-library/jest-dom](https://github.com/testing-library/jest-dom#tobedisabled)를 설치해여 사용하자.

## `act`로 불필요하게 감싸지 말아라.

```jsx
// ❌
act(() => {
  render(<Example />);
});
const input = screen.getByRole("textbox", { name: /choose a fruit/i });
act(() => {
  fireEvent.keyDown(input, { key: "ArrowDown" });
});

// ✅
render(<Example />);
const input = screen.getByRole("textbox", { name: /choose a fruit/i });
fireEvent.keyDown(input, { key: "ArrowDown" });
```

사람들이 항상 “act” 경고문을 보고 이렇게 `act`로 감싸곤 한다. 그들이 놓친 사실은 `render`와 `fireEvent`는 항상 `act`로 감싸져 있다는 것이다. 그러니 이렇게 감쌀 필요가 없다.

대부분의 경우, `act` 경고문은 테스트에서 무언가 기대하지 않은 일이 일어나고 있다는 것을 말해주고 있는 것이다. 이에 대해선 다음 링크에서 더 자세히 배울 수 있다. [“not wrapped in act(…)” 경고문 고치기.](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning)

## 잘못된 커리를 사용하지 말아라.

```jsx
// ❌
// DOM이 동작한다고 가정하기:
// <label>Username</label><input data-testid="username" />
screen.getByTestId("username");

// ✅
// 레이블을 연결하고 타입을 설정해 DOM을 접근가능하도록 변경
// <label for="username">Username</label><input id="username" type="text" />
screen.getByRole("textbox", { name: /username/i });
```

권장되는 쿼리들의 사용 우선순위는 [여기](https://testing-library.com/docs/queries/about/#priority)서 확인할 수 있다.  가능한 최종 사용자가 하는 방식에 가깝게 DOM을 쿼리하는 것이 좋다. 

### `container`를 사용해서 쿼리하지 말아라.

```jsx
// ❌
const { container } = render(<Example />);
const button = container.querySelector(".btn-primary");
expect(button).toHaveTextContent(/click me/i);

// ✅
render(<Example />);
screen.getByRole("button", { name: /click me/i });
```

`querySelector`를 사용해서 쿼리하면 신뢰성, 테스트 가독성이 떨어진다. 테스트도 더 자주 중단될 것이다.

### 텍스트로 쿼리해라.

```jsx
// ❌
screen.getByTestId("submit-button");

// ✅
screen.getByRole("button", { name: /submit/i });
```

텍스트로 쿼리하지 않으면, 번역이 올바르게 적용되는지 확인하기 위해 추가 작업을 해야한다. 이에 대해 사람들은 컨텐츠 작성자가 테스트를 망가뜨린다는 불만을 하곤 한다. 하지만 만약 컨텐츠 작성자가 “유저이름”을 “이메일”로 바꾸는 경우, 그것은 우리가 명백히 알아야 하는 변경 점이다. 또, 뭔가 망가지는 상황이 있더라도 분류하고 문제를 고치는 게 쉬워서 해당 문제를 고치는데 전혀 시간이 걸리지 않는다. 따라서 비용은 매우 낮은데, 번역이 올바르게 적용되고 테스트를 읽고 쓰기 더 쉬워진다는 확신을 얻을 수 있다는 이득이 있다.

### `ByRole`를 사용해라

`*ByRole` 쿼리는 컴포넌트 출력물을 쿼리하는데 가장 권장되는 접근 방식이다. 여러가지 훌륭한 기능들이 있다. 이를테면, `name` 옵션을 사용하면 엘리먼트에 대해 스크린 리더에서 읽을 [접근가능한 이름(Accessible Name)](https://www.w3.org/TR/accname-1.1/)으로 엘리먼트를 쿼리할 수 있다.

```jsx
// DOM이 동작한다고 가정하기
// <button><span>Hello</span> <span>World</span></button>

screen.getByText(/hello world/i);
// ❌ 아래와 같은 에러와 함께 실패함:
// Unable to find an element with the text: /hello world/i. This could be
// because the text is broken up by multiple elements. In this case, you can
// provide a function for your text matcher to make your matcher more flexible.
/* 
(다음과 같은 텍스트를 가진 엘리먼트를 찾을 수 없습니다: /hello world/i. 
이것은 다수의 엘리먼트들에 의해 텍스트가 부서졌기 때문일 수 있습니다.
이런 경우, 텍스트 matcher를 더 유연하게 만들기 위해 함수를 제공할 수 있습니다.) 
*/

screen.getByRole("button", { name: /hello world/i });
// ✅ 동작함!
```

사람들이 `*ByRole` **쿼리를 사용하지 않는 이유는 엘리먼트에 배치된 암시적인 역할에 익숙하지 않기 때문이다. MDN의 규칙 리스트([https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles))가 있다. `*ByRole` 쿼리의 또 다른 기능은 지정한 역할을 가진 엘리먼트를 찾을 수 없는 경우, 일반적인 `get*`이나 `find*` 변형과 마찬가지로 전체 DOM의 로그를 남길 뿐 아니라 쿼리 할 수 있는 모든 사용 가능한 역할들도 로그를 남긴다는 것이다.

```jsx
// 작동하는 DOM 구조가 있다고 가정
// <button><span>Hello</span> <span>World</span></button>
screen.getByRole("blah");

// 이것은 아래 에러 메세지와 함께 실패할 것이다:
// TestingLibraryElementError: "blah" 규칙을 가진 접근가능한 엘리먼트를 찾을 수 없었습니다.
// 접근가능한 규칙은 아래와 같습니다:
  button:
  Name "Hello World":
  <button />
  --------------------------------------------------
<body>
  <div>
    <button>
      <span>
        Hello
      </span>
      <span>
        World
      </span>
    </button>
  </div>
</body>
```

버튼 역할을 갖기 위해 버튼에 `role=button`를 추가할 필요가 없다. 

## **`aria-`, `role` 및 기타 접근성 속성을 잘못 추가하지 말아라.**

```jsx
// ❌
render(<button role="button">Click me</button>);

// ✅
render(<button>Click me</button>);
```

잘못된 접근성 속성은 불필요할 뿐 아니라 스크린 리더와 서비스 이용자들을 혼란스럽게 만든다. 접근성 속성은 정말 의미론적 HTML이 use case를 만족시키지 못할 때만 필요하다.  

## **`@testing-library/user-event` 사용해라.**

```jsx
// ❌
fireEvent.change(input, { target: { value: "hello world" } });

// ✅
userEvent.type(input, "hello world");
```

`[@testing-library/user-event](https://seongry.github.io/2021/06-20-common-mistakes-with-rty/%5Bhttps://github.com/testing-library/user-event%5D(https://github.com/testing-library/user-event))`는 `fireEvent` 의 기반으로 빌드된 패키지지만, 사용자 상호작용과 더 유사한 여러 메서드들도 제공한다. 이를테면 `fireEvent.change`는 단순히 input의 하나의 변경 이벤트를 트리거하지만 `type` 호출은 문자마다 `keyDown`, `keyPress`, `keyUp` 이벤트들을 트리거한다. 이쪽이 훨씬 실제 사용자 상호작용과 유사하다. 이것은 변경 이벤트를 수신하지 않는 라이브러리와도 잘 동작한다는 이점이 있다. 가능한 `fireEvent`보다 `@testing-library/user-event`를 사용해라.

## 존재 여부를 확인하는 경우에만 `query*`를 사용해라.

```jsx
// ❌
expect(screen.queryByRole("alert")).toBeInTheDocument();

// ✅
expect(screen.getByRole("alert")).toBeInTheDocument();
expect(screen.queryByRole("alert")).not.toBeInTheDocument();
```

 `query*` 쿼리가 있는 이유는 쿼리와 일치하는 엘리먼트가 없을 때 에러를 발생하지 않고 호출할 수 있는 함수를 갖기 때문이다. (아무 요소도 찾을 수 없으면 `null`을 반환한다.) 이것이 유용한 유일한 경우는 엘리먼트가 페이지에 렌더링 되지 않았는지 확인할 때다. `query*` 변형은 엘리먼트를 **찾을 수 없다는 단언**을 할 때만 사용해라.

## `waitFor` 대신에 `find*` 쿼리를 사용해서 기다려라.

```jsx
// ❌
const submitButton = await waitFor(() =>
  screen.getByRole("button", { name: /submit/i })
);

// ✅
const submitButton = await screen.findByRole("button", { name: /submit/i });
```

위 코드는 근본적으로 같지만(`find*` 쿼리는 내부에서 `waitFor`을 사용한다), 두 번째 코드가 더 간단하고 더 나은 에러메세지를 받을 수 있다. 즉시 사용할 수 없는 무언가를 쿼리하고 싶을 때는  `find*`를 사용해라.

## `waitFor` 에 빈 콜백을 넘겨주지 말아라.

```jsx
// ❌
await waitFor(() => {});
expect(window.fetch).toHaveBeenCalledWith("foo");
expect(window.fetch).toHaveBeenCalledTimes(1);

// ✅
await waitFor(() => expect(window.fetch).toHaveBeenCalledWith("foo"));
expect(window.fetch).toHaveBeenCalledTimes(1);
```

`waitFor` 의 목적은 특정한 것이 일어날 때까지 기다리게 하는 것이다. 만약 빈 콜백을 넘겨준다면 모의(mocks) 작업의 방식 덕분에 동작할 지도 모른다. 하지만 비동기 로직을 리펙터링하면 쉽게 실패하는 취약한 테스트가 남게 된다. `waitFor` 내부에 명확한 단언문을 쓰자.

## 단일 `waitFor` 콜백 안의 다중 단언문을 사용하지 말아라.

```jsx
// ❌
await waitFor(() => {
  expect(window.fetch).toHaveBeenCalledWith("foo");
  expect(window.fetch).toHaveBeenCalledTimes(1);
});

// ✅
await waitFor(() => expect(window.fetch).toHaveBeenCalledWith("foo"));
expect(window.fetch).toHaveBeenCalledTimes(1);
```

앞의 예시에서 `window.fetch`가 두 번 호출된다고 가정하면 `waitFor` 호출은 실패하지만, 우리는 테스트 실패를 보기 전에 타임아웃을 기다려야한다. `waitFor` 안에 단일 단언문만 넣음으로써, 우리는 UI가 우리가 기대했던 대로 단언한 상태가 될 때까지 기다리거나, 단언문들 중 하나가 실패하면 더 빨리 실패를 볼 수 있다. ****콜백 안에는 하나의 단언문만 넣어라.

## `waitFor`에서 사이드 이펙트를 수행하지 말아라.

```jsx
// ❌
await waitFor(() => {
  fireEvent.keyDown(input, { key: "ArrowDown" });
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

// ✅
fireEvent.keyDown(input, { key: "ArrowDown" });
await waitFor(() => {
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});
```

`waitFor`는 수행한 작업과 단언문 전달 사이에 비결정적 시간이 있는 테스트를 위한 것이다. 이러한 이유로, 콜백은 비결정적 횟수와 빈도로 호출될(혹은 에러 검사할) 수 있다. (DOM이 변경될 때 마다도 호출된다). 즉 이는 사이드 이펙트가 여러 번 실행될 수 있다는 의미다. 또한 이는 `waitFor` 내부에 스냅샷 단언문을 사용할 수 없다는 의미이기도 하다. 만약 스냅샷 단언문을 사용하고 싶다면, 우선 특정 단언문을 기다리고, 그다음 스냅샷을 찍어야 한다. `waitFor` 콜백 바깥에 사이드 이펙트를 넣고 콜백 안에는 단언문만 사용해라.

## `get*` 변형을 단언문처럼 사용하지 말아라.

```jsx
// ❌
screen.getByRole("alert", { name: /error/i });

// ✅
expect(screen.getByRole("alert", { name: /error/i })).toBeInTheDocument();
```

(이건 그리 큰 문제는 아니지만) 만약 `get*` 쿼리들이 엘리먼트를 찾는 데 실패했다면, 쿼리들은 디버깅에 도움이 될 수 있도록 전체 DOM 구조를(문법에 하이라이팅까지 해서) 보여주는 아주 유용한 에러 메세지를 던질 것이다. 이것 때문에, 단언문은 절대로 실패할 가능성이 없다.(왜냐면 쿼리들이 단언문이 실행되기 전에 에러를 던지니까). 이러한 이유로 많은 사람들이 단언문을 건너뛴다.  사실 이렇게 해도 괜찮긴 하다. 다만 코드를 읽는 사람에게 이것이 리팩토링 이후에 붙어있는 오래된 쿼리가 아니라 그것이 존재함을 명확하게 알려주기 위해 단언문을 유지하는 것이 더 옳다. 무언가 존재함을 단언하고 싶다면, 단언문을 명시적으로 만들어라.