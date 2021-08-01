## 개요

여기서 Clean Code란 소프트웨어 방법론에 관한 책들 중 Robert C. Martin's의 책인 <Clean Code>에 있는 내용을 말한다. 다만 그 내용이 Java 기반으로 작성되어 있어 그 내용을 JavaScript 언어에 적용시켜 정리하고자 한다.

이 글은 단순히 Style Guide가 아니라 JavaScript로 코드를 작성할때 읽기 쉽고, 재사용 가능하며 리팩토링 가능하게끔 작성하도록 도와준다. 제시되는 모든 원칙이 엄격히 지켜져야하는 것은 아니며, 보편적으로 통용되는 원칙도 아니다. 다만 지침일 뿐이며 <Clean Code>의 저자가 수년간 경험한 내용을 바탕으로 정리한 것이다. 이 원칙들을 알게된다 해서 당장 더 나은 개발자가 되는 것은 아니며 코드를 작성할 때 실수를 하지 않게 해주는 것은 아니다. 모든 코드들은 처음부터 완벽할 수 없다. 하지만 우리는 팀원들과 같이 코드를 리뷰하며 점점 완벽하게 만들어가야 한다. 당신이 처음 작성한 코드를 고칠 때 절대로 자신을 질타하는 대신 코드를 부수고 더 나은 코드를 만들자!

## 변수

### 의미있고 발음하기 쉬운 변수 이름 사용하기

```jsx
// 안좋은 예
const yyyymmdstr = moment().format("YYYY/MM/DD");

// 좋은 예:
const currentDate = moment().format("YYYY/MM/DD");
```

### **동일한 유형의 변수에 동일한 어휘를 사용하기**

```jsx
// 안좋은 예:
getUserInfo();
getClientData();
getCustomerRecord();

// 좋은 예:
getUser();
```

### **검색가능한 이름을 사용하기**

