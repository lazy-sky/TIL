## DOM API

자바스크립트는 코드를 한 줄씩 차례대로 읽어가기 때문에 스크립트 태그에 `defer` 를 추가해주어야 자바스크립트 파일에 작성한 DOM 조작 코드가 정상적으로 작동한다.

`<script defer src="./main.js"></script>`

```jsx
// HTML 요소(Element) (가장 먼저 충족되는) 1개 검색/찾기
const boxEl = document.querySelector(".box");

// HTML 요소에 적용할 수 있는 메소드
boxEl.addEventListener(event, handler);

// 인자(arguments)는 event(상황), handler(실행할 함수)
// boxEl이 'click'되면 'Click~!'을 출력해라.
boxEl.addEventListener("click", function () {
  console.log("Click~!");
});

// 요소의 클래스 정보 객체 활용
// 클래스 추가
boxEl.classList.add("active");
let isContains = boxEl.classList.contains("active");
console.log(isContains); // true

// 클래스 삭제
boxEl.classList.remove("active");
isContains = boxEl.classList.contains("active");
console.log(isContains); // false

// HTML 요소(Element) **모두** 검색/찾기
const boxEls = document.querySelectorAll(".box");

// 찾은 요소들 반복(forEach)해서 함수 실행!
// 함수의 인자는 요소(element), 인덱스(index)
boxEls.forEach(function (boxEl, index) {
  boxEl.classList.add(`order-${index + 1}`);
  console.log(index, boxEl);
});

const boxEl = document.querySelector(".box");

// Getter, 값을 얻는 용도
console.log(boxEl.textContent); // 해당 엘리먼트에 들어있는 거 출력

// Setter, 값을 지정하는 용도
boxEl.textContent = "Sky";
console.log(boxEl.textContent); // Sky
```

### **인자(argument)와 매개변수(parameter)**

- argument : 인자 혹은 인수, **함수의 입력 값**
- parameter : 매개변수, **함수의 입력 변수명**

e.g.,

```jsx
function sum(a, b) {
  // a, b는 매개변수(parameter)
  return a + b;
}

console.log(sum(1, 2)); // 1, 2는 인자(argument)
```

### **함수 선언식(declarations)과 함수 표현식(expressions)**

- 선언식 : `function myFunc() {};`
- 표현식 : `const myFunc() = function() {};`
- 표현식의 쓰임새
  - 표현식은 **호이스팅에 영향을 받지 않는다.**
  - **클로저(closure)**로 사용
    - 함수를 실행하기 전에 해당 함수를 변수로 넘기고 싶을 때
  - **콜백(callback function)**으로 사용

## 실행 컨텍스트(execution context)

scope, hoisting, this, function, closure 등의 동작원리를 담고 있는 자바스크립트의 핵심원리이다.

실행 컨텍스트는 **실행 가능한 코드를 형상화하고 구분하는 추상적인 개념**으로 정의된다. 좀 더 쉽게 말하자면 실행 컨텍스트는 **실행 가능한 코드가 실행되기 위해 필요한 환경**이라고 할 수 있다. 여기서 말하는 실행 가능한 코드는 아래와 같다.

- 전역 코드 : 전역 영역에 존재하는 코드
- Eval 코드 : eval 함수로 실행되는 코드 (이건 어차피 쓸 일 없다.)
- 함수 코드 : 함수 내에 존재하는 코드

그래서 일반적으로 실행 가능한 코드는 전역 코드와 함수 내 코드이다. 자바스크립트 엔진은 코드를 실행하기 위하여 실행에 필요한 여러가지 정보를 알고 있어야 한다. 실행에 필요한 여러가지 정보란 아래와 같은 것들이 있다.

- 변수 : 전역변수, 지역변수, 매개변수, 객체의 프로퍼티
- 함수 선언
- 변수의 유효범위(Scope)
- `this`

