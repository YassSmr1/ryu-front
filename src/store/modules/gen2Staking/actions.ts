import { ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { Gen2StakingState } from "@/store/modules/gen2Staking/types";
import {
  getConnectedContract,
  getRank,
  handleError,
  handleTxResults,
} from "@/store/utils";
import contractAddress from "@/assets/contract-address.json";
import IRyusaurView from "@/assets/IRyusaurView.json";
import { Gen2StakingData, LeaderboardData, Ryusaur } from "@/types/Interface";
import { Gen2StakingMutations } from "@/store/modules/gen2Staking/mutations";
import IGen2Staking from "@/assets/IGen2Staking.json";
import IGen2 from "@/assets/IGen2.json";
import INft from "@/assets/INft.json";
import { ethers } from "ethers";
import { LoaderMutation } from "@/store/modules/loader/mutations";
import IErc20 from "@/assets/IErc20.json";
import moment from "moment";

export enum Gen2StakingActions {
  GET_STAKED_GEN2_NFTS = "GET_STAKED_GEN2_NFTS",
  GET_RYUSAURS = "GET_RYUSAURS",
  GET_STAKING_GEN2_APPROVED = "GET_STAKING_GEN2_APPROVED",
  APPROVE_STAKING_GEN2 = "APPROVE_STAKING_GEN2",
  STAKE = "STAKE",
  UNSTAKE = "UNSTAKE",
  GET_RYUSAUR_APPROVED = "GET_RYUSAUR_APPROVED",
  RYUSAUR_BOOST = "RYUSAUR_BOOST",
  REMOVE_RYUSAUR = "REMOVE_RYUSAUR",
  APPROVE_RYUSAURS = "APPROVE_RYUSAURS",
  UPGRADE = "UPGRADE",
  CLAIM = "CLAIM",
  GET_NRYU_APPROVE = "GET_NRYU_APPROVE",
  APPROVE_NRYU = "APPROVE_NRYU",
  GET_LEADERBOARD = "GET_LEADERBOARD",
}

export const actions: ActionTree<Gen2StakingState, RootState> = {
  async [Gen2StakingActions.GET_STAKED_GEN2_NFTS]({ commit, rootState }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.gen2staking,
      IGen2Staking,
      rootState.connector.web3Provider
    );
    const result = await contract.stakingDataOfUser(
      rootState.connector.account
    );
    const formatted: Gen2StakingData[] = [];
    for (const stakingData of result) {
      const rank = getRank(stakingData.level);
      const boostImg = [];
      if (stakingData.ryusaurTokenId > 0)
        boostImg.push(
          `https://ryupng.s3.amazonaws.com/ryusaurs/${stakingData.ryusaurTokenId}.png`
        );
      if (stakingData.boosted) boostImg.push("/boost.png");
      if (stakingData.hatched) {
        formatted.push({
          id: stakingData.tokenId,
          level: stakingData.level,
          image: `https://ryu-metadata.herokuapp.com/api/png/${stakingData.tokenId}.png`,
          rank,
          upgradeTimestamp:
            stakingData.upgradeTimestamp > 0
              ? moment(stakingData.upgradeTimestamp * 1000)
              : moment(1),
          staked: stakingData.staked,
          boostImg,
          levelUpCost: parseFloat(
            ethers.utils.formatEther(stakingData.levelUpCost.toString())
          ).toFixed(3),
          claimable: parseFloat(
            ethers.utils.formatEther(stakingData.claimable.toString())
          ).toFixed(3),
          earnings: parseFloat(
            ethers.utils.formatEther(stakingData.earnings.toString())
          ).toFixed(3),
          potionCount: stakingData.potionCount,
        });
      }
    }
    commit(Gen2StakingMutations.SET_STAKED_GEN2_NFTS, formatted);
  },
  async [Gen2StakingActions.GET_RYUSAURS]({ commit, rootState }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.ryusaurView,
      IRyusaurView,
      rootState.connector.web3Provider
    );
    const result = await contract.getUnstakedNfts(rootState.connector.account);
    const formatted: Ryusaur[] = [];
    for (const stakingData of result) {
      formatted.push({
        id: stakingData,
        image: `https://ryupng.s3.amazonaws.com/ryusaurs/${stakingData}.png`,
      });
    }
    commit(Gen2StakingMutations.SET_RYUSAURS, formatted);
  },
  async [Gen2StakingActions.GET_STAKING_GEN2_APPROVED]({ commit, rootState }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.gen2,
      IGen2,
      rootState.connector.web3Provider
    );
    const result = await contract.isApprovedForAll(
      rootState.connector.account,
      contractAddress.gen2staking
    );
    commit(Gen2StakingMutations.SET_STAKING_GEN2_APPROVED, result);
  },
  async [Gen2StakingActions.GET_NRYU_APPROVE]({ commit, rootState }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.nRyu,
      IErc20,
      rootState.connector.web3Provider
    );
    const result = await contract.allowance(
      rootState.connector.account,
      contractAddress.gen2staking
    );
    commit(
      Gen2StakingMutations.SET_N_RYU_APPROVED,
      result.gte(ethers.utils.parseEther("4000"))
    );
  },
  async [Gen2StakingActions.APPROVE_NRYU]({ dispatch, commit, rootState }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.nRyu,
        IErc20,
        rootState.connector.web3Provider
      );
      const tx = await contract.approve(
        contractAddress.gen2staking,
        ethers.constants.MaxUint256
      );
      if (
        await handleTxResults(
          tx,
          commit,
          "You have successfully approved your tokens !"
        )
      ) {
        commit(Gen2StakingMutations.SET_N_RYU_APPROVED, true);
      } else {
        await dispatch(Gen2StakingActions.GET_NRYU_APPROVE);
      }
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [Gen2StakingActions.GET_RYUSAUR_APPROVED]({ commit, rootState }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.ryusaur,
      INft,
      rootState.connector.web3Provider
    );
    const result = await contract.isApprovedForAll(
      rootState.connector.account,
      contractAddress.gen2staking
    );
    commit(Gen2StakingMutations.SET_RYUSAUR_APPROVED, result);
  },
  async [Gen2StakingActions.APPROVE_STAKING_GEN2]({
    dispatch,
    commit,
    rootState,
  }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.gen2,
        IGen2,
        rootState.connector.web3Provider
      );
      const tx = await contract.setApprovalForAll(
        contractAddress.gen2staking,
        true
      );
      if (
        await handleTxResults(
          tx,
          commit,
          "You have successfully approved your tokens !"
        )
      ) {
        commit(Gen2StakingMutations.SET_STAKING_GEN2_APPROVED, true);
      } else {
        dispatch(Gen2StakingActions.GET_STAKING_GEN2_APPROVED);
      }
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [Gen2StakingActions.APPROVE_RYUSAURS]({ dispatch, commit, rootState }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.ryusaur,
        INft,
        rootState.connector.web3Provider
      );
      const tx = await contract.setApprovalForAll(
        contractAddress.gen2staking,
        true
      );
      if (
        await handleTxResults(
          tx,
          commit,
          "You have successfully approved your tokens !"
        )
      ) {
        commit(Gen2StakingMutations.SET_RYUSAUR_APPROVED, true);
      } else {
        dispatch(Gen2StakingActions.GET_RYUSAUR_APPROVED);
      }
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [Gen2StakingActions.STAKE](
    { dispatch, commit, state, rootState },
    selectedNfts: Gen2StakingData[]
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const ids = [];
      for (const selectedNft of selectedNfts) {
        ids.push(selectedNft.id);
      }
      const contract = getConnectedContract(
        contractAddress.gen2staking,
        IGen2Staking,
        rootState.connector.web3Provider
      );
      const tx = await contract.stake(ids);
      if (
        await handleTxResults(
          tx,
          commit,
          "You have successfully staked your tokens !"
        )
      ) {
        const newStaked = state.stakedGen2Nft;
        for (const selectedNft of selectedNfts) {
          const index = newStaked.findIndex((nft) => nft.id === selectedNft.id);
          if (index !== -1) {
            newStaked[index].staked = true;
          }
        }
        commit(Gen2StakingMutations.SET_STAKED_GEN2_NFTS, newStaked);
      } else {
        dispatch(Gen2StakingActions.GET_STAKED_GEN2_NFTS);
      }
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [Gen2StakingActions.UNSTAKE](
    { dispatch, commit, state, rootState },
    selectedNfts: Gen2StakingData[]
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const ids = [];
      for (const selectedNft of selectedNfts) {
        ids.push(selectedNft.id);
      }
      const contract = getConnectedContract(
        contractAddress.gen2staking,
        IGen2Staking,
        rootState.connector.web3Provider
      );
      const tx = await contract.unstake(ids);
      if (
        await handleTxResults(
          tx,
          commit,
          "You have successfully unstaked your tokens !"
        )
      ) {
        const newStaked = state.stakedGen2Nft;
        for (const selectedNft of selectedNfts) {
          const index = newStaked.findIndex((nft) => nft.id === selectedNft.id);
          if (index !== -1) {
            newStaked[index].staked = false;
            newStaked[index].claimable = "0";
            newStaked[index].boostImg = [];
          }
        }
        commit(Gen2StakingMutations.SET_STAKED_GEN2_NFTS, newStaked);
      } else {
        dispatch(Gen2StakingActions.GET_STAKED_GEN2_NFTS);
      }
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [Gen2StakingActions.CLAIM](
    { dispatch, commit, state, rootState },
    selectedNfts: Gen2StakingData[]
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const ids = [];
      for (const selectedNft of selectedNfts) {
        ids.push(selectedNft.id);
      }
      const contract = getConnectedContract(
        contractAddress.gen2staking,
        IGen2Staking,
        rootState.connector.web3Provider
      );
      const tx = await contract.claim(ids);
      if (
        await handleTxResults(
          tx,
          commit,
          "You have successfully claimed your tokens !"
        )
      ) {
        const newStaked = state.stakedGen2Nft;
        for (const selectedNft of selectedNfts) {
          const index = newStaked.findIndex((nft) => nft.id === selectedNft.id);
          if (index !== -1) {
            newStaked[index].claimable = "0";
          }
        }
        commit(Gen2StakingMutations.SET_STAKED_GEN2_NFTS, newStaked);
      } else {
        dispatch(Gen2StakingActions.GET_STAKED_GEN2_NFTS);
      }
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [Gen2StakingActions.UPGRADE](
    { dispatch, commit, rootState },
    data: { id: number; boost: boolean }
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.gen2staking,
        IGen2Staking,
        rootState.connector.web3Provider
      );
      const tx = await contract.upgrade(data.id, data.boost);
      await handleTxResults(
        tx,
        commit,
        "You have successfully upgraded your tokens !"
      );
      await new Promise((r) => setTimeout(r, 3000));
      await dispatch(Gen2StakingActions.GET_STAKED_GEN2_NFTS);
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [Gen2StakingActions.RYUSAUR_BOOST](
    { dispatch, commit, state, rootState },
    data: { id: number; ryusaurId: number }
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.gen2staking,
        IGen2Staking,
        rootState.connector.web3Provider
      );
      const tx = await contract.addRyusaur(data.id, data.ryusaurId);
      if (
        await handleTxResults(
          tx,
          commit,
          "You have successfully added a ryusaur !"
        )
      ) {
        const newStaked = state.stakedGen2Nft;
        const index = newStaked.findIndex((nft) => nft.id === data.id);
        newStaked[index].boostImg.push(
          `https://ryupng.s3.amazonaws.com/ryusaurs/${data.ryusaurId}.png`
        );
        commit(Gen2StakingMutations.SET_STAKED_GEN2_NFTS, newStaked);
        const ryusaurs = state.ryusaurs;
        const ryusaurIndex = ryusaurs.findIndex(
          (ryusaur) => ryusaur.id === data.ryusaurId
        );
        ryusaurs.splice(ryusaurIndex, 1);
        commit(Gen2StakingMutations.SET_RYUSAURS, ryusaurs);
      } else {
        dispatch(Gen2StakingActions.GET_STAKED_GEN2_NFTS);
      }
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [Gen2StakingActions.REMOVE_RYUSAUR](
    { dispatch, commit, state, rootState },
    id: number
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.gen2staking,
        IGen2Staking,
        rootState.connector.web3Provider
      );
      const tx = await contract.removeRyusaur(id);
      if (
        await handleTxResults(
          tx,
          commit,
          "You have successfully removed a ryusaur !"
        )
      ) {
        const newStaked = state.stakedGen2Nft;
        const index = newStaked.findIndex((nft) => nft.id === id);

        const ryusaurIndex = newStaked[index].boostImg.findIndex((img) =>
          img.includes("ryusaur")
        );
        const stringsRyusaur = newStaked[index].boostImg.splice(
          ryusaurIndex,
          1
        );
        const ryusaurId = parseInt(
          stringsRyusaur[0]
            .split("https://ryupng.s3.amazonaws.com/ryusaurs/")[1]
            .split(".png")[0]
        );
        commit(Gen2StakingMutations.SET_STAKED_GEN2_NFTS, newStaked);
        const ryusaurs = state.ryusaurs;
        ryusaurs.push({ id: ryusaurId, image: stringsRyusaur[0] });
        commit(Gen2StakingMutations.SET_RYUSAURS, ryusaurs);
      } else {
        dispatch(Gen2StakingActions.GET_STAKED_GEN2_NFTS);
      }
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [Gen2StakingActions.GET_LEADERBOARD]({ commit, rootState }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.gen2staking,
      IGen2Staking,
      rootState.connector.web3Provider
    );
    const gen2Contract = getConnectedContract(
      contractAddress.gen2,
      IGen2,
      rootState.connector.web3Provider
    );
    const totalSupply = (await gen2Contract.totalSupply()).toNumber();
    const result = await contract.getLevelAndRankInRange(1, totalSupply + 1);
    const formatted: LeaderboardData[] = [];
    for (const stakingData of result) {
      const rank = getRank(stakingData.level);
      formatted.push({
        id: stakingData.tokenId,
        level: stakingData.level,
        tier: stakingData.tier,
        image: `https://ryu-metadata.herokuapp.com/api/png/${stakingData.tokenId}.png`,
        rank,
      });
    }
    const sorted = formatted.sort(
      (a, b) => b.level * (b.tier + 1) - a.level * (a.tier + 1)
    );
    commit(Gen2StakingMutations.SET_LEADERBOARD, sorted.slice(0, 7));
  },
};
