import SearchView from "../views/SearchView";
import { resultLoad } from "./resultController";

const controlSubmit = function () {
  const valueRaw = SearchView.getQuery();
  const value = valueRaw.toLowerCase().trim();

  if (!value) {
    SearchView.render(true);
    return;
  }

  SearchView.render();
  resultLoad("", value);
};

const init = function () {
  SearchView.subscribeSubmitHandler(controlSubmit);
};

const searchControl = function () {
  init();
};

export default searchControl;
