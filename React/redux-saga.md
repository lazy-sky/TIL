# redux-saga에 대하여

## 발단

파이널 프로젝트에서 사용할 기술 스택을 정하는 회의 중에 내 부족함이 많이 드러났다. 어떤 스택을 제안해도 내가 아는 게 거의 없었다. 어떤 기술이 좋다고 해서 무작정 배우는 게 아니라, 그 기술들이 생겨난 배경, 그러니까 어떤 불편함을 극복하고자 생긴 건지 체득하면서 학습해나가고 싶어서 일부러 학습하지 않은 경향이 있었다. 여전히 무작정 지식을 수집하는 것보단 그렇게 나아가는 게 옳다고 믿는다. 새로운 기술에 반감이 있는 건 아니니까. 어쨌거나 redux를 제대로 맛보고 즐기진 못했지만 미들웨어에 대해 학습해야 하는 상황이다. redux가 나온 배경에 대해선 이미 충분히 공감하고 있으니 그 이후 redux-thunk, redux-saga로 이어지는 흐름(기술이 등장한 배경 및 해결하고자 하는 것)을 알아보고자 한다.

참고:

[redux-saga 가 해결하는 문제](https://min9nim.vercel.app/2020-04-23-redux-saga/)

## 이미 아는 것 - React

- SPA가 유행하며 다양한 프레임워크, 라이브러리가 등장했고, 그 중에서도 리액트는 가장 사랑받는 컴포넌트 기반의 라이브러리다. **리액트의 기본적인 관심은 화면을 컴포넌트 단위로 구조화 하고 애플리케이션의 상태를 효과적으로 화면에 렌더링** 하는데에 있다. 리액트를 이용하면 간편하게 컴포넌트 기반의 UI를 제작하고 상태를 중심으로 화면을 렌더링할 수 있다.
- 하지만 화면을 그리는 것 외에도 외부 입력을 받아서(사용자 입력 등) 이에 따른 적절한 비즈니스 로직을 처리하고 그 결과를 애플리케이션 상태에 반영하며 필요한 사이드이펙트들을 잘 처리하는 작업이 필요한데 리액트는 이에 대한 훌륭한 방법을 제공하지는 않는다. (리액트의 관심사가 아니다.) 따라서 리액트 생태계는 다음 항목을 관심사로 하는 서드 파티가 필요했다.
  - 상태관리
  - 사이드이펙트 관리

## 이미 아는 것 - Redux

앱의 전역 상태를 효과적으로 공유하고 관리하기 위해 리덕스가 등장했다. 우리는 리덕스를 이용하여 보다 명확하게 상태를 변화시키고 그 변화를 구독할 수 있게 되었다.

e.g.,

```jsx
import { createStore } from "redux";

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return state + action.value;
    default:
      return state;
  }
}

export function addCount(value) {
  return {
    type: "ADD",
    value,
  };
}

export const store = createStore(reducer, 0);
```

이제 리액트 컴포넌트와 별개로 앱의 상태를 관리할 수 있게 되었다.

리덕스는 리듀서와 **액션을 통해 상태를 어떻게 변화시킬 것인지에 대해서만 관심**이 있다. 최종적으로 상태를 변화시키기 전에 외부 입력(사용자 이벤트)을 어떻게 처리해야할지 그 중간 과정에 대해서는 관여하지 않는다. 사용자의 입력을 받아서 적절한 처리를 하고 최종적으로 상태변화까지 처리를 하는 것은 대부분 비즈니스 로직의 영역이며 대부분 네트워크 통신 등의 여러가지 비동기 처리를 포함할 수 있다.

e.g.,

버튼 클릭시 api를 통해 네트워크로부터 랜덤 값을 가지고 온 후 그 값을 더한다고 가정해보자. 어떻게 해야 할까. `onClick` 이벤트 핸들러에서 비동기 로직을 처리하면 된다. 자연스레 비동기 로직이 컴포넌트의 클릭 이벤트 핸들러에 포함되게 된다.

물론 간단한 예제에서는 역시 별 문제가 되지 않을 수도 있다. 하지만 비동기 로직들(비즈니스로직)은 충분히 복잡해질 수 있다. 이는 **리액트 컴포넌트는 상태에 따른 화면을 그리는 것에만 관심을 갖는 본래의 의도**를 벗어나서 비즈니스 로직이 잔뜩 포함된 모습의 코드로 이어질 것이다. **리액트 컴포넌트는 비즈니스 로직의 컨테이너가 아니다.**  그렇다면 비즈니스 로직들을 어떻게 다루어야 할까. 그래서 등장하는 것이 리덕스 미들웨어 redux-thunk다.

## redux-thunk

redux-thunk를 이용하면 리액트 컴포넌트에 포함된 비동기 로직들을 분리할 수 있다. thunk는 dispatch를 품은 액션이다. 우리는 이것으로 액션을 원하는 시점에 리듀서에게 던질 수 있다. 이제 비동기 처리는 모두 thunk가 담당한다. 즉 리액트 컴포넌트를 순수하게 만들 수 있게 됐다.

하지만 여기에도 한계는 있다.

e.g.,

여러 액션을 디스패치할 필요가 있다고 해보자. 이를테면 랜덤 숫자를 2개 생성하여 첫 번째는 더한 값으로 상태에 반영하고, 그 다음은 곱한 값으로 상태에 반영해야 한다.

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return state + action.value;
    case "MULTIPLY":
      return state * action.value;
    default:
      return state;
  }
}

