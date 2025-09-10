import PronunciationView from "../views/PronunciationView";
import { playAudio } from "../helpers";

const controlPronunciation = async function (btn) {
  try {
    btn.disabled = true;
    PronunciationView.changeState(btn, true);
    await playAudio(btn.dataset.audioSource);
  } catch {
    console.error("Audio couldn't load.");
  }
  btn.disabled = false;
  PronunciationView.changeState(btn);
};

const init = function () {
  PronunciationView.subscribePronunciationHandler(controlPronunciation);
};

const pronunciationControl = function () {
  init();
};

export default pronunciationControl;
