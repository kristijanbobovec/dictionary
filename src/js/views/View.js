export class View {
  _data;

  render(data) {
    // Check if there is data
    if (typeof this._renderError === "function" && typeof data !== "object")
      return this._renderError();

    // Set data
    this._data = data;

    // Generate markup
    const markup = this._generateMarkup();

    // Render markup
    this.clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    this._parentEl.innerHTML = "";
  }
}
