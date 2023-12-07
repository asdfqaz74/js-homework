const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

// let 모음
let emailInput = document.querySelector("#userEmail");
let passWordInput = document.querySelector("#userPassword");
/*

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/

function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

// 시작

function validEmail() {
  // emailInput 에 이메일 input 을 할당

  // input 에 EventListener 추가
  emailInput.addEventListener("input", function () {
    // emailReg 를 통한 input 값을 유효성 검사
    // isValid 에 true 또는 false 값 할당
    const isValidEmail = emailReg(emailInput.value);

    // 만약 emailinput.value 가 공백 또는 isValid 가 true 일 때
    if (emailInput.value == "" || isValidEmail) {
      // emailInvalid 의 클래스 'is-invalid' 를 제거
      emailInput.classList.remove("is--invalid");
    }
    // isValid 가 false 이면
    else {
      // is--invalid 를 추가
      emailInput.classList.add("is--invalid");
    }
  });
}

function validPassWord() {
  // passWordInput 에 패스워드 input 을 할당

  // input 에 EventListener 추가
  passWordInput.addEventListener("input", function () {
    // pwReg 를 통한 input 값을 유효성 검사
    // isValid 에 true 또는 false 값 할당
    let isValidPassWord = pwReg(passWordInput.value);

    // 만약 passWordInput.value 가 공백 또는 isValid 가 true 일 때
    if (passWordInput.value == "" || isValidPassWord) {
      // passWordInvalid 의 클래스 'is-invalid' 를 제거
      passWordInput.classList.remove("is--invalid");
    }
    // isValid 가 false 이면
    else {
      // is--invalid 를 추가
      passWordInput.classList.add("is--invalid");
    }
  });
}

// input 에 값을 넣으면 실시간으로 객체를 만들어주는 함수 작성
function isMatch() {
  emailInput.addEventListener("input", updateTest);
  passWordInput.addEventListener("input", updateTest);

  let test = {
    id: emailInput.value,
    pw: passWordInput.value,
  };
  function updateTest() {
    test = {
      id: emailInput.value,
      pw: passWordInput.value,
    };
    console.log(test);
  }
}

validEmail();
validPassWord();
isMatch();
