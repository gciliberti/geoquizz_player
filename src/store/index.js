import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    score: 0,
    distanceMaxPoint: 500, 
    listPhotos: [],
    nbPhotos: 0,
    LatLngPoint: {},
    series: [],
    token: "",
    partieId: null
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
    },

    initGame(state, data){
      console.log(data)
      state.nbPhotos = data.nb_photos;
      state.token = data.token;
      state.partieId = data.id;
      data.photos.forEach(element => 
        state.listPhotos.push(element)
      );
      console.log(state.listPhotos)
    }
  },
  actions: {
  },
  modules: {
  }
})
