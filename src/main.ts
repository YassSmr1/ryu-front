import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import VModal from "vue-js-modal";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { RootState } from "@/store/types";

Vue.config.productionTip = false;

Vue.use(VModal);
Vue.use(VueToast);

Object.defineProperty(Vue.prototype, "$rootState", {
  get(): RootState {
    return this.$store.state;
  },
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
