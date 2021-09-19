<template>
    <div v-for='team in teams' :key='team.id'>
    {{team.id}} {{team.name}} {{team.estimatedValue}}
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    teams() {
      return this.$store.state.teams;
    }
  },
  created() {
    this.$store.dispatch('fetchTeams');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
