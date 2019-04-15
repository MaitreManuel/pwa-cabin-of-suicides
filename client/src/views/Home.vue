<template>
  <v-container fluid pa-0>
    <navigation />
    <v-layout row map-layout>
      <v-flex xs12>
        <div id="map"></div>
      </v-flex>
    </v-layout>

    <v-btn absolute dark fab class="location" @click="focusLocation">
      <v-icon>gps_fixed</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  import Navigation from '../components/Navigation';

  export default {
    name: 'home',
    data() {
      return {
        boxes: [
          {
            name: 'Canclaux',
            location: {
              latitude: 47.2146649,
              longitude: -1.5745486
            }
          }, {
            name: 'Radisson',
            location: {
              latitude: 47.2176154,
              longitude: -1.5627149
            }
          }
        ],
        latitude: 47.218371,
        longitude: -1.553621,
        map: null,
        mbgl: null
      };
    },

    components: {
      Navigation
    },

    beforeMount() {
      this.setLocation();
    },

    mounted() {
      require('mapbox-gl/dist/mapbox-gl.css');
      this.mbgl = require('mapbox-gl');
      this.initMap();
    },

    methods: {
      focusLocation() {
        document.querySelector('.mapboxgl-ctrl-geolocate').click();
      },

      initMap() {
        const me = this;
        const GeolocateControl = new me.mbgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        });

        GeolocateControl.on('geolocate', data => {
          me.latitude = data.coords.latitude;
          me.longitude = data.coords.latitude;
        });

        me.mbgl.accessToken = this.$accessToken;

        me.map = new me.mbgl.Map({
          container: 'map',
          style: 'mapbox://styles/maitremanuel/cjueb9bzc0h741fqp9q2fgsww',
          center: [me.longitude, me.latitude],
          zoom: 12,
          pitch: 0,
          minZoom: 2,
          maxZoom: 20
        });

        me.map.addControl(GeolocateControl);

        // me.map.on('load', () => {
        //   me.map.loadImage('img/pedestrian.png', (error, image) => {
        //     if (error) throw error;
        //     me.map.addImage('marker', image);
        //     me.map.addLayer({
        //       "id": "points",
        //       "type": "symbol",
        //       "source": {
        //         "type": "geojson",
        //         "data": {
        //           "type": "FeatureCollection",
        //           "features": [{
        //             "type": "Feature",
        //             "geometry": {
        //               "type": "Point",
        //               "coordinates": [me.longitude, me.latitude]
        //             }
        //           }]
        //         }
        //       },
        //       "layout": {
        //         "icon-image": "marker",
        //         "icon-size": 0.25
        //       }
        //     });
        //   });
        // });

        // this.map.on('style.load', () => {
        //   me.SetBoxes();
        // });
      },

      setLocation() {
        this.$getLocation((latitude, longitude) => {
          this.latitude = latitude;
          this.longitude = longitude;
        });
      },

      // setBoxes() {
      //   this.boxes.forEach(box => {
      //     const features = [];
      //     const point = {
      //       type: 'Feature',
      //       geometry: {
      //         type: 'Point',
      //         coordinates: [box.location.longitude, box.location.latitude]
      //       },
      //       maxzoom: 14,
      //       minzoom: 1
      //     };
      //
      //     const geojson = {
      //       id: box.name,
      //       type: 'symbol',
      //       source: {
      //         type: 'geojson',
      //         data: {
      //           type: 'FeatureCollection',
      //           features: features
      //         }
      //       },
      //       layout: {
      //         'icon-image': 'marker',
      //         'icon-allow-overlap': true
      //       },
      //       paint: {
      //         'icon-opacity': 1,
      //         'icon-color': '#e57e63',
      //         'icon-opacity-transition': {
      //           duration: 300
      //         }
      //       }
      //     };
      //     this.map.addLayer(geojson);
      //   });
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .location {
    bottom: 12px;
    right: 12px;
    z-index: 2;
  }

  .map-layout {
    margin-top: -56px;
    position: relative;
    z-index: 1;

    #map {
      height: 100vh;

      img {
        display: none;
      }
    }
  }
</style>

<style lang="scss">
  .mapboxgl-ctrl {
    opacity: 0;
  }
</style>