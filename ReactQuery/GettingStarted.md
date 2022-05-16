https://react-query.tanstack.com/overview

# Overview

React Query는,
- fetching
- 서버의 상태를 가져오고(fetching) 
- 동기화
- 서버의 상태를 업데이트하는 작업을 쉽게 만든다.

## Motivation

대부분의 기존 상태 관리 라이브러리는 비동기 또는 서버 상태 작업에는 적합하지 않았다. 왜냐하면 서버 상태는, 

- 제어하거나 소유할 수 없는 위치에서 원격으로 유지된다.
- fetching & updating을 위한 비동기 API가 필요하다.
- 다른 사람과 공유된다. 즉 다른 사람이 변경할 수 있다. 따라서 상태가 내 앱에선 outdated될 가능성이 있다.

또 알아야 하는 것이,

- 캐싱
- 동일한 데이터에 대한 여러 요청을 단일 요청으로 처리
- 백그라운드에서 outdated해진 데이터를 업데이트
- 데이터가 outdated해졌다는 것을 파악
- 가능한한 빨리 업데이트 반영
- 페이지네이션, 레이지 로딩 등 성능 최적화
- 서버 상태의 메모리 관리와 가비지 콜렉션
- 구조적인 공유를 통한 쿼리 결과 메모이제이션

React Query는 서버 상태 관리를 위한 최고의 라이브러리다. 별도의 환경설정없이 즉시 사용 가능하고, 커스텀할 수도 있다. 위의 문제들을 모두 해결할 수 있도록 도울 것이다.

기술적으로 설명하자면,

- React Query 로직으로 복잡한 코드를 줄여준다.
- 앱을 더 유지하기 쉽고 서버 상태에 대한 걱정없이 새로운 기능을 추가할 수 있도록 해준다.
- 최종 사용자에게 빠르고 좋은 반응성 경험을 제공한다.
- 잠재적으로 대역폭을 아끼고 메모리 성능을 높여준다.

# 설치

```bash
 $ npm i react-query
 # or
 $ yarn add react-query
```

# Quick Start

세 가지 핵심 개념

- Queries
- Mutations
- Query Invalidation

```js
import {
   useQuery,
   useMutation,
   useQueryClient,
   QueryClient,
   QueryClientProvider,
 } from 'react-query'
 import { getTodos, postTodo } from '../my-api'
 
 // 클라이언트 생성
 const queryClient = new QueryClient()
 
 function App() {
   return (
     // App에 클라이언트를 제공
     <QueryClientProvider client={queryClient}>
       <Todos />
     </QueryClientProvider>
   )
 }
 
 function Todos() {
   // 클라이언트에 접근
   const queryClient = useQueryClient()
 
   // 쿼리
   const query = useQuery('todos', getTodos)
 
   // 변이
   const mutation = useMutation(postTodo, {
     onSuccess: () => {
       // 무효화 및 refetch
       queryClient.invalidateQueries('todos')
     },
   })
 
   return (
     <div>
       <ul>
         {query.data.map(todo => (
           <li key={todo.id}>{todo.title}</li>
         ))}
       </ul>
 
       <button
         onClick={() => {
           mutation.mutate({
             id: Date.now(),
             title: 'Do Laundry',
           })
         }}
       >
         Add Todo
       </button>
     </div>
   )
 }
 
 render(<App />, document.getElementById('root'))
```

## Devtools

```js
 import { ReactQueryDevtools } from 'react-query/devtools'
 
 function App() {
   return (
     <QueryClientProvider client={queryClient}>
       {/* The rest of your application */}
       <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
   )
 }
```

TODO:

