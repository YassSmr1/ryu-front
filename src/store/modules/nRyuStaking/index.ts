import { Module } from "vuex";
import { NRyuStakingState } from "@/store/modules/nRyuStaking/types";
import { RootState } from "@/store/types";
import { state } from "@/store/modules/nRyuStaking/state";
import { mutations } from "@/store/modules/nRyuStaking/mutations";
import { actions } from "@/store/modules/nRyuStaking/actions";

export const nRyuStaking: Module<NRyuStakingState, RootState> = {
  state,
  mutations,
  actions,
};
