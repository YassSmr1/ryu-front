import { getConnectedContract, parseGen1Data } from "@/store/utils";
import contractAddress from "@/assets/contract-address.json";
import INftView from "@/assets/INftView.json";
import { Gen1Nfts } from "@/types/Interface";
import { ActionTree } from "vuex";
import { Gen1State } from "@/store/modules/gen1/types";
import { RootState } from "@/store/types";
import { Gen1Mutations } from "@/store/modules/gen1/mutations";
import IBreedingFactory from "@/assets/IBreedingFactory.json";

export enum Gen1Actions {
  GET_GEN1_NFTS = "GET_GEN1_NFTS",
  GET_GEN1_NFTS_BREEDING = "GET_GEN1_NFTS_BREEDING",
}

export const actions: ActionTree<Gen1State, RootState> = {
  async [Gen1Actions.GET_GEN1_NFTS]({ rootState, commit }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.nftView,
      INftView,
      rootState.connector.web3Provider
    );
    const result = await contract.getUnstakedNfts(rootState.connector.account);
    const formatted: Gen1Nfts[] = [];
    for (const stakingData of result) {
      formatted.push(parseGen1Data(stakingData, false));
    }
    commit(Gen1Mutations.SET_GEN1_NFTS, formatted);
  },
  async [Gen1Actions.GET_GEN1_NFTS_BREEDING]({ rootState, commit }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    let contract = getConnectedContract(
      contractAddress.nftView,
      INftView,
      rootState.connector.web3Provider
    );
    const result = await contract.getUnstakedNfts(rootState.connector.account);
    const formatted: Gen1Nfts[] = [];
    for (const stakingData of result) {
      formatted.push(parseGen1Data(stakingData, false));
    }
    contract = getConnectedContract(
      contractAddress.breedingFactory,
      IBreedingFactory,
      rootState.connector.web3Provider
    );
    const tokenIds = formatted.map((nft) => nft.id);
    const stamina = await contract.getStaminaForTokens(tokenIds);
    const final = formatted.map((nft, index) => {
      let percent = stamina[index].toNumber();
      if (percent !== 0) {
        if (nft.power === "Legendary") {
          percent = 100 - (100 * percent) / 30;
        } else {
          percent = 100 - (100 * percent) / 20;
        }
      } else {
        percent = 100;
      }
      return {
        ...nft,
        stamina: parseFloat(percent.toFixed(2)),
      };
    });
    commit(Gen1Mutations.SET_GEN1_NFTS_BREEDING, final);
  },
};
