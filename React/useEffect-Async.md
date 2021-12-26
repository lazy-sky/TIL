## useEffect와 비동기

### 발단

`useEffect` 훅 안에서 `async` `await` 키워드를 통해서 비동기 데이터 로딩을 시도하자 다음과 같은 경고 메시지가 떴다.

```jsx
useEffect(async () => {
	const response = await MyAPI.getData(someId);
// ...
}
fetchData();
}, [someId]); // Or [] if effect doesn't need props or state
```

`Effect callbacks are synchronous to prevent race conditions. Put the async function inside.`

### 원인

친절하게도 이미 경고 메세지에서는 원인과 해결 방안을 알려주고 있다.

> `Effect` 콜백함수는 경쟁 상태(race condition, 동시에 작동하는 둘 이상의 프로세스가 하나의 리소스에 접근하기 위해 경쟁하는 상태)를 방지하기 위해 동기적(synchronous)이다. 비동기 함수를 안으로 넣어라.

### 해결

`useEffect` 훅에서 `async` 함수를 사용하는 한 가지 방법은 부수 효과 함수 내에서 `async` 함수를 만들어서 호출하는 것이다.

```jsx
useEffect(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]);
```
