# tsc 명령어 not found

## 발단

타입스크립트를 배워보려는데 시작부터 막혀버렸다. 컴파일 명령어인 `tsc`가 작동하지 않는 것이다. (`tsc: command not found`**)** 사실 `yarn tsc`는 작동하기 때문에 이대로 진행해도 상관은 없지만 어쨌거나 돼야할 게 안되는 상황을 그저 넘기는 것이 좋은 습관은 아닌 거 같아 원인을 파악하고 해결해보고자 한다.

## 원인 탐색

내가 세운 가설은, `yarn tsc`가 작동하는데 그냥 `tsc`가 작동하지 않는다면 그건 ‘경로를 찾지 못하는 것이 아닐까’ 였다. (타입스크립트는 글로벌로 설치해두었고, `package.json`에 `"scripts": { "prestart": "tsc" }` 도 추가해놓았다.)

[https://stackoverflow.com/questions/39404922/tsc-command-not-found-in-compiling-typescript](https://stackoverflow.com/questions/39404922/tsc-command-not-found-in-compiling-typescript)

npm을 이용했다는 걸 제외하면 같은 문제를 겪고 있는 질문을 발견했고 다음과 같은 답변을 찾을 수 있었다.

> If it still doesn't work run `npm config get prefix` to see where npm install -g is putting files (append `bin` to the output) and make sure that they are in the path (the node js setup does this. Maybe you forgot to tick that option).

아마도 가설이 맞는 것 같다.

터미널에 `yarn config get prefix`를 입력하니 `undefined`가 출력된다.

세팅해주었다. (`yarn config set prefix ~/.yarn-global`)

[Yarn global command not working](https://stackoverflow.com/questions/40317578/yarn-global-command-not-working)

이후 .bash 파일에서 경로를 설정해줘야 하는데 `find`로 해당 파일을 찾는데 도무지 끝날 생각을 않는다. 그래서 그만뒀다. 다소 찜찜하긴 하지만 당장 할 것이 많으니 일단 미뤄두게 되었다. 어쨌든 느낌은 알았으니 다음에 필요에 의해 해결할 수 있을 거 같은 느낌이다.
