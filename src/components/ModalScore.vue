<template>
    <div class="modal fade" id="modalScore" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <div class="modal-header d-flex flex-column align-items-center">
            <span style="font-size: 2em;" class="badge badge-pill score"><i style="margin-right:10px;" class="fas fa-trophy"></i>{{this.$store.state.score}}</span>
            <p style="margin: 1rem;">GeoQuizz : {{this.$store.state.ville}} terminé</p>
        </div>
        
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="endGame">Fermer</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'ModalScore',

  methods:{
      endGame(){
      axios.patch('partie/' + this.$store.state.token, 
      {id: this.$store.state.partieId ,score: this.$store.state.score})
      .then((response) => {
        console.log(response)
      })
      this.$router.push('/');
      this.$store.commit('resetGame');
    },
  }
}
</script>
