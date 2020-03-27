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
          <p><strong>score :</strong> {{this.$store.state.score}}</p>
          <p v-if="this.timer <= 20" id="timer" class=""><strong>temps :</strong> {{this.timer}}</p>
          <p v-else id="timer">temps écoulé<p/>
          <p>{{this.$store.state.listPhotos[this.$store.state.i].desc}}</p>
        </div>

        <Donut ref="diag" :timer="timer"></Donut>


        <button v-on:click="next" class="btn btn-primary">suivant</button> 

      </div>
    </div>

    <div class="image">
      <img id="img" height="200" @load="loaded" :src="this.$store.state.listPhotos[this.$store.state.i].url" />
    </div>

    <!--
      <div class="progress">
        <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>-->
  </div>
</template>

<script>
import Map from '@/components/Map.vue'
import Donut from '@/components/Donut.vue'


export default {
  components: {
    Map,
    Donut  
  },

  data() {
    return {
      i: 0,
      nb: 1,
      timer: 20,
      break: false,
      stop: false
    };
  },

  methods:{
    next(){
      let pin = this.$store.state.LatLngPoint;
      console.log(this.$store.state.LatLngPoint);
      if(pin[0] && pin[1]){
         //traitement score
         console.log("score")
        this.$refs.mapComponent.calculateScore(this.$store.state.i, this.timer);
      } else {
        this.$store.commit('incrementScore', 0);
      }
       
        this.break = true;

        //quand suivant, reset map et coordonnées
        this.$refs.mapComponent.resetMarker();

        this.$refs.diag.reset();

        //this.$refs.mapComponent.createControls();
        this.$store.commit('resetPointed');
        this.$store.commit('incr');

        if(this.$store.state.i == this.$store.state.nbPhotos){
          this.stop = true;
          $( "#modalScore" ).modal();
        }
      //}
    },

    runTimer(){
      if (this.break === true) {
        this.resetTimer();
      } else if (this.stop === true){
        return;
      } else {
        console.log("time")
      setTimeout(function () { this.incr() }.bind(this), 1000);
      }
    },

    resetTimer(){
      $( "#timer" ).removeClass("red");
      this.timer = 20;
      this.break = false;
    },

    incr(){
      this.timer -= 1;
      if(this.timer <= 0){
        this.next();       
      } else if (this.timer == 5){
        $( "#timer" ).addClass("red");
      }
      this.runTimer();
    },

//run timer quand image chargé

    loaded(){
      this.runTimer();
    },

    convertRad(angle){
        return (Math.PI * angle)/180;
    }
  },

  mounted(){
    document.documentElement.style.overflow = 'hidden'
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
