import { Module } from "vuex";
import { LoaderState } from "@/store/modules/loader/types";
import { RootState } from "@/store/types";
import { state } from "@/store/modules/loader/state";
import { mutations } from "@/store/modules/loader/mutations";

export const loader: Module<LoaderState, RootState> = {
  state,
  mutations,
};
