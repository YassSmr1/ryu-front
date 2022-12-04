import { Module } from "vuex";
import { RootState } from "@/store/types";
import { state } from "@/store/modules/gen2Staking/state";
import { mutations } from "@/store/modules/gen2Staking/mutations";
import { actions } from "@/store/modules/gen2Staking/actions";
import { Gen2StakingState } from "@/store/modules/gen2Staking/types";

export const gen2Staking: Module<Gen2StakingState, RootState> = {
  state,
  mutations,
  actions,
};
