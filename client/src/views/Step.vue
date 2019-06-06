<template>
  <div class="wrapper-step">
    <v-container class="step" grid-list>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 text-xs-center>
          <v-icon>{gps_fixed}</v-icon>
          <p v-html="steps[i].text"></p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'step',
    data () {
      return {
        i: parseInt(this.$route.params.step) - 1,
        steps: [
          {
            icon: '',
            text: 'Dans <span class="bold">100m</span>, tourner à <span class="bold">droite</span>',
          }
        ]
      };
    },

    mounted () {
      console.log('caca');
    }
  };
</script>

<style lang="scss" scoped>
  .wrapper-step {
    background: #0a0a0a;
    height: 100vh;
    width: 100vw;

    * {
      color: white;
    }
  }
</style>

<style lang="scss">
  .bold {
    font-weight: bold;
  }
</style>
