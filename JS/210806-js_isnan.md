### `isNaN()`

[isNaN() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN#confusing_special-case_behavior)

참고

**들어가는 퀴즈**

```css
console.log(isNaN(null)); // true or false
```

답은 `false`다. 즉 자바스크립트가 `null`이 숫자라고 말하고 있는 것이다.

`null`이 숫자라니, 이게 무슨 말도 안되는 소리인가? 이는 `isNaN()`의 동작방식 때문이다.

`isNaN()`은 받은 인자를 먼저 숫자로 형변환을 시도한다. 위의 문제로 예를 들면, `isNaN(Number(null))`이 되는 것이다. 그리고 `Number(null)`은 0이다. 0은 숫자니까 문제의 답이 `true`가 된다.

이렇게 직관적이지 않은 동작 방식 때문에 MDN에서는 `Number.isNaN()`을 대안으로 제시하고 있다.

> Because coercion inside the `isNaN` function can be surprising, you may alternatively want to use `Number.isNaN()`.

물론 typeof를 통한 해결도 가능하다. e.g., `typeof n === 'number'`
