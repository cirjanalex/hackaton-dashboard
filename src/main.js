import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import "echarts";
import router from './router'

//import axios from 'axios'
//axios.defaults.baseURL = 'http://localhost:8081';



Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
