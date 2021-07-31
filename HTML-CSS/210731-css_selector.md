# CSS Selector

CSS 선택자에는 기본적으로 전체, 태그, 클래스, 아이디 선택자가 있다. 이밖에도 앞선 선택자들보다는 다소 어렵지만 활용도가 높은 다양한 선택자들이 있는데 이들에 대해 알아보고자 한다.

## 복합 선택자

복합 선택자는 두 개 이상의 선택자 요소가 모인 선택자다.

### 하위(자손)(descendant) 선택자

- e.g., `section ul { border: 1px dotted black; }`
- 부모 요소에 포함된 **모든** 하위(자손) 요소에 적용된다.

### 자식(child) 선택자

- e.g., `section>ul { border: 1px dotted black; }`
- 부모의 **바로 아래 자식** 요소에게만 적용된다.

### 인접 형태 선택자(adjacent sibling)

- e.g., `h1+ul { background: yellowgreen; }`
- **바로 옆**에 있는 동생 요소에만 적용된다.

### 일반 형제 선택자(general sibling)

- e.g., `h1~ul { background: yellowgreen; }`
- **모든** 동생 요소에 적용된다.

## 속성 선택자

속성 선택자는 태그 안의 속성들에 따라 스타일을 적용한다.

e.g.,

```css
a[href] {
  color: black;
} /* href 속성이 포함된 a 태그에 적용된다. */
input[type="text"] {
  width: 150px;
} /* width 값이 150px인 input 태그에 적용된다. */

/* 이밖에도 속성 값에 특정 값이 포함되는, 특정 값으로 
시작하거나 끝나는 태그를 선택할 수도 있다. */
```

## 가상 클래스 선택자

가상 클래스는 웹 문서 소스에는 실제로 존재하지 않지만 필요에 의해 임의로 가상의 선택자를 지정하여 지정하여 스타일을 적용한다.

### 링크 선택자

```css
elem:link {
} /* 방문한지 않은 링크 elem 태그에 적용된다. */
elem:visited {
} /* 방문한 링크 elem 태그에 적용된다 */
```

### 동적 선택자(the user action)

```css
div:hover {
  background-color: blue;
} /* 마우스가 올라가 있는 동안 */
div:active {
  background-color: blueviolet;
} /* 마우스 클릭 또는 엔터가 눌린 동안 */
textarea:visited {
  background-color: red;
} /* 커서가 놓여 있는 동안 */
```

### 구조적 가상 클래스 선택자(structural)

구조적 가상 클래스 선택자는 위치를 기준으로 어떤 요소가 몇 번째에 있느냐에 따라 스타일을 적용한다.

```css
elem::nth-child(n) /* n번째에 해당하는 elem 태그에 적용된다. */
```

이외에도 더 많은 선택자가 있지만 필요해지면 더 공부하도록 하자.

### CSS 적용 우선순위

1. 기본적으로 뒤에 나오는 선택자에 대한 우선순위가 더 높다.
2. !important > inline style attribute > id > class, 다른 attribute, 수도클래스(:first-child같은 것) > tag element, 수도엘레먼트(::before같은 것) 순으로 우선순위가 높다.
   - 하지만 !important와 inline style attribute은 실무에서 사용이 제한되는 경우가 많다.
3. 우선순위가 같다면 개수가 많은 css가 우선순위가 높다.
