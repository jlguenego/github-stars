import "./style.scss";

import { getData, removeCache } from "./github";
import { makeDiagram, removeDiagram } from "./diagram";
import { querySelector } from "./utils";

(async () => {
  const data = await getData();
  makeDiagram(data);
  const btn = querySelector("button.refresh");
  btn.addEventListener("click", async () => {
    removeCache();
    removeDiagram();
    const data = await getData();
    makeDiagram(data);
  });
})();
