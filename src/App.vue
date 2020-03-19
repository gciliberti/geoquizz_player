<template>
  <div id="app">
    <Modal/>
    <ModalScore/>
    <router-view/>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import ModalScore from '@/components/ModalScore.vue'

export default {
  components: {
    Modal,
    ModalScore
  },

  mounted(){
    if(this.$store.state.token){
      $( "#modalResume" ).modal();
    }
    
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
