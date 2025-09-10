class PronunciationView {
  _parentEl = document.querySelector(".main");

  subscribePronunciationHandler(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".header-main__button");

      if (!btn || btn.disabled) return;

      handler(btn);
    });
  }

  changeState(btn, isPlaying = false) {
    const svg = btn.querySelector("use");
    let src;

    if (isPlaying) {
      src = svg.dataset.srcPlaying;
    } else {
      src = svg.dataset.srcEnded;
    }

    svg.setAttribute("href", src);
  }
}

export default new PronunciationView();
