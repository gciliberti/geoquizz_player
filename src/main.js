import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {wrapper} from './wrapper'

Vue.config.productionTip = false
Vue.mixin(wrapper)
wrapper.methods.connect()

new Vue({
  mixins: [wrapper],
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
