# Generator

## 발단

프로젝트에서 redux-saga를 도입하게 됨에 따라 제너레이터 문법에 대해 공부할 필요가 생겼다. 여전히 redux만으로도 약간 버벅이는데, 미들웨어를 적용한느 건 더 그럴 거고 심지어 saga에는 제너레이터라는 생소한 문법을 사용하니 덜컥 두렵기도 하지만 어찌됐든 천리길도 한 걸음부터.

## 기본 문법

참고: [https://react.vlpt.us/redux-middleware/10-redux-saga.html](https://react.vlpt.us/redux-middleware/10-redux-saga.html)

제너레이터의 핵심 기능은 함수를 작성할 때 함수를 특정 구간에 멈춰놓을 수도 있고, 원할 때 다시 돌아가게 할 수도 있다는 것이다. 

또한 결과값을 여러 번 반환할 수도 있다. 사실 함수에서 값을 여러 번에 걸쳐 반환하는 것은 불가능하다. 하지만 제너레이터 함수를 사용하면 함수에서 값을 순차적으로 반환할 수 있다. 함수의 흐름을 도중에 멈춰놓았다가 나중에 이어서 진행할 수도 있다.

제너레이터 함수는 `function*` 키워드를 사용해 생성한다. 이 함수를 호출하면 객체가 반환되는데, 이를 **제너레이터**라고 부른다. 제너레이터 함수를 호출한다고 바로 함수 안의 코드가 시작되지는 않는다. `generator.next()`를 호출해야 코드가 실행되며, `yield`한 값을 반환하고 코드의 흐름을 멈춘다. 코드의 흐름이 멈춘 뒤 `generator.next()`를 다시 호출하면 흐름이 다시 시작된다.

```jsx
function* generatorFunction() {
    console.log('안녕하세요?');
    yield 1;
    console.log('제너레이터 함수');
    yield 2;
    console.log('function*');
    yield 3;
    return 4;
}

// 제너레이터 객체
const generator = generatorFunction();

generator.next(); // 안녕하세요? {value: 1, done: false}
generator.next(); // 제너레이터 함수{value: 2, done: false}
generator.next(); // function* {value: 3, done: false}
generator.next(); // {value: 4, done: true}
generator.next(); // {value: undefined, done: true}
```

`next`를 호출할 때 인자를 전달하여 제너레이터 함수 내부에서 사용할 수도 있다.

```jsx
function* sumGenerator() {
    console.log('sumGenerator 시작');
    let a = yield;
    console.log('a값 입력');
    let b = yield;
    console.log('b값 입력');
    yield a + b;
}

sum.next(); // sumGenerator 시작 {value: undefined, done: false}
sum.next(); // a값 입력 {value: undefined, done: false}
sum.next(); // b값 입력 {value: 3, done: false}
```

## 액션 모니터링

redux-saga는 액션을 모니터링할 수 있다. 제너레이터를 통해 모니터링이 어떻게 이루어지는지 볼 수 있다.

```jsx
function* watchGenerator() {
    console.log('모니터링 시작!');
    while(true) {
        const action = yield;
        if (action.type === 'HELLO') {
            console.log('안녕!');
        }
        if (action.type === 'BYE') {
            console.log('잘 가!');
        }
    }
}

watch.next(); // 모니터링 시작! {value: undefined, done: false}
watch.next({ type: 'HELLO' }); // 안녕! {value: undefined, done: false}
watch.next({ type: 'BYE' }); // 잘 가! {value: undefined, done: false}
watch.next({ type: 'NONE' }); // {value: undefined, done: false}
```

이러한 방식으로 액션을 모니터링하고 특정 액션이 발생했을 때 원하는 코드를 실행시킬 수 있다.

참고로 redux-saga에서는 제너레이터 함수를 사가라고 부른다.