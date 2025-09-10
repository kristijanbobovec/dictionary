class LinkView {
  _parentEl = document.querySelector(".main");

  subscribeLinkHandler(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const link = e.target.closest(".synonyms__link");

      if (!link) return;
      e.preventDefault();

      handler(link.dataset.word);
    });
  }
}

export default new LinkView();
