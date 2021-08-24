# Jest

[Getting Started · Jest](https://jestjs.io/docs/getting-started)

### Basic example

```jsx
// sum.js
export default function sum(a, b) {
  return a + b;
}
```

```jsx
// sum.test.js
import sum from './sum'

test('2 + 2 = 4', () => {
  expect(sum(2, 2)).toBe(4);
});
```

### it

`test` 대신 `it`을 사용할 수도 있다. 동작 방식은 완전히 같고 그저 조금 더 자연어처럼 보이게 하기 위함이다. 

### describe

여러 테스트를 `describe` 키워드를 통해 묶어줄 수 있다.

### render()

`react-testing-library`에서 컴포넌트를 렌더링 할 때에는 `render()` 라는 함수를 사용한다. 이 함수가 호출되면 그 [결과물](https://testing-library.com/docs/react-testing-library/api#render-result) 에는 DOM 을 선택 할 수 있는 [다양한 쿼리](https://testing-library.com/docs/dom-testing-library/api-queries)들과 `container`가 포함되어있다.

- `container` : 해당 컴포넌트의 최상위 `DOM`을 가리킨다. 스냅샷 테스팅(렌더링된 결과가 이전에 렌더링한 결과와 일치하는지 확인하는 작업)에 이용할 수도 있다.

## 다양한 쿼리

`render` 함수를 실행하고 나면 그 결과물 안에는 [다양한 쿼리](https://testing-library.com/docs/dom-testing-library/api-queries) 함수들이 있다. 쿼리 함수들은 `react-testing-library`의 기반인 `[dom-testing-library](https://testing-library.com/docs/dom-testing-library/intro)`에서 지원하는 함수들이다. 이 쿼리 함수들은 `Variant`와 `Queries`의 조합으로 네이밍되어 있다.

- `Variant`
    - `getBy` : `getBy*`로 시작하는 쿼리는 **조건에 일치하는 DOM 엘리먼트 하나**를 선택. 만약에 **없으면 에러**. e.g., `getByText` : 텍스트를 사용해서 원하는 DOM을 선택.
    - `getAllBy` : `getAllBy*`로 시작하는 쿼리는 **조건에 일치하는 DOM 엘리먼트 여러 개**를 선택. **하나도 없으면 에러**.
    - `queryBy` : `queryBy*`로 시작하는 쿼리는 **조건에 일치하는 DOM 엘리먼트 하나를 선택**. 만약에 **존재하지 않아도 에러가 발생하지 않는다**.
    - `queryAllBy`
    - `findBy` : `findBy*`로 시작하는 쿼리는 **조건에 일치하는 DOM 엘리먼트 하나가 나타날 때 까지 기다렸다가 해당 DOM을 선택하는 `Promise`를 반환**. 기본 `timeout`인 4500ms 이후에도 나타나지 않으면 에러가 발생.
    - `findAllBy`
- `Queries`
    - `ByLabelText` : `label`이 있는 `input`의 `label` 내용으로 `input`을 선택.

    ```jsx
    <label for="username-input">아이디</label>
    <input id="username-input" />

    const inputNode = getByLabelText('아이디');
    ```

    - `ByPlaceholderText` : `placeholder` 값으로 `input` 및 `textarea`를 선택.

    ```jsx
    <input placeholder="아이디" />;

    const inputNode = getByPlaceholderText('아이디');
    ```

    - `ByText` : 엘리먼트가 갖고 있는 텍스트 값으로 DOM을 선택. 텍스트 값으로 정규식도 가능.

    ```jsx
    <div>Hello World!</div>;

    const div = getByText('Hello World!');
    const div2 = getByText(/^Hello/);
    ```

    - `ByAltText` : `alt` 속성을 가지고 있는 엘리먼트 (주로 `img`)를 선택.
    - `ByTitle` : `title` 속성을 가지고 있는 DOM 혹은 `title` 엘리먼트를 지니고있는 svg를 선택.

    ```jsx
    <p>
    	<span title="React">리액트</span>는 짱 멋진 라이브러리다.
    </p>

    <svg>
    	<title>Delete</title>
    	<g><path/></g>
    </svg>

    const spanReact = getByTitle('React');
    const svgDelete = getByTitle('Delete');
    ```

    - `ByDisplayValue` : `input`, `textarea`, `select`가 지닌 현재 값으로 엘리먼트를 선택.

    ```jsx
    <input value="text" />;

    const input = getByDisplayValue('text');
    ```

    - `ByRole` : `role` 값을 지니고 있는 엘리먼트를 선택.

    - `ByTestId` : 다른 방법으로 선택하지 못할 때 사용하는 방법으로, 특정 DOM에 직접 test 할 때 사용할 id를 달아서 선택. 물론 최대한 지양해야 한다. 그래도 DOM의 `querySelector`보다는 낫다.

    ```jsx
    <div data-testid="commondiv">흔한 div</div>;

    const commonDiv = getByTestId('commondiv');
    ```

## 이벤트 핸들링

### fireEvent

`fireEvent()` 함수를 이용하여 이벤트를 발생시킬 수 있다.

`fireEvent.eventName(DOM, eventObject);`

## Matchers

> Jest uses "matchers" to let you **test values in different ways**. This document will introduce some commonly used matchers. For the full list, see the `expect` API doc. ([https://jestjs.io/docs/expect](https://jestjs.io/docs/expect))

### Common Matcher

가장 간단한 방법

```jsx
test('2 + 2는 4', () => {
  expect(2 + 2).toBe(4);
});
```

위 코드에서 `expect(2 + 2)` 는 `expectation 객체`를 리턴한다. 일반적으로 이러한 `expectation 객체`로 `call matchers`를 제외하곤 많은 작업을 하진 않는다. 

`.toBe(4)`가 `matcher`다. Jest가 실행되면, 모든 매칭 실패들을 추적하여 에러 메시지를 출력해준다.

`toBe`는 확실한 동등성(exact equality)을 검증하기 위해 `Object.is`를 사용한다. 객체의 값을 확인하고 싶다면 `toBe` 대신에  `toEqual`을(깊은 체킹인듯) 사용한다.

- `Object.is`

    > 이는 `==` 연산자에 따른 같음과 같지 않다.`==` 연산자는 같음을 테스트하기 전에 양 쪽(이 같은 형이 아니라면)에 다양한 강제(coercion)를 적용하지만(`"" == false`가 `true`가 되는 그런 행동을 초래), `Object.is`는 어느 값도 강제하지 않는다.
    이는 `===` 연산자에 따른 같음과도 같지 않다. `===` 연산자(와 `==` 연산자 역시)는 숫자값 `-0`과 `+0`을 같게 `Number.NaN`은 `NaN`과 같지 않게 여긴다.

### 정리

- `toBe` : 가장 간단한 방법
- `not` : 불일치 여부 확인. e.g., `not.toBe()`
- `toEqual` :  객체용, 참조 안 값까지 확인
- `toBeNull`, `toBeUndefined`, `toBeDefined`, `toBeTruthy`, `toBeFalsy` : 해당 값들과만 매칭
- `toBeGreaterThan`, `toBeGreaterThanOrEqual`, `toBeLessThan` 등 : 숫자용
- `toMatch` : 문자열용
- `toContain` : 배열 및 iterable 자료형용, `includes`와 유사.
- `toThrow` :  에러 발생 여부 확인, 에러 지정 가능

## 비동기 코드 테스트

### 콜백

비동기의 가장 일반적인 패턴은 콜백함수다. 비동기 테스팅은 주의해야 한다. 테스트가 콜백함수를 호출하기 이전에 끝날수 있기 때문이다. 

```jsx
// Don't do this!
test('the data is peanut butter', () => {
  function callback(data) {
    expect(data).toBe('peanut butter');
  }

  fetchData(callback);
});
```

그래서 빈 인수가 있는 함수에 테스트를 넣는 대신, `done`이라는 단일 인수를 사용한다. 그러면 Jest는 테스트를 완료하기 전에 완료된 콜백이 호출될 때까지 기다린다.

```jsx
test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

### Promise

### `.resolves` / `.rejects`

### Async / Await

## 테스트 전후 설정(Setup & Teardown)

테스트가 실행되기 전에 수행해야 하는 설정 작업과 테스트 실행 후에 수행해야 하는 마무리 작업이 있는 경우를 위한 도우미 기능

### 많은 테스트를 위한 반복 작업용 셋업

많은 테스트를 반복적으로 해야한다면 `beforeEach`와 `afterEach`를 이용할 수 있다. 

```jsx
beforeEach(() => {
  initializeCityDatabase(); // 각 테스트 전에 호출돼야 하는 메소드
});

afterEach(() => {
  clearCityDatabase(); // 각 테스트 종료 후 호출돼야 하는 메소드
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

### 일회용 셋업

`beforeAll`과 `afterAll`

## Mock Functions(모의 함수)

- mocking이란?

    출처: [https://www.daleseo.com/jest-fn-spy-on/](https://www.daleseo.com/jest-fn-spy-on/)

    Jest의 장점 중에 하나는 다른 라이브러리 설치 없이 바로 mock 기능을 지원한다 것이다. 

    ### mocking 이란?

    mocking은 단위 테스트를 작성할 때, 해당 코드가 의존하는 부분을 가짜(mock)로 대체하는 기법을 말한다. 일반적으로 테스트하려는 코드가 의존하는 부분을 직접 생성하기가 너무 부담스러운 경우 mocking을 사용한다. 애초에 그러한 테스트는 특정 기능만 분리해서 테스트하겠다는 유닛 테스트의 철학에 부합하지 않는다. 

    mocking은 이러한 상황에서 실제 객체인 척하는 가짜 객체를 생성하는 매커니즘을 제공한다. 또한 테스트가 실행되는 동안 가짜 객체에 어떤 일들이 발생했는지를 기억하기 때문에 가짜 객체가 내부적으로 어떻게 사용되는지 검증할 수 있다. 

    결론적으로, mocking을 이용하면 실제 객체를 사용하는 것보다 훨씬 가볍고 빠르게 실행되면서도, 항상 동일한 결과를 내는 테스트를 작성할 수 있다.

모의 함수를 사용하면 함수의 실제 구현을 지우고, 

- 함수에 대한 호출(및 해당 호출에서 전달된 파라미터)을 캡처하고,
- `new`를 통한 생성자 함수의 인스턴스를 캡처하고,
- 테스트 하는 중에 리턴 값을 설정할 수 있다.

함수를 mock하는 방법 두 가지, 

- 테스트 코드에 사용할 모의 함수를 만들거나,
- `module dependency`를 `override`하는 수동 모의 함수를 작성.

### jest.fn()

Jest는 가짜 함수(mock functiton)를 생성할 수 있도록 jest.fn() 함수를 제공한다. 일반 자바스크립트 함수와 동일한 방식으로 인자를 넘겨 호출할 수 있다.

```jsx
const mockFn = jest.fn();

mockFn();
mockFn(1);
mockFn("a");
mockFn([1, 2], { a: "b" });
```

아직 위 가짜 함수의 호출 결과는 모두 `undefined`다. 어떤 값을 반환할지 알려주지 않았기 때문이다.

`mockReturnValue(리턴 값)` 함수를 이용해서 가짜 함수가 어떤 값을 리턴해야할지 설정해줄 수 있다. 비슷한 방식으로 `mockResolvedValue(Promise가 resolve하는 값)` 함수를 이용하면 가짜 비동기 함수를 만들 수 있다.

```jsx
mockFn.mockResolvedValue("I will be a mock!");
mockFn().then((result) => {
  console.log(result); // I will be a mock!
});
```

참고 자료

- [https://jestjs.io/docs/getting-started](https://jestjs.io/docs/getting-started)
- [https://velog.io/@velopert/series/react-testing](https://velog.io/@velopert/series/react-testing)
- [https://jestjs.io/docs/mock-function-api](https://jestjs.io/docs/mock-function-api)
- [https://testing-library.com/docs/react-testing-library/intro/](https://testing-library.com/docs/react-testing-library/intro/)
- [https://velog.io/@modolee/series/tdd](https://velog.io/@modolee/series/tdd)