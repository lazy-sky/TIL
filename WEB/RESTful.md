### REST

> 분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍터 - MDN

> 네트워크 리소스를 정의하고 처리하는 방법을 설명하는 일련의 원칙을 기반으로 하는 아키텍처 스타일 - Service Architecture

결국 REST란 HTTP를 잘 활용하기 위한 일종의 원칙, 스타일 -> 이걸 잘 지킨 것이 흔히 말하는 RESTful.

### 특징

- REST는 Representational State Transfer의 약자. -> 자원 표현에 의한 상태(정보) 전달
- URI에는 동사를 사용하지 않는다.
  - e.g., `/courses/front/functions/remove ( x )
  - 그 대신 자원에 대한 행위에 대해서 HTTP Method를 사용한다.
    - CRUD 기능은 각각 POST / GET / PUT or PATCH / DELETE와 대응된다.
- REST는 아키텍처 '스타일'이다. 따라서 모든 원칙을 지키지 않는다고 해서 API가 틀린 것은 아니다.

### 정리

RESTful은, 
- HTTP를 잘 활용하기 위해서 만들어진 아키텍처다.
- URI와 HTTP Method를 사용해서 자원과 행위를 표현한다.
- API 의미를 표현하기 쉽고, 의미를 파악하기도 쉽다.

출처: https://www.youtube.com/watch?v=NODVCBmyaXs