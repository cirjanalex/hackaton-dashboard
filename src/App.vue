<template>
  <v-app>
    <v-main>
      <TeamsTable />
    </v-main>
  </v-app>
</template>

<script>
import TeamsTable from "./components/TeamsTable";

export default {
  name: "App",

  components: {
    TeamsTable,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.v-application {
  background: whitesmoke;
}
</style>
