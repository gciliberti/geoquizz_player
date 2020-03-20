import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from "vuex-persist";

const vp = new VuexPersist({
    key: 'store',
    storage: window.localStorage
});

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vp.plugin],
  state: {
    i: 0,
    nb: 1,
    score: 0,
    distanceMaxPoint: 1000, 
    listPhotos: [],
    nbPhotos: 0,
    LatLngPoint: {},
    series: [],
    token: "",
    partieId: null,
    map: {}
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

    initGame(state, data){
      console.log(data);
      state.nbPhotos = data.nb_photos;
      state.token = data.token;
      state.partieId = data.id;
      data.photos.forEach(element => 
        state.listPhotos.push(element)
      );
      state.map = data.map[0];
    },

    resetGame(state){
      state.score = 0;
      state.listPhotos = [];
      state.nbPhotos = 0,
      state.LatLngPoint = {};
      state.token = "";
      state.partieId = null;
      state.map= {};
      state. i = 0;
      state.nb = 1;
    },

    incr(state){
      state.i++;
      state.nb++;
    }
  },
  actions: {
  },
  modules: {
  }
})
