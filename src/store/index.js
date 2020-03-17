import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    score: 0,
    distanceMaxPoint: 500, 
    listPhotos: ["photo1", "photo2", "photo3"],
    nbPhotos: 3,
    LatLngPoint: {},
    series: []
  },
  mutations: {
    pointed(state, coord) {
      state.LatLngPoint = coord;
    },

    getSeries(state, data){
      state.series = data;
    },

    incrementScore(state, points){
      state.score += points;
    },

    resetScore(state){
      state.score = 0;
    }
  },
  actions: {
  },
  modules: {
  }
})
