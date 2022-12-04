import { ActionTree } from "vuex";
import { LabsState } from "@/store/modules/labs/types";
import { RootState } from "@/store/types";
import {
  getConnectedContract,
  handleError,
  handleTxResults,
} from "@/store/utils";
import contractAddress from "@/assets/contract-address.json";
import ILabs from "@/assets/ILabs.json";
import { LabsMutation } from "@/store/modules/labs/mutations";
import IErc20 from "@/assets/IErc20.json";
import { ethers } from "ethers";
import { LoaderMutation } from "@/store/modules/loader/mutations";
import { Gen2Actions } from "@/store/modules/gen2/actions";

export enum LabsActions {
  GET_POTIONS_USAGE = "GET_POTIONS_USAGE",
  GET_LABS_APPROVED = "GET_LABS_APPROVED",
  APPROVE_LABS = "APPROVE_LABS",
  FRATERNAL_POTION = "FRATERNAL_POTION",
  IDENTICAL_POTION = "IDENTICAL_POTION",
  STRIP_DOWN_POTION = "STRIP_DOWN_POTION",
}

export const actions: ActionTree<LabsState, RootState> = {
  async [LabsActions.GET_POTIONS_USAGE](
    { commit, rootState },
    tokenId: number
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.labs,
      ILabs,
      rootState.connector.web3Provider
    );
    const result = await contract.getPotionsUsageForToken(tokenId);
    commit(LabsMutation.SET_POTIONS_USAGE, result);
  },
  async [LabsActions.GET_LABS_APPROVED]({ commit, rootState }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.nRyu,
      IErc20,
      rootState.connector.web3Provider
    );
    const result = await contract.allowance(
      rootState.connector.account,
      contractAddress.labs
    );
    commit(
      LabsMutation.SET_LABS_APPROVED,
      result.gte(ethers.utils.parseEther("8000"))
    );
  },
  async [LabsActions.APPROVE_LABS]({ dispatch, commit, rootState }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.nRyu,
        IErc20,
        rootState.connector.web3Provider
      );
      const tx = await contract.approve(
        contractAddress.labs,
        ethers.constants.MaxUint256
      );
      if (
        await handleTxResults(
          tx,
          commit,
          "You have successfully approved your tokens !"
        )
      ) {
        commit(LabsMutation.SET_LABS_APPROVED, true);
      } else {
        await dispatch(LabsActions.GET_LABS_APPROVED);
      }
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [LabsActions.FRATERNAL_POTION](
    { dispatch, commit, rootState },
    tokenId: number
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.labs,
        ILabs,
        rootState.connector.web3Provider
      );
      const tx = await contract.fraternalTwins(tokenId);
      await handleTxResults(
        tx,
        commit,
        "You have successfully used the fraternal potion on this token !"
      );
      await dispatch(Gen2Actions.GET_GEN2_NFTS);
      await dispatch(LabsActions.GET_POTIONS_USAGE, tokenId);
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [LabsActions.IDENTICAL_POTION](
    { dispatch, commit, rootState },
    tokenId: number
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.labs,
        ILabs,
        rootState.connector.web3Provider
      );
      const tx = await contract.identicalTwins(tokenId);
      await handleTxResults(
        tx,
        commit,
        "You have successfully used the identical twins potion on this token !"
      );
      await dispatch(Gen2Actions.GET_GEN2_NFTS);
      await dispatch(LabsActions.GET_POTIONS_USAGE, tokenId);
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [LabsActions.STRIP_DOWN_POTION](
    { dispatch, commit, rootState },
    tokenId: number
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.labs,
        ILabs,
        rootState.connector.web3Provider
      );
      const tx = await contract.stripDown(tokenId);
      await handleTxResults(
        tx,
        commit,
        "You have successfully used the strip down potion on this token !"
      );
      await dispatch(Gen2Actions.GET_GEN2_NFTS);
      await dispatch(LabsActions.GET_POTIONS_USAGE, tokenId);
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
};
