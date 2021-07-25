Q. 각각 무엇이 출력 될까?

```jsx
console.log(1 + "sky");
console.log(1 + 1 + "sky");
console.log([1, 2] + [3, 4]);
console.log(1 == true);
console.log(1 - true);
console.log("true" == true);
console.log(("b" + "a" + "a" / 2 + "a").toLowerCase());
```

정답은 각각

- 1sky
- 2sky
- 1,23,4
- true
- 0
- false
- banana (이건 정말로 어처구니 없다. 자바스크립트가 근본 없다고 욕먹는 대표적인 밈이다.)

왜 이렇게 황당한 결과가 나오는 걸까? 그건 자바스크립트 엔진이 알아서 자료형을 변환시켰기 때문이다. 이렇게 자료형이 변환되는 것은 **형변환(Type Conversion)**이라 말한다. 형변환은 그 방법에 따라 명시적, 암묵적 그리고 그 외에 다양한 방식이 존재한다.

### 명시적 변환(Explicit Conversion)

명시적 변환은 가장 직관적으로 이해할 수 있는 형변환이다. 말그대로 우리가 의도적으로 형은 변환시킨 것을 말한다. 이를테면, `Number()`, `String()` 등의 함수를 이용한 형변환 등이 그것이다.

### 암시적 변환(Implicit Conversion)

문제는 암시적 변환이다. 앞서 문제에서 볼 수 있듯 이는 우리 개발자의 의도가 아닌 자바스크립트 엔진에 의한 자동 형변환을 말한다.

```jsx
console.log(1 + "1"); // "11"
// 숫자 1이 문자 "1"로 형변환되어 "11" 이라는 string 값이 나온다.
```

그렇다면 이러한 암시적 변환은 언제 일어나는가? 더하기, 빼기 등의 산술 연산자, 동등 연산자 등을 사용할 때 일어날 수 있다.

```jsx
// 문자로 변환되는 경우
console.log("sky" + true, typeof ("sky" + true)); // "skytrue" "string"

// 숫자로 변환되는 경우
console.log(5 * "5", typeof (5 * "5")); // 25 "number"

// NaN(Not a Number, 숫자로 변환시키려했지만 'sky' 숫자가 아니다. 바나나 문제의 원흉)
console.log("sky" * 5, typeof ("sky" * 5)); // NaN "number"

// 동등 연산자에서의 변환
console.log("0" == false); // true
console.log("" == 0); // true
console.log(1 == true); // true
```

원하는 결과를 얻고 싶다면 각 우선순위를 익혀두는 수밖에 없겠다.

### 그 외

C 등의 언어가 변수 선언시 자료형을 같이 선언해준다(e.g., `int`, `char` 등) 이런 식으로 선언 시 특정 키워드를 이용하여 타입을 결정하는 걸 **Nominal Typing**이라 한다. 그에 비해, 자바스크립트는 어떤 자료형이든 그저 `let` 혹은 `const` 을 이용하여 선언할 뿐이다. (자바스크립트는 동적 타입 언어이기 때문에) 이렇게 단순한 변수 선언은 장점인 동시에 단점이기도 하다. 변수에 어떤 자료형을 담아도 되는 게 편리한 반면 의도치 않은 자료형이 들어갈 위험성이 동시에 존재하는 것이다. (타입스크립트의 등장 배경이기도 하다.)

한편 **구조적 타이핑(Structural Typing)**은 타입스크립트의 방식, **덕 타이핑(Duck Typing)**은 파이썬 등에서 사용하는 방식인데 조금 더 깊은 설명이 필요하므로 나중에 필요해지면 다시 알아보자.
