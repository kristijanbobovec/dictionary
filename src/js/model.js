import { getJSON } from "./helpers";
import { API_URL } from "./config";

export const state = {
  search: "",
  currentWord: undefined,
  font: "sansserif",
  theme: "",
};

export const getWord = async function (word) {
  try {
    const data = await getJSON(API_URL + word);
    state.currentWord = data[0];
    console.log(state.currentWord);
  } catch (err) {
    state.currentWord = undefined;
    console.log(err.message);
  }
};

export const updateCurrentWord = function (newWord) {
  state.currentWord = newWord;
};

export const updateCurrentSearch = function (newSearch) {
  state.search = newSearch;
};

export const updateTheme = function (newTheme) {
  state.theme = newTheme;
  localStorage.setItem("theme", newTheme);
};

export const loadTheme = function () {
  const theme = localStorage.getItem("theme");
  state.theme = theme ? theme : "";
};

export const updateFont = function (newFont) {
  state.font = newFont;
  localStorage.setItem("font", newFont);
};

export const loadFont = function () {
  const font = localStorage.getItem("font");
  state.font = font ? font : "";
};
