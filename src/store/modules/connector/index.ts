import { Module } from "vuex";
import { ConnectorState } from "@/store/modules/connector/types";
import { RootState } from "@/store/types";
import { mutations } from "@/store/modules/connector/mutations";
import { state } from "@/store/modules/connector/state";
import { actions } from "@/store/modules/connector/actions";

export const connector: Module<ConnectorState, RootState> = {
  state,
  mutations,
  actions,
};
