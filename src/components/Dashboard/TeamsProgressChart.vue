<template>
  <div class="team-progress-chart">
    <v-list dense>
      <v-subheader>Graph Categories</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
        :mandatory="true"
      >
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
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
  },
  data: () => ({
    selectedItem: 0,
    items: [
      {
        id: "estimatedValue",
        text: "Estimated Value - USDT",
        icon: "mdi-currency-usd",
      },
      { id: "ordersCount", text: "Order Count", icon: "mdi-bank-transfer" },
    ],
  }),
  computed: {
    selectedProperty() {
      return this.items[this.selectedItem].id;
    },
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
            fontWeight: 600,
            fontSize: 14,
            align: "left",
            lineHeight: 22,
          },
          labelLayout: {
            moveOverlap: "shiftY",
          },
          emphasis: {
            focus: "series",
          },
          animationEasing: "quinticOut",
          data: teamInfo.data.map((teamInfoSnapshot) => {
            return [
              teamInfoSnapshot.date,
              teamInfoSnapshot[this.selectedProperty],
            ];
          }),
        };
      });

      return {
        type: "line",
        tooltip: {
          order: "valueDesc",
          trigger: "axis",
        },
        yAxis: {
          type: "value",
        },
        xAxis: {
          axisLabel: {
            formatter: "{MMM}-{dd}",
          },
          type: "time",
          name: "Time",
        },
        series: seriesList,
        grid: {
          right: "18%",
          left: "13%",
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

<style lang="less" scoped>
.team-progress-chart {
  display: flex;
  width: 100%;
  @media (max-width: 700px) {
    flex-direction: column;
  }
  .chart {
    height: 400px;
  }
}
</style>