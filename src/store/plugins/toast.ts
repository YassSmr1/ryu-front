import { Store } from "vuex";
import { ToastOptions } from "vue-toast-notification";
import Vue from "vue";
import { RootState } from "@/store/types";
import { ToastMutations } from "@/store/modules/toast/mutations";

export const ToastPlugin = (store: Store<RootState>): void => {
  store.subscribe((mutation) => {
    if (mutation.type === ToastMutations.SET_ERROR) {
      Vue.prototype.$toast.error(mutation.payload, {
        position: "top-right",
        duration: 3_000,
      } as ToastOptions);
    }
  });
  store.subscribe((mutation) => {
    if (mutation.type === ToastMutations.SET_SUCCESS) {
      Vue.prototype.$toast.success(mutation.payload, {
        position: "top-right",
        duration: 3_000,
      } as ToastOptions);
    }
  });
};