이와 같이 실행에 필요한 정보를 형상화하고 구분하기 위해 자바스크립트 엔진은 실행 컨텍스트를 물리적 객체의 형태로 관리한다. 예를 들면 다음과 같다.

```jsx
var x = "xxx";

function foo() {
  var y = "yyy";

  function bar() {
    var z = "zzz";
    console.log(x + y + z);
  }
  bar();
}
foo();
```

위 코드를 실행하면 아래와 같이 실행 컨텍스트 스택(Stack)이 생성하고 소멸한다. 현재 실행중인 컨텍스트에서 이 컨텍스트와 관련없는 코드(예를 들어 다른 함수)가 실행되면 새로운 컨텍스트가 생성된다. 이 컨텍스트는 스택에 쌓이게 되고 컨트롤(제어권)이 이동한다.

1. 컨트롤이 실행 가능한 코드로 이동하면 논리적 스택 구조를 가지는 새로운 실행 컨텍스트 스택이 생성된다.
2. 전역 코드(Global code)로 컨트롤이 진입하면 전역 실행 컨텍스트가 생성되고 실행 컨텍스트 스택에 쌓인다. 전역 실행 컨텍스트는 애플리케이션이 종료될 때(웹 페이지에서 나가거나 브라우저를 닫을 때)까지 유지된다.
3. 함수를 호출하면 해당 함수의 실행 컨텍스트가 생성되며 직전에 실행된 코드 블록의 실행 컨텍스트 위에 쌓인다.
4. 함수 실행이 끝나면 해당 함수의 실행 컨텍스트를 파기하고 직전의 실행 컨텍스트에 컨트롤을 반환한다.

### 실행 컨텍스트의 3가지 객체

실행 컨텍스트는 실행 가능한 코드를 형상화하고 구분하는 추상적인 개념이지만 **물리적으로는 객체의 형태**를 가지며 다음 3가지 프로퍼티를 소유한다.

- 변수 객체(Variable Object)
  - 변수
  - 매개변수와 인수 정보
  - 함수 선언(함수 표현식은 제외)
- Scope Chain
  - 스코프 체인은 일종의 리스트로서 전역 객체와 중첩된 함수의 스코프의 레퍼런스를 차례로 저장하고 있다. 다시 말해, 스코프 체인은 해당 전역 또는 함수가 참조할 수 있는 변수, 함수 선언 등의 정보를 담고 있는 전역 객체 또는 활성 객체의 리스트를 가리킨다. 현재 실행 컨텍스트의 활성 객체를 선두로 하여 순차적으로 상위 컨텍스트의 활성 객체를 가리키며 마지막 리스트는 전역 객체를 가리킨다.
  - **스코프 체인은 식별자 중에서 객체(전역 객체 제외)의 프로퍼티가 아닌 식별자, 즉 변수를 검색하는 메커니즘**이다. \***\*식별자 중에서 변수가 아닌 객체의 프로퍼티(메소드 포함)를 검색하는 메커니즘은 **프로토타입 체인\*\*이다.
