import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {utils} from './wrapper'
import axios from 'axios'

Vue.config.productionTip = false
Vue.mixin(utils)

window.axios = axios.create({
  baseURL: 'http://134.122.67.129/player/api/',
});

new Vue({
  //mixins: [wrapper],
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
