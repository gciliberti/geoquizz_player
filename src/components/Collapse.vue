<template>
    <div>
        <i class="icon fas fa-info-circle" type="button" v-on:click="show"></i>
       
        <div>
            <div class="informations hid card card-body">
                <p>• Le jeu sauvegarde automatiquement quand vous fermez la fenêtre où se joue une partie</p>
                <p>• Aucun point n'est marqué après 20 secondes</p>
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
    margin-left: 20px;
    cursor: pointer;
   }

   .informations{
       font-size: .6rem;
       padding: 10px;
       text-align: left;
   }

</style>
