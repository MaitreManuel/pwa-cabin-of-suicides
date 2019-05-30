import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const store = new Vuex.Store({
  state: {
    cabins: null,
    helpers: null,
    lang: null
  },

  actions: {
    loadCabins({ commit }) {
      Vue.axios({
        method: 'GET',
        url: `${ this._vm.$baseUrl }/cabin`
      })
        .then(results => results.data)
        .then(cabins =>{
          commit('SET_CABINS', cabins);
        })
      ;
    },

    loadHelpers({ commit }) {
      Vue.axios({
        method: 'GET',
        url: `${ this._vm.$baseUrl }/helper`
      })
        .then(results => results.data)
        .then(helpers =>{
          commit('SET_HELPERS', helpers);
        })
      ;
    },

    loadLang({ commit }) {
      const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'fr';

      localStorage.setItem('lang', lang);
      commit('SET_LANG', lang);
    }
  },

  mutations: {
    SET_CABINS(state, cabins) {
      state.cabins = cabins;
    },

    SET_HELPERS(state, helpers) {
      state.helpers = helpers;
    },

    SET_LANG(state, lang) {
      state.lang = lang;
    }
  }
});

export default store;
