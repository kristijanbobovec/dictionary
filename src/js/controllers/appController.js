import * as Model from "../model";
import AppView from "../views/AppView";
import SearchView from "../views/SearchView";
import fontControl from "./fontController";
import linkControl from "./linkController";
import pronunciationControl from "./pronunciationController";
import { resultControl, resultLoad } from "./resultController";
import searchControl from "./searchController";
import themeControl from "./themeController";

const controlPopstate = function (e) {
  const newWord = e.state?.word;
  const newSearch = e.state?.search;
  Model.updateCurrentWord(newWord);
  Model.updateCurrentSearch(newSearch);
  SearchView.updateValue(Model.state.search);
  resultLoad("", "", true);
};

export const init = function () {
  AppView.subscribeAppHandler(controlPopstate);
  searchControl();
  resultControl();
  pronunciationControl();
  linkControl();
  themeControl();
  fontControl();
};
