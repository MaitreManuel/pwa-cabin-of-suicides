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
    <loader :msg="'Chargement des données'" v-if="!ready"/>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';

  import Loader from '../components/Loader';
  import Navigation from '../components/Navigation';

  export default {
    name: 'home',
    data() {
      return {
        latitude: 47.218371,
        longitude: -1.553621,
        map: null,
        mapReady: null,
        mbgl: null
      };
    },

    components: {
      Loader,
      Navigation
    },

    computed: {
      ...mapState([
        'cabins',
        'helpers'
      ]),

      ready() {
        return this.cabins && this.helpers && this.mapReady;
      }
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
          fitBoundsOptions: {
            zoom: 15
          },
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        });

        GeolocateControl.on('trackuserlocationstart', () => {
          if (me.map.getLayer('marker')) {
            me.map.removeLayer('marker');
          }
        });

        GeolocateControl.on('geolocate', data => {
          me.longitude = data.coords.longitude;
          me.latitude = data.coords.latitude;
        });

        me.mbgl.accessToken = this.$accessToken;
        me.map = new me.mbgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [me.longitude, me.latitude],
          zoom: 12,
          pitch: 0
        });

        me.map.addControl(GeolocateControl);

        me.map.on('load', () => {
          me.mapReady = me.map.loaded();

          me.map.loadImage('img/cabin.png', (error, image) => {
            if (error) throw error;
            me.map.addImage('cabin', image);
          });
          me.map.loadImage('img/cabin-taken.png', (error, image) => {
            if (error) throw error;
            me.map.addImage('cabin-taken', image);
          });
          me.map.loadImage('img/helper.png', (error, image) => {
            if (error) throw error;
            me.map.addImage('helper', image);
          });
          me.map.loadImage('img/pedestrian.png', (error, image) => {
            if (error) throw error;
            me.map.addImage('marker', image);
            me.map.addLayer({
              id: 'marker',
              type: 'symbol',
              source: {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: [{
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [me.longitude, me.latitude]
                    }
                  }]
                }
              },
              layout: {
                'icon-image': 'marker',
                'icon-size': 0.20
              }
            });
            me.setCabins();
            me.setHelpers();
          });
        });
      },

      setLocation() {
        this.$getLocation((latitude, longitude) => {
          this.latitude = latitude;
          this.longitude = longitude;
        });
      },

      setCabins() {
        const me = this;

        me.cabins.forEach(cabin => {
          const features = [];
          const point = {
            type: 'Feature',
            properties: {
              description: `${ cabin.name }`
            },
            geometry: {
              type: 'Point',
              coordinates: [cabin.location.longitude, cabin.location.latitude]
            }
          };

          features.push(point);

          const geojson = {
            id: cabin.name,
            type: 'symbol',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: features
              }
            },
            layout: {
              'icon-image': cabin.isTaken.status ? 'cabin-taken' : 'cabin',
              'icon-allow-overlap': true,
              'icon-size': 0.35
            }
          };

          me.map.on('click', cabin.name, function (e) {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new me.mbgl.Popup()
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(me.map);
          });

          me.map.addLayer(geojson);
        });
      },

      setHelpers() {
        const me = this;

        me.helpers.forEach(helper => {
          const features = [];
          const point = {
            type: 'Feature',
            properties: {
              description: `${ helper.username }`
            },
            geometry: {
              type: 'Point',
              coordinates: [helper.location.longitude, helper.location.latitude]
            }
          };

          features.push(point);

          const geojson = {
            id: helper.username,
            type: 'symbol',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: features
              }
            },
            layout: {
              'icon-image': 'helper',
              'icon-allow-overlap': true,
              'icon-size': 0.35
            }
          };

          me.map.on('click', helper.username, function (e) {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new me.mbgl.Popup()
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(me.map);
          });

          me.map.addLayer(geojson);
        });
      }
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
