<template>
  <div class="about">
    <h1>GeoQuizz : {{this.$store.state.map.ville}}</h1>
    <p>{{this.$store.state.nb}}/{{this.$store.state.nbPhotos}}</p>

    <div class="container">
      <div class="row">
        <div class="col">
          <Map ref="mapComponent"/>
          <div class="infos card d-flex justify-content-around">
            <p>score : {{this.$store.state.score}}</p>
            <p id="timer" class="">temps : {{this.timer}}</p>
          </div>
        </div>

        <div class="col">
          <img height="300" :src="this.$store.state.listPhotos[this.$store.state.i].url"/>
        </div>
      </div>
    </div>

    <!--
      <div class="progress">
        <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>-->

    <button v-on:click="next" class="btn btn-outline-primary">suivant</button> 
  </div>
</template>

<script>
import Map from '@/components/Map.vue'

export default {
  components: {
    Map,
    
  },

  data() {
    return {
      i: 0,
      nb: 1,
      timer: 0,
      break: false,
      stop: false
    };
  },

  methods:{
    next(){
      let pin = this.$store.state.LatLngPoint;
      if(pin[0] != 0 && pin[1] != 0){
         //traitement score
        this.$refs.mapComponent.calculateScore(this.$store.state.i, this.timer);
        this.break = true;

        //quand suivant, reset map et coordonnées
        this.$refs.mapComponent.resetMarker();
        let coord = [0, 0];
        this.$store.commit('pointed', coord);
        this.$store.commit('incr');

        if(this.$store.state.i == this.$store.state.nbPhotos){
          this.stop = true;
          $( "#modalScore" ).modal();
        }
      }
    },

    runTimer(){
      console.log("chrono")
      if (this.break === true) {
        this.resetTimer();
      } else if (this.stop === true){
        return;
      } else {
      setTimeout(function () { this.incr() }.bind(this), 1000);
      }
    },

    resetTimer(){
       $( "#timer" ).removeClass("red");
      this.timer = 0;
      this.break = false;
      this.runTimer();
    },

    incr(){
      this.timer += 1;
      if(this.timer > 20){
        $( "#timer" ).addClass("red");
      }
      this.runTimer();
    },

    convertRad(angle){
        return (Math.PI * angle)/180;
    }
  },

  mounted(){
    this.runTimer();
  }
}
</script>

<style scoped>
  .infos{
    margin-top: 20px;
    flex-direction: row;
  }

  .infos>p{
    margin-top: 10px;
  }

  button{
    margin-top: 20px;
    width: 200px;
  }

  .red{
    color: red;
  }
</style>
