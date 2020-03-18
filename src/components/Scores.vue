<template>
  <div class="scoresList container">
    <h3>Scores</h3>
    <ul class="list-group">
    <li v-for="score in scores.scores" class="list-group-item d-flex justify-content-between">
      <span>{{ score.joueur }}</span>
      <span class="badge badge-pill score"><i  style="margin-right:10px;" class="fas fa-trophy"></i>{{ score.score }}</span>
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

<style  scoped>
  .scoresList{
    font-size: .8em;
    width: 50%;
  }

  li:first-child>.score{
    color: gold;
  }

  li:nth-child(2)>.score{
    color: silver;
  }

  li:nth-child(3)>.score{
    color: peru;
  }
</style>
