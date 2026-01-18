import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import store from './store/store.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './styles/pastelaria.scss';
import 'izitoast/dist/css/iziToast.css';
import Parallax from 'parallax-js';
import VMoney3 from 'v-money3';

const app = createApp(App);
app.use(createPinia());
// Se preferir Vuex 4, use: app.use(store)
app.use(VMoney3);

// iziToast será usado via import JS direto nos componentes

app.mount('#app');
