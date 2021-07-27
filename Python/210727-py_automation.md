# 파이썬 업무자동화

### 클래스란?

변수와 함수의 집합, 즉 변수와 함수를 가진 나만의 자료형

### 클래스 만들기

```python
class className:
	def __init__(self):
		self.변수명 = 변수값

	def function1(self, 파라미터 변수명, ...):
		실행할 코드
	def function2(self, 파라미터 변수명, ...):
		실행할 코드

```

`__init__` 함수

- 생성자 함수
- 클래스 변수가 생성될 때 자동으로 호출되는 함수
- 클래스 변수 안에 변수를 생성할 때 사용

`self`

- 클래스의 변수, 함수에 접근하기 위해 필요한 변수
- 반드시 써줘야 한다.

### 모듈

클래스, 함수, 변수의 집합 → 모듈, 라이브러리, 패키지 등

**다른 파일의 코드 사용**

`from 파일 경로 import 변수, 함수 혹은 클래스명`

### `__name__` 내장변수 활용

- 파이썬에는 기본적으로 여러 내장변수, 내장함수가 있다.
- 그 중, `__name__`은 해당 클래스를 어디에서 실행했는지 나타낸다. (모듈의 이름)
- 아래 예제에서 import 했을 때와 실행했을 때 차이를 확인할 수 있다.

```python
class Sky():
  data = 1000

  def print_data(self):
    print(self.data)

print(__name__) # __main__
```

```python
from test import Sky

a = Sky() # test
a.print_data() # 1000
```

`__name__`은 내장 변수 혹은 글로벌 변수다. 이는 우리가 만든 변수가 아니라 파이썬에서 정한 원래부터 존재하는 변수다. 이 변수에는 test2.py의 실행결과에서 알 수 있듯 그 모듈의 이름이 들어가게 된다. 하지만 그 파일 안에서 해당 함수를 실행시키면 `__name__`안에는 `__main__`이라는 값이 되도록 정해져 있다.

## 파일 다루기

### 파일 입출력

⚠️ 파일 읽기 오류

`UnicodeDecodeError: 'cp949' codec can't decode byte 0xec in position 0: illegal multibyte sequence`

→ 해결 `open()` 함수에 `encoding='UTF-8'`을 파라미터로 추가

```python
datafile = open('data.txt', 'r', encoding='UTF-8')
data = datafile.read()
# 파일 통째로 읽기
print(data)

# 한 줄씩 읽기
line = 'init'
while line:
    line = datafile.readline().strip()
    print(line)

# 쓰기
user_input = input('Input: ') # 유저의 입력을 받고,
datafile = open('textfile.txt', 'w') # 쓰기 모드로 파일을 연다.
# 추가 모드는 open('textfile.txt', 'a') (append)
datafile.write(user_input+'\n') # 앞에서 받았던 입력을 파일에 쓴다.
datafile.close()
```

### csv 파일

- comma-separated values의 약자
- 쉼표와 개행 문자로 구분된 파일
- 엑셀과 유사한 형태로 읽고 쓸 수 있다.
- 쉼표로 컬럼을 구분하고 개행 문자로 행을 구분한다.

**읽기**

```python
datafile = open('data.csv', 'r')

for line in datafile.readlines():
    data = line.strip().split(',') # strip()은 공백 제거
    print(data[0])
    print(data[1])
    print(data[2])
    print('-' * 10)

# 출력 결과
data1-1
data1-2
data1-3
----------
data2-1
data2-2
data2-3
----------
data3-1
data3-2
data3-3
----------

# data.csv
data1-1,data1-2,data1-3
data2-1,data2-2,data2-3
data3-1,data3-2,data3-3
```

**쓰기**

```python
values = []
values.append(('abc', '1234'))
values.append(('sky', 'good'))
values.append(('1234', '5678'))

datafile = open('result.csv', 'w')

for line in values:
    data = ','.join(line)
    datafile.write(data+'\n')
datafile.close()

# result.csv
abc,1234
sky,good
1234,5678
```

### 패키치 설치 도구

**패키지란**

- 특정 기능을 여러 클래스로 구성해놓은 코드 집합
- 파이썬이 기본적으로 가진 패키지도 많이 있다. (기본 패키지)
- 대부분의 패키지는 문서가 있다. (레퍼런스 문서)

