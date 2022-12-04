import { getConnectedContract } from "@/store/utils";
import contractAddress from "@/assets/contract-address.json";
import INryu from "@/assets/INryu.json";
import { ethers } from "ethers";
import { ActionTree } from "vuex";
import { NRyuState } from "@/store/modules/nRyu/types";
import { RootState } from "@/store/types";
import { NRyuMutation } from "@/store/modules/nRyu/mutations";

export enum NRyuActions {
  GET_NRYU_TOKEN = "GET_NRYU_TOKEN",
}

export const actions: ActionTree<NRyuState, RootState> = {
  async [NRyuActions.GET_NRYU_TOKEN]({ commit, rootState }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.nRyu,
      INryu,
      rootState.connector.web3Provider
    );
    const result = ethers.utils.formatEther(
      await contract.balanceOf(rootState.connector.account)
    );
    const formatted = parseFloat(result).toFixed(3);
    commit(NRyuMutation.SET_NRYU_TOKEN, formatted);
  },
};
