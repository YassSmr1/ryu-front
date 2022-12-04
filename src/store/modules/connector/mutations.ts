import { MutationTree } from "vuex";
import { ConnectorState } from "@/store/modules/connector/types";

export enum ConnectorMutations {
  SET_ACCOUNT = "SET_ACCOUNT",
  SET_WEB3_PROVIDER = "SET_WEB3_PROVIDER",
  SET_LISTENERS = "SET_LISTENERS",
  SET_WALLET_CONNECT = "SET_WALLET_CONNECT",
}

export const mutations: MutationTree<ConnectorState> = {
  [ConnectorMutations.SET_ACCOUNT](state, account) {
    state.account = account;
    if (!state.account) state.web3Provider = null;
  },
  [ConnectorMutations.SET_WEB3_PROVIDER](state, web3Provider) {
    state.web3Provider = web3Provider;
  },
  [ConnectorMutations.SET_LISTENERS](state, listeners) {
    state.listeners = listeners;
  },
  [ConnectorMutations.SET_WALLET_CONNECT](state, walletConnect) {
    state.walletConnect = walletConnect;
  },
};
