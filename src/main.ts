import { EChartsOption } from "echarts";
import "./style.css";

import * as echarts from "echarts";
import { getData } from "./github";

(async () => {
  const chartDom = document.querySelector<HTMLElement>("div.content");
  if (chartDom === null) {
    throw new Error("Cannot find div.content");
  }
  const myChart = echarts.init(chartDom, undefined, {
    renderer: "svg",
  });

  window.addEventListener("resize", function () {
    myChart.resize();
  });

  const data = await getData();
  console.log("data: ", data);

  const option: EChartsOption = {
    xAxis: {
      type: "log",
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: data,
        type: "line",
      },
    ],
  };

  myChart.setOption(option);
})();
