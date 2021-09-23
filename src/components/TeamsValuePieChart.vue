<template>
  <div class="main">
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
export default {
  name: "TeamsValuePieChart",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "light",
  },
  props: {
    msg: String,
  },
  computed: {
    option() {
      //var x = this.$store.state.teams.map((a) => a.name)
      var legend = this.$store.state.teams.map((a) => a.name);
      var seriesData = this.$store.state.teams.map((a) => {
        return { name: a.name, value: a.estimatedValue };
      });
      return {
        title: {
          text: "Teams Estimated Value",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : <span style='font-weight:bold'>{c} USDT</span> ({d}%)",
        },
        legend: {
          orient: "horizontal",
          left: "center",
          top: "bottom",
          data: legend,
          formatter: () => ""
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: [50, 110],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.main {
  padding-top: 3em;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
.chart {
  height: 400px;
  width: 400px;
}
</style>