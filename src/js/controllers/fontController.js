import * as Model from "../model";
import FontView from "../views/FontView";

const fontSwitchControl = function (value) {
  Model.updateFont(value);
};

const init = function () {
  Model.loadFont();
  FontView.init();
  if (Model.state.font)
    FontView.selectOption(FontView.getOption(Model.state.font));
};

const fontControl = function () {
  FontView.subscribeSelectOptionHandler(fontSwitchControl);
  init();
};

export default fontControl;
