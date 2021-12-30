## useMemo와 useCallback

### 발단

이제 `useState`와 `useEffect`는 비교적 자유롭게 활용할 수 있게 되었다. 고맙게도 이 둘만 제대로 사용해도 상태를 이모저모 다룰 수 있다. 그러한 이유로 여태까지 `useMemo`와 `useCallback`을 활용해본 적이 없다. 물론 이 둘은 최적화를 위한 옵션과 같은 Hook이기 때문에 안쓴다고 크게 문제가 되는 것은 아니다. (안쓰는 게 나을 때도 많고) 그런데 우연히 유튜브에서 본 어떤 분의 말이 심금을 울려 다시금 이 두 Hook의 활용성을 재고해보고자 한다.

> 단지 익숙하지 않은 기술을 배우지 않으려고 하는 나의 좁은 마음

출처: [https://www.youtube.com/watch?v=uBmnf_k7_r0](https://youtu.be/uBmnf_k7_r0)

### **이미 아는 것**

- 함수형 컴포넌트는 jsx를 반환하는 함수다. 그냥 함수일 뿐이다.
- 컴포넌트가 렌더링 될 때마다 함수가 호출되고 실행된다. 따라서 함수 내부의 표현식도 매번 선언되고 실행된다.
- 컴포넌트는 state 혹은 props가 변경될 떄마다 다시 렌더링된다.

### **useMemo**

- `useMemo`의 memo는 메모이제이션을 의미한다. 즉 계산된 값을 재사용하기 위한 Hook이다.
- 첫 번째 파라미터는 연산 방법을 정의하는 함수, 두 번째 파라미터는 deps 배열이다.

[Hooks API Reference - React](https://ko.reactjs.org/docs/hooks-reference.html#usememo)

- 메모이제이션된 값을 반환한다.
- deps가 변경되었을 때에만 메모이제이션된 값만 다시 계산한다.
- 배열이 없는 경우 매 렌더링 때마다 새 값을 계산한다.
- 성능 최적화를 위해 사용할 수 있지만 최적화가 보장되는 것은 아니다.
- e.g.,
  ```jsx
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  ```
- 부모 컴포넌트에게 props를 전달 받거나, 하나의 컴포넌트에서 둘 이상의 state가 있을 때 활용할 수 있다.

### **useCallback**

[Hooks API Reference - React](https://ko.reactjs.org/docs/hooks-reference.html#usecallback)

- 메모이제이션된 콜백을 반환한다.
- `useMemo`가 값을 재사용하기 위한 목적이라념 `useCallback`은 함수를 재사용하기 위함이다.
- 리렌더링될 때마다 새로이 함수가 만들어지는 과정을 방지할 수 있다.
  - 사실 함수를 새로 선언하는 게 메모리적으로 크게 문제는 아니다. 다만 props가 바뀌지 않으면 가상 DOM에 리렌더링하는 것조차 하지 않고 컴포넌트의 결과물을 재사용하도록 최적화할 수도 있는데 이 때 함수를 재사용해야만 한다. (`React.memo`로 컴포넌트 자체를 감싸면 넘겨 받는 props가 변경되지 않았을 때는 상위 컴포넌트가 메모리제이션된 함수형 컴포넌트(이전에 렌더링된 결과)를 사용하게 된다.)
  - 하위 컴포넌트가 **React.memo()** 같은 것으로 최적화 되어 있고, 콜백을 props로 넘길 때, 상위 컴포넌트에서 `useCallback`으로 함수를 선언하는 것이 유용하다. 함수가 매번 재선언되면 하위 컴포넌트는 넘겨 받은 함수가 달라졌다고 인식하기 때문이다.
- 함수 안에서 사용하는 state나 props가 있다면 반드시 deps에 포함시켜야 한다. props로 받아온 함수도 마찬가지로 넣어주어야 한다.
- e.g,
  ```jsx
  const memoizedCallback = useCallback(() => {
    doSomething(a, b);
  }, [a, b]);
  ```
- 사실 `useMemo`를 기반으로 만들어졌기 때문에 `useMemo`로 사용해도 되긴 한다.
  - `useCallback(fn, deps)`은 `useMemo(() => fn, deps)`와 같다.

### 결론

**요약 및 정리**

컴포넌트에서 jsx는 객체 형태로 리턴된다.이때 리턴된 객체와 현재의 가상 DOM이 비교해서 같으면 그냥 두고 달라졌으면 변경하는 과정을 거친다. 그런데 이때의 비교는 얕은 비교이기 때문에 가상 DOM은 현재 상태와 새로 전달 받은 object의 바뀐 부분만 ‘부분적으로’ 변경하는 게 아니라 바뀌었으면 객체를 아예 새로 만들어서 교체하게 된다.

이때 `useMemo`, `useCallback`, `React.memo` 등으로 컴포넌트 최적화가 되어 있다면 변경된 부분이 없을 때는 이전에 메모이제이션해둔 객체를 가상 DOM이 그대로 사용해서 아예 비교 자체를 하지 않기 때문에 렌더링을 최적화할 수 있다.

**발전**

이러한 최적화 Hook은 컴포넌트의 성능을 실제로 개선할 수 있는 상황에서만 활용하는 것이 바람직하다. 렌더링을 최적화하지 않을 컴포넌트에서 `React.memo`를 사용하는 것은 불필요한 props 비교만 추가시킬 뿐이다.

여전히 `console.log`를 찍어보며 렌더링을 확인해볼 수도 있지만, React Dev Tools의 Profiler 등을 이용할 수도 있다.

아직 적극적으로 최적화가 필요한 순간을 마주치진 않아봤지만, 그런 순간이 오거든 두려워하지 말자.
