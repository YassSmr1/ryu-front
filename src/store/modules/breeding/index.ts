import { Module } from "vuex";
import { BreedingState } from "@/store/modules/breeding/types";
import { RootState } from "@/store/types";
import { state } from "@/store/modules/breeding/state";
import { mutations } from "@/store/modules/breeding/mutations";
import { actions } from "@/store/modules/breeding/actions";

export const breeding: Module<BreedingState, RootState> = {
  state,
  mutations,
  actions,
};
