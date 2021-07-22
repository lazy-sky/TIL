## sticky

말그대로 특정 위치를 기준으로 찰싹 달라붙게 만들어준다.
스크롤을 해도 위에 붙어 계속 볼 수 있게 된다.

```{.css}
  .header {
    position: sticky;
    top: 0;
  }
```

## flexbox

먼저 부모 요소를 `flexbox`로 만든다.

```{.css}
  .parent {
    display: flex;
  }
```

그러면

- `justify-content` : 수평 정렬 방식
- `align-items` : 수직 정렬 방식
- `flex-direction` : 정렬의 방향
- `flew-wrap` : 줄 바꿈 여부
  등의 프로퍼티를 사용할 수 있게 된다.

## 정렬 (우측 정렬)

### float

`float: right;`

### flexbox

1.

```{.css}
  .parent {
    display: flex;
    justify-content: space-between;
  }
```

2.

```{.css}
  .parent {
    display: flex;
  }

.child {
    margin-left: auto;
  }
```
