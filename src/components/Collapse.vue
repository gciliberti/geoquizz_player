<template>
    <div class="info">
        <i class="icon fas fa-info-circle" type="button" v-on:click="show"></i>
       
        <div>
            <div class="informations hid card card-body">
                <p>- Le jeu sauvegarde automatiquement quand vous fermez la fenêtre ou ce joue une partie</p>
                <p>- Il faut cliquer sur le boutton de la modale et non en dehors</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Collapase',

    methods:{
        show(){
            $('.informations').toggleClass("hid");
        }
    }
}
</script>

<style>
   .hid{
       opacity: 0;
   }

   .icon{
    display: flex;
    margin-bottom: 10px;
   }

   .informations{
       font-size: .6rem;
       padding: 10px;
   }

   .info{
       max-width: 10%;
       position: absolute;
       top: 1rem;
       left: 2rem;
       z-index: 2;
   }
</style>
