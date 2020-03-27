<template>
    <div>
          <vc-donut
            background="white" foreground="lightgrey"
            :size="100" unit="px" :thickness="30"
            :sections="sections" :total="100"
            :start-angle="0" :auto-adjust-text-size="true">
            <h1>x{{this.multiplier}}</h1>
        </vc-donut>
    </div>
</template>

<script>
export default {
    name: 'Donut',
    props: ['timer'],

    data() {
        return {
            sections: [{ value: 100, color: 'orange' }],
            multiplier: 4
        };
    },

     computed: {
            check() {
                return this.timer
            }
        },

        watch: {
            check: function () {
                this.multiplier = this.getMultiplier(this.timer);
                if(this.sections[0].value > 0){
                    this.sections[0].value = this.timer * 5;
                }
            }
        },

    methods:{
        reset(){
           this.sections[0].value = 100;
        },

        getMultiplier(time){
            if(time >= 15){
                return 4;
            } else if (time >= 10){
                return 2;
            } else if (time >= 0){
                return 1;
            } else {
                return 0;
            }
        }
    }

}
</script>

<style>

</style>
