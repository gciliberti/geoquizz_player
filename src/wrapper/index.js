export const wrapper = {

methods: {

    test(){
        alert("wrapper")
    },

    //connexion 

    connect(){
        window.axios = axios.create({
            baseURL: 'http://134.122.67.129/player/api/',
        });
    }
}
}