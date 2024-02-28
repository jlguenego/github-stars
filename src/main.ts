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
    title: {
      text: "Repository Github avec stars > x",
    },
    xAxis: {
      type: "category",
      data: data.map(([x, _y]) => x),
    },
    yAxis: {
      type: "log",
    },
    series: [
      {
        name: "Repo Github > x stars",
        data: data.map(([_x, y]) => y),
        type: "line",
        smooth: true,
        areaStyle: {},
        label: {
          show: true,
          position: "top",
        },
      },
    ],
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "cross",
        snap: true,
        label: {
          show: true,
        },
      },
    },
  };

  myChart.setOption(option);
})();
