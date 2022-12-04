import { MutationTree } from "vuex";
import { NRyuState } from "@/store/modules/nRyu/types";

export enum NRyuMutation {
  SET_NRYU_TOKEN = "SET_NRYU_TOKEN",
}

export const mutations: MutationTree<NRyuState> = {
  [NRyuMutation.SET_NRYU_TOKEN](state, nRyuToken) {
    state.nRyuToken = nRyuToken;
  },
};
