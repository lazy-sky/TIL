### is pseudo selector

```css
header button,
nav button,
form button {
  background-color: red;
}
```

→

```css
:is(header, nav, form) button {
  background-color: red;
}
```

### flexbox gap

flex 컨테이너 안에서 아이템 사이에 간격을 주고 싶을 때, margin을 이용하는 대신 사용할 수 있다.

e.g., `gap: 10px 20px;` (row gap, column gap)

### asepct-ratio

영상이나 이미지의 정해진 비율을 고정하고 싶을 때

```css
img {
  aspect-ratio: 16 / 9;
}
```
