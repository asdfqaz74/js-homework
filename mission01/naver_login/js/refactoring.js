// JavaScript - script.js

const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

const emailInput = document.querySelector("#userEmail");
const passWordInput = document.querySelector("#userPassword");
const buttonClick = document.querySelector("#btn-login");

function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

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
}

function validPassWord() {
  passWordInput.addEventListener("input", function () {
    validateInput(passWordInput, pwReg);
  });

  window.addEventListener("load", function () {
    emailInput.classList.remove("is--invalid");
    passWordInput.classList.remove("is--invalid");
  });
}

function idPwInput() {
  emailInput.addEventListener("input", updateIdPw);
  passWordInput.addEventListener("input", updateIdPw);
}

function updateIdPw() {
  idPw = {
    id: emailInput.value,
    pw: passWordInput.value,
  };
}

function isMatch() {
  if (idPw.id === user.id && idPw.pw === user.pw) {
    window.location.href = "./../welcome.html";
  } else {
    alert("아이디가 일치하지 않습니다.");
  }
}

function onButtonClick(e) {
  e.preventDefault();
  isMatch();
}

validEmail();
validPassWord();
idPwInput();
buttonClick.addEventListener("click", onButtonClick);
