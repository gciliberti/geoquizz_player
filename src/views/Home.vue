<template>
  <div class="home">
  <h1>GeoQuizz</h1>
    <Scores/>

    <div>
      <input type="text" id="name" name="name" placeholder="pseudo" maxlength="14"> 
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

  methods:{
    startGame(){
      this.$router.push('Game')
    }
  }
}
</script>
