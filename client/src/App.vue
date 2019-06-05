<template>
  <main class="wrapper">
    <router-view />
  </main>
</template>

<script>
  export default {
    name: 'app',
    beforeCreate() {
      this.$store.dispatch('loadCabins');
      this.$store.dispatch('loadHelpers');
      this.$store.dispatch('loadLang');
    }
  }
</script>

<style lang="scss">
  @font-face {
    font-family: 'Playstation SST Light';
    src: url('../public/fonts/SST-Light.ttf');
  }

  input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance:textfield;
  }

  body {
    font-family: 'Playstation SST Light', Arial, 'Helvetica Neue', Helvetica, sans-serif;
    font-weight: 200;
    letter-spacing: -0.2px;
  }
</style>
