const nav = getNode(".nav");
const ul = getNode("ul");
const visualImage = getNode(".visual img");
const nickName = getNode(".nickName");
const bodyColor = getNode("body");
let audioPlayer = new AudioPlayer("./assets/audio");

function handleClick(e) {
  e.preventDefault();

  const li = e.target.closest("li");
  if (!li) return;

  const index = li.dataset.index;

  const list = Array.from(ul.children);

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

  audioPlayer.stop();
  audioPlayer = new AudioPlayer(`./assets/audio/${data[index - 1].audio}`);
  audioPlayer.loopPlay();

  addClass(li, "is-active");
}

nav.addEventListener("click", handleClick);
