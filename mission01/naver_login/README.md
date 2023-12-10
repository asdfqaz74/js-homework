# 네이버 로그인 페이지 구현

---

로그인과 비밀번호를 정확히 입력했을 때 welcome 페이지로 넘어갈 수 있도록 코드 로직을 작성합니다.


---
- [x] 재사용 가능한 함수를 분리하고 함수를 중심으로 설계하는 방법에 대해 학습합니다.



# 문제점 및 궁금점

1.  window.location.href = 'welcome/html' 을 해도 적용되지않음
>무슨 문제인가 했더니 단순 오타였음 </br>
preventDefault 인데 Default 의 a 와 u 를 바꿔써서 오류가 났음.

2.  IP 보안 에 연결된 html 파일이 없음.
> 내가 직접 html 파일을 만들어서 작성해 줘야함. </br>
작성해서 이미지 파일을 연결해줬음 여기서 궁금점이 생김.</br>
저렇게 작성한 html 은 img가 여러 정보가 한 뭉텅이(?) 로 이뤄져 있는데 alt 에는 무엇을 써야할지 감이 안옴.</br>
span 을 써서 단계마다 sr-only 등을 써야 하는지?</br>
예를 들어, </br>  `<span class='sr-only' >`1단계 사용대상 ... 보안효과 ... `</span>`</br>
`<span class='sr-only' >`2단계 사용대상 ... 보안효과 ... `</span>`</br>
등으로 써야 할지 궁금점이 생김.

3.  코드를 작성하면서 느낀 것인데 중복된 코드가 있다는 것을 느낌
> GPT 에 리팩토링 요청. </br>
코드가 많이 줄어든 것을 봄. </br>
무엇이 달라진지 공부중에 있음.

# 수업 내용 외에 알게된 코드

구글링해서 새로 알게 된 사실. </br>
페이지의 첫 화면 또는 새로고침 할 때 클래스 초기화 또는 숨기기
```js
// window 에 load 이벤트리스너를 부여
  window.addEventListener("load", function () {
    // emailInvalid 와 passWordInput 의 클래스 'is--invalid' 를 제거
    emailInput.classList.remove("is--invalid");
    passWordInput.classList.remove("is--invalid");
  });
}
```
사실 이벤트리스너에서 이벤트 type 을 새로 알게 된 것 뿐이다. </br>
https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener


# 작동 영상
## 아이디 입력

![login_default](https://github.com/asdfqaz74/js-homework/assets/74591618/a7dbce7e-063a-4df4-9d94-73b5be1c48b0)

## 아이디 입력 유효

![id_valid](https://github.com/asdfqaz74/js-homework/assets/74591618/a378a0ee-9cbd-4bd4-850c-7e2104f3dcf1)

## 비밀번호 입력

![pw_invalid](https://github.com/asdfqaz74/js-homework/assets/74591618/f7887481-9d5f-4a28-b428-77c49f090b6f)

## 로그인 성공

![login](https://github.com/asdfqaz74/js-homework/assets/74591618/b96922a4-19ac-4a97-8b13-c75650f83ddd)

## 로그인 실패

![login_fail](https://github.com/asdfqaz74/js-homework/assets/74591618/ad624b6d-b8af-413e-b2ee-07180ff9401e)

</br>

# 내 코드와 리펙토링된 코드의 차이점
일단 제일 큰 차이점은 다음 코드를 보면 알 수 있었다.
```js
function validEmail() {
  emailInput.addEventListener("input", function () {
    let isValidEmail = emailReg(emailInput.value);
    if (emailInput.value === "" || isValidEmail) {
      emailInput.classList.remove("is--invalid");
    }
    else {
      emailInput.classList.add("is--invalid");
    updateIdPw();
  });
  window.addEventListener("load", function () {
    emailInput.classList.remove("is--invalid");
  });
}

function validPassWord() {
  passWordInput.addEventListener("input", function () {
    let isValidPassWord = pwReg(passWordInput.value);
    if (passWordInput.value === "" || isValidPassWord) {
      passWordInput.classList.remove("is--invalid");
    }
    else {
      passWordInput.classList.add("is--invalid");
    }
    updateIdPw();
  });
  window.addEventListener("load", function () {
    passWordInput.classList.remove("is--invalid");
  });
}
```
</br>

```js
function validateInput(input, validationFunction) {
  const isValid = validationFunction(input.value);
  if (input.value === "" || isValid) {
    input.classList.remove("is--invalid");
  } else {
    input.classList.add("is--invalid");
  }
  updateIdPw();
}

function validEmail() {
  emailInput.addEventListener("input", function () {
    validateInput(emailInput, emailReg);
  });

  window.addEventListener("load", function () {
    emailInput.classList.remove("is--invalid");
  });
}

function validPassWord() {
  passWordInput.addEventListener("input", function () {
    validateInput(passWordInput, pwReg);
  });

  window.addEventListener("load", function () {
    passWordInput.classList.remove("is--invalid");
  });
}

```

## 여기서 날 것(내 코딩)과 리펙토링의 차이점
validEmail() / validPassWord() 안의 함수를 나눠줬다.</br>
함수 안에 함수를 또 작성하는 것을 지양하였다.</br>
여기서 내가 왜 함수를 분리시키지 않았던 이유가 무엇이냐면</br>
emailInput 과 passWordInput 을 따로 분리시킬 수 있는 방법이 떠오르지 않았기 때문이다.</br>
여기서만 갈리고 나머지 부분은 똑같았다.</br>
함수를 좀 더 간결하게 쓸 수 있는 연습을 하면 될것같다.

```js
// 이 부분에서 parameter input 을 쓰는방법이 어색했음.
function validateInput(input, validationFunction) {
  const isValid = validationFunction(input.value);
  if (input.value === "" || isValid) {
    input.classList.remove("is--invalid");
  } else {
    input.classList.add("is--invalid");
  }
  updateIdPw();
}
```