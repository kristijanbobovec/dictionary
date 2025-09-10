import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise((_, reject) =>
    setTimeout(
      () =>
        reject(
          new Error(`Response timeout after ${s} seconds. Try again later.`)
        ),
      s * 1000
    )
  );
};

export const getJSON = async function (url) {
  const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

  if (!response.ok) throw new Error("Failed to fetch.");

  const data = await response.json();

  return data;
};

export const playAudio = function (url) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);

    audio.addEventListener("ended", resolve);
    audio.addEventListener("error", reject);

    audio.play();
  });
};
