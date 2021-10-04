## getBy vs queryBy

### 발단

둘의 차이점 및 쓰임새에 대한 질문을 받았다. 테스트 코드를 처음 접하고 쿼리문에 대해 정리하기는 했었다. 하지만 여태까지는 별 생각없이 `getBy*`를 써왔다. 

### 이미 아는 내용

- 내가 아는 한 둘의 유일한 차이점은 에러를 던지는지 여부다.
    - `getBy*`는 오류를 발생시킬 수 있다.

### 알게 된 내용

앞서 언급한 둘의 차이 때문에 무언가 있을 것으로 예상된다면 `getBy*`를 사용하고, 어떤 것이 없다는 단언문을 작성할 때 `queryBy*`사용이 권장된다. 예상한 엘리먼트가 없는 경우에는 `getBy*`가 던져주는 오류를 통해 그 엘리먼트의 부재 및 오류를 확인할 수 있기 때문이다. `getBy*`의 장점은, 즉 오류를 던져줄 수 있다는 건, 항상 테스트 실패가 해당 문제의 근본을 가리키도록 한다는 것이다. 

대체로는 "`getBy*`를 사용하되, 요소가 없음을 확인하고 싶을 땐 `queryBy*`를 사용하자" 정도로 요약할 수 있겠다.

### 출처

- [React Testing Library - Avoid getBy?](https://stackoverflow.com/questions/58857019/react-testing-library-avoid-getby)