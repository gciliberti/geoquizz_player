<template>
  <div class="home">
  <h1>GeoQuizz</h1>
    <Scores/>
    <div>

    <select v-model="selected">
      <option value="" selected disabled hidden>-- Choisissez une série --</option>
      <option v-for="serie in this.$store.state.series.series" v-bind:value="serie.id"> 
        {{ serie.ville }}
      </option>
    </select>

    <span>Sélectionné : {{ selected }}</span><br>
    <span>Pseudo : {{ pseudo }}</span><br>

      <input v-model="pseudo" type="text" placeholder="pseudo" maxlength="14"> 
      <button v-on:click="startGame">Jouer</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Scores from '@/components/Scores.vue'

export default {
  name: 'Home',
  components: {
    Scores
  },

    data() {
      return {
        selected: "",
        pseudo: ""
      };
    },


  methods:{
    startGame(){
      if(this.selected && this.pseudo){
      this.$router.push('Game')
      }
    }
  },

  mounted(){
    axios.get('index.php/series').then((response) => {
      this.$store.commit('getSeries', response.data)
    })
  }
}
</script>
