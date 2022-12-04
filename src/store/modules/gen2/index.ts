import { Module } from "vuex";
import { Gen2State } from "@/store/modules/gen2/types";
import { RootState } from "@/store/types";
import { state } from "@/store/modules/gen2/state";
import { mutations } from "@/store/modules/gen2/mutations";
import { actions } from "@/store/modules/gen2/actions";

export const gen2: Module<Gen2State, RootState> = {
  state,
  mutations,
  actions,
};
