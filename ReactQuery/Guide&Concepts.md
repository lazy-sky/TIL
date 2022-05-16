## Important Defaults

React Query는 공격적이지만 정상적인 기본값을 구성된다. 

- 기본값의 `useQuery` or `useInfiniteQuery`를 통한 쿼리 인스턴스는 캐시된 데이터를 오래된(stale) 것으로 간주한다. 이 동작을 바꾸려면 `staleTime` 옵션을 이용하여 전역 그리고 매 쿼리마다 쿼리를 구성하면 된다. `staleTime`을 높이는 건 refetch를 자주하지 않는다는 걸 의미한다.

- stale 쿼리는 백그라운드에서 다음 상황에 자동으로 refetch된다. 
  - 쿼리의 새 인스턴스
  - 새로운 윈도우에 재포커스
  - 네트워크 재연결
  - refetch 인터벌과 함께 쿼리를 선택적으로 구성
  - 예상치 못한 refetch 해결 관련 옵션: `refetchOnMount`, `refetchOnWindowFocus`, `refetchOnReconnect`, `refetchInterval`

- 더 이상 활성화된 `useQuery`, `useInfiniteQuery`, 쿼리 옵저버 인스턴스가 없는 쿼리 결과는 비활성된 것으로 분류되어 캐시에 남아 있는다. 기본적으로 비활성화된 쿼리는 5분 후에 수집되는 가비지다. 
  - 변경 옵션: `cacheTime`

- 실패한 쿼리는 3번 시도된다. 
  - 변경 옵션: `retry`, `retryDelay`

- 기본적으로 쿼리 결과는 데이터가 실제로 변경되었는지를 감지하기 위해 구조적으로 공유된다. 변경되지 않았다면 데이터 참조는 바뀌지 않는다.

## Queries

