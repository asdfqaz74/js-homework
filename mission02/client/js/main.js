/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

const nav = getNode(".nav");
const ul = getNode("ul");
const visualImage = getNode(".visual img");
const nickName = getNode(".nickName");
const bodyColor = getNode("body");
let audioPlayer = new AudioPlayer();

// console.log(nav);

// console.log(data[1]);

function handleClick(e) {
  e.preventDefault();

  let li = e.target.closest("li");
  if (!li) return;

  let index = li.dataset.index;
  // console.log(index);

  const list = Array.from(ul.children);
  // console.log(visualImage);

  list.forEach((li) => li.classList.remove("is-active"));

  li.classList.add("is-active");

  visualImage.src = `./assets/${data[index - 1].src}`;
  visualImage.alt = data[index - 1].alt;
  nickName.textContent = data[index - 1].name;
  setCss(
    bodyColor,
    "background",
    `linear-gradient(to bottom,${data[index - 1].color})`
  );

  // audioPlayer
  audioPlayer.stop();
  audioPlayer = new AudioPlayer(`./assets/audio/${data[index - 1].audio}`);
  audioPlayer.loopPlay();

  // console.log(setCss);
  addClass(li, "is-active");
}

nav.addEventListener("click", handleClick);
