## 들어가며

Redux는 무엇이고 왜 쓰는 걸까? 

React도 어려운데 React를 배우다보면 거기서 파생된 것으로 보이는 여러가지 것들을 또 만나게 된다. 일단 무릇 기술의 존재 이유가 그렇듯 쓰면 좋으니까 사용하는 걸텐데 초보자 입장에선 오히려 부담으로 먼저 다가온다. 그렇다고 안 배울 수도 없고, 하다 못해 내가 쓰지 않더라도 남이 쓴 코드를 알아보려면 기본은 알아야 하지 않겠나. 그래서 최대한 쉽고 간단하게, 주관적이고 얕은 레벨에서 Redux에 대해 정리하고자 한다.

## Redux는 왜 쓸까?

한 마디로 요약하자면 상태 관리에 용이하기 때문에 쓴다. 조금 더 나누자면,

- 깊숙한 컴포넌트까지 `props`를 전달해주는 게 너무 번거로울 때
- `state`를 잘 관리하고 싶을 때 쓴다.

### 번거로운 `props` 전달

기본적으로 React는 UI 요소를 컴포넌트로 만들어 재사용하기 위해 존재한다. 당연히 컴포넌트 안에서 다른 컴포넌트를 자식 컴포넌트로 사용하는 것도 가능하다. 

각 컴포넌트에 필요한 상태는 `state`라는 특수한 변수에 담아 관리한다. 말그대로 어떤 상태를 나타내는 변수다. `state`를 선언한 컴포넌트 안에서 사용할 거라면 상관 없겠지만 개발을 하다 보면 이 `state`를 자식 컴포넌트 안에서도 사용해야 하는 상황이 나오기 마련이다. 그때 이용되는 것이 `props` 문법이다. 일종의 전송 수단이라고 볼 수 있다.

그런데 컴포넌트 안에 컴포넌트 안에 컴포넌트... 이런 식으로 계속해서 컴포넌트가 중첩된 상태라고 해보자. 그렇다면 가장 상위 컴포넌트에서 선언한 `state`를 가장 내부에 있는 컴포넌트에 전달해주기 위해 그 중첩횟수만큼이나 `props`를 통해 전달해주어야 한다. 우리 개발자는 이런 중복을 피하고 싶다. 귀찮기도 하고. 지금이 바로 Redux가 멋지게 등장하는 지점이다.

Redux를 사용하면 `state`를 보관하는 저장소(`store.js`)를 만들 수 있다. 그리고 여기에 관리하고 싶은 `state`를 보관하면 된다. 이렇게 해놓으면 모든 컴포넌트는 이 저장소로부터 `state`를 꺼내 쓸 수 있게 된다. (낙수효과를 기대하는 것보다 수혜 타겟한테 직접 돈을 주는 게 더 직관적이라는 비유가 떠오르는 건 주제를 너무 벗어났으려나) 이것으로 코드가 한결 간결해질 수 있다.

### 사용 예시

```jsx
// index.jsx
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';

import App from './App';

const state = {
	// ...
}

function reducer(state, action) {
	return {
	...state,
	// ...
	}
}

const store = createStore(reducer);

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('app'),
);

// MyComponent.jsx
import { useSelector } from 'react-redux';

export default function MyComponent() {
	const dataFromStore = useSelector( (state) => state );

	return (
		// ...
	);
}
```

보다시피 모든 컴포넌트가 `props`없이 `state`를 직접 꺼내어 쓸 수 있다.

### 상태 관리의 편리함

상태 관리, 즉 `state`를 보다 편리하게 관리할 수 있게 해준다.

`state`를 꺼내어 쓴 컴포넌트 안에서 `state`의 값을 변경하고 싶을 때가 있다. 물론 그 컴포넌트 안에서 값을 직접 변경하는 것도 가능하다. 다만 이렇게 했을 경우 문제가 생겼을 때 원인을 찾아 바로잡는 것이 매우 힘들어진다. 어떤 컴포넌트에서 잘못된 방식으로 `state`를 다루었는지 알 수가 없기 때문에 의심가는 순서대로 일일이 확인하는 수밖에 없다. 또 다시 Redux가 멋지게 등장할 타이밍이다.

Redux를 사용하면 `state`를 다루는 방법에 대해 미리 정해놓을 수 있다.  이렇게 함으로써 각 컴포넌트는 `state`를 직접 변경하지 않고 그렇게 해달라고 요청만 하게 된다. 마치 API를 만들어 놓고, 만들어진 API를 가져다 쓰는 것과 비슷하다. 이는 컴포넌트가 그 본연의 기능인 UI 요소 렌더링에 더욱 집중하게 해준다. 이제 아까와 같은 문제는 사라졌다. 뭔가 잘못된 방식으로 `state`가 변경되고 있다고 해서 모든 컴포넌트를 전수조사할 필요가 없다. 컴포넌트는 변경을 요청했을 뿐이니까. 이것으로 우리는 문제를 보다 간편하게 추적하고 디버깅할 수 있게 되었다.

### 사용 예시

```jsx
// state가 저장된 곳은 store, 변경 방법은 action, 그걸 전달하는 걸 reducer라 부른다.
 
// reducer.js
// ...
export function reducer(state = initialState, action) {
	if (action.type === 'someAction') {
		// state를 다루는 방법 내용
	}
	// ...
}

// MyComponent.jsx
import { useDispatch, useSelector } from 'react-redux';

export default function MyComponent() {
	const dataFromStore = useSelector( (state) => state );
	const dispatch = useDispatch();

	return (
		<div>
			// ...
			<button
        type="button"
        onClick={() => {
          dispatch({ type: 'someAction' });
        }}
      >
        상태 변경
      </button>
		</div>
	);
```