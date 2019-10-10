import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import "./styles/pastelaria.scss";

import { Plugin } from "vue-fragment";
Vue.use(Plugin)

import VueIziToast from "vue-izitoast";
import "izitoast/dist/css/iziToast.css";
Vue.use(VueIziToast);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
