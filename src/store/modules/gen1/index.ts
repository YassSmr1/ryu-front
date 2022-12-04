import { Gen1State } from "@/store/modules/gen1/types";
import { Module } from "vuex";
import { RootState } from "@/store/types";
import { state } from "@/store/modules/gen1/state";
import { mutations } from "@/store/modules/gen1/mutations";
import { actions } from "@/store/modules/gen1/actions";

export const gen1: Module<Gen1State, RootState> = {
  state,
  mutations,
  actions,
};
