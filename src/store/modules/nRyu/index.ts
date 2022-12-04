import { Module } from "vuex";
import { NRyuState } from "@/store/modules/nRyu/types";
import { RootState } from "@/store/types";
import { state } from "@/store/modules/nRyu/state";
import { mutations } from "@/store/modules/nRyu/mutations";
import { actions } from "@/store/modules/nRyu/actions";

export const nRyu: Module<NRyuState, RootState> = {
  state,
  mutations,
  actions,
};
