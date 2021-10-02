<template>
  <v-app>
    <v-main>
      <div class="main-wrapper">
        <h1>Live Results Dashboard</h1>
        <TeamsTable />
        <!--  <TeamsValuePieChart /> -->
        <TeamsProgressChart :title="'Estimated Value'" :teamsInfo="selectedTeamsInfo" :selectedProperty="'estimatedValue'"/>
        <TeamsProgressChart :title="'Number of orders'" :teamsInfo="selectedTeamsInfo" :selectedProperty="'ordersCount'"/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import TeamsTable from "../components/Dashboard/TeamsTable";
//import TeamsValuePieChart from "./components/TeamsValuePieChart";
import TeamsProgressChart from "../components/Dashboard/TeamsProgressChart";

export default {
  name: "Dashboard",

  components: {
    TeamsTable,
    //TeamsValuePieChart,
    TeamsProgressChart,
  },
  computed: {
    selectedTeamsInfo() {
      return this.$store.getters.selectedTeamsInfo;
    }
  }
};
</script>

<style scoped>
.v-application {
  background: whitesmoke;
}
.main-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
}
h1 {
  padding: 2em;
  color: rgb(75, 75, 75);
}
</style>
