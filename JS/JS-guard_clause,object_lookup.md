# 더 나은 분기 처리에 관하여

## Guard clause

분기 처리를 위해 가장 많이 활용되는 문법은 일반적으로 `if else` 조건문이나 `switch case` 조건문일 것이다. 다만 조건들이 많은 경우에 `if else` 남발하다보면 중첩 레벨이 깊어지고 그에 따라 가독성도 떨어지게 된다. 이는 유지보수성에 저하로 이어진다. 물론 `else`가 필요한 순간도 있겠지만, 그런 순간이 아니라면 `guard clause`를 적용하여 처리하는 것이 더 바람직하다.

`Guard clause`란 예외적인 상황에 대하여 먼저 조건 처리하여 다음 단계가 처리되지 않도록 하는 것이다. `Guard clause`는 `if`가 아니라 `else` 대체품인 것이다. 하지만 여기서 유의할 것이 단순히 `else`를 대체하는 용도가 아니라 예외나 오류 조건이 없는 가장 기본적인 시나리오, 즉 `Happy path`와 다른 조건의 상황을 구분하는 데 이용하는 것으로 이해해야 한다.

```jsx
function getInsuranceAmount(status) {
  let amount;
  if (!status.hasInsurance()){
    amount = 1;
  } else {
    if (status.isTotaled()){
      amount = 10000;
    } else {
      if (status.isDented()){
        amount = 160;
        if (status.isBigDent()){
          amount = 270;
        }
      }
    }
  }
  return amount;
}
```

```jsx
function getInsuranceAmount(status) {
  if (!status.hasInsurance()){
    return 1;
  }
  if (status.isTotaled()){
    return 10000;
  }
  if (status.isDented() && status.isBigDent()){
    return 270;
  }
  if (status.isDented()){
    return 160;
  }
  return 0;
}
```


## Object lookup

 `else if`의 남용을 줄여준다는 점에서 더 나아보일지도 모르지만, `switch`문은 절차 제어 흐름에서부터 비표준적인 방식(중괄호를 사용하지 않는)에 이르기까지 많은 문제가 있다. 많은 문제를 갖고 있다. 멈추기 위해선 수동으로 중단해야 한다. (`break`) 각 문은 디버깅을 난해하게 하고 중첩된 오류를 일으킬 수 있다. 그리하여 `switch`대신에 `Object lookup` 방식을 쓰는 것이 낫다. 

```jsx
var type = 'coke';
var drink;
switch(type) {
case 'coke':
  drink = 'Coke';
  break;
case 'pepsi':
  drink = 'Pepsi';
  break;
default:
  drink = 'Unknown drink!';
}
console.log(drink); // 'Coke'
```

```jsx
function getDrink (type) {
  if (type === 'coke') {
    type = 'Coke';
  } else if (type === 'pepsi') {
    type = 'Pepsi';
  } else if (type === 'mountain dew') {
    type = 'Mountain Dew';
  } else if (type === 'lemonade') {
    type = 'Lemonade';
  } else if (type === 'fanta') {
    type = 'Fanta';
  } else {
    // acts as our "default"
    type = 'Unknown drink!';
  }
  return 'You\'ve picked a ' + type;
}
```

`Object lookups`를 이용하면 훨씬 유연하고 가독성과 유지 보수성이 뛰어나며 일일이 각 `case`를 수동으로 구분하지 않아도 된다. 또한 우리 자바스크립트 개발자에게 훨씬 익숙한 방식이다. 심지어 성능적으로도 더 우수하다. 왜냐하면 `case`의 수가 늘어남에 따라 추가되는 평균 비용이 더 적기 때문이다. (`object`는 해시 테이블 조회이고 `switch`는 일치와 `break`이 일어날 때까지 각 `case`를 평가해야 한다.) 위의 switch 예시를 다음과 같이 바꿀 수 있다.

```jsx
function getDrink (type) {
  var drinks = {
    'coke': 'Coke',
    'pepsi': 'Pepsi',
    'lemonade': 'Lemonade',
    'default': 'Default item'
  };
  return 'The drink I chose was ' + (drinks[type] || drinks['default']);
}

var drink = getDrink('coke');
// The drink I chose was Coke
console.log(drink);
```

```jsx
function getDrink (type) {
  return 'The drink I chose was ' + {
    'coke': 'Coke',
    'pepsi': 'Pepsi',
    'lemonade': 'Lemonade'
  }[type];
}
```

`switch`문의 몇 줄을 가져왔을 뿐이지만 훨씬 단순해졌다. 이제 우리는 `break`에 대해 걱정하지 않아도 된다. 

`Object literals`은 자바스크립트에서 흐름을 보다 자연스럽게 제어하는 기능으로, `switch`는 디버깅 오류가 발생하기 쉽다. `object`는 확장성과 유지 관리가 용이하며 훨씬 더 효과적으로 테스트할 수 있다. 또한 `object`는 디자인 패턴의 일부이며, 다른 프로그래밍 작업에서 일상적으로 사용된다. `Object literals`에는 다른 `object` 타입뿐만 아니라 함수도 포함시킬 수 있어 매우 유연하다. `literal`의 각 함수에는 각 `scope`도 있으므로 호출하는 상위 함수에서 `closure`를 반환할 수 있다.

참고 출처:

[https://dev.to/qvault/guard-clauses-how-to-clean-up-conditionals-2fdm](https://dev.to/qvault/guard-clauses-how-to-clean-up-conditionals-2fdm)

[https://deviq.com/design-patterns/guard-clause](https://deviq.com/design-patterns/guard-clause)

[https://ultimatecourses.com/blog/deprecating-the-switch-statement-for-object-literals](https://ultimatecourses.com/blog/deprecating-the-switch-statement-for-object-literals)