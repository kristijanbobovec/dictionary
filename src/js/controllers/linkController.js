import LinkView from "../views/LinkView";
import { resultLoad } from "./resultController";
import SearchView from "../views/SearchView";
import * as Model from "../model";

const synonymControl = function (word) {
  Model.updateCurrentSearch(word);
  SearchView.updateValue(Model.state.search);
  resultLoad("", word);
};

const init = function () {
  LinkView.subscribeLinkHandler(synonymControl);
};

const linkControl = function () {
  init();
};

export default linkControl;
