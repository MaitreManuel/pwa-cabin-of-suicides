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
  body {
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  }
</style>
