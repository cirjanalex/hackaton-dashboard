<template>
  <v-app>
    <v-main>
      <div class="main-wrapper">
        <h1>Crypto Hackathon 2021</h1>
        <TeamsTable />
        <TeamsValuePieChart />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import TeamsTable from "./components/TeamsTable";
import TeamsValuePieChart from "./components/TeamsValuePieChart";

export default {
  name: "App",

  components: {
    TeamsTable,
    TeamsValuePieChart,
  },

  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch("fetchTeams");
  },
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
</style>
