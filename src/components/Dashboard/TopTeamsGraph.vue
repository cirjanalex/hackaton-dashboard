<template>
  <v-chart ref="echartinstance" class="chart" :option="option" />
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
  name: "TopTeamsGraph",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "light",
  },
  props: {
    msg: String,
    nrOfTeams: Number,
  },
  computed: {
    option() {
      let teams = this.$store.state.teams && [...this.$store.state.teams];
      teams = teams
        ?.sort((team1, team2) =>
          team1.estimatedValue < team2.estimatedValue ? 1 : -1
        )
        .slice(0, this.nrOfTeams);
      var teamNames = teams?.map((a) => {
        return {
          value: a.name,
          textStyle: {
            width: 75,            
            overflow: 'break',                      
          }          
        };
      });
      var seriesData = teams?.map((a) => {
        return a.estimatedValue;
      });
      return {
        title: {
          text: `Top ${this.nrOfTeams}`,
          left: "center",
        },
        xAxis: {
          type: "category",
          data: teamNames,
          axisLabel: {
            interval: '0'
          }
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "",
            type: "bar",
            data: seriesData,
          },
        ],
        grid: {
          left: "16%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: "{c} USDT",
          textStyle: {
            fontWeight: 600,
          },
        },
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.$refs.echartinstance?.resize();
    },
  },
};
</script>

<style scoped>
.chart {
  height: 400px;
  min-width: 300px;
  padding-bottom: 1em;
}
</style>