// JavaScript - script.js

const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

const emailInput = document.querySelector("#userEmail");
const passWordInput = document.querySelector("#userPassword");
const buttonClick = document.querySelector("#btn-login");

// 이메일 확인 정규식
function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

// 비밀번호 확인 정규식
function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;

  return re.test(String(text).toLowerCase());
}

// input 란 밑에 경고문구를 띄워줄지 말지 결정하는 함수
function validateInput(input, validationFunction) {
  const isValid = validationFunction(input.value);
  if (input.value === "" || isValid) {
    input.classList.remove("is--invalid");
  } else {
    input.classList.add("is--invalid");
  }
  updateIdPw();
}

// 이메일 확인 함수
function validEmail() {
  emailInput.addEventListener("input", function () {
    validateInput(emailInput, emailReg);
  });

  window.addEventListener("load", function () {
    emailInput.classList.remove("is--invalid");
  });
}

// 비밀번호 확인 함수
function validPassWord() {
  passWordInput.addEventListener("input", function () {
    validateInput(passWordInput, pwReg);
  });

  window.addEventListener("load", function () {
    passWordInput.classList.remove("is--invalid");
  });
}

// 아이디 비밀번호 각각의 input 업데이트 함수
function idPwInput() {
  emailInput.addEventListener("input", updateIdPw);
  passWordInput.addEventListener("input", updateIdPw);
}

// input에 update 된 값을 idPw 에 할당해주는 함수
function updateIdPw() {
  idPw = {
    id: emailInput.value,
    pw: passWordInput.value,
  };
}

// 주어진 정보 user 와 내가 입력하는 idPw 와 일치하는지 검사하는 함수
function isMatch() {
  if (idPw.id === user.id && idPw.pw === user.pw) {
    window.location.href = "./../welcome.html";
  } else {
    alert("사용자 정보가 일치하지 않습니다.");
    passWordInput.value = "";
  }
}

// onButtonClick 에 대한 함수
function onButtonClick(e) {
  e.preventDefault();
  isMatch();
}

validEmail();
validPassWord();
idPwInput();
buttonClick.addEventListener("click", onButtonClick);
