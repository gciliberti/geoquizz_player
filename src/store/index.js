import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    score: 0,
    listPhotos: ["photo1", "photo2", "photo3"],
    nbPhotos: 3,
    lat: 0,
    lng: 0
  },
  mutations: {
    pointed(state, coord) {
      state.lat = coord[0];
      state.lng = coord[1];
    }
  },
  actions: {
  },
  modules: {
  }
})
