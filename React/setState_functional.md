## setState가 제대로 작동하지 않을 때

### 발단

`setState`가 의도치 않게 동작하지 않는 경우가 있다. 처음엔 그냥 우회해서 다른 방법으로 문제를 해결(회피)했던 것 같다. 문득 이를 제대로 해결해보고자 고민하다가 공식 문서 학습을 통해 해결의 실마리를 찾을 수 있었다.

[컴포넌트 State - React](https://ko.reactjs.org/docs/faq-state.html)

[React.Component - React](https://ko.reactjs.org/docs/react-component.html#setstate)

미리 말하는 결론은 `setState`가 비동기적으로 작동하기 때문에 문제가 발생하는 것이고, 따라서 그에 맞는 방식으로 문제를 해결할 수 있다.

문제 상황은 다음과 같다.

- `setState`를 연속해서 호출할 때
- `setState` 실행 직후 요청 API를 호출할 때

### setState

`setState`는 컴포넌트 `state`의 변경 사항을 대기열에 집어넣고, React에게 해당 컴포넌트와 그 자식들이 갱신된 state를 사용하여 다시 렌더링되어야 한다고 알린다.

`setState`는 컴포넌트를 갱신하는 데에 있어 즉각적인 명령이 아니라 **요청**이라고 생각하는 편이 더 바람직하다. 성능의 향상을 위하여 React는 이 메서드의 실행을 지연시키고 여러 컴포넌트를 한번에 갱신할 수도 있다. React는 **state 변화가 즉시 적용되는 것을 보장하지 않는다.**

`setState`는 컴포넌트를 **항상 즉각적으로 갱신하지는 않는다.** 오히려 여러 변경 사항과 함께 일괄적으로 갱신하거나, 나중으로 미룰 수도 있다. 이로 인하여 `setState`를 호출하자마자 `state`에 접근하는 것이 잠재적인 문제가 될 수 있다. 그 대신에  `setState`의 콜백(`setState(updater, callback)`)을 사용해야 한다. 이는 둘 다 갱신이 적용된 뒤에 실행되는 것이 보장한다.

`setState` 는 이벤트 핸들러 내에서 비동기적이다. 이로 인해 부모아 자식이 모두 click 이벤트에서 `setState`를 호출한다면 자식은 두 번 렌더링되지 않는다. 대신 React는 브라우저 이벤트가 끝날 시점에 state를 일괄적으로 업데이트합니다. 이는 더 큰 규모의 앱에서 뚜렷한 성능 향상을 만들어낸다.

모든 컴포넌트가 자신의 이벤트 핸들러에서 `setState`를 호출할 때까지 React는 리렌더링을 하지 않고 내부적으로 “기다리고” 있다. 이를 통해 불필요한 렌더링을 방지하면서 성능을 향상시킬 수 있다. 그럼에도 여전히 React가 `state` 를 동기적으로 업데이트하지 않는 이유가 와닿지 않을 수도 있다. 여기에는 두 가지 중요한 이유가 존재한다.

- `props` 와 `state` 사이의 일관성을 해칠 수 있으며, 이는 디버깅하기 매우 힘든 이슈를 일으킬 수 있기 때문이다.
- 현재 작업 중인 새로운 기능들을 구현하기 힘들게 만들 수 있기 때문이다.

이 [GitHub 코멘트](https://github.com/facebook/react/issues/11527#issuecomment-360199710)에서 더욱 자세한 예시를 확인할 수 있다.

### 해결

- **API 호출**
  이를테면 POST 요청에 함께 보내야 하는 state값을 변경하고 POST 요청을 해야 하는 케이스가 있다고 해보자. 동기적으로 생각해보면, 업데이트된 상태값을 넘겨야 하니까 `setState`를 실행하고 POST 요청을 보내면 된다고 생각하기 쉽다. 하지만 이렇게 하면 `setState`와 POST 요청 모두 비동기로 처리되며, 심지어는 POST 요청의 우선 순위가 더 높아 업데트이된 state가 전달되지 않을 수도 있다.
- **연속 호출**
  > `setState` 호출은 비동기적으로 이뤄집니다. 따라서 `setState` 호출 직후 새로운 값이 `state`에 반영될 거라고 믿어서는 안 됩니다. 이전 state 값을 기준으로 값을 계산해야 한다면 객체 대신 `updater` 함수를 전달하세요.
  e.g.,
  ```jsx
  incrementCount() {
    // 이 코드는 예상대로 동작하지 않는다.
    setState({count: count + 1});
  }

  handleSomething() {
    // count가 0에서 시작한다고 가정.
    incrementCount();
    incrementCount();
    incrementCount();
    // React가 컴포넌트를 리렌더링할 때 `count`는 3이 될 것 같은 예상과 달리 1이 된다.
    // `incrementCount()` 함수가 `count`에서 값을 읽어 오는데
    // React는 컴포넌트가 리렌더링될 때까지 `count`를 갱신하지 않기 때문이다.
    // 그러므로 `incrementCount()`는 매번 `count`의 값을 0으로 읽은 뒤에 이 값을 1로 설정한다.
  }
  ```
  > 항상 `setState` 가 가장 최신의 state 값을 사용하도록 보장하기 위해서는 `setState` 에 객체 대신 함수를 전달하세요.
  `setState`에 객체를 전달하는 것과 함수(updater)를 전달하는 것의 차이는, updater 함수 안에서 이전 state 값에 접근할 수 있는 것에 있다. `setState` 호출은 일괄적으로 처리되기 때문에 여러 업데이트 사항이 충돌 없이 차례대로 반영되도록 한다.
  ```jsx
  incrementCount() {
    setState(() => {
      return {count: count + 1}
    });
  }

  handleSomething() {
    incrementCount();
    incrementCount();
    incrementCount();
    // 지금 `count` 값을 읽어 보면 이 값은 여전히 0.
    // 하지만 React가 컴포넌트를 리렌더링하게 되면 이 값은 3이 된다.
  }
  ```

### 정리

1. `setState`는 비동기로 처리된다.
2. `setState`를 연속적으로 호출하면 Batch 처리를 한다.
3. `state`는 객체다.

`setState`가 호출되면 리액트는 바로 전달받은 state로 값을 바꾸는 것이 아니라 이전의 리액트 엘리먼트 트리와 전달받은 state가 적용된 엘리먼트 트리를 비교하는 작업을 거치고, 최종적으로 변경된 부분만 DOM에 적용한다. 핵심은 이 과정이 비동기로 동작하고 꽤나 번거롭다는 것이다. 그래서 리액트는 `setState`가 연속적으로 호출되면, 수고로움을 덜기 위해 전달 받은 각각의 state를 합치는 작업(merging, `Object.assign()`를 이용한다. )을 수행 한 뒤에 한 번에 `setState` 한다.

이는 `setState`에 객체가 아니라 함수를 전달하는 것으로 해결할 수 있다.
