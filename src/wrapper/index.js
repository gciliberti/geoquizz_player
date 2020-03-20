import axios from 'axios'

export const utils = {

methods: {

    //connexion 

    // connect(){
    //     window.axios = axios.create({
    //         baseURL: 'http://134.122.67.129/player/api/',
    //     });
    // },


    //récupère séries

    getSeries(){
        axios.get('index.php/series').then((response) => {
            console.log(response.data);
            //this.$store.commit('getSeries', response.data)
        })
    },


    //créer une partie

    postGame(pseudo, serie){
        axios.post('index.php/partie',{pseudo: pseudo ,serie: serie}).then((response) => {
            this.$store.commit('initGame', response.data)
        })
    },

    test(){
        console.log(axios.baseURL)
    }
}
}