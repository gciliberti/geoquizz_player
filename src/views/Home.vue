<template>
  <div class="home">
    <div class="infos">
      <i class="icon fas fa-redo-alt" type="button" v-on:click="forceRerender"></i>
      <Collapse/>        
    </div>
    <h1>GeoQuizz</h1>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 col-12">
        <Scores v-if="renderComponent" ref="scoresComponent"/>
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
        pseudo: "",
        renderComponent: true
      };
    },


  methods:{
    startGame(){
      if(this.selected && this.pseudo){
         axios.post('partie',{pseudo: this.pseudo ,serie: this.selected}).then((response) => {
            this.$store.commit('initGame', response.data)
        })
        //this.postGame(this.pseudo, this.selected);
        this.$router.push('Game')
      }
    },

    forceRerender() {
        this.renderComponent = false;
        this.$nextTick().then(() => {
        this.renderComponent = true;
      });
    }
  },

  mounted(){
    setTimeout(() => {
           this.forceRerender();
       }, 300);

    this.$refs.scoresComponent.loadScore();
    axios.get('series').then((response) => {
            this.$store.commit('getSeries', response.data)
        })
    document.documentElement.style.overflow = 'initial'
  }
}
</script>

<style scoped>
    h1{
    text-align: center;
    }

.icon{
  cursor: pointer;
}
 .infos{
   display: flex;
       max-width: 20%;
       position: absolute;
       top: 1rem;
       left: 1rem;
       z-index: 2;
   }

  .select, .input, button{
    width: inherit;
    margin-top: 30px;
  }
</style>