우리는 작성할 코드보다 읽을 코드가 더 많다. 그렇기 때문에 코드를 읽기 쉽고 검색 가능하게 작성해야 한다. 내 코드를 읽을 사람들에게 어려움을 주고 싶지 않다면.  [buddy.js](https://github.com/danielstjules/buddy.js) 그리고 [ESLint](https://github.com/eslint/eslint/blob/660e0918933e6e7fede26bc675a0763a6b357c94/docs/rules/no-magic-numbers.md) 와 같은 도구들이 이름이 정해져있지 않은 상수들을 발견하고 고칠 수 있게 도와준다.

**안좋은 예:**

```jsx
// 대체 86400000이 무슨 의미?
setTimeout(blastOff, 86400000);
```

**좋은 예:**

```jsx
// 대문자로 const 전역 변수를 선언하자.
const MILLISECONDS_IN_A_DAY = 86400000;
setTimeout(blastOff, MILLISECONDS_IN_A_DAY);
```

### **의도를 나타내는 변수들을 사용하기**

**안좋은 예:**

```jsx
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityZipCode(
  address.match(cityZipCodeRegex)[1],
  address.match(cityZipCodeRegex)[2]
);
```

**좋은 예:**

```jsx
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const [, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCityZipCode(city, zipCode);
```

### 누구나 알아볼 수 있게 작명하기(자신만 알아보는 작명하지 않기)

명시적인 것이 암시적인 것보다 좋다.

**안좋은 예:**

```jsx
const locations = ["서울", "인천", "수원"];
locations.forEach((l) => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  // 잠깐, `l`이 뭐지?
  dispatch(l);
});
```

**좋은 예:**

```jsx
const locations = ["서울", "인천", "수원"];
locations.forEach((location) => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  dispatch(location);
});
```

### **문맥상 필요한 것만 쓰기(필요없는 것 쓰지 않기)**

**안좋은 예:**

```jsx
const Car = {
  carMake: "BMW",
  carModel: "M3",
  carColor: "파란색",
};

function paintCar(car) {
  car.carColor = "빨간색";
}
```

**좋은 예:**

```jsx
const Car = {
  make: "BMW",
  model: "M3",
  color: "파란색",
};

function paintCar(car) {
  car.color = "빨간색";
}
```

### **기본 매개변수 사용하기**

기본 매개변수가 short circuiting 트릭이나 조건문 보다 깔끔하다. 기본 매개변수는 매개변수가 `undefined`일 때만 적용된다. `''`, `""`, `false`, `null`, `0`, `NaN` 같은 `falsy`한 값들은 기본 매개변수가 적용되지 않는다.

**안좋은 예:**

```jsx
function createMicrobrewery(name) {
  const breweryName = name || "Hipster Brew Co.";
  // ...
}
```

**좋은 예:**

```jsx
function createMicrobrewery(name = "Hipster Brew Co.") {
  // ...
}
```

## 함수

### **함수 인자는 2개 이하로 사용하기**

매개변수의 개수를 제한 하는 것은 함수 테스팅을 쉽게 만들어 주기 때문에 중요하다. 만약 매개변수가 3개 이상일 경우엔 테스트 해야하는 경우의 수가 많아지고 각기 다른 인수들로 여러 사례들을 테스트 해야한다.

1개나 2개의 인자를 가지고 있는 것이 가장 이상적인 케이스다. 3개 이상의 인자는 가급적이면 피하자. 2개를 초과한다면 통합되어야 한다. 2개 이상의 인자를 가진 함수를 사용한다면 그건 아마 그 함수에게 너무 많은 역할을 하게 만들었기 때문일 것이다. 대부분의 경우 상위 객체는 1개의 인자만으로 충분하다.

JavaScript를 사용할 때 많은 보일러플레이트 없이 바로 객체를 만들 수 있다. 그러므로 만약 많은 인자들을 사용해야 한다면 객체를 이용할 수 있다.

함수가 기대하는 속성을 좀더 명확히 하기 위해서 ES6의 비구조화(destructuring) 구문을 사용할 수 있고 이 구문에는 몇가지 장점이 있다.

- 어떤 사람이 그 함수의 시그니쳐(인자의 타입, 반환되는 값의 타입 등)를 볼 때 어떤 속성이 사용되는지 즉시 알 수 있다.
- 또한 비구조화는 함수에 전달된 인수 객체의 지정된 기본타입 값을 복제하며 이는 예상치 못한 부작용이 일어나는 것을 방지한다. 참고로 인수 객체로부터 비구조화된 객체와 배열은 복제되지 않는다.
- Linter를 사용하면 사용하지않는 인자에 대해 경고해주거나 비구조화 없이 코드를 짤 수 없게 할 수 있다.

**안좋은 예:**

```jsx
function createMenu(title, body, buttonText, cancellable) {
  // ...
}
```

**좋은 예:**

```jsx
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  title: "Foo",
  body: "Bar",
  buttonText: "Baz",
  cancellable: true,
});
```

### **함수는 하나의 행동만 하도록 하기**

소프트웨어 엔지니어링에서 가장 중요한 규칙이다. 함수가 1개 이상의 행동을 한다면 작성하는 것도, 테스트하는 것도, 이해하는 것도 어려워진다. 하나의 함수에 하나의 행동을 정의하는 것이 가능해진다면 함수는 좀 더 고치기 쉬워지고 코드들은 읽기 쉬워진다. 많은 원칙들 중 이것만 알아간다 하더라도 많은 개발자들을 앞설 수 있다.

**안좋은 예:**

```jsx
function emailClients(clients) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

**좋은 예:**

```jsx
function emailClients(clients) {
  clients.filter(isClientActive).forEach(email);
}

function isClientActive(client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

### **함수명은 함수가 무엇을 하는지 알 수 있게 작명하기**

**안좋은 예:**

```jsx
function AddToDate(date, month) {
  // ...
}

const date = new Date();

// 뭘 추가하는 건지 이름만 보고 알아내기 힘들다.
AddToDate(date, 1);
```

**좋은 예:**

```jsx
function AddMonthToDate(date, month) {
  // ...
}

const date = new Date();
AddMonthToDate(date, 1);
```

### **함수는 단일 행동을 추상화하기**

추상화된 이름이 여러 의미를 내포하고 있다면 그 함수는 너무 많은 일을 하게끔 설계된 것이다.함수들을 나누어서 재사용가능하고 테스트하기 쉽게 만들어야 한다.

**안좋은 예:**

```jsx
function parseBetterJSAlternative(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach((token) => {
    // lex...
  });

  ast.forEach((node) => {
    // parse...
  });
}
```

**좋은 예:**

```jsx
function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      tokens.push(/* ... */);
    });
  });

  return tokens;
}

function lexer(tokens) {
  const ast = [];
  tokens.forEach((token) => {
    ast.push(/* ... */);
  });

  return ast;
}

function parseBetterJSAlternative(code) {
  const tokens = tokenize(code);
  const ast = lexer(tokens);
  ast.forEach((node) => {
    // parse...
  });
}
```

### **중복된 코드를 작성하지 않기**

중복된 코드가 있다는 것은 어떤 로직을 수정해야 할 일이 생겼을 때 수정 해야할 코드가 한 곳 이상이라는 것을 뜻한다.

종종 코드를 살펴보면 사소한 몇몇의 차이점 때문에 중복된 코드를 작성한 경우가 있고 이런 차이점들은 대부분 똑같은 일을 하는 분리된 함수들을 갖도록 강요한다. 즉 중복 코드를 제거한다는 것은 하나의 함수 / 모듈 / 클래스를 사용하여 이 여러 가지 사소한 차이점을 처리 할 수 있는 추상화를 만드는 것을 의미한다.

그리고 추상화 할 부분이 남아있는 것은 위험하기때문에 클래스 섹션에 제시된 여러 원칙들을 따라야 한다. 잘 추상화하지 못한 코드는 중복된 코드보다 나쁠 수 있다. 즉 추상화를 잘 할 수 있다면 그렇게 하라는 말이다. 코드의 중복을 피한다면 원할 때 언제든 한 곳만 수정해도 다른 모든 코드에 반영되게 할 수 있다.

**안좋은 예:**

```jsx
function showDeveloperList(developers) {
  developers.forEach((developers) => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const githubLink = developer.getGithubLink();
    const data = {
      expectedSalary,
      experience,
      githubLink,
    };

    render(data);
  });
}

function showManagerList(managers) {
  managers.forEach((manager) => {
    const expectedSalary = manager.calculateExpectedSalary();
    const experience = manager.getExperience();
    const portfolio = manager.getMBAProjects();
    const data = {
      expectedSalary,
      experience,
      portfolio,
    };

    render(data);
  });
}
```

**좋은 예:**

```jsx
function showEmployeeList(employees) {
  employees.forEach((employee) => {
    const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();

    let portfolio = employee.getGithubLink();

    if (employee.type === "manager") {
      portfolio = employee.getMBAProjects();
    }

    const data = {
      expectedSalary,
      experience,
      portfolio,
    };

    render(data);
  });
}
```

### **`Object.assign`을 사용해 기본 객체 만들기**

**안좋은 예:**

```jsx
const menuConfig = {
  title: null,
  body: "Bar",
  buttonText: null,
  cancellable: true,
};

function createMenu(config) {
  config.title = config.title || "Foo";
  config.body = config.body || "Bar";
  config.buttonText = config.buttonText || "Baz";
  config.cancellable =
    config.cancellable !== undefined ? config.cancellable : true;
}

createMenu(menuConfig);
```

**좋은 예:**

```jsx
const menuConfig = {
  title: "Order",
  // 유저가 'body' key의 value를 정하지 않았다.
  buttonText: "Send",
  cancellable: true,
};

function createMenu(config) {
  config = Object.assign(
    {
      title: "Foo",
      body: "Bar",
      buttonText: "Baz",
      cancellable: true,
    },
    config
  );

  // config는 이제 다음과 동일하다:
  // {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
  // ...
}

createMenu(menuConfig);
```

### **매개변수로 플래그를 사용하지 않기**

플래그(특정 동작을 수행할지 가리키는 정보)를 사용하는 것 자체가 그 함수가 한가지 이상의 역할을 하고 있다는 것을 뜻한다. boolean 기반으로 함수가 실행되는 코드가 나뉜다면 함수를 분리해야 한다.

**안좋은 예:**

```jsx
function createFile(name, temp) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}
```

**좋은 예:**

```jsx
function createFile(name) {
  fs.create(name);
}

function createTempFile(name) {
  createFile(`./temp/${name}`);
}
```

### **사이드 이펙트 피하기 (part 1)**

함수는 값을 받아서 어떤 일을 하거나 값을 리턴할 때 사이드 이펙트를 만들어낸다. 사이드 이팩트는 파일에 쓰여질 수도 있고, 전역 변수를 수정할 수 있으며, 실수로 모든 돈을 다른 사람에게 보낼 수도 있다.

종종 어쩔 수없이 사이드 이펙트가 생기는 순간이 있다. 예를 들어, 파일 작성을 할 때 해야할 일은 파일 작성을 하는 한 개의 함수를 만드는 것이다. 파일을 작성하는 함수나 클래스가 여러개 존재하면 안된다. 반드시 하나만 있어야 한다.

즉, 어떠한 구조체도 없이 객체 사이의 상태를 공유하거나, 무엇이든 쓸 수 있는 변경 가능한 데이터 유형을 사용하거나, 같은 사이드 이펙트를 만들어내는 것을 여러 개 만들면 안된다.

**안좋은 예:**

```jsx
// 아래 함수에 의해 참조되는 전역 변수다.
// 이 전역 변수를 사용하는 또 하나의 함수가 있다고 생각하면,
// 이제 이 변수는 배열이 될 것이고, 프로그램을 망가뜨릴 것이다.
let name = "Ryan McDermott";

function splitIntoFirstAndLastName() {
  name = name.split(" ");
}

splitIntoFirstAndLastName();

console.log(name); // ['Ryan', 'McDermott'];
```

**좋은 예:**

```jsx
function splitIntoFirstAndLastName(name) {
  return name.split(" ");
}

const name = "Ryan McDermott";
const newName = splitIntoFirstAndLastName(name);

console.log(name); // 'Ryan McDermott';
console.log(newName); // ['Ryan', 'McDermott'];
```

### **사이드 이펙트를 피하기 (part 2)**

자바스크립트에서는 기본타입 자료형은 값을 전달하고 객체와 배열은 참조를 전달한다. 객체와 배열인 경우를 살펴보자. 우리가 만든 함수는 장바구니 배열에 변화를 주며 이 변화는 구매목록에 어떤 상품을 추가하는 기능 같은 것이다. 만약 `장바구니` 배열을 사용하는 어느 다른 함수가 있다면 이러한 추가에 영향을 받는다. 이것은 좋을 수도, 안좋을 수도 있다. 안좋은 예를 한번 상상해보자.

유저가 구매하기 버튼을 눌러 `구매` 함수를 호출하면, 이는 네트워크 요청을 생성하고 서버에 `장바구니` 배열을 보낸다. 하지만 네트워크 연결이 좋지않아서 `구매` 함수는 다시한번 네트워크 요청을 보내야 하는 상황이 생겼다. 이때, 사용자가 네트워크 요청이 시작되기 전에 실수로 원하지 않는 상품의 "장바구니에 추가" 버튼을 실수로 클릭하면 어떻게 될까? 실수가 있고난 뒤, 네트워크 요청이 시작되면 `장바구니에 추가` 함수 때문에 실수로 변경된 `장바구니` 배열을 서버에 보내게 된다.

가장 좋은 방법은 `장바구니에 추가`는 항상 `장바구니` 배열을 복제하여 수정하고 복제본을 반환하는 것입니다. 이렇게하면 장바구니 참조를 보유하고있는 다른 함수가 다른 변경 사항의 영향을 받지 않게 된다.

이 예시의 교훈은 다음과 같다.

1. 실제로 입력된 객체를 수정하고 싶은 경우가 있을 수 있지만 이러한 예제를 생각해보고 적용해보면 그런 경우는 거의 없다는 것을 깨달을 수 있다. 그리고 대부분의 것들이 사이드 이펙트없이 리팩토링 될 수 있다.
2. 큰 객체를 복제하는 것은 성능 측면에서 비용이 크다. 다행히도 이것이 큰 문제가 되지는 않는다. 왜냐하면 이러한 프로그래밍 접근법을 가능하게해줄 [좋은 라이브러리](https://facebook.github.io/immutable-js/)가 있기 때문이다. 이는 객체와 배열을 수동으로 복제하는 것처럼 메모리 집약적이지 않고 빠르게 복제해준다.

**안좋은 예:**

```jsx
const addItemToCart = (cart, item) => {
  cart.push({ item, date: Date.now() });
};
```

**좋은 예:**

```jsx
const addItemToCart = (cart, item) => {
  return [...cart, { item, date: Date.now() }];
};
```

### **전역 함수 사용하지 않기**

전역 환경을 사용하는 것은 나쁜 습관이다. 다른 라이브러리들과 충돌이 일어날 수 있고, 내가 만든 API를 쓰는 유저들은 운영환경에서 예외가 발생하기 전까지는 문제를 인지하지 못할 것이기 때문이다. 예를 들어 생각해보자.

내장 Array 메소드를 확장하여 두 배열 간의 차이를 보여줄 수있는 `diff` 메소드를 사용하려면 어떻게 해야 할까? 새로운 함수를 `Array.prototype`에 쓸 수도 있지만, 똑같은 일을 시도한 다른 라이브러리와 충돌할 수 있다. 다른 라이브러리가 `diff` 메소드를 사용하여 첫번째 요소와 마지막 요소의 차이점을 찾으면 어떻게 될까? 이것이 ES6의 classes를 사용해서 전역 `Array`를 상속해버리는 것이 훨씬 더 나은 이유다.

**안좋은 예:**

```jsx
Array.prototype.diff = function diff(comparisonArray) {
  const hash = new Set(comparisonArray);
  return this.filter((elem) => !hash.has(elem));
};
```

**좋은 예:**

```jsx
class SuperArray extends Array {
  diff(comparisonArray) {
    const hash = new Set(comparisonArray);
    return this.filter((elem) => !hash.has(elem));
  }
}
```

### **명령형 프로그래밍보다 함수형 프로그래밍 지향하기**

JavaScript는 Haskell처럼 함수형 프로그래밍 언어는 아니지만 함수형 프로그래밍처럼 작성할 수 있다. 함수형 언어는 더 깔끔하고 테스트하기 쉽다.

**안좋은 예:**

```jsx
const programmerOutput = [
  {
    name: "Uncle Bobby",
    linesOfCode: 500,
  },
  {
    name: "Suzie Q",
    linesOfCode: 1500,
  },
  {
    name: "Jimmy Gosling",
    linesOfCode: 150,
  },
  {
    name: "Gracie Hopper",
    linesOfCode: 1000,
  },
];

let totalOutput = 0;

for (let i = 0; i < programmerOutput.length; i++) {
  totalOutput += programmerOutput[i].linesOfCode;
}
```

**좋은 예:**

```jsx
const programmerOutput = [
  {
    name: "Uncle Bobby",
    linesOfCode: 500,
  },
  {
    name: "Suzie Q",
    linesOfCode: 1500,
  },
  {
    name: "Jimmy Gosling",
    linesOfCode: 150,
  },
  {
    name: "Gracie Hopper",
    linesOfCode: 1000,
  },
];

const totalOutput = programmerOutput
  .map((programmer) => programmer.linesOfCode)
  .reduce((acc, linesOfCode) => acc + linesOfCode, INITIAL_VALUE);
```

### **조건문 캡슐화하기**

**안좋은 예:**

```jsx
if (fsm.state === "fetching" && isEmpty(listNode)) {
  // ...
}
```

**좋은 예:**

```jsx
function shouldShowSpinner(fsm, listNode) {
  return fsm.state === "fetching" && isEmpty(listNode);
}

if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
  // ...
}
```

### **부정 조건문을 사용하지 않기**

**안좋은 예:**

```jsx
function isDOMNodeNotPresent(node) {
  // ...
}

if (!isDOMNodeNotPresent(node)) {
  // ...
}
```

**좋은 예:**

```jsx
function isDOMNodePresent(node) {
  // ...
}

if (isDOMNodePresent(node)) {
  // ...
}
```

### **조건문 작성을 피하기**

조건문 작성을 피하라는 것은 매우 불가능한 일로 보인다. 이 얘기를 처음 듣는 사람들은 대부분 "`if`문 없이 어떻게 코드를 짜나요?" 라고 말한다. 하지만 다형성(polymorphism)을 이용한다면 동일한 작업을 수행할 수 있다. 두 번째 질문은 보통 "근데 내가 왜 그렇게 해야 하나요?" 다. 그에 대한 대답은, 앞서 공부했던 clean code 컨셉 안에 있다. 함수는 단 하나의 일만 수행하여야 한다. 함수나 클래스에 `if`문을 쓴다면 그것은 그 함수나 클래스가 한가지 이상의 일을 수행하고 있다고 말하는 것과 같다. 기억하자, 하나의 함수는 딱 하나의 일만 해야한다.

**안좋은 예:**

```jsx
class Airplane {
  // ...
  getCruisingAltitude() {
    switch (this.type) {
      case "777":
        return this.getMaxAltitude() - this.getPassengerCount();
      case "Air Force One":
        return this.getMaxAltitude();
      case "Cessna":
        return this.getMaxAltitude() - this.getFuelExpenditure();
    }
  }
}
```

**좋은 예:**

```jsx
class Airplane {
  // ...
}

class Boeing777 extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getPassengerCount();
  }
}

class AirForceOne extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude();
  }
}

class Cessna extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getFuelExpenditure();
  }
}
```

### **타입 체킹을 피하기 (part 1)**

JavaScript는 타입이 정해져있지 않다. 이는 함수가 어떤 타입의 인자든 받을 수 있다는 것을 의미한다. 이런 JavaScript의 자유로움 때문에 여러 버그가 발생했었고 이 때문에 함수에 타입 체킹을 시도 할 수도 있다. 하지만 타입-체킹 말고도 이러한 화를 피할 많은 방법들이 존재한다. 첫번째 방법은 일관성 있는 API를 사용하는 것이다.

**안좋은 예:**

```jsx
function travelToTexas(vehicle) {
  if (vehicle instanceof Bicycle) {
    vehicle.pedal(this.currentLocation, new Location("texas"));
  } else if (vehicle instanceof Car) {
    vehicle.drive(this.currentLocation, new Location("texas"));
  }
}
```

**좋은 예:**

```jsx
function travelToTexas(vehicle) {
  vehicle.move(this.currentLocation, new Location("texas"));
}
```

### **타입 체킹을 피하기 (part 2)**

문자열, 정수, 배열 등 기본 자료형을 사용하고 다형성을 사용할 수 없을 때 여전히 타입 체킹이 필요하다고 느껴진다면 TypeScript가 좋은 옵션이 될 수 있다. TypeScript는 표준 JavaScript 구문에 정적 타입을 제공하므로 일반 JavaScript의 대안으로 사용하기에 좋다. JavaScript에서 타입 체킹할 때 문제점은 가짜 `type-safety` 를 얻기 위해 작성된 코드를 설명하기 위해서 많은 주석을 달아야한다는 점이다. JavaScript로 코드를 작성할 땐 깔끔하게 코드를 작성하고, 좋은 테스트 코드를 짜야하며 좋은 코드 리뷰를 해야합니다. 그러기 싫다면 그냥 TypeScript를 쓰자.

**안좋은 예:**

```jsx
function combine(val1, val2) {
  if (
    (typeof val1 === "number" && typeof val2 === "number") ||
    (typeof val1 === "string" && typeof val2 === "string")
  ) {
    return val1 + val2;
  }

  throw new Error("Must be of type String or Number");
}
```

**좋은 예:**

```jsx
function combine(val1, val2) {
  return val1 + val2;
}
```

### **과도한 최적화를 지양하기**

최신 브라우저들은 런타임에 많은 최적화 작업을 수행한다. 대부분의 경우 직접 코드를 최적화 하는 것은 시간낭비일 가능성이 많다. (최적화가 부족한 곳이 어딘지를 알려주는 [좋은 자료](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)) 자료를 참조하여 최신 브라우저들이 최적화 해주지 않는 부분만 최적화를 해주는 것이 좋다.

**안좋은 예:**

```jsx
// 오래된 브라우저의 경우 캐시되지 않은 `list.length`를 통한 반복문은 높은 코스트를 가졌다.
// 그 이유는 `list.length`를 매번 계산해야만 했기 때문인데,
// 최신 브라우저에서는 이것이 최적화 되었다.
for (let i = 0, len = list.length; i < len; i++) {
  // ...
}
```

**좋은 예:**

```jsx
for (let i = 0; i < list.length; i++) {
  // ...
}
```

### **죽은 코드를 지우기**

죽은 코드는 중복된 코드 만큼이나 좋지 않다. 죽은 코드는 남아있을 어떠한 이유도 없다. 호출되지 않는 코드가 있다면 그 코드는 지워라. 그 코드가 여전히 필요해도 그 코드는 버전 히스토리에 안전하게 남아있다.

**안좋은 예:**

```jsx
function oldRequestModule(url) {
  // ...
}

function newRequestModule(url) {
  // ...
}

const req = newRequestModule;
inventoryTracker("apples", req, "www.inventory-awesome.io");
```

**좋은 예:**

```jsx
function newRequestModule(url) {
  // ...
}

const req = newRequestModule;
inventoryTracker("apples", req, "www.inventory-awesome.io");
```
