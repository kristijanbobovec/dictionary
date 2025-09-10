class AppView {
  subscribeAppHandler(handler) {
    window.addEventListener("popstate", handler);
  }
}

export default new AppView();
