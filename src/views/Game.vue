<template>
  <div class="game">
    <div class="row">
      <div style="padding: 0;" class="col-md-10 col-sm-9">
        <Map ref="mapComponent"/>
      </div>

      <div style="padding: 0;" class="aside col-md-2 col-sm-3 d-flex justify-content-between">
        <div class="title">
          <h1>GeoQuizz {{this.$store.state.map.ville}}</h1>
          <p>{{this.$store.state.nb}}/{{this.$store.state.nbPhotos}}</p>
        </div>

        <div class="infos">
          <p>score : {{this.$store.state.score}}</p>
          <p id="timer" class="">temps : {{this.timer}}</p>
        </div>
        <canvas id="doughnutChart"></canvas>


        <button v-on:click="next" class="btn btn-primary">suivant</button> 

      </div>
    </div>

    <div class="image">
      <img height="200" :src="this.$store.state.listPhotos[this.$store.state.i].url"/>
    </div>

    <!--
      <div class="progress">
        <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>-->
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
        //this.$refs.mapComponent.createControls();
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
    document.documentElement.style.overflow = 'hidden'
    this.runTimer();

    //doughnut
var ctxD = document.getElementById("doughnutChart").getContext('2d');
var myLineChart = new Chart(ctxD, {
type: 'doughnut',
data: {
labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
datasets: [{
data: [300, 50, 100, 40, 120],
backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
}]
},
options: {
responsive: true
}
});
  }
}
</script>

<style scoped>
  .aside{
    flex-direction: column;
  }

  .infos{
    padding: 10px;
  }

  .title{
    text-align: center;
  }

  .title h1{
    font-size: 2em;
  }
  button{
    margin-top: 20px;
    width: 100%;
  }

  .red{
    color: red;
  }

  img{
    transform-origin: bottom left;
    border-radius: 10px;
     position: relative;
    top: -210px;
    left: 10px;
    z-index: 999;
    cursor: pointer;
    transition-duration: .3s;
  }

  img:hover{
    height: 400px;
    transform: translateY(-200px);
  }
</style>
