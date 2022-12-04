import { Gen1State } from "@/store/modules/gen1/types";
import { MutationTree } from "vuex";

export enum Gen1Mutations {
  SET_GEN1_NFTS = "SET_GEN1_NFTS",
  SET_GEN1_NFTS_BREEDING = "SET_GEN1_NFTS_BREEDING",
}

export const mutations: MutationTree<Gen1State> = {
  [Gen1Mutations.SET_GEN1_NFTS](state, gen1Nfts) {
    state.gen1Nfts = gen1Nfts;
  },
  [Gen1Mutations.SET_GEN1_NFTS_BREEDING](state, gen1NftsBreeding) {
    state.gen1NftsBreeding = gen1NftsBreeding;
  },
};
