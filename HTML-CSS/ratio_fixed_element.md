# 가로 세로 비율 고정 요소

## 발단

프로젝트에서 비율이 고정된 반응형 요소가 필요했다.

## 방법

```css
.container {
	position: relative;
	width: 100%;
	height: 0;
	overflow: hidden;
	// 세로/가로 * 100, 즉 아래는 1:1 비율, e.g., 3:4를 원하면 133%
	padding-bottom: 100%;  
}

.inner {
	position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}
```