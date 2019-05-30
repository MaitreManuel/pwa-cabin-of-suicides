<template>
  <v-container class="question-list" grid-list>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-layout row wrap>
          <v-flex xs12 offset-xs1>
            <p>{{ questions[i].text }}</p>
          </v-flex>
        </v-layout>

        <div v-if="questions[i].id === 'start'">
          <v-layout row wrap>
            <v-flex xs4 offset-xs1>
              <v-text-field
                v-model="questions[i].response.firstname"
                label="Prénom"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs4 offset-xs1>
              <v-text-field
                v-model="questions[i].response.lastname"
                label="Nom"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs4 offset-xs1>
              <v-text-field
                v-model="questions[i].response.phonenumber"
                label="Numéro de téléphone"
                required
                type="number"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap text-xs-center>
            <v-flex xs12>
              <v-btn :disabled="!questions[i].response.firstname || !questions[i].response.lastname || !questions[i].response.phonenumber" @click="next('start')">Valider</v-btn>
            </v-flex>
          </v-layout>
        </div>

        <div v-if="questions[i].id === 'call-number'">
          <v-layout row wrap>
            <v-flex xs4 offset-xs1>
              <v-text-field
                v-model="questions[i].response.name"
                label="Nom Prénom"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs4 offset-xs2>
              <v-text-field
                v-model="questions[i].response.phonenumber"
                label="Numéro de téléphone"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap text-xs-center>
            <v-flex xs12>
              <v-btn :disabled="!questions[i].response.name || !questions[i].response.phonenumber" @click="next('call-number')">Valider</v-btn>
            </v-flex>
          </v-layout>
        </div>

        <div v-if="questions[i].id === 'why' || questions[i].id === 'day'">
          <v-layout row wrap>
            <v-flex xs10 offset-xs1>
              <v-textarea
                v-model="questions[i].response"
                :label="`${ questions[i].id === 'why' ? 'Expliquez la raison de votre choix' : 'Racontez ce jour...' }`"
                required
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row wrap text-xs-center>
            <v-flex xs12>
              <v-btn :disabled="!questions[i].response" @click="next(`${ questions[i].id === 'why' ? 'why' : 'day' }`)">Valider</v-btn>
            </v-flex>
          </v-layout>
        </div>

        <div v-if="questions[i].yesOrNoQuestion === true">
          <v-layout row wrap text-xs-center>
            <v-flex xs3 offset-xs3>
              <v-btn @click="next(questions[i].id, false)">Non</v-btn>
            </v-flex>
            <v-flex xs3>
              <v-btn @click="next(questions[i].id, true)">Oui</v-btn>
            </v-flex>
          </v-layout>
        </div>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'cabin',
    data () {
      return {
        i: parseInt(this.$route.params.step) - 1,
        questions: [
          {
            delay: null,
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
            delay: 1500,
            id: 'ready',
            response: null,
            text: 'Êtes-vous prêt à commencer ?',
            yesOrNoQuestion: true
          },
          {
            delay: 1500,
            id: 'ready-1',
            response: null,
            text: 'Est-ce que vous êtes sûr de vouloir mettre fin à vos jours ?',
            yesOrNoQuestion: true
          },
          {
            delay: 1500,
            id: 'call',
            response: null,
            text: 'Est-ce que des personnes sont au courant ?',
            yesOrNoQuestion: true
          },
          {
            delay: null,
            id: 'call-number',
            response: {
              name: null,
              phonenumber: null
            },
            text: 'Si oui, veuillez renseigner les coordonnées d\'un(e) de vos proches',
            yesOrNoQuestion: false
          },
          {
            delay: 3000,
            id: 'why',
            response: null,
            text: 'Pourquoi en êtes-vous arrivé à cette décision ?',
            yesOrNoQuestion: false
          },
          {
            delay: 1500,
            id: 'ready-2',
            response: null,
            text: 'Êtes-vous sûr de vouloir continuer ?',
            yesOrNoQuestion: true
          },
          {
            delay: 3000,
            id: 'day',
            response: null,
            text: 'Racontez-nous une journée où vous vous êtes senti particulièrement bien et heureux',
            yesOrNoQuestion: false
          },
          {
            delay: 3000,
            id: 'end',
            response: null,
            text: 'Nous voici à la fin... Êtes-vous prêt ?',
            yesOrNoQuestion: true
          }
        ]
      };
    },

    methods: {
      goNext(id, value) {
        console.log(id);
        console.log(value);
        this.$router.push({ name: 'cabin', params: { step: parseInt(this.$route.params.id) + 1 }});
      }
    }
  };
</script>

<style lang="scss" scoped>
        .question-list {
        font-size: 16px;

        p {
        color: rgba(0, 0, 0, .54);
        line-height: 20px;
        }
        }
        </style>
