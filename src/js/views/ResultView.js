import { View } from "./View";

class ResultView extends View {
  _parentEl = document.querySelector(".main");
  _errorMsg = `Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.`;

  subscribeResultHandler(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return `
        ${this._generateHeader()}
        ${this._generateSections()}
        ${this._generateFooter()}
    `;
  }

  _generateHeader() {
    return `
    <header class="header-main">
    <div class="header-main__details">
        <h1 class="text-preset-1">${this._data.word}</h1>
        ${
          this._data.phonetic
            ? `<p class="text-preset-2 u-clr-accent">${this._data.phonetic}</p>`
            : ""
        }
    </div>
    ${
      this._data?.phonetics.find((phonetic) => phonetic.audio !== "")?.audio
        ? `
          <button
          type="button"
          class="header-main__button"
          aria-label="Play pronunciation"
          data-audio-source="${this._generateAudioSource()}"
          >
            <svg aria-hidden="true"><use href="#icon-play" data-src-playing="#icon-playing" data-src-ended="#icon-play" /></svg>
          </button>
        `
        : ""
    }
    </header>
    `;
  }

  _generateSections() {
    return this._data.meanings
      .map(
        (meaning) => `
        <section class="section">
        <header class="section__header">
            <h2 class="section__heading text-preset-2 text-preset-2--bold">${
              meaning.partOfSpeech
            }</h2>
        </header>

        <div class="section__content">
            ${
              meaning.definitions.length > 0
                ? `
                    <div class="meaning">
                        <h3 class="text-preset-3 u-clr-secondary">Meaning</h3>
                        <ul class="meaning__list">
                            ${this._generateMeaningItems(meaning.definitions)}
                        </ul>
                    </div>
                `
                : ``
            }

            ${
              meaning.synonyms.length > 0
                ? `
                <div class="synonyms">
                <h3 class="text-preset-3 u-clr-secondary">Synonyms</h3>
                    <ul class="synonyms__list">
                        ${this._generateSynonyms(meaning.synonyms)}
                    </ul>
                </div>
                `
                : ``
            }
        </div>
        </section>
    `
      )
      .join("");
  }

  _generateFooter() {
    return `
        <footer class="footer-main">
          <p class="u-clr-secondary">Source${
            this._data.sourceUrls.length > 1 ? "s" : ""
          }</p>
          ${this._generateUrls(this._data.sourceUrls)}
        </footer>
    `;
  }

  _generateUrls(urls) {
    return urls
      .map(
        (url) => `
        <a
        href="${url}"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-main__link">
        ${url}
        </a>    
    `
      )
      .join("");
  }

  _generateSynonyms(synonyms) {
    return synonyms
      .map(
        (synonym) => `
        <li class="synonyms__item">
            <a href="#" data-word="${synonym}" class="synonyms__link u-clr-accent u-fw-bold"
                >${synonym}</a
            >
        </li>
        `
      )
      .join("");
  }

  _generateMeaningItems(definitions) {
    return definitions
      .map(
        (definition) => `
        <li class="meaning__item">
          <p class="meaning__header">
            ${definition.definition}
          </p>
            ${
              definition.example
                ? `
                <p class="meaning__example u-clr-secondary">
                    “${this._formatExample(definition.example)}”
                </p>    
                `
                : ``
            }
        </li>
    `
      )
      .join("");
  }

  _formatExample(example) {
    return example
      .split(".")
      .map((sentence) => sentence.trim())
      .join(". ");
  }

  renderLoader() {
    this.clear();

    const markup = `
    <section class="loader">
        <p class="text-preset-3 text-preset-3--bold">Loading content...</p>
    </section>
    `;
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _renderError() {
    this.clear();

    const markup = `
    <section class="error">
    <p class="error__emoji">😕</p>
    <p class="text-preset-3 text-preset-3--bold">No Definitions Found</p>
    <p class="u-clr-secondary">
        ${this._errorMsg}
    </p>
    </section>
    `;
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _generateAudioSource() {
    return this._data.phonetics.find((phonetic) => phonetic.audio !== "").audio;
  }
}

export default new ResultView();
