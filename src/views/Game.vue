<template>
  <div class="about">
    <h1>This is a map page</h1>
    <p>{{this.nb}}/{{this.$store.state.nbPhotos}}</p>

    <div class="main">
      <Map ref="mapComponent"/>
      <img width="300" :src="this.$store.state.listPhotos[this.i].url"/>
    </div>

    <div class="infos">
      <p>score : {{this.$store.state.score}}</p>
      <p>timer : {{this.timer}}</p>
    </div>

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
      i: 0,
      nb: 1,
      timer: 0,
      break: false
    };
  },

  methods:{
    next(){
      let pin = this.$store.state.LatLngPoint;
      if(pin[0] != 0 && pin[1] != 0){
         //traitement score
        this.$refs.mapComponent.calculateScore(this.i, this.timer);
        this.break = true;

        //quand suivant, reset map et coordonnées
        this.$refs.mapComponent.resetMarker();
        let coord = [0, 0];
        this.$store.commit('pointed', coord);
        this.i++;
        this.nb++;

        if(this.i == this.$store.state.nbPhotos){
          this.endGame();
        }
      }
    },

    runTimer(){
      if (this.break === true) {
        this.resetTimer();
      } else {
      setTimeout(function () { this.incr() }.bind(this), 1000);
      }
    },

    resetTimer(){
      this.timer = 0;
      this.break = false;
      this.runTimer();
    },

    incr(){
      this.timer += 1;
      this.runTimer();
    },

    endGame(){
      alert("ton score" + this.$store.state.score);
      this.$router.push('/');
      axios.patch('index.php/partie/' + this.$store.state.token, 
      {id: this.$store.state.partieId ,score: this.$store.state.score})
      .then((response) => {
        console.log(response)
      })
      this.$store.commit('resetScore');
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
  .main{
    display: flex;
    justify-content: space-around;
  }
</style>
