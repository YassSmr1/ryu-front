import { ActionTree } from "vuex";
import { NRyuStakingState } from "@/store/modules/nRyuStaking/types";
import { RootState } from "@/store/types";
import {
  getConnectedContract,
  handleError,
  handleTxResults,
} from "@/store/utils";
import contractAddress from "@/assets/contract-address.json";
import IGRyu from "@/assets/IGryuToken.json";
import { ethers } from "ethers";
import moment from "moment/moment";
import { NRyuTokenStaked } from "@/types/Interface";
import { NRyuStakingMutations } from "@/store/modules/nRyuStaking/mutations";
import { ToastMutations } from "@/store/modules/toast/mutations";
import { NRyuMutation } from "@/store/modules/nRyu/mutations";
import { LoaderMutation } from "@/store/modules/loader/mutations";
import { NRyuActions } from "@/store/modules/nRyu/actions";

export enum NRyuStakingActions {
  GET_NRYU_TOKEN_STAKED = "getNRyuTokenStaked",
  GET_CLAIMABLE_NRYU_TOKEN = "getClaimableNRyuToken",
  WITHDRAW_NRYU_TOKEN = "withdrawNRyuToken",
  STAKE_NRYU_TOKEN = "stakeNRyuToken",
}

export const actions: ActionTree<NRyuStakingState, RootState> = {
  async [NRyuStakingActions.GET_NRYU_TOKEN_STAKED]({
    commit,
    rootState,
    dispatch,
  }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.gRyu,
      IGRyu,
      rootState.connector.web3Provider
    );
    const result = await contract.nRYUStakeHolders(rootState.connector.account);
    const rawAmount = ethers.utils.formatEther(result.amount);
    const amount = parseFloat(rawAmount).toFixed(3);
    if (amount === "0.000") return;
    const startDate = moment(result.since * 1000);
    const endDate = moment(result.since * 1000).add(14, "days");
    const nRyuTokenStaked: NRyuTokenStaked = {
      amount,
      earnings: await dispatch(NRyuStakingActions.GET_CLAIMABLE_NRYU_TOKEN),
      status: 0,
      color: Math.floor(Math.random() * 16777215).toString(16),
      startDate,
      endDate,
    };
    commit(NRyuStakingMutations.SET_NRYU_TOKEN_STAKED, [nRyuTokenStaked]);
    if (rootState.nRyu.nRyuToken) {
      if (parseFloat(rootState.nRyu.nRyuToken) === 0) {
        commit(NRyuStakingMutations.SET_PERCENTAGE_STAKED, 100);
      } else {
        commit(
          NRyuStakingMutations.SET_PERCENTAGE_STAKED,
          (
            (parseFloat(rawAmount) /
              parseFloat(rootState.nRyu.nRyuToken as string)) *
            100
          ).toFixed(2)
        );
      }
    }
  },
  async [NRyuStakingActions.GET_CLAIMABLE_NRYU_TOKEN]({ rootState }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.gRyu,
      IGRyu,
      rootState.connector.web3Provider
    );
    const result = ethers.utils.formatEther(
      await contract.claimableView(rootState.connector.account)
    );
    return parseFloat(result).toFixed(3);
  },
  async [NRyuStakingActions.WITHDRAW_NRYU_TOKEN]({ commit, state, rootState }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.gRyu,
        IGRyu,
        rootState.connector.web3Provider
      );
      const tx = await contract.withdrawAllnRYUAndClaimGRYU();
      const receipt = await tx.wait();
      if (receipt.status !== 1) {
        commit(ToastMutations.SET_ERROR, "Transaction error");
      } else {
        commit(
          ToastMutations.SET_SUCCESS,
          "You have successfully unstaked and claimed your tokens !"
        );
      }
      if (state.nRyuTokenStaked.length > 0) {
        commit(
          NRyuMutation.SET_NRYU_TOKEN,
          (
            parseFloat(state.nRyuTokenStaked[0].amount) +
            parseFloat(rootState.nRyu.nRyuToken)
          ).toFixed(3)
        );
        commit(NRyuStakingMutations.SET_NRYU_TOKEN_STAKED, []);
        commit(NRyuStakingMutations.SET_PERCENTAGE_STAKED, 0);
      }
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
  async [NRyuStakingActions.STAKE_NRYU_TOKEN](
    { dispatch, commit, rootState },
    amount: string
  ) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    try {
      const contract = getConnectedContract(
        contractAddress.gRyu,
        IGRyu,
        rootState.connector.web3Provider
      );
      const tx = await contract.staking(ethers.utils.parseEther(amount));
      await handleTxResults(
        tx,
        commit,
        "You have successfully staked your tokens !"
      );
      dispatch(NRyuActions.GET_NRYU_TOKEN);
      dispatch(NRyuStakingActions.GET_NRYU_TOKEN_STAKED);
      commit(LoaderMutation.SET_LOADING, false);
    } catch (e) {
      handleError(e, commit);
    }
  },
};
