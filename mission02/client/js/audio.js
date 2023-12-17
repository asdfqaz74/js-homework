class AudioPlayer {
  #audio = null;

  constructor(source) {
    // if (!isString(source)) {
    //   throwTypeError('source 인자는 오디오 음원 경로(문자 값)이어야 합니다.');
    // }

    this.#audio = document.createElement("audio");

    //this.document.createElement("audio").src = source
    this.#audio.src = source;
  }

  play() {
    // document.createElement("audio").play()
    this.#audio.play();
  }

  loopPlay() {
    this.play();
    // 이 on 이 반복되는 것을 막아주는 것 같은데 왜 오류가 뜨는지 모르겠다. mdn 을 찾아봐도 안나옴 on() 이라는 함수가
    on(this.#audio, "ended", this.play.bind(this));
    this.#audio.addEventListener("ended", this.play.bind(this));
  }

  pause() {
    this.#audio.pause();
  }

  stop() {
    this.pause();
    this.#audio.currentTime = 0;
  }

  isPlaying() {
    return !this.#audio.paused;
  }

  get time() {
    return this.#audio.currentTime;
  }
}

//  AudioPlayer 는 constructor 코드를 본문으로 갖는 함수
// Myclass 에서 정의한 play(), loopPlay(), pause(), stop(), isPlaying(), get time()는
// Myclass.prototype에 쓰임.
