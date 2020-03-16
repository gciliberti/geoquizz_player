<template>
    <div>
        <div id="map"></div>
    </div>
</template>

<script>
export default {
  name: 'Map',

  data() {
            return {
                longitude:  6.18,
                latitude: 48.69
            };
        },

    methods:{
        addMarker(e, mymap){
            this.resetMarker(mymap);
            L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);
            //console.log("lat : " + e.latlng.lat + " lon : " + e.latlng.lng);
            let coord = [e.latlng.lat, e.latlng.lng];
            this.$store.commit('pointed', coord);
        },

        resetMarker(mymap){
            mymap.eachLayer(function (marker) {
                mymap.removeLayer(marker);
            });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);
        }
    },

  mounted(){
      var mymap = L.map('map', {center: [this.latitude, this.longitude],zoom: 13});
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);

        mymap.on('click', (e) => {
             this.addMarker(e, mymap);
        });
  }
 
}
</script>

<style scoped>
    #map {
         height: 300px;
         width: 600px; 
         
         }

</style>