pypi에서 관리되고 있다. ([https://pypi.org/](https://pypi.org/))

`pip` 키워드 이용

e.g.,

`pip install openpyxl` # 설치, 엑셀을 다루는 패키지 중 하나, 레퍼런스([https://openpyxl.readthedocs.io/en/stable/](https://openpyxl.readthedocs.io/en/stable/))

`pip install --upgrade openpyxl` # 최신 버전으로 업그레이드

### 엑셀 읽기

- ⚠️ import 관련오류(`could not be resolved from source pylance report missing module source`)

**읽기**

```python
from openpyxl import load_workbook

wb = load_workbook('simple_data.xlsx')
data = wb.active # 활성화된 셀만

# 셀 하나씩 출력
print(data['A1'].value)
print(data['A2'].value)
print(data['B1'].value)
print(data['B2'].value)

# 2행 출력
row = data['2']
for cell in row:
    print(cell.value)

print('-'*20)

# A열 출력
col = data['A']
for cell in col:
    print(cell.value)

data = wb['sheet_test']

# 특정 영역 출력
area = data['A1:B2'] # a1 ~ b2
for row in area:
    for cell in row:
        print(cell.value)

print('-'*20)

cols = data['A:B']
for col in cols:
    for cell in col:
        print(cell.value)

print('-'*20)

rows = data['1:2']
for row in rows:
    for cell in row:
        print(cell.value)
```

**쓰기**

```python
from openpyxl import Workbook

wb = Workbook()
ws = wb.create_sheet('sheet_test2') # 새로운 시트 생성

ws['A1'] = 'sky'
ws['B1'] = 'test'

wb.save('result.xlsx')

ws = wb.create_sheet('sheet_test3')

ws.append(['Number', 'Name']) # 컬럼 순서대로 추가

for i in range(10):
    ws.append([i, str(i) + ' data'])

wb.save('result2.xlsx')
```

### 큰 엑셀 파일

- `load_workbook`의 문제점

  - 모든 엑셀의 내용을 파이썬으로 한 번에 가져온다.
    - 엑셀 파일이 매우 큰 경우 못 가져오는 경우 발생
    - 한 번에 가져오는 과정이 매우 느리다.

  → 모든 내용을 한 번에 가져오지 않는 방법이 필요하다.

  ```python
  from openpyxl import load_workbook

  # 읽기 전용으로 불러온다. (read_only = True)
  # 읽기 전용으로 불러오면 내용을 전부 가져오지 않는다. 접근할 때만 가져온다.
  wb = load_workbook('test_data.xlsx', read_only=True)
  data = wb.active

  # 꼭 한 행씩만 처리할 수 있다. 열 단위로는 못한다. (행 단위로 연결된 자료임)
  for row in data.iter_rows(max_col=1, max_row=2): # 행과 열을 제한하여 필요한 것만 불러온다.
      for cell in row:
          print(cell.value)
  ```

  ## 이메일

  ### 동작 원리

  - 필요한 설정 정보

    - **SMTP 서버 주소: 메일 보내는 서버 주소**
    - POP 서버 주소: 메일 받는 서버 주소
    - **SMTP 서버 포트: SMTP 주소로 갈 때 쓸 길 번호**
    - POP 서버 포트: POP 주소로 갈 때 쓸 길 번호
    - **계정 정보: 아이디, 비밀번호**

    지메일이라면 보안 수준이 낮은 앱의 액세스를 허용해 주어야 한다.

    ```python
    # 파이썬 기본 패키지
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart
    import smtplib
    import re

    SMTP_SERVER = 'smtp.naver.com' # 지메일은 'smtp.gmail.com'
    SMTP_PORT = 465
    SMTP_USER = '보내는 메일'
    SMTP_PASSWORD = '비밀번호'

    # 메일을 보내는 함수
    # 이름, (받는 사람의) 주소, 제목, 내용, 첨부파일을 순서대로 파라미터로 받는다.
    def send_mail(name, addr, subject, contents, attachment=None): # 첨부파일 기본값은 없는 거로
        # 정규표현식으로 이메일 주소 유효성 검사
        if not re.match('(^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)', addr):
            print('Wrong email')
            return

        msg = MIMEMultipart('alternative') # 텍스트 내용을 담은 메일을 보낼 거란 의미

        # 첨부파일이 있으면 메일 내용이 텍스트 이외에 다른 것들도 있다는 뜻
        if attachment:
            msg = MIMEMultipart('mixed')

        msg['From'] = SMTP_USER
        msg['To'] = addr
        msg['Subject'] = name + '님, ' + subject
        # msg['Contents'] = '내용'
        # 내용은 이렇게 단순히 넣을 수 없다. 이메일 내용엔 단순 텍스트말고도 여러 가지가 들어갈 수 있으니까

        text = MIMEText(contents, _charset='utf-8') # 알맞은 형식의 클래스로 바꿔준다.
        msg.attach(text) # 내용 파트는 여러 가지 내용을 붙여나가는 방식. 그래서 attach.

        # 첨부파일이 있으면 첨부에 필요한 패키지를 불러온다.
        if attachment:
            from email.mime.base import MIMEBase
            from email import encoders

            # 파일 내용
            file_data = MIMEBase('application', 'octect-stream') # 내가 넣고자 하는 파일의 타입을 정의, 여기선 일반 파일을 넣는 MineBase 클래스
            file_data.set_payload(open(attachment, 'rb').read()) # rb는 read-binary, 컴퓨터가 이해하는 형태로 읽기 모드
            encoders.encode_base64(file_data) # 알맞게 변환

            # 파일 이름
            import os
            filename = os.path.basename(attachment)
            file_data.add_header('Content-Disposition', 'attachment; filename="'+filename+'"')
            msg.attach(file_data)

        # 서버 접속 및 로그인
        smtp = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT)
        smtp.login(SMTP_USER, SMTP_PASSWORD)
        smtp.sendmail(SMTP_USER, addr, msg.as_string())
        smtp.close() # 로그아웃

    contents = '''안녕하세요.

    자동화로 보내지는 메일입니다. '''

    send_mail('받는 사람 이름', '받는 메일', '자동화 메일입니다.', contents, 'test.txt')
    ```
