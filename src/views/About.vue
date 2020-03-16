<template>
  <div class="about">
    <h1>This is a map page</h1>
    <h1>{{this.$store.state.nbPhotos}}</h1>
    <Map ref="test"/>
    <h3>step : {{this.$store.state.listPhotos[this.i]}}</h3>
    <p>lat : {{this.$store.state.lat}}</p>
    <p>lng : {{this.$store.state.lng}}</p>
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
      //this.$refs.test.resetMarker();
      if(this.i < this.$store.state.nbPhotos - 1){
        this.i++;

        //traitement score

      } else {
        alert("jeu fini")
      }
    }
  }
}
</script>

<style scoped>

</style>
