import Vue from 'vue';
import Vuetify from 'vuetify';
import 'babel-polyfill';

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.prototype.$accessToken = 'pk.eyJ1IjoibWFpdHJlbWFudWVsIiwiYSI6ImNqdWUwOXB5czByOWg0NHA5emhzajg0MXoifQ.wmKWlpczXU1SVDUCA8GMbA';

// Vue.prototype.$baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://cabin-of-suicides.herokuapp.com';
Vue.prototype.$baseUrl = 'https://cabin-of-suicides.herokuapp.com';

Vue.prototype.$getLocation = cb => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      cb(position.coords.latitude, position.coords.longitude);
    });
  } else {
    alert('/* geolocation IS NOT available */');
  }
};

Vue.use(Vuetify, {
  iconfont: 'md'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
