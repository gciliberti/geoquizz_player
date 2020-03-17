import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import {wrapper} from './wrapper'
import axios from 'axios'

Vue.config.productionTip = false
//Vue.mixin(wrapper)
//wrapper.methods.test()

window.axios = axios.create({
  baseURL: 'http://134.122.67.129/player/api/',
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
