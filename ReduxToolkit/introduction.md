# Redux Toolkit 

https://redux-toolkit.js.org/introduction/getting-started

## 등장 배경

Redux는 Flux 구조의 구현체로 데이터 흐름을 예측하기 중앙 저장소를 관리할 수 있게 돕는다.

Redux를 사용하는 앱에서는, 
- 전역 `state`를 모두 하나의 `store`에 저장한다. 
- `state`의 변경 모습은 `action`으로 서술한다.
- `action`은 `dispatch`하는 것으로만 `state`를 변경할 수 있다.
- `action`이 `state`를 어떻게 변경할지 `reducer`에 명시한다.
- `reducer`는 `state`의 변화를 일으키는 함수다.
  - `action`을 전달 받아 새로운 `state`를 만들어 `store`에 전달한다.

### 문제점

Redux는 다음 3가지 주요 문제점이 있었다.

- 환경 설정이 너무 복잡하다.
- 많은 패키지를 설치해야만 유용하게 사용할 수 있다.
- 보일러 플레이트 코드를 많이 써야 한다.

이러한 문제점을 해결하고자 등장한 것이 Redux toolkit이다. 이름 그대로 툴킷인 것이다.
toolkit은 개발자가 보다 간단하게 코드를 작성할 수 있도록 도와준다.

## 설치

```bash
# Redux + Plain JS template
npx create-react-app my-app --template redux

# Redux + TypeScript template
npx create-react-app my-app --template redux-typescript

# An existing App
npm install @reduxjs/toolkit
yarn add @reduxjs/toolkit
```
## 주요 API

- `configureStore()`: 리덕스의 `createStore`를 추상화한 것이다. 더 간단한 환경설정 옵션과 기본값을 제공한다. 자동으로 slice reducers를 결합하고, redux-thunk를 추가하고 리덕스 개발자 도구를 활성화한다. 

```ts
import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './reducers'

const store = configureStore({ reducer: rootReducer })
```

- `createReducer()`: 상태에 변화를 일으키는 `reducer` 함수를 생성하는 유틸 함수다. `switch` 문을 작성하는 대신 `reducer`에 `action` 타입에 대한 룩업 테이블을 제공한다. 또한 자동으로 `immer` 라이브러리를 사용하여 더 간단하게 상태 변화 코드를 작성할 수 있다. (e.g, `state.todos[3].completed = true`)  

```ts
const todosReducer = createReducer(state = [], (builder) => {
  builder.addCase('UPDATE_VALUE', (state, action) => {
    const {someId, someValue} = action.payload;

    state.first.second[someId].fourth = someValue;
  })
})
```

- `createAction()`: 주어진 `action` 타입 문자열에 대한 `action` 생성 함수를 생성한다. `toString()`를 오버라이딩하여 함수 자체를 타입 상수로 사용할 수 있다.

```ts
import { createAction } from '@reduxjs/toolkit'

const increment = createAction('counter/increment')

const action = increment(3)
// { type: 'counter/increment', payload: 3 }
```

- `createSlice()`: `reducer` 함수, 슬라이스 이름, 상태 초기값을 받아 자동으로 `slice reducer`와 그에 상응하는 `action` 생성자 그리고 `action` 타입을 생성한다. (내부적으로 `createAction`, `createReducer` 함수가 사용된다.) 따라서 `createSlice`를 사용하면 이 두 함수를 작성하지 않아도 된다.

```ts
const alertSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
	extraReducers: (builder) => {}
});
```

- `createAsyncThunk`: `createAction`의 비동기 버전이다. `action` 타입 문자열과 `promise`를 반환하는 콜백 함수를 받아 주어진 `action` 타입을 접두어로 사용하는 `promise` 기반의 `action` 타입을 `dispath`하는 `thunk`를 생성한다.

- `createEntityAdapter`: `store`에서 정규화된 데이터를 관리하기 위해 재사용할 수 있는 `reducer`와 `selector`들의 집합을 생성한다.

- `createSelector`: Reselect 라이브러리에서 제공하는 함수로 `store` 상태에서 데이터를 추출할 수 있도록 도와준다.

## RTK Query

<!-- TODO: -->
