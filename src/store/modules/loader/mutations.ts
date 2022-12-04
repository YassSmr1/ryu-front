import { MutationTree } from "vuex";
import { LoaderState } from "@/store/modules/loader/types";

export enum LoaderMutation {
  SET_LOADING = "SET_LOADING",
}

export const mutations: MutationTree<LoaderState> = {
  [LoaderMutation.SET_LOADING](state, loading) {
    state.loading = loading;
  },
};
