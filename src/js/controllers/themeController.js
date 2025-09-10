import * as Model from "../model";
import ThemeView from "../views/ThemeView";

const switchThemeControl = function (e) {
  const theme = e.target.checked ? "dark" : "light";
  Model.updateTheme(theme);
  ThemeView.changeTheme(Model.state.theme);
};

const init = function () {
  Model.loadTheme();
  ThemeView.changeTheme(Model.state.theme);
  ThemeView.subscribeThemeHandler(switchThemeControl);
};

const themeControl = function () {
  init();
};

export default themeControl;
