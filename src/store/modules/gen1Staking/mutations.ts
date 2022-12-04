import { Gen1StakingState } from "@/store/modules/gen1Staking/types";
import { MutationTree } from "vuex";

export enum Gen1StakingMutations {
  SET_STAKED_GEN1_NFT = "SET_STAKED_GEN1_NFT",
  SET_NFT_STAKING_GEN1_APPROVED = "SET_NFT_STAKING_GEN1_APPROVED",
}

export const mutations: MutationTree<Gen1StakingState> = {
  [Gen1StakingMutations.SET_STAKED_GEN1_NFT](state, stakedGen1nft) {
    state.stakedGen1nft = stakedGen1nft;
  },
  [Gen1StakingMutations.SET_NFT_STAKING_GEN1_APPROVED](
    state,
    nftStakingGen1Approved
  ) {
    state.nftStakingGen1Approved = nftStakingGen1Approved;
  },
};
