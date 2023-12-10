/*
1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리
*/

// let & const 모음
const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};
const emailInput = document.querySelector("#userEmail");
const passWordInput = document.querySelector("#userPassword");
const idPw = {};
const buttonClick = document.querySelector("#btn-login");

// 정규 표현식 모음
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
    let isValidEmail = emailReg(emailInput.value);

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
    // IdPw 객체 업데이트
    updateIdPw();
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
    // IdPw 객체 업데이트
    updateIdPw();
  });

  // 구글링해서 새로 알게 된 사실.
  // 페이지의 첫 화면 또는 새로고침 할 때 클래스 초기화 또는 숨기기
  window.addEventListener("load", function () {
    // emailInvalid 와 passWordInput 의 클래스 'is--invalid' 를 제거
    emailInput.classList.remove("is--invalid");
    passWordInput.classList.remove("is--invalid");
  });
}

// input 에 값을 넣으면 실시간으로 객체를 만들어주는 함수 작성
function idPwInput() {
  // 각 input 에 대한 이벤트 등록
  emailInput.addEventListener("input", updateIdPw);
  passWordInput.addEventListener("input", updateIdPw);
}

// idPw 객체를 업데이트 해주는 함수
function updateIdPw() {
  idPw = {
    id: emailInput.value,
    pw: passWordInput.value,
  };
}

/* 
user 의 객체를 사용하는 방법
나는 어떻게 사용할 것인가?
일단 
1.  function updateIdPw() 안에 들어있는 객체 idPw 를 써야겠지? 

2.  idPw 와 user 를 비교하는 함수를 만든다. 

3.  ipPw.id === user.id && idPw.pw === user.pw 이면 
window.location.href = 'welcome.html' 로 이동

4.  그렇지 않으면 이동하지 않음

5.  여기서 이 함수를 어디에 할당해줘야하나?

6.  로그인 버튼에 할당해줘야겠지? class = "btn-login"

7.  그럼 idPwInput() 안에 있는 저 idPw 를 쓰려면 어떻게 해야할까?

8.  idPw 를 전역변수로 선언?
*/

function isMatch() {
  // idPw 의 id & pw 가 user 의 id & pw 가 같다면
  if (idPw.id === user.id && idPw.pw === user.pw) {
    // "welcome.html" 로 이동
    window.location.href = "welcome.html";
  } else {
    // 그렇지 않다면 경고창 띄움
    alert("아이디가 일치하지 않습니다.");
  }
}

// isMatch 함수를 호출하여 로그인 확인
function onButtonClick(e) {
  e.preventDefault();
  isMatch();
}

validEmail();
validPassWord();
idPwInput();

// 버튼 클릭 시 이벤트 리스너 등록
buttonClick.addEventListener("click", onButtonClick);

/* 

현 문제점
1.  idPw.id 가 안나옴 
    >> updateIdPw() 의 위치를 바꿔줌

2.  window.location.href = 'welcome/html' 을 해도 적용되지않음
    >> 무슨 문제인가 했더니 단순 오타였음
    >> preventDefault 인데 Default 의 a 와 u 를 바꿔써서 오류가 났음.

3.  IP 보안 에 연결된 html 파일이 없음.
    >> 내가 직접 html 파일을 만들어서 작성해 줘야함.
    >> 작성해서 이미지 파일을 연결해줬음 여기서 궁금점이 생김
    >> 저렇게 작성한 html 은 img가 여러 정보가 한 뭉텅이(?) 로 이뤄져 있는데 alt 에는 무엇을 써야할지 감이 안옴.
    >> span 을 써서 단계마다 sr-only 등을 써야 하는지?
    >> 예를 들어,   <span class='sr-only' >1단계 사용대상 ... 보안효과 ... </span>
    >>            <span class='sr-only' >2단계 사용대상 ... 보안효과 ... </span>
    >> 등으로 써야 할지 궁금점이 생김.

*/
