class ThemeView {
  _parentEl = document.querySelector("html");
  _preferThemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
  _themeBtn = document.getElementById("theme");
  _themeChangeAutoBinded = this._themeChangeAuto.bind(this);

  subscribeThemeHandler(handler) {
    this._themeBtn.addEventListener("click", handler);
  }

  changeTheme(theme = "") {
    if (theme) {
      this._preferThemeMedia.removeEventListener(
        "change",
        this._themeChangeAutoBinded
      );
      this._parentEl.dataset.theme = theme;

      this._themeBtn.checked = theme === "dark" ? true : false;

      return;
    }

    this._themeChangeAuto(this._preferThemeMedia);
    this._preferThemeMedia.addEventListener(
      "change",
      this._themeChangeAutoBinded
    );
  }

  _themeChangeAuto(e) {
    if (e.matches) {
      this._parentEl.dataset.theme = "dark";
      this._themeBtn.checked = true;
      return;
    }
    this._parentEl.dataset.theme = "light";
    this._themeBtn.checked = false;
  }
}

export default new ThemeView();
