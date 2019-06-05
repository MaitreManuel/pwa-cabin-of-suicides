import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import Vuetify from 'vuetify';
import 'babel-polyfill';

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';
import i18n from './plugins/i18n';
import router from './plugins/router';
import store from './plugins/store';
import './plugins/registerServiceWorker';

Vue.config.productionTip = false;

Vue.prototype.$accessToken = 'pk.eyJ1IjoibWFpdHJlbWFudWVsIiwiYSI6ImNqdWUwOXB5czByOWg0NHA5emhzajg0MXoifQ.wmKWlpczXU1SVDUCA8GMbA';
// Vue.prototype.$baseUrl = 'http://localhost:5000';
Vue.prototype.$baseUrl = 'https://cabin-of-suicides.herokuapp.com';
Vue.prototype.$direction = (ownPosition, toGoPosition) => {
  return `https://api.mapbox.com/directions/v5/mapbox/walking/${ ownPosition.longitude }%2C${ ownPosition.latitude }%3B${ toGoPosition.longitude }%2C${ toGoPosition.latitude }.json?access_token=${ Vue.prototype.$accessToken }&overview=full&geometries=geojson`
};
Vue.prototype.$getLocation = cb => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      cb(position.coords.latitude, position.coords.longitude);
    });
  } else {
    alert('/* geolocation IS NOT available */');
  }
};
Vue.prototype.$splitUrlMapBox = ["https://api.mapbox.com/geocoding/v5/mapbox.places/",",",".json?access_token="];

Vue.use(new VueSocketIO({
  debug: true,
  connection: Vue.prototype.$baseUrl
}));

Vue.use(Vuetify, {
  iconfont: 'md'
});

new Vue({
  i18n,
  router,
  sockets: {
    connect: function () {
      console.log('socket connected')
    },

    lock: function() {
      this.$store.commit('SET_LOCK', false);
    }
  },
  store,
  render: h => h(App)
}).$mount('#app');
