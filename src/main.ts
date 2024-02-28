import { EChartsOption } from "echarts";
import "./style.css";

import * as echarts from "echarts";

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

const option: EChartsOption = {
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [
        [1, 140],
        [2, 45],
        [3, 12],
      ],
      type: "line",
    },
  ],
};

myChart.setOption(option);
