import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import "echarts";

//import axios from 'axios'
//axios.defaults.baseURL = 'http://localhost:8081';



Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
