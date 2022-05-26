import { createI18n } from 'vue-i18n';
import zh from './zh.json';
import en from './en.json';

const messages = {
  'en-us': {
    ...en
  },
  'zh-cn': {
    ...zh
  }
};

const i18n = createI18n({
  legacy: false,
  locale: window.localStorage.getItem('language') || 'zh-cn',
  fallbackLocale: 'en-us',
  messages
});
export const translate = (key) => {
  if (!key) {
    return '';
  }
  return i18n.global.t(key);
};

export default i18n;
