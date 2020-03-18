import axios from 'axios'

export const wrapper = {

methods: {

    //connexion 

    connect(){
        window.axios = axios.create({
            baseURL: 'http://134.122.67.129/player/api/',
        });
    },


    //récupère séries

    getSeries(){
        axios.get('index.php/series').then((response) => {
            this.$store.commit('getSeries', response.data)
        })
    }
}
}