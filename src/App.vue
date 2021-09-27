<template>
  <v-app>
    <v-main>
      <div class="main-wrapper">
        <h1>Title placeholder</h1>
        <TeamsTable />
        <!--  <TeamsValuePieChart /> -->
        <TeamsProgressChart :teamsInfo="selectedTeamsInfo" :selectedProperty="'estimatedValue'"/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import TeamsTable from "./components/TeamsTable";
//import TeamsValuePieChart from "./components/TeamsValuePieChart";
import TeamsProgressChart from "./components/TeamsProgressChart";

export default {
  name: "App",

  components: {
    TeamsTable,
    //TeamsValuePieChart,
    TeamsProgressChart,
  },
  computed: {
    selectedTeamsInfo() {
      return this.$store.getters.selectedTeamsInfo;
    }
  },
  data: () => ({
    //
  }),
  async created() {
    
    await this.$store.dispatch("fetchTeams");
    await this.$store.dispatch("fetchTeamDetails","d2379fd");    
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
h1 {
  padding: 2em;
  color: rgb(75, 75, 75);
}
</style>