export function addCount(value) {
  return {
    type: "ADD",
    value,
  };
}

export function multiplyCount(value) {
  return {
    type: "MULTIPLY",
    value,
  };
}

// 무언가 이상하다.
export function addCountAsync(setLoading) {
  return async (dispatch) => {
    setLoading(true);
    const random1 = await fetchNumber();
    dispatch(addCount(random1));
    const random2 = await fetchNumber();
    dispatch(multiplyCount(random2));
    setLoading(false);
  };
}
```

무언가 이상하다. 원래 액션이란 상태를 변경하는 단위로써 하나의 액션은 하나의 상태를 변화시키는 것이어야 하는데, 위 액션은 여러 액션을 포함한 형태가 되었다. 이는 앞으로 어떤 액션을 만날 때 이 액션이 하나의 액션인지, 다른 액션들을 품고 있는 액션인지 알 수 없는 혼란을 만든다.

또한 이 액션이 리듀서에게 던져지는 시점이 언제인지, 그리고 정말 리듀서까지 잘 도달할 수 있을 지 등을 예측하기 어렵게 됐다. 요컨대 액션의 이름만 가지고 상태변화를 예측하기 어렵게 된 것이다.

리액트 컴포넌트와 액션을 모두 순수하게 유지하면서 비즈니스 로직(비동기 처리)만 별도로 관리할 수는 없을까? 이 지점에서 redux-saga가 등장한다.

## redux-saga

redux-saga는 제너레이터를 이용해 액션의 순수성이 보장되도록 해준다. (솔직히 말하자면 제너레이터에 대해 제대로 알지 못한다. 추후 학습이 필요하다. 빠르게 찾아본 바로는 함수가 하나의 리턴만을 가지는 것에 비해 여러 개의 리턴을 가질 수 있는 함수 비슷한 무언가인 듯하다.) 제너레이터는 싱글쓰레드 기반 자바스크립트에서 별도의 쓰레드를 fork하는 마법을 부린다. (실제로 별도 쓰레드가 생성되는 것은 아니다. 제너레이터도 싱글쓰레드로 수행이 된다. 다만 별도 쓰레드가 생성된다고 상상해 보는 것이 saga의 동작을 이해하는데에 도움이 된다.)

saga는 특별히 비동기 처리가 필요한 액션이 발생할 때를 기다리다가 해당 액션이 dispatch되면 새로운 쓰레드를 fork하고 새로운 쓰레드에서 필요한 비즈니스 로직들을 순서대로 처리해 나간다.

필요한 비동기 처리들은 이렇게 모두 saga에서 작성되고 수행된다. 드디어 리액트 컴포넌트와 리덕스의 액션을 모두 순수하게 유지하면서 비즈니스로직만 따로 처리가 가능하게 된 것이다.

e.g.,

```jsx
// saga.js

import { fetchNumber } from "./api";
import { call, put, takeEvery } from "redux-saga/effects";
import { addCount, muliplyCount } from "./store";

function* computeCount(action) {
  yield call(action.setLoading, true); // true 를 인자로 action.setLoading 호출
  const random1 = yield call(fetchNumber); // fetchNumber 호출

  yield put(addCount(random1)); // addCount(random1) 액션을 dispatch
  const random2 = yield call(fetchNumber); // fetchNumber 호출

  yield put(muliplyCount(random2)); // muliplyCount(random2) 액션을 dispatch
  yield call(action.setLoading, false); // false 를 인자로 action.setLoading 호출
}

export default function* () {
  // COMPUTE 타임 액션이 dispatch 되면 computeCount 제너레이터를 실행한다
  yield takeEvery("COMPUTE", computeCount);
}
```

드디어 비동기 로직들까지 분리되었다.

## 정리

이제 웹앱에서 상태를 모니터 화면으로 출력하는 것은 온전히 리액트가 담당한다. 앱의 상태 관리는 리덕스가 담당한다. 나머지 외부 입력(사용자 입력 및 기타 이벤트들)을 받아서 어떻게 처리할 지에 대한 모든 복잡한 과정들은(비동기 비즈니스 로직 처리) saga에서 온전히 담당하게 된다. redux-saga를 통해서 리액트와 리덕스의 순수성을 유지하며 각자의 역할을 분명하게 분리할 수 있게 된 것이다.
