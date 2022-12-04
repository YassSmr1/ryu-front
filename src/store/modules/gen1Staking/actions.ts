import { ActionTree } from "vuex";
import { Gen1StakingState } from "@/store/modules/gen1Staking/types";
import { RootState } from "@/store/types";
import {
  getConnectedContract,
  handleError,
  handleTxResults,
  parseGen1Data,
} from "@/store/utils";
import contractAddress from "@/assets/contract-address.json";
import IStakingNft from "@/assets/IStakingNft.json";
import { Gen1Nfts } from "@/types/Interface";
import { Gen1StakingMutations } from "@/store/modules/gen1Staking/mutations";
import INft from "@/assets/INft.json";
import { LoaderMutation } from "@/store/modules/loader/mutations";
import { Gen1Mutations } from "@/store/modules/gen1/mutations";
import { Gen1Actions } from "@/store/modules/gen1/actions";

export enum Gen1StakingActions {
  GET_STAKED_GEN1_NFT = "GET_STAKED_GEN1_NFT",
  GET_NFT_STAKING_GEN1_APPROVED = "GET_NFT_STAKING_GEN1_APPROVED",
  APPROVE_NFT_STAKING_GEN1 = "APPROVE_NFT_STAKING_GEN1",
  STAKE_GEN1_NFT = "STAKE_GEN1_NFT",
  CLAIM_GEN1_NFT = "CLAIM_GEN1_NFT",
  CLAIM_ALL_GEN1_NFT = "CLAIM_ALL_GEN1_NFT",
}

export const actions: ActionTree<Gen1StakingState, RootState> = {
  async [Gen1StakingActions.GET_STAKED_GEN1_NFT]({ rootState, commit }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.nftStakingContractAddress,
      IStakingNft,
      rootState.connector.web3Provider
    );
    const result = await contract.getStakedNftsOfOwner(
      rootState.connector.account
    );
    const formatted: Gen1Nfts[] = [];
    for (const stakingData of result) {
      formatted.push(parseGen1Data(stakingData, true));
    }
    commit(Gen1StakingMutations.SET_STAKED_GEN1_NFT, formatted);
  },
  async [Gen1StakingActions.GET_NFT_STAKING_GEN1_APPROVED]({
    commit,
    rootState,
  }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.nftContractAddress,
      INft,
      rootState.connector.web3Provider
    );
    const result = await contract.isApprovedForAll(
      rootState.connector.account,
      contractAddress.nftStakingContractAddress
    );
    commit(Gen1StakingMutations.SET_NFT_STAKING_GEN1_APPROVED, result);
  },
  async [Gen1StakingActions.APPROVE_NFT_STAKING_GEN1]({
    dispatch,
    commit,
    rootState,
  }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.nftContractAddress,
        INft,
        rootState.connector.web3Provider
      );
      const tx = await contract.setApprovalForAll(
        contractAddress.nftStakingContractAddress,
        true
      );
      if (
        await handleTxResults(
          tx,
          commit,
          "You have successfully approved your tokens !"
        )
      ) {
        commit(Gen1StakingMutations.SET_NFT_STAKING_GEN1_APPROVED, true);
      } else {
        dispatch(Gen1StakingActions.GET_NFT_STAKING_GEN1_APPROVED);
      }
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [Gen1StakingActions.STAKE_GEN1_NFT](
    { dispatch, commit, state, rootState },
    selectedNfts: Gen1Nfts[]
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const ids = [];
      for (const selectedNft of selectedNfts) {
        ids.push(selectedNft.id);
      }
      const contract = getConnectedContract(
        contractAddress.nftStakingContractAddress,
        IStakingNft,
        rootState.connector.web3Provider
      );
      const tx = await contract.batchStake(ids);
      if (
        await handleTxResults(
          tx,
          commit,
          "You have successfully staked your tokens !"
        )
      ) {
        const gen1Nfts = rootState.gen1.gen1Nfts;
        const newStaked = state.stakedGen1nft;
        for (const selectedNft of selectedNfts) {
          const index = gen1Nfts.findIndex((nft) => nft.id === selectedNft.id);
          if (index !== -1) {
            gen1Nfts[index].staked = true;
            newStaked.push(gen1Nfts.splice(index, 1)[0]);
          }
        }
        commit(Gen1Mutations.SET_GEN1_NFTS, gen1Nfts);
        commit(Gen1StakingMutations.SET_STAKED_GEN1_NFT, newStaked);
      } else {
        dispatch(Gen1StakingActions.GET_STAKED_GEN1_NFT);
      }
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [Gen1StakingActions.CLAIM_GEN1_NFT](
    { dispatch, commit, state, rootState },
    data: { id: number; unStake: boolean }
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.nftStakingContractAddress,
        IStakingNft,
        rootState.connector.web3Provider
      );
      const tx = await contract.claim(data.id, data.unStake);
      if (
        await handleTxResults(
          tx,
          commit,
          "You have successfully " +
            (data.unStake ? "unstaked" : "claimed") +
            " your tokens !"
        )
      ) {
        const gen1Nfts = rootState.gen1.gen1Nfts;
        const newStaked = state.stakedGen1nft;
        const index = newStaked.findIndex((nft) => nft.id === data.id);
        if (index !== -1) {
          newStaked[index].claimable = "0";
          if (data.unStake) {
            newStaked[index].staked = false;
            gen1Nfts.push(newStaked.splice(index, 1)[0]);
          }
        }
        commit(Gen1Mutations.SET_GEN1_NFTS, gen1Nfts);
        commit(Gen1StakingMutations.SET_STAKED_GEN1_NFT, newStaked);
      } else {
        dispatch(Gen1Actions.GET_GEN1_NFTS);
      }
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [Gen1StakingActions.CLAIM_ALL_GEN1_NFT](
    { dispatch, commit, state, rootState },
    unStake: boolean
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.nftStakingContractAddress,
        IStakingNft,
        rootState.connector.web3Provider
      );
      const tx = await contract.claimAll(unStake);
      if (
        await handleTxResults(
          tx,
          commit,
          "You have successfully " +
            (unStake ? "unstaked" : "claimed") +
            " your tokens !"
        )
      ) {
        const stakedGen1nft = state.stakedGen1nft;
        for (const nft of stakedGen1nft) {
          nft.claimable = "0";
          if (unStake) {
            nft.staked = false;
          }
        }
        const newGen1nft = rootState.gen1.gen1Nfts;
        if (unStake) {
          newGen1nft.push(...stakedGen1nft);
          commit(Gen1StakingMutations.SET_STAKED_GEN1_NFT, []);
          commit(Gen1Mutations.SET_GEN1_NFTS, newGen1nft);
        }
      } else {
        dispatch(Gen1Actions.GET_GEN1_NFTS);
      }
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
};
