## Git의 장점
- 협업 상황에서 코드를 주고 받지 않고 동시 작업이 가능해져 생산성 증대
- commit 단위의 관리, 배포 및 버전 관리 용이
- 새로운 기능은 branch로 관리 후 완성되면 merge하여 안정적으로 개발
- 인터넷 연결 없이 로컬 개발 가능

## Git objects
- Blob: 파일 하나의 내용에 대한 정보
- Tree: Blob, subtree의 메타 데이터(디렉토리 위치, 속성, 이름 등)
- Commit: 커밋 순간의 스냅샷

## Settings
- git config --global user.name "유저명"
- git config --global user.email "메일주소"
- git config --global core.editor "vim"
- git config --global core.pager "cat"
- 설정 확인: git config --list

## Git process flow & command
로컬 환경은 순서대로 working directory, staging area, local repository로 이루어져 있다. 
원격 환경(remote repository)은 말그대로 원격에 있는 저장소로 Github이 그 예시다.
- working directory -> staging area: git add 파일명
- staging area -> local repository: git commit / 이후 커밋 메세지 작성
- local repository -> remote repository: git push

- staging area -> working directory: git reset HEAD 파일명
- local repository -> working directory: git checkout
- remote repository -> local repository: git pull

## 주요 커맨드
- cd: 디렉토리 변경
- cd ..: 상위 디렉토리로
- mkdir 디렉토리명: 디렉토리 생성
- touch 파일명: 파일 생성
- mv (경로)파일명 목적지: 파일을 목적지로 옮기기
- rm 파일명: 파일 삭제

## Vim
- vi 파일명: vim 에디터로 파일을 연다. 기본값은 normal mode
- normal mode에서 i 입력: insert mode
- h, j, k, l: left, down, up, right
- esc: normal mode로 돌아가기
- q: quit, 나가기
- q!: 변경 사항 저장하지 않고 나가기
- w: write
- wq: 변경 사항 저장하고 나가기

## Commit Convention & 알아야 할 것
- 제목은 50자 이내로 요약
- 제목과 내용 사이에 한 줄 공백
- prefix를 써서 커밋의 용도를 알기 쉽도록
  - feat: features, 기능 개발 관련
  - docs: documentations, 문서 작업
  - conf: configurations, 환경 설정
  - test: test, 테스트
  - fix: bug-fix, 오류 수정, 패치
  - refactor: refactoring, 리팩토링
  - ci: continuous integration
  - build: build

- commit은 동작 가능한 최소 단위로 자주 할 것
- 작업 단위에 수행된 모든 파일 변화가 해당 commit 메세지에 전부 포함되어야 함
- 누구나 읽기 쉽게 작성할 것

## Branch
분기점을 생성하여 독립적으로 코드를 변경할 수 있도록 도와주는 모델
- git branch: 로컬 branch들을 보여준다.
- git branch -r: 원격 branch들을 보여준다.
- git branch 브랜치명: 새로운 branch를 생성한다.
- git switch 브랜치명: 해당 branch로 이동한다. (구 버전 git에서는 checkout)
- git merge 브랜치명: 해당 branch를 merge한다.
- git branch -d 브랜치명: branch를 삭제한다.
- git push origin 브랜치명: 해당 branch로 push한다.

  ## 연습
  1. repo 생성
  2. 코드 리뷰를 위한 branch 생성
  3. 파일 만들고 작업하면서 동작 단위마다 commit
  4. 리뷰어 등록 및 리뷰어에게 pull request
  5. 리뷰 주고 받기
  6. approve 받으면 fetch & merge (혹은 pull)

