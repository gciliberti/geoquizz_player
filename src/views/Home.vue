<template>
  <div class="home">
  <h1>GeoQuizz</h1>
    <Scores/>
    <div>

      <div class="container actions">
        <div class="row justify-content-center">
          <div class="col">
            <select class="form-control select" v-model="selected">
              <option value="" selected disabled hidden> Choisissez une série </option>
              <option v-for="serie in this.$store.state.series.series" v-bind:value="serie.id"> 
                {{ serie.ville }}
              </option>
            </select>
          </div>

          <div class="col d-flex">
            <input class="form-control input" v-model="pseudo" type="text" placeholder="pseudo" maxlength="14"> 
            <button class="btn btn-primary" v-on:click="startGame">Jouer</button>
          </div>
        </div>
      </div>
    </div>

<!--
    <span>Sélectionné : {{ selected }}</span><br>
    <span>Pseudo : {{ pseudo }}</span><br>
-->
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
      axios.post('index.php/partie',{pseudo: this.pseudo ,serie: this.selected}).then((response) => {
        this.$store.commit('initGame', response.data)
      })
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

<style scoped>
  .actions div{
    margin: 20px 0;
  }

  .actions{
    width: 50%;
  }

  .select, .input{
    width: inherit;
  }
</style>
