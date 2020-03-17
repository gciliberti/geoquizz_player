<template>
  <div class="about">
    <h1>This is a map page</h1>
    <h1>{{this.$store.state.nbPhotos}}</h1>
    <Map ref="mapComponent"/>
    <h3>step : {{this.$store.state.listPhotos[this.i]}}</h3>
    <p>score : {{this.$store.state.score}}</p>
    <button v-on:click="next">suivant</button> 
  </div>
</template>

<script>
import Map from '@/components/Map.vue'

export default {
  components: {
    Map
  },

  data() {
    return {
      i: 0
    };
  },

  methods:{
    next(){
      let pin = this.$store.state.LatLngPoint;
      if(pin[0] != 0 && pin[1] != 0){
         //traitement score
        this.$refs.mapComponent.calculateScore();

        //quand suivant, reset map et coordonnées
        this.$refs.mapComponent.resetMarker();
        let coord = [0, 0];
        this.$store.commit('pointed', coord);
        this.i++;

        if(this.i == this.$store.state.nbPhotos){
          alert("ton score" + this.$store.state.score);
          this.$store.commit('resetScore');
          this.$router.push('/')
        }
      }
    },

    convertRad(angle){
        return (Math.PI * angle)/180;
    }
  }
}
</script>

<style scoped>

</style>
