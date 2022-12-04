import { BreedingState } from "@/store/modules/breeding/types";
import { ActionTree } from "vuex";
import { RootState } from "@/store/types";
import {
  getConnectedContract,
  handleError,
  handleTxResults,
} from "@/store/utils";
import contractAddress from "@/assets/contract-address.json";
import IBreedingFactory from "@/assets/IBreedingFactory.json";
import { BreedingMutations } from "@/store/modules/breeding/mutations";
import { Gen1NftsBreeding } from "@/types/Interface";
import { Gen1Actions } from "@/store/modules/gen1/actions";
import { LoaderMutation } from "@/store/modules/loader/mutations";
import IErc20 from "@/assets/IErc20.json";
import { ethers } from "ethers";
import { Gen2Actions } from "@/store/modules/gen2/actions";

export enum BreedingActions {
  GET_SPEED_UP_LEVEL = "GET_SPEED_UP_LEVEL",
  BREED = "BREED",
  GET_BREEDING_FACTORY_APPROVED = "GET_BREEDING_FACTORY_APPROVED",
  APPROVE_BREEDING_FACTORY = "APPROVE_BREEDING_FACTORY",
  SPEED_UP_BREEDING = "SPEED_UP_BREEDING",
}

export const actions: ActionTree<BreedingState, RootState> = {
  async [BreedingActions.GET_SPEED_UP_LEVEL](
    { commit, rootState },
    tokenId: number
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.breedingFactory,
      IBreedingFactory,
      rootState.connector.web3Provider
    );
    const result = await contract.speedUpLevel(tokenId);
    commit(BreedingMutations.SET_SPEED_UP_LEVEL, result);
  },
  async [BreedingActions.BREED](
    { dispatch, commit, rootState },
    tokens: { token1: Gen1NftsBreeding; token2: Gen1NftsBreeding }
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.breedingFactory,
        IBreedingFactory,
        rootState.connector.web3Provider
      );
      const tx = await contract.breed(tokens.token1.id, tokens.token2.id);
      await handleTxResults(
        tx,
        commit,
        "You have successfully breeded your tokens !"
      );
      dispatch(Gen1Actions.GET_GEN1_NFTS_BREEDING);
      dispatch(Gen2Actions.GET_GEN2_NFTS);
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [BreedingActions.GET_BREEDING_FACTORY_APPROVED]({ commit, rootState }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.nRyu,
      IErc20,
      rootState.connector.web3Provider
    );
    const result = await contract.allowance(
      rootState.connector.account,
      contractAddress.breedingFactory
    );
    commit(
      BreedingMutations.SET_BREEDING_FACTORY_APPROVED,
      result.gte(ethers.utils.parseEther("8000"))
    );
  },
  async [BreedingActions.APPROVE_BREEDING_FACTORY]({
    dispatch,
    commit,
    rootState,
  }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.nRyu,
        IErc20,
        rootState.connector.web3Provider
      );
      const tx = await contract.approve(
        contractAddress.breedingFactory,
        ethers.constants.MaxUint256
      );
      if (
        await handleTxResults(
          tx,
          commit,
          "You have successfully approved your tokens !"
        )
      ) {
        commit(BreedingMutations.SET_BREEDING_FACTORY_APPROVED, true);
      } else {
        await dispatch(BreedingActions.GET_BREEDING_FACTORY_APPROVED);
      }
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [BreedingActions.SPEED_UP_BREEDING](
    { dispatch, commit, rootState },
    tokenId: number
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.breedingFactory,
        IBreedingFactory,
        rootState.connector.web3Provider
      );
      const tx = await contract.speedUp(tokenId);
      await handleTxResults(
        tx,
        commit,
        "You have successfully speed up the incubation of this token !"
      );
      await dispatch(Gen2Actions.GET_GEN2_NFTS);
      await dispatch(BreedingActions.GET_SPEED_UP_LEVEL, tokenId);
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
};
