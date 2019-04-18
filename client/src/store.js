import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const store = new Vuex.Store({
  state: {
    cabins: null,
    helpers: null
  },

  actions: {
    loadCabins({ commit }) {
      axios({
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
      axios({
        method: 'GET',
        url: `${ this._vm.$baseUrl }/helper`
      })
        .then(results => results.data)
        .then(helpers =>{
          commit('SET_HELPERS', helpers);
        })
      ;
    }
  },

  mutations: {
    SET_CABINS(state, cabins) {
      state.cabins = cabins;
    },

    SET_HELPERS(state, helpers) {
      state.helpers = helpers;
    }
  }
});

export default store;
