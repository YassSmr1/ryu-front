import { ConnectorState } from "@/store/modules/connector/types";

export const state: ConnectorState = {
  account: "",
  web3Provider: null,
  listeners: [],
  walletConnect: false,
};