- this value

  - this 프로퍼티에는 `this` 값이 할당된다. `this`에 할당되는 값은 함수 호출 패턴에 의해 결정된다.

  ## 클로저

  반환된 내부함수가 자신이 선언됐을 때의 환경(Lexical environment)인 스코프를 기억하여 자신이 선언됐을 때의 환경(스코프) 밖에서 호출되어도 그 환경(스코프)에 접근할 수 있는 함수를 말한다. 이를 조금 더 간단히 말하면 클로저는 **자신이 생성될 때의 환경(Lexical environment)을 기억하는 함수**다라고 말할 수 있다.

  ```jsx
  function outerFunc() {
    var x = 10;
    var innerFunc = function () {
      console.log(x);
    };
    innerFunc();
  }

  outerFunc(); // 10

  function outerFunc() {
    var x = 10;
    var innerFunc = function () {
      console.log(x);
    };
    return innerFunc;
  }

  // 함수 outerFunc를 호출하면 내부 함수 innerFunc가 반환된다.
  // 그리고 함수 outerFunc의 실행 컨텍스트는 소멸한다.
  var inner = outerFunc();
  inner(); // 10
  ```

  이처럼 자신을 포함하고 있는 외부함수보다 내부함수가 더 오래 유지되는 경우, 외부 함수 밖에서 내부함수가 호출되더라도 외부함수의 지역 변수에 접근할 수 있는데 이러한 함수를 클로저라고 부른다.

  ### 활용

  - 상태 유지: 클로저가 가장 유용하게 사용되는 상황은 현재 상태를 기억하고 변경된 최신 상태를 유지하는 것이다.

    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <button class="toggle">toggle</button>
        <div
          class="box"
          style="width: 100px; height: 100px; background: red;"
        ></div>

        <script>
          var box = document.querySelector(".box");
          var toggleBtn = document.querySelector(".toggle");

          var toggle = (function () {
            var isShow = false;

            // ① 클로저를 반환, isShow를 기억하는 클로저
            return function () {
              box.style.display = isShow ? "block" : "none";
              // ③ 상태 변경
              isShow = !isShow;
            };
          })();

          // ② 이벤트 프로퍼티에 클로저를 할당
          toggleBtn.onclick = toggle;
        </script>
      </body>
    </html>
    ```

    1. 즉시실행함수는 함수를 반환하고 즉시 소멸한다. 즉시실행함수가 반환한 함수는 자신이 생성됐을 때의 렉시컬 환경(Lexical environment)에 속한 변수 `isShow`를 기억하는 클로저다. 클로저가 기억하는 변수 `isShow`는 `.box`요소의 표시 상태를 나타낸다.
    2. 클로저를 이벤트 핸들러로서 이벤트 프로퍼티에 할당했다. 이벤트 프로퍼티에서 이벤트 핸들러인 클로저를 제거하지 않는 한 클로저가 기억하는 렉시컬 환경의 변수 `isShow`는 소멸하지 않는다. 다시 말해 **현재 상태를 기억한다.**
    3. 버튼을 클릭하면 이벤트 프로퍼티에 할당한 이벤트 핸들러인 클로저가 호출된다. 이때 `.box` 요소의 표시 상태를 나타내는 변수 `isShow`의 값이 변경된다. 변수 `isShow`는 클로저에 의해 참조되고 있기 때문에 유효하며 자신의 변경된 최신 상태를 게속해서 유지한다.

    이처럼 클로저는 현재 상태(위 예제의 경우 `.box` 요소의 표시 상태를 나타내는 `isShow` 변수)를 기억하고 이 상태가 변경되어도 최신 상태를 유지해야 하는 상황에 매우 유용하다. 만약 자바스크립트에 **클로저라는 기능이 없다면 상태를 유지하기 위해 전역 변수를 사용할 수 밖에 없다.** 전역 변수는 언제든지 누구나 접근할 수 있고 변경할 수 있기 때문에 많은 부작용을 유발해 오류의 원인이 되므로 사용을 억제해야 한다.

  - 전역 변수의 사용 억제

    ```html
    <button id="increase">+</button>
    <p id="count">0</p>
    ```

    ```jsx
    var increaseBtn = document.getElementById("increase");
    var count = document.getElementById("count");

    // 카운트 상태를 유지하기 위한 전역 변수
    var counter = 0;

    function increase() {
      return ++counter;
    }

    increaseBtn.onclick = function () {
      count.innerHTML = increase();
    };
    ```

    위 코드 대신에 아래와 같이 쓸 수 있다.

    ```jsx
    var increase = (function () {
      // 카운트 상태를 유지하기 위한 자유 변수
      var counter = 0;

      // 클로저를 반환
      return function () {
        return ++counter;
      };
    })();

    increaseBtn.onclick = function () {
      count.innerHTML = increase();
    };
    ```

  - 정보의 은닉
    - 클로저의 특징을 사용해 클래스 기반 언어의 `private` 키워드를 흉내낼 수 있다.
