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
            this.map.eachLayer( (control) => {
                this.map.removeLayer(control);
            });
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);
        },

        calculateScore(i, time){
            //renvoie le multiplicateur
            let multiplier = this.getMultiplier(time);

            //récupère la position de la photo
            let position = this.$store.state.listPhotos[i].position;
            let LatLng = position.split(',');

            //calcul de la distance des deux positions (photo + marker)
            let distance = this.map.distance(LatLng, this.$store.state.LatLngPoint);

            //calcul du score
            let distanceMaxPoint = this.$store.state.distanceMaxPoint;
            if (distance <= distanceMaxPoint) {
                this.$store.commit('incrementScore', 5 * multiplier);
            } else if (distance > distanceMaxPoint && distance <= distanceMaxPoint * 2) {
                this.$store.commit('incrementScore', 3 * multiplier);
            } else if (distance > distanceMaxPoint * 2 && distance <= distanceMaxPoint * 3) {
                this.$store.commit('incrementScore', 1 * multiplier);
            }            
        },

        getMultiplier(time){
            if(time <= 5){
                return 4;
            } else if (time <= 10){
                return 2;
            } else if (time <= 20){
                return 1;
            } else {
                return 0;
            }
        },


        createControls(){
            let command = L.control({position: 'bottomright'});
            command.onAdd = (map) => {
                let div = L.DomUtil.create('div', 'command');
                div.innerHTML += '<div><img height="300" src="' + this.$store.state.listPhotos[this.$store.state.i].url + '"/></div>';
                return div;
            };
            command.addTo(this.map);
        }
      
    },

  mounted(){
      this.map = L.map('map', {center: [this.$store.state.map.lat, this.$store.state.map.lng],zoom: this.$store.state.map.zoom});
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        //this.createControls();
              
        this.map.on('click', (e) => {
             this.addMarker(e);
        });
  }
 
}
</script>

<style scoped>
    #map {
        height: 100vh;
        width: 100%;        
    }

    .leaflet-container {
  cursor: crosshair;
}

</style>
