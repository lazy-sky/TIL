## onClick과 onSubmit의 차이점

### 발단

리액트로 로그인 기능을 구현하던 중에 '로그인' 버튼을 만들고 있었다. 그런데 이 버튼의 이벤트핸들링을 `onClick`과 `onSubmit` 중 무엇으로 해야하는지 고민되었다. 사실 `onChange`랑 `onClick`만을 써왔었는데 이름에서 풍기는 느낌으로 보아 이번에는 왠지 `onSubmit`을 써야할 거 같아서 그렇게 썼다. 그리고 잘 작동하기는 했다. 그런데 정말 둘의 차이점은 무엇일까? 겸사겸사 `button`의 `type`을 `button`으로 하는 것과 `submit`으로 하는 것에는 어떤 차이가 있을까?

### 이미 아는 내용

- 일단 `onclick`과 `onsubmit`은 둘 다 이벤트핸들러다.
- `onclick`은 클릭 이벤트가 발생했을때 실행된다.

### 알게 된 내용

- `onSubmit`은 `form`이 제출(sumbit)될 때 실행된다.
    - submit 이벤트의 출처를 거슬러 올라가면 그게 클릭일 수도 있는 것이다. (버튼을 클릭하여 submit하는 상황)
    - 따라서 submit을 하는 `button`에  `onclick`을 사용하면, `onSubmit`은 캐치하는, 몇몇 상황을 놓칠 수 있다.
        - 이를테면 validation

### 출처

- [Whats the difference between onclick and onsubmit?](https://stackoverflow.com/questions/23762474/whats-the-difference-between-onclick-and-onsubmit)