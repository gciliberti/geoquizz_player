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
                latitude: 48.69,
                map: {}
            };
        },

    methods:{
        addMarker(e){
            this.resetMarker(this.map);
            L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
            //console.log("lat : " + e.latlng.lat + " lon : " + e.latlng.lng);
            let coord = [e.latlng.lat, e.latlng.lng];
            this.$store.commit('pointed', coord);
        },

        resetMarker(){
            this.map.eachLayer( (marker) => {
                this.map.removeLayer(marker);
            });
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);
        },
      
    },

  mounted(){
      this.map = L.map('map', {center: [this.latitude, this.longitude],zoom: 13});
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        this.map.on('click', (e) => {
             this.addMarker(e);
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
