import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {utils} from './wrapper'
import axios from 'axios'
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';
 
Vue.use(Donut);

Vue.config.productionTip = false
Vue.mixin(utils)

window.axios = axios.create({
  baseURL: 'https://apiplayer.tallium.tech/',
});

new Vue({
  //mixins: [wrapper],
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
