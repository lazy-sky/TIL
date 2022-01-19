# div 안에 이미지 넣기

## 발단

여러 개의 `div` 안에 `img`와 텍스트를 넣고 모든 `div`는 상위 컨테이너 `flexbox` `div`가 감싼 형태에서 모든 요소들에 수직 정렬을 하기 위해 `align-items: center` 값을 부여한 상태였다. 그런데 미묘하게 이미지 옆에 글자들이 중앙 정렬되지 않은 모습이었다.  종종 마주할 상황일 거 같아 근본적인 해결을 찾고자 한다.

## 해결

```html
<div className='container'>
	<div className='img-box'>
		<img src="avatar.png" alt="아바타" />
  </div>
  <div>text</div>
</div>
```

```scss
.container {
    display: flex;
    align-items: center; // 수직 중앙 정렬
    width: 100%;

    .img-box {
      width:32px; // 절대값 부여
      height:32px;
      overflow: hidden; // 사이즈를 벗어나면 이미지가 잘리도록

      img {
        width:100%; // 원본 비율 유지
        height:100%;
        object-fit:cover; // 상위 div 안에 딱 맞게 넣게 된다.
      }
    }
  }
```