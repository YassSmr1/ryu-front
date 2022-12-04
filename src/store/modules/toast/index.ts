import { Module } from "vuex";
import { ToastState } from "@/store/modules/toast/type";
import { RootState } from "@/store/types";
import { mutations } from "@/store/modules/toast/mutations";
import { state } from "@/store/modules/toast/state";

export const toast: Module<ToastState, RootState> = {
  state,
  mutations,
};
