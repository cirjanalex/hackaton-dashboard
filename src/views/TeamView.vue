<template>
  <v-app>
    <v-main>
      <div class="main">
        <h1>{{ teamName }} Dashboard</h1>
        <span
          ><h3>Estimated Value - {{ estimatedValue }} USDT</h3></span
        >
        <span
          ><h3>Orders Count - {{ ordersCount }}</h3></span
        >
        <v-data-table
          :headers="headers"
          :items="orders"
          :items-per-page="10"
          :sort-by="['date']"
          :sort-desc="[false]"
          :loading="isLoading"
          class="elevation-1"
          loading-text="Loading... Please wait"
        ></v-data-table>
        
        <TeamsProgressChart
          :title="'Estimated Value'"
          :teamsInfo="selectedTeamsInfo"
          :selectedProperty="'estimatedValue'"
        />        
      </div>
    </v-main>
  </v-app>
</template>

<script>
//import TeamsTable from "../components/Dashboard/TeamsTable";
//import TeamsValuePieChart from "./components/TeamsValuePieChart";
import TeamsProgressChart from "../components/Dashboard/TeamsProgressChart";

export default {
  name: "TeamView",
  props: {
    teamId: String,
  },
  components: {
    //TeamsTable,
    //TeamsValuePieChart,
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
      return this.$store.state.orders.find(
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
    team() {
      return this.$store.state.teams?.find((team) => team.id === this.teamId);
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
    // TODO have a specific store path for the team dashboard,
    // that way we don't redraw the f graph multiple times
    selectedTeamsInfo() {      
      return this.$store.state.teamsInfo.filter(ti => ti.id === this.teamId);
    },
  },

  async created() {
    // fetch team info
    await this.$store.dispatch("fetchOrders", this.teamId);
  },
};
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
.v-data-table {
  width: 80%;
}
</style>
