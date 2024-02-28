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
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};

myChart.setOption(option);
