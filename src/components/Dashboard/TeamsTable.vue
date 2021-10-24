<template>
  <div class="main">
    <v-sheet color="white" elevation="1" rounded>
      <div class="snapshot-date">{{ snapshotDate }} GMT</div>
      <v-data-table
        v-model="selectedVals"
        :headers="headers"
        :items="teams"
        :items-per-page="10"
        show-expand
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
        <template v-slot:item.estimatedValue="props">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                {{ Number(props.item.estimatedValue).toFixed(2) }} USDT
              </span>
            </template>
            <span>{{ props.item.estimatedValue }}</span>
          </v-tooltip>
        </template>

        <template v-slot:item.USDT="props">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                {{ Number(props.item.USDT).toFixed(2) }}
              </span>
            </template>
            <span>{{ props.item.USDT }}</span>
          </v-tooltip>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td class="td-row" :colspan="headers.length">
            <div class="coin-row">
              <div>BTC</div>
              <div class="amount">{{ item.BTC }}</div>
            </div>
            <div class="coin-row">
              <div>ETH</div>
              <div class="amount">{{ item.ETH }}</div>
            </div>
            <div class="coin-row">
              <div>LTC</div>
              <div class="amount">{{ item.LTC }}</div>
            </div>
            <div class="coin-row">
              <div>BNB</div>
              <div class="amount">{{ item.BNB }}</div>
            </div>
            <div class="coin-row">
              <div>XRP</div>
              <div class="amount">{{ item.XRP }}</div>
            </div>
            <div class="coin-row">
              <div>DOGE</div>
              <div class="amount">{{ item.DOGE }}</div>
            </div>
            <div class="coin-row">
              <div>ADA</div>
              <div class="amount">{{ item.ADA }}</div>
            </div>
            <div class="coin-row">
              <div>MATIC</div>
              <div class="amount">{{ item.MATIC }}</div>
            </div>
            <div class="coin-row">
              <div>EGLD</div>
              <div class="amount">{{ item.EGLD }}</div>
            </div>
            <div class="coin-row">
              <div>NEO</div>
              <div class="amount">{{ item.NEO }}</div>
            </div>
            <div class="coin-row">
              <div>SOL</div>
              <div class="amount">{{ item.SOL }}</div>
            </div>
          </td>
        </template>
      </v-data-table>
    </v-sheet>
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
        { text: "Account Value", value: "estimatedValue" },
        { text: "Available USDT", value: "USDT" },
        { text: "", value: "data-table-expand" },
      ]
    };
  },
  computed: {
    teams() {
      return this.$store.state.teams;
    },
    snapshotDate() {
      return this.$store.state.snapshotDate;
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
  .snapshot-date {
    font-family: monospace;
    display: flex;
    margin: 1rem;
  }
  .v-data-table,
  .v-sheet {
    width: 100%;
  }
  .td-row {
    margin: 3rem;
  }
  .coin-row {
    display: flex;
    div {
      font-weight: 600;
      margin-top: 0.5rem;
      display: flex;
      min-width: 5rem;
      &.amount {
        color: crimson;
        display: flex;
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>