- reference: https://jbee.io/typescript/TS-9-unknown/

# Before Start

## any vs unknown

타입스크립트에서 `any`는 모든 타입을 할당받을 수 있는 필요악같은 존재다. 

`unknown` 타입도 `any`와 마찬가질 모든 타입의 값이 할당될 수 있다.

```ts
let variable: unknown

variable = true // OK (boolean)
variable = 1 // OK (number)
variable = 'string' // OK (string)
variable = {} // OK (object)
```

차이점은, 

- `unknown` 타입으로 선언된 변수는 `any`를 제외한 다른 타입으로 선언된 변수에 할당될 수 없다.
- `unknown` 타입으로 선언된 변수는 프로퍼티에 접근할 수 없으며, 메소드를 호출할 수 없으며, 인스턴스를 생성할 수도 없다.

다만 `any` 타입과 달리 프로퍼티 또는 연산을 하는 경우 컴파일러가 체크한다. 즉 일종의 안전한 `any`라고 볼 수 있다.

## Usage

### any를 사용하는 곳

`any`를 사용하는 곳이라면 `unknown`으로 대체할 수 있다.

아직 뭘 넣을진 모르겠지만 안정성을 도모하고 싶다면 일단 `unknown`을 써보면 될 거 같다.
