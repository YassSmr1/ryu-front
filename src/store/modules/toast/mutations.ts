import { MutationTree } from "vuex";
import { ToastState } from "@/store/modules/toast/type";

export enum ToastMutations {
  SET_ERROR = "SET_ERROR",
  SET_SUCCESS = "SET_SUCCESS",
}

export const mutations: MutationTree<ToastState> = {
  [ToastMutations.SET_ERROR](state, error) {
    state.error = error;
  },
  [ToastMutations.SET_SUCCESS](state, success) {
    state.success = success;
  },
};
