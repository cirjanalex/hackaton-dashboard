<template>
  <div class="main">
    <v-data-table
      v-model="selectedVals"
      :headers="headers"
      :items="teams"
      :items-per-page="15"
      :sort-by="['estimatedValue']"
      :sort-desc="[true]"
      :loading="loading"
      class="elevation-1"
      show-select
      loading-text="Loading... Please wait"
      v-on:item-selected="itemSelected"
      v-on:toggle-select-all="selectedAll"
    >
      <template v-slot:item.name="props">
        <a v-on:click="onClick(props.item.id)">{{ props.item.name }}</a>
      </template>
    </v-data-table>
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
          value: "name",
        },
        { text: "Orders Count", value: "ordersCount" },
        { text: "Estimated Value - USDT", value: "estimatedValue" },
        { text: "BTC", value: "BTC" },
        { text: "ETH", value: "ETH" },
        { text: "LTC", value: "LTC" },
        { text: "BNB", value: "BNB" },
        { text: "XRP", value: "XRP" },
        { text: "TRX", value: "TRX" },
      ],
    };
  },
  computed: {
    teams() {
      return this.$store.state.teams;
    },
    loading() {
      return this.$store.state.teams === undefined;
    },
    selectedVals: {
      get() {
        return this.$store.state.teams;
      },
      set() {},
    },
  },
  methods: {
    itemSelected({ item, value }) {
      this.$store.dispatch("selectTeams", {
        teamIds: [item.id],
        selected: value,
      });
    },
    selectedAll({ items, value }) {
      this.$store.dispatch("selectTeams", {
        teamIds: items.map((item) => item.id),
        selected: value,
      });
    },
    onClick(teamId) {
      this.$router.push({ path: `/teamview/${teamId}` });
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .v-data-table {
    width: 100%;
  }
}
</style>