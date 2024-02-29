import { EChartsOption } from "echarts";
import "./style.scss";

import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  TitleComponent,
  TooltipComponent,
]);

import { getData } from "./github";

(async () => {
  const data = await getData();
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
    title: {
      text: "Repository Github with more than x stars",
      subtext: "Made by Jean-Louis GUENEGO, source and explanation from Github",
      sublink: "https://github.com/jlguenego/github-stars",
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
          formatter: (d): string => {
            if (d.data === undefined || d.data === null) {
              return "";
            }
            return d.data.toLocaleString();
          },
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
