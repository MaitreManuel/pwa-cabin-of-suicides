<template>
  <div class="wrapper-step">
    <v-container class="step" grid-list>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 text-xs-center>
          <v-icon class="direction">{{ steps[i].icon }}</v-icon>
          <p class="text mt-5" v-html="steps[i].text"></p>
          <p class="mt-5 text-xs-right" v-if="$route.params.step < steps.length"><v-btn @click="goNext()">Suivant</v-btn></p>
          <p class="mt-5 text-xs-center" v-if="$route.params.step === steps.length"><v-btn @click="openCabin()"><v-icon>lock_open</v-icon> Ouvrir la cabine</v-btn></p>
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
            icon: 'arrow_forward',
            text: 'Dans <span class="bold">200m</span>, tournez à <span class="bold">droite</span>',
          },
          {
            icon: 'arrow_forward',
            text: 'Votre itinéraire est prêt, appuyez sur suivant pour commencer',
          },
          {
            icon: 'arrow_forward',
            text: 'Tournez à <span class="bold">droite</span>',
          },
          {
            icon: 'arrow_upward',
            text: 'Pendant <span class="bold">600m</span>, continuez <span class="bold">tout droit</span>',
          },
          {
            icon: 'call_made',
            text: 'Au <span class="bold">carrefour</span>, prenez sur votre <span class="bold">droite</span>',
          },
          {
            icon: 'arrow_upward',
            text: 'Pendant <span class="bold">400m</span>, continuez <span class="bold">tout droit</span>',
          },
          {
            icon: 'arrow_upward',
            text: 'Après le <span class="bold">carrefour</span>, continuez <span class="bold">tout droit</span> jusqu\'au <span class="bold">rond-point</span> pendant <span class="bold">500m</span>',
          },
          {
            icon: 'nature_people',
            text: 'Au <span class="bold">rond-point</span>, vous apercevrez la <span class="bold">cabine</span>',
          },
          {
            icon: 'done_outline',
            text: 'Vous êtes <span class="bold">arrivé</span>'
          }
        ]
      };
    },

    watch: {
      '$route.params.step': function () {
        this.i = this.$route.params.step - 1;
      }
    },

    methods: {
      goNext() {
        this.$router.push({ name: 'step', params: { step: parseInt(this.$route.params.step) + 1 }});
      },

      openCabin() {
        const me = this;

        me.axios({
          method: 'POST',
          url: `${ me.$baseUrl }/cabin/lock`,
          data: {
            id: localStorage.getItem('idCabin'),
            date: new Date().getTime()
          }
        })
          .then(result => {
            console.log(result);
          })
        ;
      }
    }
  };
</script>

<style lang="scss" scoped>
  button {
    color: black !important;
  }

  .direction {
    font-size: 70px;
  }

  .grid-list {
    left: 50%;
    position: absolute;
    top: 50%;

    transform: translate(-50%, -50%);

    .text {
      font-size: 25px;
      text-transform: uppercase;
    }
  }

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
