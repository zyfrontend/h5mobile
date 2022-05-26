import { createApp } from 'vue';
import 'amfe-flexible/index.js';
import { createPinia } from 'pinia';
// import PerfectScrollbar from 'vue3-perfect-scrollbar';
// import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
import i18n from '~/language';
import router from '~/router';
import App from './App.vue';
import 'vant/lib/index.css';

import { vant } from '~/vant';
import '~/style/global.css';

const pinia = createPinia();
const app = createApp(App);
vant(app);
app.use(router);
app.use(i18n);
app.use(pinia);
// app.use(PerfectScrollbar);
app.mount('#app');
