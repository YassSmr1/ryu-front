import { MutationTree } from "vuex";
import { Gen2State } from "@/store/modules/gen2/types";

export enum Gen2Mutations {
  SET_GEN2_NFTS = "SET_GEN2_NFTS",
}

export const mutations: MutationTree<Gen2State> = {
  [Gen2Mutations.SET_GEN2_NFTS](state, Gen2Nfts) {
    state.gen2Nfts = Gen2Nfts;
  },
};
