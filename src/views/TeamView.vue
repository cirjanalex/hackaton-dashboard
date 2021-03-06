<template>
  <v-app>
    <v-main>
      <div class="main-wrapper">
        <div class="wrapper">
          <h1>{{ teamName }} <span> Dashboard </span></h1>

          <h3>
            <div class="label">Estimated Value</div>
            <div class="value">
              <span>{{ Number(estimatedValue).toFixed(2) }} </span> USDT
            </div>
          </h3>
          <h3>
            <div class="label">Orders Count</div>
            <div class="value">
              <span>{{ ordersCount }} </span> Orders
            </div>
          </h3>
          <h3>
            <div class="label">Volume</div>
            <div class="value">
              <span>{{ Number(volume).toFixed(2) }} </span> USDT
            </div>
          </h3>
          <h3>
            <div class="label">Tax</div>
            <div class="value">
              <span>{{ Number(tax).toFixed(2) }} </span> USDT
            </div>
          </h3>
          <h2>Orders</h2>
          <div class="table">
            <v-data-table
              :headers="headers"
              :items="orders"
              :items-per-page="10"
              :sort-by="['date']"
              :sort-desc="[true]"
              :loading="isLoading"
              class="elevation-1"
              loading-text="Loading... Please wait"
            ></v-data-table>
          </div>
          <div class="chart">
            <TeamsProgressChart
              :title="'Estimated Value'"
              :teamsInfo="teamInfo"
              :selectedProperty="'estimatedValue'"
            />
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import TeamsProgressChart from "../components/Dashboard/TeamsProgressChart";

export default {
  name: "TeamView",
  props: {
    teamId: String,
  },
  components: {
    TeamsProgressChart,
  },
  data() {
    return {
      headers: [
        { text: "Date", value: "date" },
        { text: "Symbol", value: "symbol" },
        { text: "Side", value: "side" },
        { text: "Quantity", value: "quantity" },
        { text: "Price", value: "price" },
      ],
    };
  },
  computed: {
    orders() {
      return this.$store.state.orders?.find(
        (teamOrders) => teamOrders.teamId === this.teamId
      )?.orders;
    },
    isLoading() {
      return (
        this.$store.state.orders.find(
          (teamOrders) => teamOrders.teamId === this.teamId
        ) === undefined
      );
    },
    teamInfo() {
      return this.$store.state.teamsInfo.filter((t) => t.id === this.teamId);
    },
    team() {
      return this.$store.state.currentTeam;
    },
    teamName() {
      return this.team?.name;
    },
    ordersCount() {
      return this.team?.ordersCount;
    },
    estimatedValue() {
      return this.team?.estimatedValue;
    },
    volume() {
      if (this.orders?.length === 1) {
        const firstOrder = this.orders[0];
        return firstOrder.side === "BUY"
          ? firstOrder.quantity
          : firstOrder.quantity * firstOrder.price;
      }

      const volume = this.orders?.reduce((previous, current) => {
        let previousUsdt = 0;
        let currentUsdt = 0;
        if (previous.side === undefined) previousUsdt = previous;
        else {
          if (previous.side === "BUY") previousUsdt = previous.quantity;
          else previousUsdt = previous.quantity * previous.price;
        }
        if (current.side === "BUY") currentUsdt = current.quantity;
        else currentUsdt = current.quantity * current.price;
        console.log(previousUsdt + currentUsdt);
        return previousUsdt + currentUsdt;
      });
      return volume;
    },
    tax() {
      return this.volume * 0.001;
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  async created() {
    var currentTeam = this.$store.dispatch("fetchCurrentTeam", this.teamId);
    await this.$store.dispatch("fetchOrders", this.teamId);
    await currentTeam;
    await this.$store.dispatch("fetchTeamDetails", this.teamId);
  },
};
</script>

<style lang="less" scoped>
.main-wrapper {
  h1 {
    color: crimson;
    span {
      color: #2c3e50;
    }
    margin-bottom: 3rem;
  }
  h2 {
    margin-top: 2rem;
    color: #2c3e50;
    display: flex;
    margin-left: 1rem;
  }
  h3 {
    margin-left: 0.5rem;
    color: #2c3e50;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    div {
      min-width: 180px;
      display: flex;
      justify-content: space-between;
      &.value span {
        color: crimson;
      }
      &.label {
        min-width: 150px;
      }
    }
    @media (max-width: 700px) {
      justify-content: space-between;
      margin-right: 1rem;
    }
  }
  display: flex;
  justify-content: center;
  .wrapper {
    width: 80%;
  }
  @media (max-width: 700px) {
    .wrapper {
      width: 100%;
    }
  }
  .chart {
    margin-top: 2rem;
  }
  .table {
    margin-top: 1rem;
  }
}
</style>
