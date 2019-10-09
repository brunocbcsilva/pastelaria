import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./styles/pastelaria.scss";

import { Plugin } from 'vue-fragment';
Vue.use(Plugin)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
