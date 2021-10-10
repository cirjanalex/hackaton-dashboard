<template>
  <v-app>
    <v-main>
      <div class="main-wrapper">
        <div class="wrapper">
          <h1>Live Results Dashboard</h1>
          <div class="top-table">
            <div class="top-graph">
              <TopTeamsGraph :nrOfTeams="3" />
            </div>
            <div class="table">
              <TeamsTable />
            </div>
          </div>
          <TeamsProgressChart
            class="graph"
            :title="'Estimated Value'"
            :teamsInfo="selectedTeamsInfo"
            :selectedProperty="'estimatedValue'"
          />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import TeamsTable from "../components/Dashboard/TeamsTable";
import TopTeamsGraph from "../components/Dashboard//TopTeamsGraph";
import TeamsProgressChart from "../components/Dashboard/TeamsProgressChart";

export default {
  name: "Dashboard",

  components: {
    TeamsTable,
    TopTeamsGraph,
    TeamsProgressChart,
  },
  computed: {
    selectedTeamsInfo() {
      return this.$store.getters.selectedTeamsInfo;
    },
  },
};
</script>

<style lang="less" scoped>
.v-application {
  background: whitesmoke;
  .main-wrapper {
    display: flex;
    justify-content: center;

    .top-table {
      display: flex;
      @media (max-width: 1278px) {
        & {
          flex-direction: column;
        }
      }
      .top-graph {
        flex-grow: 1.5;
        order: 3;
        padding-left: 2rem;
        @media (max-width: 1278px) {
          & {
            order: 1;
            padding-left: 0;
          }
        }
      }
      .table {
        flex-grow: 2;
        order: 2;
      }
    }

    .wrapper {
      width: 80%;
    }
    @media (max-width: 700px) {
      .wrapper {
        width: 100%;
      }
    }
    h1 {
      padding-bottom: 1em;
      color: rgb(75, 75, 75);
    }
    .graph {
      padding-top: 3rem;
    }
  }
}
</style>
