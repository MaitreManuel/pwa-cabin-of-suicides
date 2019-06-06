<template>
  <div class="wrapper-questions-list">
    <div class="ripple"></div>
    <div class="wave"></div>

    <div class="lock" v-if="lock || i === 0" v-on:click="goNext('lock')">
      <p class="message animate">
        <span class="lock-message"><i class="v-icon material-icons theme--dark">{{ lock ? 'lock' : 'lock_open' }}</i> {{ lock ? 'VERROUILLÉE' : 'DÉVERROUILLÉE' }}</span>
        <span class="start mt-3" v-if="!lock">Installez-vous puis touchez l'écran.</span>
      </p>
    </div>

    <v-container class="question-list" grid-list>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1>
          <v-layout row wrap class="mb-4">
            <v-flex xs10 offset-xs1>
              <p>{{ questions[i].text }}</p>
            </v-flex>
          </v-layout>

          <div v-if="questions[i].id === 'start'">
            <v-layout row wrap>
              <v-flex xs4 offset-xs1>
                <v-text-field
                  v-model="questions[i].response.firstname"
                  label="Prénom"
                  autocomplete="new-password"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs4 offset-xs2>
                <v-text-field
                  v-model="questions[i].response.lastname"
                  label="Nom"
                  autocomplete="new-password"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs4 offset-xs1>
                <v-text-field
                  v-model="questions[i].response.phonenumber"
                  type="number"
                  label="Numéro de téléphone"
                  autocomplete="new-password"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </div>

          <div v-if="questions[i].id === 'call-number'">
            <v-layout row wrap>
              <v-flex xs4 offset-xs1>
                <v-text-field
                  v-model="questions[i].response.name"
                  label="Prénom Nom"
                  autocomplete="new-password"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs4 offset-xs2>
                <v-text-field
                  v-model="questions[i].response.phonenumber"
                  label="Numéro de téléphone"
                  autocomplete="new-password"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </div>

          <div v-if="questions[i].id === 'why' || questions[i].id === 'day'">
            <v-layout row wrap>
              <v-flex xs10 offset-xs1>
                <v-textarea
                  v-model="questions[i].response"
                  :label="`${ questions[i].id === 'why' ? 'Expliquez la raison de votre choix' : 'Racontez ce jour...' }`"
                  autocomplete="new-password"
                  required
                ></v-textarea>
              </v-flex>
            </v-layout>
          </div>

          <div v-if="questions[i].delay">
            <v-layout row wrap>
              <v-flex xs10 offset-xs1>
                <div class="wrapper-timer">
                  <div class="timer" ref="timer"></div>
                </div>
              </v-flex>
            </v-layout>
          </div>

          <div v-if="questions[i].id === 'start'">
            <v-layout row wrap text-xs-center>
              <v-flex xs12>
                <v-btn :disabled="!questions[i].response.firstname || !questions[i].response.lastname || !questions[i].response.phonenumber || !this.timeroff" @click="goNext('start')">Valider</v-btn>
              </v-flex>
            </v-layout>
          </div>

          <div v-if="questions[i].id === 'call-number'">
            <v-layout row wrap text-xs-center>
              <v-flex xs12>
                <v-btn :disabled="!questions[i].response.name || !questions[i].response.phonenumber || !this.timeroff" @click="goNext('call-number')">Valider</v-btn>
              </v-flex>
            </v-layout>
          </div>

          <div v-if="questions[i].id === 'why' || questions[i].id === 'day'">
            <v-layout row wrap text-xs-center>
              <v-flex xs12>
                <v-btn :disabled="!questions[i].response || !this.timeroff" @click="goNext(`${ questions[i].id === 'why' ? 'why' : 'day' }`)">Valider</v-btn>
              </v-flex>
            </v-layout>
          </div>

          <div v-if="questions[i].yesOrNoQuestion === true">
            <v-layout row wrap text-xs-center>
              <v-flex xs3 offset-xs3>
                <v-btn :disabled="!this.timeroff" @click="goNext(questions[i].id, false)">Non</v-btn>
              </v-flex>
              <v-flex xs3>
                <v-btn :disabled="!this.timeroff" @click="goNext(questions[i].id, true)">Oui</v-btn>
              </v-flex>
            </v-layout>
          </div>

        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import { Howl } from 'howler';
  import { mapState } from 'vuex';

  // import Waves from '../assets/waves';

  export default {
    name: 'cabin',
    data () {
      return {
        ActionSound: new Howl({
          src: ['sounds/PS4/Action_Up.mp3'],
          volume: 1
        }),
        BlockedActionSound: new Howl({
          src: ['sounds/PS4/Action_Down.mp3'],
          volume: 1
        }),
        CancelSound: new Howl({
          src: ['sounds/PS4/Load_Error.mp3'],
          volume: 1
        }),
        DeathSound: new Howl({
          src: ['sounds/PS4/Log_Off.mp3'],
          volume: 1
        }),
        StartSound: new Howl({
          src: ['sounds/PS4/Intro_Start_Up_2.mp3'],
          volume: 1
        }),
        ThemeSound: null,
        UnlockSound: new Howl({
          src: ['sounds/Outlast/Put_Battery.mp3'],
          volume: 1
        }),

        i: parseInt(this.$route.params.step) - 1,
        idInterval: 0,
        idTheme: null,
        timeroff: false,

        questions: [
          {
            delay: null,
            id: 'lock',
            response: null,
            text: null,
            yesOrNoQuestion: false
          },
          {
            delay: 6000,
            id: 'start',
            response: {
              firstname: null,
              lastname: null,
              phonenumber: null
            },
            text: 'Avant de commencer, veuillez renseigner ces informations :',
            yesOrNoQuestion: false
          },
          {
            delay: 5000,
            id: 'ready',
            response: null,
            text: 'Êtes-vous prêt à commencer ?',
            yesOrNoQuestion: true
          },
          {
            delay: 5000,
            id: 'ready-1',
            response: null,
            text: 'Est-ce que vous êtes sûr de vouloir mettre fin à vos jours ?',
            yesOrNoQuestion: true
          },
          {
            delay: 6000,
            id: 'call-number',
            response: {
              name: null,
              phonenumber: null
            },
            text: 'Nous avons besoin d\'une personne à contacter à la fin du processus, veuillez entrer ses coordonnées',
            yesOrNoQuestion: false
          },
          {
            delay: 30000, // more
            id: 'why',
            response: null,
            text: 'Pourquoi en êtes-vous arrivé à cette décision ?',
            yesOrNoQuestion: false
          },
          {
            delay: 5000,
            id: 'ready-2',
            response: null,
            text: 'Êtes-vous sûr de vouloir continuer ?',
            yesOrNoQuestion: true
          },
          {
            delay: 30000, // more
            id: 'day',
            response: null,
            text: 'Racontez-nous une journée où vous vous êtes senti particulièrement bien et heureux',
            yesOrNoQuestion: false
          },
          {
            delay: 10000,
            id: 'end',
            response: null,
            text: 'Nous voici à la fin... Êtes-vous prêt ?',
            yesOrNoQuestion: true
          },
          {
            delay: null,
            id: 'death',
            response: null,
            text: 'Détendez-vous, nous allons procéder à la suite...',
            yesOrNoQuestion: false
          },
          {
            delay: null,
            id: 'stop',
            response: null,
            text: 'Vous n\'avez pas l\'air d\'être sûr de vos choix. Pour éviter toutes mauvaises actions nous préférons mettre fin à la procédure et vous laisser le temps de réfléchir.',
            yesOrNoQuestion: false
          }
        ],
      };
    },

    computed: {
      ...mapState([
        'lock'
      ]),
    },

    watch: {
      '$route.params.step': function () {
        clearInterval(this.idInterval);
        this.$nextTick(function() {
          this.timer();
        });
        if (this.$route.params.step === 10) {
          this.ThemeSound.stop(this.idTheme);
          this.DeathSound.play();
          this.axios({
            method: 'POST',
            url: `${ this.$baseUrl }/cabin/death`,
            data: {
              // fromNum: this.questions[1].response.phonenumber,
              name: `${ this.questions[1].response.firstname } ${ this.questions[1].response.lastname }`,
              to: this.questions[4].response.phonenumber,
              toName: this.questions[4].response.name
            }
          })
            .then(result => {
              console.log(result);
            })
          ;
        }
      },

      '$store.state.lock': function() {
        this.UnlockSound.play();
      }
    },

    created () {
      document.body.classList.add('cabin');
      this.$socket.emit('register', { id: localStorage.getItem('id') });
    },

    destroyed () {
      document.body.classList.remove('cabin');
    },

    mounted () {
      document.body.classList.add('cabin');
      window.addEventListener('click', e => {
        const node = document.querySelector('.ripple');
        const newNode = node.cloneNode(true);

        newNode.classList.add('animate');
        newNode.style.left = e.clientX - 5 + 'px';
        newNode.style.top = e.clientY - 5 + 'px';
        node.parentNode.replaceChild(newNode, node);
      });
      // Waves();
    },

    updated () {
      document.body.classList.add('cabin');
      if (!this.lock) {
        if (!this.ThemeSound) {
          const Theme = new Howl({
            src: ['sounds/PS4/Menu_them_PS4_old.mp3'],
            loop: true,
            volume: 0.25,
            onend: function() {
              console.log('Finished!');
            }
          });

          if (!this.idTheme) {
            this.ThemeSound = Theme;
            this.idTheme = Theme.play();
          }
        }
      }
    },

    methods: {
      goNext(id, value) {
        const nextStep = (i) => {
          let buffer;
          if (!i) i = 1;
          if (typeof i !== 'number' && i === 'notsure') {
            this.i = this.questions.length - 1;
          } else {
            this.i = this.i + i;
          }
          buffer = this.i + 1;
          this.timeroff = false;
          this.$router.push({ name: 'cabin', params: { step: buffer }});
        };

        if (id === 'lock') {
          if (!this.lock) {
            this.StartSound.play();
            nextStep();
          } else {
            this.BlockedActionSound.play();
          }
        } else {
          this.ActionSound.play();
          if (typeof value === 'boolean') {
            this.questions[this.i].response = value;
          }
          if (value === false && ['ready', 'ready-1', 'ready-2', 'end'].indexOf(id) > -1) {
            this.ThemeSound.stop(this.idTheme);
            this.CancelSound.play();
            nextStep('notsure');
          } else {
            nextStep();
          }
        }
      },

      timer () {
        let elem = document.querySelector('.timer');
        let width = 100;
        let step = (width / this.questions[this.i].delay) * 4;
        this.idInterval = setInterval(() => { frame(this) }, 1);

        function frame(me) {
          if (width <= 0) {
            clearInterval(me.idInterval);
            me.timeroff = true;
          } else {
            width -= step;
            if (elem) {
              elem.style.width = `${ width }%`;
            }
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  button {
    &:not([disabled='disabled']) {
      background: transparent !important;
      border: 1px solid white;
      color: white;
    }
  }

  .wrapper-questions-list {
    height: 100%;
  }

  .lock {
    background: black;
    height: 100vh;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100vw;
    z-index: 999998;

    .message {
      color: white;
      left: 50%;
      position: absolute;
      text-align: center;
      top: calc(50% - 60px);

      transform: translate(-50%);

      &.animate {
        animation: blinker 6s ease-out infinite;
      }

      .lock-message, .start {
        display: block;
      }

      .lock-message {
        font-size: 60px;

        i {
          font-size: 60px;
          margin-bottom: 9px;
        }
      }

      .start {
        font-size: 22px;
      }
    }
  }

  .ripple {
    width: 10px;
    height: 10px;
    opacity: 0;
    transform: scale(0);
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    position: fixed;
    z-index: 999999;

    &.animate {
      animation: ripple-mo 1s cubic-bezier(0, 0, .2, 1);
    }
  }

  .question-list {
    font-size: 16px;
    position: relative;
    top: 50%;

    transform: translateY(-50%);

    p:not(.message) {
      color: white;
      font-size: 18px;
      line-height: 20px;
    }
  }

  .wave {
    background: url('../../public/img/wave.png');
    bottom: 0;
    height: 143px;
    left: 0;
    opacity: .3;
    position: absolute;
    width: 100%;

    animation: move 45s linear infinite;

    &::after {
      background: url('../../public/img/wave.png');
      content: '';
      height: 143px;
      opacity: .3;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;

      animation: move 40s linear infinite;
      animation-delay: -5s;
    }

    &::before {
      background: url('../../public/img/wave.png');
      content: '';
      height: 143px;
      opacity: .3;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;

      animation: move-reverse 30s linear infinite;
    }
  }

  .wrapper-timer {
    border: 1px solid white;
    height: 12px;
    margin-bottom: 50px;
    margin-top: 50px;
    width: 100%;

    .timer {
      background: white;
      height: 100%;
    }
  }

  @keyframes blinker {
    50% { opacity: 0; }
  }

  @keyframes move {
    0% { background-position: 0; }
    50% { background-position: 100vw; }
    100% { background-position: 0; }
  }

  @keyframes move-reverse {
    0% { background-position: 100vw; }
    50% { background-position: 0; }
    100% { background-position: 100vw; }
  }

  @keyframes ripple-mo {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(10);
      opacity: 0;
    }
  }
</style>

<style lang="scss">
  html {
    overflow: hidden;
  }

  body.cabin {
    background: linear-gradient(-45deg, #041C7C, #092181, #4E73C9, #6893E2);
    background-size: 400% 400%;
    height: 100vh;
    overflow: hidden;
    width: 100vw;

    animation: Gradient 15s ease infinite;

    main.wrapper {
      height: 100%;
    }
  }

  .v-input__slot {
    &::after, &::before {
      border-color: white !important;
    }

    * {
      color: white !important;
      font-size: 18px;
      letter-spacing: -0.2px;
    }
  }

  @keyframes Gradient {
    0% { background-position: 0 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0 50% }
  }
</style>
