import { NRyuStakingState } from "@/store/modules/nRyuStaking/types";
import { MutationTree } from "vuex";

export enum NRyuStakingMutations {
  SET_NRYU_TOKEN_STAKED = "SET_NRYU_TOKEN_STAKED",
  SET_PERCENTAGE_STAKED = "SET_PERCENTAGE_STAKED",
}

export const mutations: MutationTree<NRyuStakingState> = {
  [NRyuStakingMutations.SET_NRYU_TOKEN_STAKED](state, nRyuTokenStaked) {
    state.nRyuTokenStaked = nRyuTokenStaked;
  },
  [NRyuStakingMutations.SET_PERCENTAGE_STAKED](state, percentageStaked) {
    state.percentageStaked = percentageStaked;
  },
};
