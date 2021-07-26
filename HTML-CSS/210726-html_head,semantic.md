# mini project 1 리뷰 후 정리한 사항

## `head` 태그에 있어야 하는 것, HTML의 메타데이터

[head 태그에는 무엇이 있을까? HTML의 메타데이터 - Web 개발 학습하기 | MDN](https://developer.mozilla.org/ko/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)

### HTML의 `head`란?

HTML `<head>` 요소는, 페이지를 열 때 브라우저에 표시되는 `<body>`요소와 달리, 페이지에 표시되지 않는다. 대신 `head`는 페이지에 대한 metadata를 처리한다. `head`가 포함하는 메타데이터의 종류는 다음과 같다.

- `<title>` : (문서의 컨텐츠가 아니라) HTML문서 전체의 타이틀 표현하기 위한 메타데이터
- `<meta>` : 데이터를 설명하는 데이터
  - `charset` : 인코딩 방식에 대해 정의. e.g., `charset="utf-8"`
  - `name`, `content` : 정보의 형태와 실제 메타데이터의 컨텐츠를 설명. e.g., `<meta name="author" content="Chris Mills">`
- 아이콘 추가 : e.g., `<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">`

```html
<!-- first- and second-generation iPad: -->
<link
  rel="apple-touch-icon-precomposed"
  sizes="72x72"
  href="https://developer.mozilla.org/static/img/favicon72.png"
/>
```

- CSS, JavaScript 적용 :
  - `<link rel="stylesheet" href="my-css-file.css">`
  - `<script src="my-js-file.js"></script>`
- 언어 설정 : `<html lang="ko">`

### 요약

- HTML의 `head`는 페이지를 열 때 웹 브라우저에 표시되지 않는다.
- `head`는 `<title>` 같은 페이지나,
- CSS의 **링크**(HTML 컨텐츠를 CSS로 스타일링하기를 원한다면),
- **파비콘**(favicon),
- 그리고 다른 **메타데이터**(작성자, 중요한 키워드와 같은 HTML에 대한 내용)를 포함한다.

⚠️ `**img` 태그 사용시 alt 속성을 절대 누락하지 말자!\*\*

⚠️ **메뉴 UI를 작성할 때는 `div`보다는 `ul`, `li`로 작성하는 것이 더 시멘틱하다.**

- 참고 사이트([https://snusang.tistory.com/4](https://snusang.tistory.com/4))
