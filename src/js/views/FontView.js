class FontView {
  _root = document.querySelector("html");
  _toggleButton = document.querySelector(".dropdown__button");
  _menu = document.querySelector(".dropdown__menu");
  _options = document.querySelectorAll(".dropdown__menu-item");
  _optionsArray = Array.from(this._options);
  _activeOption;

  init() {
    this._subscribeOpenMenuHandler();
    this._subscribeMenuCloseHandler();
  }

  subscribeSelectOptionHandler(handler) {
    this._menu.addEventListener("click", (e) => {
      const option = e.target.closest(
        ".dropdown__menu-item:not(.dropdown__menu-item--active)"
      );

      if (!option) return;

      this.selectOption(option);
      handler(option.dataset.value);
    });

    this._menu.addEventListener("keydown", (e) => {
      const focusedEl = document.activeElement;
      const index = this._optionsArray.indexOf(focusedEl);

      switch (e.code) {
        case "ArrowUp":
          e.preventDefault();
          this._optionsArray[
            (index - 1 + this._optionsArray.length) % this._optionsArray.length
          ].focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          this._optionsArray[(index + 1) % this._optionsArray.length].focus();
          break;
        case "Space":
          e.preventDefault();
          this.selectOption(focusedEl);
          handler(focusedEl.dataset.value);
          break;
      }
    });
  }

  getOption(value) {
    return document.querySelector(`[data-value='${value}']`);
  }

  selectOption(option) {
    const value = option.dataset.value;
    const valueFormatted = value[0].toUpperCase() + value.slice(1);
    const markup = `
        ${valueFormatted}
        <span class="dropdown__icon" aria-hidden="true"><svg><use href="#icon-arrow-down" /></svg></span>
      `;

    if (this._menuOpened()) this._toggleMenu();

    this._toggleButton.innerHTML = markup;

    this._resetAll();

    option.classList.add("dropdown__menu-item--active");
    this._activeOption = option;
    this._root.dataset.font = value;
  }

  _resetAll() {
    this._options.forEach((option) => {
      option.classList.remove("dropdown__menu-item--active");
    });
  }

  _subscribeOpenMenuHandler() {
    this._toggleButton.addEventListener("click", this._toggleMenu.bind(this));
  }

  _subscribeMenuCloseHandler() {
    document.addEventListener("keydown", (e) => {
      if (!this._menuOpened()) return;
      if (e.code === "Escape") this._toggleMenu();
      if (e.code === "Tab") {
        const focusEl = document.activeElement;
        if (focusEl !== this._toggleButton) this._toggleMenu();
      }
    });

    document.addEventListener("pointerdown", (e) => {
      if (!this._menuOpened()) return;

      const btn = e.target.closest(".dropdown__button");
      const menu = e.target.closest(".dropdown__menu");

      if (!btn && !menu) this._toggleMenu();
    });
  }

  _menuOpened() {
    return this._menu.classList.contains("dropdown__menu--active");
  }

  _toggleMenu() {
    this._menu.classList.toggle("dropdown__menu--active");

    if (this._menuOpened()) {
      this._activeOption.focus();
    }

    const ariaExpanded = this._toggleButton.getAttribute("aria-expanded");
    this._toggleButton.setAttribute(
      "aria-expanded",
      ariaExpanded === "true" ? "false" : "true"
    );
  }
}

export default new FontView();
