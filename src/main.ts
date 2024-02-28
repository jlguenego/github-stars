import "./style.css";

import * as echarts from "echarts";

const chartDom = document.querySelector("div.content");
const myChart = echarts.init(chartDom);
const option = {
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
