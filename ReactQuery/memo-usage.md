reference: https://kyounghwan01.github.io/blog/React/react-query/basic

## 장점

아래 작업들을 편리하게 구현할 수 있다.

- 캐싱
- 가져온 데이터를 자동으로 업데이트
- 데이터가 오래 되었다고 판단되면 다시 가져오기
- 동일 데이터를 여러 번 요청하면 한 번만 요청
- 무한 스크롤
- 비동기 과정을 선언적으로 관리
- hook과 사용법이 유사

## `useQuery`

- 데이터를 가져오기 위한 api 
- post, update는 `useMutation`을 사용한다.
- 첫번째 파라미터는 unique key, 두번째 파라미터는 api호출 함수(promise) 
  - 첫번째 파라미터 unique key는 다른 컴포넌트에서도 해당 키를 사용하면 호출 가능하다.
  - unique key는 문자열과 배열을 받는다.  
    - 배열로 넘기면 0번 값은 문자열로 다른 컴포넌트에서 부를 값이 들어가고 두번째 값을 넣으면 query 함수 내부에 파라미터로 해당 값이 전달된다.
- 반환 값은 api의 성공, 실패여부, api 반환 결과 값을 포함한 객체이다.
- 비동기로 동작한다. 즉, 한 컴포넌트에 여러 개의 `useQuery`가 있다면 동시에 실행된다. 이런 경우 `useQueries`가 권장된다. 
- `enabled`를 사용하면 동기적으로 사용할 수 있다.


e.g.,

```js
const Todos = () => {
  const { isLoading, isError, data, error } = useQuery("todos", fetchTodoList, {
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션이다.
    retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: data => {
      // 성공시 호출
      console.log(data);
    },
    onError: e => {
      // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출된다.)
      console.log(e.message);
    }
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ul>
      {data.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};
```

## `useQuery` 동기적 실행

`useQuery`의 세 번째 파라미터는 옵션값이다. 여기서 `enabled` 옵션을 사용하면 동기적으로 사용할 수 있다.

e.g.,

```js
const { data: todoList, error, isFetching } = useQuery("todos", fetchTodoList);
const { data: nextTodo, error, isFetching } = useQuery(
  "nextTodos",
  fetchNextTodoList,
  {
    enabled: !!todoList // true가 되면 fetchNextTodoList를 실행한다
  }
);
```

## `useQueries`

`useQuery`를 비동기로 여러 개 실행할 경우 작업이 다소 귀찮아질 수 있다.

```js
const usersQuery = useQuery("users", fetchUsers);
const teamsQuery = useQuery("teams", fetchTeams);
const projectsQuery = useQuery("projects", fetchProjects);

// 모두 비동기로 실행되는데, 변수를 모두 기억해야하고 각 변수에 대한 로딩, 성공, 실패처리를 모두 해야한다.
```

이 때 `promise.all`처럼 하나로 묶을 수 있다. `promise.all`과 마찬가지로 하나의 배열에 각 쿼리에 대한 상태 값이 객체로 들어온다.

```js
const result = useQueries([
  {
    queryKey: ["getRune", riot.version],
    queryFn: () => api.getRunInfo(riot.version)
  },
  {
    queryKey: ["getSpell", riot.version],
    queryFn: () => api.getSpellInfo(riot.version)
  }
]);

useEffect(() => {
  console.log(result); // [{rune 정보, data: [], isSucces: true ...}, {spell 정보, data: [], isSucces: true ...}]
  const loadingFinishAll = result.some(result => result.isLoading);
  console.log(loadingFinishAll); // loadingFinishAll이 false이면 최종 완료
}, [result]);
```

## unique key 활용

unique key를 배열로 넣으면 쿼리 함수 내부에서 변수로 사용할 수 있다.

```js
const riot = {
  version: "12.1.1"
};

const result = useQueries([
  {
    queryKey: ["getRune", riot.version],
    queryFn: params => {
      console.log(params); // {queryKey: ['getRune', '12.1.1'], pageParam: undefined, meta: undefined}

      return api.getRunInfo(riot.version);
    }
  },
  {
    queryKey: ["getSpell", riot.version],
    queryFn: () => api.getSpellInfo(riot.version)
  }
]);
 
```

## `queryCache`

쿼리의 성공 여부를 전처리할 수 있다.

```js
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log(error, query);
      if (query.state.data !== undefined) {
        toast.error(`에러가 났어요!!: ${error.message}`);
      },
    },
    onSuccess: data => {
      console.log(data)
    }
  })
});
```

## `useMutation`

- 값을 바꿀 때 사용하는 api
- 반환 값은 `useQuery`와 동일하다.

e.g., 로그인

```js
import { useState, useContext, useEffect } from "react";
import loginApi from "api";
import { useMutation } from "react-query";

const Index = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation(loginApi, {
    onMutate: variable => {
      console.log("onMutate", variable);
      // variable : {loginId: 'xxx', password; 'xxx'}
    },
    onError: (error, variable, context) => {
      // error
    },
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
    onSettled: () => {
      console.log("end");
    }
  });

  const handleSubmit = () => {
    loginMutation.mutate({ loginId: id, password });
  };

  return (
    <div>
      {loginMutation.isSuccess ? "success" : "pending"}
      {loginMutation.isError ? "error" : "pending"}
      <input type="text" value={id} onChange={e => setId(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>로그인</button>
    </div>
  );
};

export default Index;
```

## update 후 get 다시 실행

update 후에 get 함수를 간단히 재실행할 수 있는 건 React query의 장점이다. `useMutation`의 `onSuccess`에 unique key로 매핑된 get 함수를 `invalidateQuries`에 넣어주면 된다.

```js
const mutation = useMutation(postTodo, {
  onSuccess: () => {
    // postTodo가 성공하면 todos로 맵핑된 useQuery api 함수를 실행합니다.
    queryClient.invalidateQueries("todos");
  }
});
```

mutation 반환 값을 이용해 get 함수의 파라미터를 변경해야 하는 경우 `setQueryData`를 사용한다.

```js
const queryClient = useQueryClient();

const mutation = useMutation(editTodo, {
  onSuccess: data => {
    // data가 fetchTodoById로 들어간다
    queryClient.setQueryData(["todo", { id: 5 }], data);
  }
});

const { status, data, error } = useQuery(["todo", { id: 5 }], fetchTodoById);

mutation.mutate({
  id: 5,
  name: "nkh"
});
```

## Suspense와 함께 사용하기

- `Suspense`를 사용하여 로딩 상태 표현 및 에러 핸들링을 더 직관적으로 할 수 있다.
- `QueryClient` 옵션에 `suspense: true`를 추가한다.

e.g., 전역적으로 사용할 때

```js
// src/index.js
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

e.g., 함수마다 사용할 때

```js
const { data } = useQurey("test", testApi, { suspense: true });

return (
  <Suspense fallback={<div>loading</div>}>
    <ErrorBoundary fallback={<div>에러 발생</div>}>
      <div>{data}</div>
    </ErrorBoundary>
  </Supense>
);
```
