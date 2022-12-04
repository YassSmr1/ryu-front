import { ActionTree } from "vuex";
import { ConnectorState } from "@/store/modules/connector/types";
import { RootState } from "@/store/types";
import { ethers } from "ethers";
import { ConnectorMutations } from "@/store/modules/connector/mutations";
import { CHAIN_ID, RPC_URL } from "@/config";
import { ToastMutations } from "@/store/modules/toast/mutations";
import WalletConnectProvider from "@walletconnect/ethereum-provider";

export enum ConnectorActions {
  CONNECT_WALLET_CONNECT = "CONNECT_WALLET_CONNECT",
  CHECK_CHAIN_ID = "CHECK_CHAIN_ID",
  CONNECT_METAMASK = "CONNECT_METAMASK",
  DISCONNECT = "DISCONNECT",
  SUBSCRIBE_TO_EVENTS = "SUBSCRIBE_TO_EVENTS",
  SAVE_TO_LOCAL_STORAGE = "SAVE_TO_LOCAL_STORAGE",
  GET_FROM_LOCAL_STORAGE = "GET_FROM_LOCAL_STORAGE",
  REMOVE_FROM_LOCAL_STORAGE = "REMOVE_FROM_LOCAL_STORAGE",
}

export const actions: ActionTree<ConnectorState, RootState> = {
  async [ConnectorActions.CONNECT_WALLET_CONNECT]({ dispatch, commit }) {
    const walletConnect = new WalletConnectProvider({
      bridge: "https://bridge.walletconnect.org", // Required
      rpc: {
        [CHAIN_ID]: RPC_URL,
      },
    });
    const provider = new ethers.providers.Web3Provider(
      walletConnect as ethers.providers.ExternalProvider
    );
    if (!walletConnect.connected) {
      await walletConnect.enable();
    } else {
      dispatch(ConnectorActions.CHECK_CHAIN_ID, {
        provider: provider,
        accounts: walletConnect.accounts,
        chainId: walletConnect.chainId,
      });
    }
    dispatch(ConnectorActions.SUBSCRIBE_TO_EVENTS, provider);
    commit(ConnectorMutations.SET_WALLET_CONNECT, true);
    dispatch(ConnectorActions.REMOVE_FROM_LOCAL_STORAGE);
  },
  async [ConnectorActions.CONNECT_METAMASK]({ dispatch, commit }) {
    const ethereum = window.ethereum;
    if (!ethereum) {
      console.error("Metamask not installed");
      return;
    }
    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    dispatch(ConnectorActions.SUBSCRIBE_TO_EVENTS, provider);
    provider
      .send("eth_requestAccounts", [])
      .then(async (accounts) => {
        if (accounts.length > 0) {
          provider.getNetwork().then((network) => {
            dispatch(ConnectorActions.CHECK_CHAIN_ID, {
              provider: provider,
              accounts: accounts,
              chainId: network.chainId,
            });
          });
        }
      })
      .catch(() => {
        commit(ToastMutations.SET_ERROR, "User denied account access");
      });
    commit(ConnectorMutations.SET_WALLET_CONNECT, false);
  },
  [ConnectorActions.DISCONNECT]: async function ({ state, commit, dispatch }) {
    if (state.web3Provider === null) {
      commit(ConnectorMutations.SET_ACCOUNT, "");
    } else {
      const base = state.web3Provider.provider as ethers.providers.BaseProvider;
      base.removeListener("accountsChanged", state.listeners[0]);
      base.removeListener("chainChanged", state.listeners[1]);
      base.removeListener("disconnect", state.listeners[2]);
      commit(ConnectorMutations.SET_ACCOUNT, "");
      await dispatch(ConnectorActions.REMOVE_FROM_LOCAL_STORAGE);
    }
  },
  [ConnectorActions.CHECK_CHAIN_ID]: async function (
    { commit, dispatch, state },
    data: {
      provider: ethers.providers.Web3Provider;
      accounts: string[];
      chainId: number;
    }
  ) {
    if (data.chainId !== CHAIN_ID) {
      commit(ToastMutations.SET_ERROR, "Please connect to the correct network");
      await new Promise((r) => setTimeout(r, 1_000));
      data.provider
        .jsonRpcFetchFunc("wallet_switchEthereumChain", [
          { chainId: `0x${CHAIN_ID.toString(16)}` },
        ])
        .then(() => {
          console.info("Request sent");
        })
        .catch(() => {
          dispatch(ConnectorActions.DISCONNECT);
          dispatch(ConnectorActions.REMOVE_FROM_LOCAL_STORAGE);
        });
    } else {
      commit(ConnectorMutations.SET_WEB3_PROVIDER, data.provider);
      commit(ConnectorMutations.SET_ACCOUNT, data.accounts[0]);
      if (!state.walletConnect) {
        await dispatch(ConnectorActions.SAVE_TO_LOCAL_STORAGE);
      }
    }
  },
  [ConnectorActions.SUBSCRIBE_TO_EVENTS](
    { commit, dispatch, state },
    web3Provider: ethers.providers.Web3Provider
  ) {
    const baseProvider = web3Provider.provider as ethers.providers.BaseProvider;
    const listeners = [
      (accounts: string[]) => {
        console.log("accountsChanged", accounts);
        if (accounts.length > 0) {
          commit(ConnectorMutations.SET_ACCOUNT, accounts[0]);
          if (!state.walletConnect) {
            dispatch(ConnectorActions.SAVE_TO_LOCAL_STORAGE);
          }
        } else {
          commit(ToastMutations.SET_ERROR, "Wallet disconnected");
          dispatch(ConnectorActions.DISCONNECT);
        }
      },
      (chainId: string) => {
        console.log("chainChanged", chainId);
        dispatch(ConnectorActions.CHECK_CHAIN_ID, {
          provider: web3Provider,
          accounts: [state.account],
          chainId: parseInt(chainId, 16),
        });
      },
      () => {
        commit(ToastMutations.SET_ERROR, "Wallet disconnected");
        dispatch(ConnectorActions.DISCONNECT);
      },
    ];
    commit(ConnectorMutations.SET_LISTENERS, listeners);
    baseProvider.on("accountsChanged", listeners[0]);
    baseProvider.on("chainChanged", listeners[1]);
    baseProvider.on("disconnect", listeners[2]);
  },
  [ConnectorActions.SAVE_TO_LOCAL_STORAGE]({ state }) {
    localStorage.setItem("account", state.account);
  },
  [ConnectorActions.REMOVE_FROM_LOCAL_STORAGE]() {
    localStorage.removeItem("account");
  },
  [ConnectorActions.GET_FROM_LOCAL_STORAGE]({ dispatch }) {
    const account = localStorage.getItem("account");
    if (account) {
      const ethereum = window.ethereum;
      if (!ethereum) {
        console.error("Metamask not installed");
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      provider.send("eth_accounts", []).then((accounts) => {
        if (accounts.length > 0) {
          provider.getNetwork().then((network) => {
            dispatch(ConnectorActions.CHECK_CHAIN_ID, {
              provider: provider,
              accounts: accounts,
              chainId: network.chainId,
            });
          });
          dispatch(ConnectorActions.SUBSCRIBE_TO_EVENTS, provider);
        } else {
          dispatch(ConnectorActions.REMOVE_FROM_LOCAL_STORAGE);
        }
      });
    }
  },
};
