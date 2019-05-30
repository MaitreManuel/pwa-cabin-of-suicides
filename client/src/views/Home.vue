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

    watch: {
      ready() {
        this.setCabins();
        this.setHelpers();
        this.setOwn();
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
      drawPath(toGoPosition) {
        const me = this;

        me.axios({
          method: 'GET',
          url: me.$direction({ latitude: me.latitude, longitude: me.longitude }, toGoPosition)
        })
          .then(result => {
            const coordinates = result.data.routes[0].geometry.coordinates;

            console.log(coordinates);
            // me.axios({
            //   method: 'POST',
            //   url: `${ me.$baseUrl }/map/reverse-geocoding`,
            //   data: {
            //     locations: JSON.stringify([[me.longitude, me.latitude]]),
            //     token: me.$accessToken,
            //     url: JSON.stringify(me.$splitUrlMapBox)
            //   }
            // })
            //   .then(result => {
            //     console.log(result);
            //   })
            // ;
          })
        ;
      },

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

            if (me.map.isStyleLoaded()) {
              me.$nextTick(() => {
                me.mapReady = true;
              });
            } else {
              me.map.once('styledata', () => {
                me.mapReady = true;
              });
            }
          });
        });
      },

      setCabins() {
        const me = this;

        if (me.cabins) {
          me.cabins.forEach(cabin => {
            if (!me.map.getLayer(cabin.name)) {
              const features = [];
              const point = {
                type: 'Feature',
                properties: {
                  description: `
                <h2>${ cabin.name }</h2>
                <button id="btn-${ cabin.name }" class="go-to"><i class="v-icon material-icons theme--dark">directions</i> Itinéraire</button>
              `
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
                  'icon-size': 0.3
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
                  .addTo(me.map)
                ;

                document.querySelector(`#btn-${ cabin.name }`).addEventListener('click', () => {
                  me.drawPath(cabin.location);
                });

                me.map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 17 });
              });

              me.map.addLayer(geojson);
            }
          });
        }
      },

      setHelpers() {
        const me = this;

        if (me.helpers) {
          me.helpers.forEach(helper => {
            if (!me.map.getLayer(helper.username)) {
              const features = [];
              const point = {
                type: 'Feature',
                properties: {
                  description: `
                    <h2>${ helper.username }</h2>
                    <button id="btn-${ helper.username }" class="go-to">Contacter</button>
                  `
                },
                geometry: {
                  type: 'Point',
                  coordinates: [helper.location.longitude, helper.location.latitude],
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
                  'icon-size': 0.3
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
                  .addTo(me.map)
                ;
                me.map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 17 });
              });

              me.map.addLayer(geojson);
            }
          });
        }
      },

      setLocation() {
        this.$getLocation((latitude, longitude) => {
          this.latitude = latitude;
          this.longitude = longitude;
        });
      },

      setOwn() {
        const me = this;

        me.map.on('click', 'marker', function (e) {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new me.mbgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(me.map)
          ;
          me.map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 17 });
        });

        me.map.addLayer({
          id: 'marker',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                properties: {
                  description: 'Vous êtes ici.'
                },
                geometry: {
                  type: 'Point',
                  coordinates: [me.longitude, me.latitude]
                }
              }]
            }
          },
          layout: {
            'icon-image': 'marker',
            'icon-size': 0.3
          }
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

  .mapboxgl-popup-content {
    padding: 15px 10px !important;
    text-align: center;

    .go-to {
      background: #212121;
      color: white;
      margin-top: 15px;
      padding: 5px 10px;

      i {
        font-size: 16px;
      }
    }

    .mapboxgl-popup-close-button {
      font-size: 18px;
      width: 20px;
    }
  }
</style>
