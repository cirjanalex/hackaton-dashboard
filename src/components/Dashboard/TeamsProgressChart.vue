<template>
  <div class="main">
    <v-chart ref="echartinstance" class="chart" :option="option" />
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
    title: String
  },
  computed: {
    option() {
      this.$refs.echartinstance?.clear();
      var seriesList = this.teamsInfo.map((teamInfo) => {
        return {
          type: "line",
          showSymbol: false,
          name: teamInfo.name,
          endLabel: {
            show: true,
            formatter: "{a}",
          },
          labelLayout: {
            moveOverlap: "shiftY",
          },
          emphasis: {
            focus: "series",
          },
          data: teamInfo.data.map((teamInfoSnapshot) => {
            return [
              teamInfoSnapshot.id,
              teamInfoSnapshot[this.selectedProperty],
            ];
          }),
        };
      });

      return {
        type: "line",
        title: {
          text: this.title,
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
        series: seriesList,
      };
    },
  },
};
</script>

<style lang="less" scoped>
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
}
</style>