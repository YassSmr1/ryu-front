import { MutationTree } from "vuex";
import { Gen2StakingState } from "@/store/modules/gen2Staking/types";

export enum Gen2StakingMutations {
  SET_STAKED_GEN2_NFTS = "SET_STAKED_GEN2_NFTS",
  SET_RYUSAURS = "SET_RYUSAURS",
  SET_STAKING_GEN2_APPROVED = "SET_STAKING_GEN2_APPROVED",
  SET_RYUSAUR_APPROVED = "SET_RYUSAUR_APPROVED",
  SET_N_RYU_APPROVED = "SET_N_RYU_APPROVED",
  SET_LEADERBOARD = "SET_LEADERBOARD",
}

export const mutations: MutationTree<Gen2StakingState> = {
  [Gen2StakingMutations.SET_STAKED_GEN2_NFTS](state, stakedGen2Nft) {
    state.stakedGen2Nft = stakedGen2Nft;
  },
  [Gen2StakingMutations.SET_STAKING_GEN2_APPROVED](state, stakingGen2Approved) {
    state.stakingGen2Approved = stakingGen2Approved;
  },
  [Gen2StakingMutations.SET_RYUSAURS](state, ryusaurs) {
    state.ryusaurs = ryusaurs;
  },
  [Gen2StakingMutations.SET_RYUSAUR_APPROVED](state, ryusaursApproved) {
    state.ryusaursApproved = ryusaursApproved;
  },
  [Gen2StakingMutations.SET_N_RYU_APPROVED](state, nRyuApproved) {
    state.nRyuApproved = nRyuApproved;
  },
  [Gen2StakingMutations.SET_LEADERBOARD](state, leaderboard) {
    state.leaderboard = leaderboard;
  },
};
