import { LabsState } from "@/store/modules/labs/types";
import { RootState } from "@/store/types";
import { Module } from "vuex";
import { state } from "@/store/modules/labs/state";
import { mutations } from "@/store/modules/labs/mutations";
import { actions } from "@/store/modules/labs/actions";

export const labs: Module<LabsState, RootState> = {
  state,
  mutations,
  actions,
};
