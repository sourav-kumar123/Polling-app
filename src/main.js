import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ModalPlugin } from "bootstrap-vue";
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);
Vue.use(ModalPlugin);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
