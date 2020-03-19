<template>
    <div class="modal fade" id="modalResume" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Une partie est en cours, souhaitez vous la reprendre ?</h5>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="resetGame">Fermer</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="resumeGame">Reprendre</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'Modal',


  methods:{
      resetGame(){
        this.$store.commit('resetGame')
      },

      resumeGame(){
        this.$router.push('Game')
      }
  }
}
</script>
