import { Icon } from 'leaflet';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'babel-polyfill';

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';
import router from './router';
import './registerServiceWorker';

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.config.productionTip = false;

Vue.prototype.$user = {
  latitude: 47.2382007,
  longitude: -1.6300958
};

Vue.use(Vuetify, {
  iconfont: 'md'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
