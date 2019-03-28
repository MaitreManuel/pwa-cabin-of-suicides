<template>
  <v-container fluid pa-0>
    <v-layout row>
      <v-flex xs12>
        <l-map ref="map" :zoom=16 :center="[latitude, longitude]">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
          <l-marker :lat-lng="[latitude, longitude]"></l-marker>
        </l-map>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

  export default {
    name: 'home',
    components: {
      LMap,
      LTileLayer,
      LMarker
    },

    data() {
      return {
        latitude: this.$user.latitude,
        longitude: this.$user.longitude
      };
    },

    computed: {
      computedProperty() {
        return this.$user.latitude, this.$user.longitude, Date.now();
      }
    },

    watch: {
      computedProperty: function() {
        this.latitude = this.$user.latitude;
        this.longitude = this.$user.longitude;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~leaflet/dist/leaflet.css';

  .vue2leaflet-map {
    height: 100vh;
  }
</style>