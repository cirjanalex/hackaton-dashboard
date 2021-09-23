<template>
  <div class="main">    
    <v-data-table
      :headers="headers"
      :items="teams"
      :items-per-page="10"
      :sort-by="['estimatedValue']"
      :sort-desc="[true]"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: "TeamsTable",
  props: {
    msg: String,
  },
  data() {
    return {
      headers: [
        {
          text: "Team Name",
          align: "start",
          //sortable: false,
          value: "name",
        },
        { text: "Transactions", value: "transactions" },
        { text: "Estimated Value - USDT", value: "estimatedValue" },
        { text: "BTC", value: "BTC" },
        { text: "ETH", value: "ETH" },
        { text: "LTC", value: "LTC" },
        { text: "BNB", value: "BNB" },
        { text: "XRP", value: "XRP" },
        { text: "TRX", value: "TRX" },
      ],
    }
  },
  computed: {
    teams() {
      return this.$store.state.teams;
    },
  },
  created() {
    this.$store.dispatch("fetchTeams");
  },
};
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  width:100%;
}
.v-data-table {
  width: 80%;
}
h1 {
  padding: 2em;
  color: rgb(75, 75, 75);
}
</style>