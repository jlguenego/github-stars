import { querySelector } from "./utils";

export class Loader {
  static finalize() {
    console.log("init");
    const init = querySelector("div.init");
    console.log("init: ", init);
    init.style.display = "none";
  }

  static init() {
    console.log("init");
    const init = querySelector("div.init");
    console.log("init: ", init);
    init.style.display = "flex";
    Loader.progress(0);
    console.log("progress set to 0");
  }

  static progress(rate: number) {
    const progressBar = querySelector("div.progress");
    progressBar.style.width = `${rate * 100}%`;
  }
}
