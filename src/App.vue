<template>
  <div id="app">
    <div id="nav">
      
      <router-link to="/">        
      <img class="logo" src="/stefanini-logo.png">  
      </router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .v-application--wrap {
    min-height: 0;
  }
}

#nav {
  padding: 30px;
  display: flex;
  flex-direction:column;
  .logo {
    max-width: 200px;
  }
  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
