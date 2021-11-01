## 환경 변수 설정하기(feat. netlify)

### 발단

영화 정보 API를 이용해보는 프로젝트를 하는 중에 클라이언트 코드 안에서 `API_KEY`를 드러내는 부분이 있었다. 그런데 코드 안에서 민감한 정보를 직접적으로 나타내는 것은 보안상 매우 위험하다. 이를 코드 리뷰 조언에 따라 환경 변수를 사용하여 숨겨주도록 하기로 했다. 

### 이미 아는 내용

- 없음

### 알게 된 내용(설정 방법)

1. `npm i -D dotenv-webpack`
    1. `dotenv`는 환경 변수 관련 라이브러리다. 웹팩을 이용하고 있어 `dotenv-webpack`을 설치해주었다.
2. `webpack.config.js` 설정
    
    ```jsx
    const Dotenv = require('dotenv-webpack')
    // ...
    plugins: [
          // ...
          new Dotenv()
        ]
    // ...
    ```
    
3. `.env` 파일을 만들어 사용하고 싶은 환경 변수를 작성한다.
    
    e.g.,
    
    ```
    OMDB_API_KEY=어쩌고저쩌고
    ```
    
4. netlify에서도 환경 변수를 설정한다.
5. 해당 변수를 환경 변수로 수정한다.
    
    ```jsx
    const { OMDB_API_KEY } = process.env
    ```