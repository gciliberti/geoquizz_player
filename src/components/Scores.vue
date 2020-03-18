<template>
  <div class="scoresList">
    <h2>Scores</h2>
    <ul>
    <li v-for="score in scores.scores">
      {{ score.joueur }} :
      {{ score.score }}
    </li>
  </ul>
  </div>
</template>

<script>
export default {
  name: 'Scores',

   data() {
    return {
      scores: {}
    };
  },

  mounted(){
    axios.get('index.php/leaderboard').then((response) => {
      this.scores = response.data;
    })
  }

}
</script>

<style scoped>

</style>
