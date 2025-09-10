import ResultView from "../views/ResultView";
import * as Model from "../model";
import SearchView from "../views/SearchView";

export const resultLoad = async function (_, word = "", popState = false) {
  if (!word) {
    const params = new URLSearchParams(window.location.search);
    word = params.get("word");

    SearchView.updateValue(word);
  }

  if (!word) return ResultView.clear();

  ResultView.renderLoader();
  if (!popState) await Model.getWord(word);
  ResultView.render(Model.state.currentWord);

  const url = new URL(window.location);
  url.searchParams.set("word", word);
  if (!popState)
    window.history.pushState(
      { word: Model.state.currentWord, search: word },
      "",
      url
    );
};

const init = function () {
  ResultView.subscribeResultHandler(resultLoad);
};

export const resultControl = function () {
  init();
};
