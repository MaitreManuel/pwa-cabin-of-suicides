import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from '../translations/en';
import fr from '../translations/fr';

Vue.use(VueI18n);

const locale = navigator.language;

export default new VueI18n({
  locale: locale,
  fallbackLocale: 'fr',
  en,
  fr
});
