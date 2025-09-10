class SearchView {
  _parentEl = document.querySelector(".header__form");
  _searchBar = this._parentEl.querySelector(".search-bar");
  _input = this._parentEl.querySelector(".search-bar__input");
  _errorMsg = this._parentEl.querySelector(".search-bar__error");

  subscribeSubmitHandler(handler) {
    this._parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }

  updateValue(newQuery) {
    this._input.value = newQuery;
  }

  render(error = false) {
    if (error) {
      this._searchBar.classList.add("search-bar--error");
      this._errorMsg.classList.add("search-bar__error--active");
      return;
    }
    this._searchBar.classList.remove("search-bar--error");
    this._errorMsg.classList.remove("search-bar__error--active");
  }

  getQuery() {
    return this._input.value;
  }
}

export default new SearchView();
