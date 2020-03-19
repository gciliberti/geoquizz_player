<template>
  <div class="home">
    <Collapse/>
    <h1>GeoQuizz</h1>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 col-12">
        <Scores/>
      </div>
    </div>
  
    <div class="row justify-content-center">
      <div class="col-md-4 col-12">
        <select class="form-control select" v-model="selected">
          <option value="" selected disabled hidden> Choisissez une série </option>
          <option v-for="serie in this.$store.state.series.series" v-bind:value="serie.id"> 
            {{ serie.ville }}
          </option>
        </select>
      </div>

      <div style="margin-bottom: 30px;" class="col-md-4 col-12 d-flex">
        <input class="form-control input col-8" v-model="pseudo" type="text" placeholder="pseudo" maxlength="14"> 
        <button class="btn btn-primary col-4" v-on:click="startGame">Jouer</button>
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
import Collapse from '@/components/Collapse.vue'

export default {
  name: 'Home',
  components: {
    Scores,
    Collapse
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
  .select, .input, button{
    width: inherit;
    margin-top: 30px;
  }
</style>
