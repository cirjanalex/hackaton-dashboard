<template>
  <div class="main">
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
export default {
  name: "TeamsProgressChart",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "light",
  },
  props: {
    teamsInfo: Array,
    selectedProperty: String,
  },
  computed: {
    option() {
      var seriesData = this.teamsInfo[0]?.data?.map((teamInfo) => {
        return [teamInfo.id, teamInfo[this.selectedProperty]];
      });
      return {
        title: {
          text: "Progress Chart",
          left: "center",
        },
        tooltip: {
          order: "valueDesc",
          trigger: "axis",
        },
        yAxis: {
          type: "value",
          name: this.selectedProperty,
        },
        xAxis: {
          axisLabel: {
            formatter: "{MMM}-{dd}",
          },
          type: "time",
          name: "Time",
        },
        series: [
          {
            name: "Team 1",
            type: "line",
            data: seriesData            
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
  width: 80%;
  padding-bottom: 2em;
}
</style>