## 스크롤 CSS

### 발단

얼마 전에 HTML, CSS, Vanilla JS 만을 이용하여 앱을 클론하는 프로젝트를 하다가 왜인지 스크롤 이벤트가 마음대로 되지 않아 일단 넘어갔었다. 이 덮어두었던 프로젝트를 리뷰받을 수 있는 기회가 생겨 다시 붙잡게 되었다. 

일단 원하는 건,

- 스크롤 기능은 살아있고,
- 스크롤 바는 보이지 않는 것이다.

### 해결

방법은 상당히 간단하다.

```css
원하는 선택자 { 
	overflow: scoll;
	-ms-overflow-style: none; 
} 

원하는 선택자::-webkit-scrollbar { 
	display:none; 
}
```

`overflow`에 `scroll` 값이 있는 줄 모르고 계속 `hidden`으로 하려던 게 문제였다...