import { Gen1StakingState } from "@/store/modules/gen1Staking/types";
import { Module } from "vuex";
import { RootState } from "@/store/types";
import { state } from "@/store/modules/gen1Staking/state";
import { mutations } from "@/store/modules/gen1Staking/mutations";
import { actions } from "@/store/modules/gen1Staking/actions";

export const gen1Staking: Module<Gen1StakingState, RootState> = {
  state,
  mutations,
  actions,
};
