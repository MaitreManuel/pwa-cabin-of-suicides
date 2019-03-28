<template>
  <main class="wrapper">
    <navigation />
    <router-view />
  </main>
</template>

<script>
  import Navigation from './components/Navigation';

  export default {
    name: 'app',
    components: {
      Navigation
    },

    data() {
      return {
        user: this.$user
      };
    },

    mounted() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          this.$user.latitude = position.coords.latitude;
          this.$user.longitude = position.coords.longitude;
          console.log(position.coords.latitude + ' ' + position.coords.longitude);
        });
      } else {
        alert('/* geolocation IS NOT available */');
      }
    },

    methods: {

    }
  }
</script>

<style lang="scss">
  @import '~vuetify/dist/vuetify.min.css';

  body {
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  }
</style>
