책 [자바스크립트 코딩의 기술]을 보던 중에 다음과 같은 내용을 보았다.

> 배열의 순서가 기술적으로 보장되지 않는다는 사실은 흥미롭지만, 거의 모든 상황에서 동작한다고 봐도 무리가 없습니다.

물론 저 발언의 뉘앙스는 딱히 신경쓰지 않아도 된다는 거지만 어쨌든 '거의 모든 상황에서 동작한다'는 것은 그렇지 않다는 경우도 있다는 뜻이지 않는가. 배열은 자료를 순차적으로 인덱스에 맞춰 저장한다는 게 핵심인데 '거의'라니. 꽤나 충격적이어서 그에 관련한 내용을 찾아봤고 아래 답변에서 궁금증을 해결할 수 있었다.

[Is a JavaScript array order guaranteed?](https://stackoverflow.com/questions/34955787/is-a-javascript-array-order-guaranteed)

> Array is a special kind of object in the language that have additional semantic on how length property is handled respect to the properties that are integers from 0 to 2^32. In javascript **an array can be sparse if there are missing values in the range of 0 to the length property excluded.** Various array methods take this in consideration, for example `forEach` ignore missing values.
>
> What is a missing value?
**The language tries to make arrays act as much as possible as to normal objects**: you can add any property to it and even have objects that inherit from an array.
> `var fruits = ["Apple", "Banana"];`
> `fruits.preferred = "Apple";`
This kind of code don't pose any problem, but if you start to write:
`fruits[100] = "Strawberry"; 
 for(let i = 0; i < fruits.length; ++i) { ... }`
100 is a property name in the range of [0, 2^32) so is an array element but at this point what fruits.length should be? It must be 101, otherwise the for loop will never get "Strawberry".
But at this point you have to accept that there is a range of element [2, 99] that were **never defined: these are missing values.**
Vice versa the same must be true when you modify the length property
`var fruits = ["Apple", "Banana"]; fruits.length = 0;`
Now a for loop will never get any element of the array: this is equivalent to emptying the fruits array.
It's also possible to increment the length, with the result of having missing values
> 
> So yes **arrays are ordered as you can iterate all its elements in increasing order, but keep in mind that there can be missing values**.

요컨대, 

- 자바스크립트에서 배열은 길이가 어지간히 길어지지 않는다면 수의 인덱스 안에서는 순서를 보장하며 다만 정의되지 않은 missing value가 있을 수 있다.
- 자바스크립트에서 배열은 최대한 일반적인 객체처럼 동작하려 한다. 이를테면 이런 것도 가능하다.

```jsx
let arr = [1, 2]; 
arr.prop = 3;
console.log(arr); // [1, 2, prop: 3], 다만 이 경우에 length는 2로 인식하더라.
```

- missing value는 `undefined` 값으로 인식한다.
- 배열 메소드들은 배열이 **sparse**해질 수 있다는 점을 고려한다. 이를테면, `forEach`는 missing value를 무시한다.

흥미로운 탐구였다. 하지만 여전히 이러한 사실들이 어떤 결과를 초래하고 어디에 영향을 미칠지에 대해서는 감이 오지 않는다. 분명 아직 탐구해야할 게 많은 걸 알지만 적어도 오늘 공부한 내용이 언젠가 다음에 더 나아가 공부할 때 도움이 될 거라는 것은 알 거 같다. 이전에 자바스크립트에선 배열도 객체고 함수도 객체고 어쩌고저쩌고 하는 내용을 봤을 때 무슨 말인지 똑바로 이해되지도 않고, 와닿지도 않았는데 이제 다시 그런 내용을 공부하면 좀 더 잘 이해할 수 있을 것 같다.