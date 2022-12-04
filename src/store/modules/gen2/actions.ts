import { getConnectedContract, getImage } from "@/store/utils";
import contractAddress from "@/assets/contract-address.json";
import IGen2 from "@/assets/IGen2.json";
import { Gen2Nfts } from "@/types/Interface";
import { Gen2State } from "@/store/modules/gen2/types";
import { ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { Gen2Mutations } from "@/store/modules/gen2/mutations";

export enum Gen2Actions {
  GET_GEN2_NFTS = "GET_GEN2_NFTS",
}

export const actions: ActionTree<Gen2State, RootState> = {
  async [Gen2Actions.GET_GEN2_NFTS]({ rootState, commit }) {
    if (!rootState.connector.web3Provider) throw new Error("No web3 provider");
    const contract = getConnectedContract(
      contractAddress.gen2,
      IGen2,
      rootState.connector.web3Provider
    );
    const result = await contract.walletOfOwner(rootState.connector.account);
    const formatted: Gen2Nfts[] = [];
    for (const resultElement of result) {
      const uri = resultElement.uri;
      const response = await fetch(uri, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          accept: "application/json",
        },
      });
      const json = await response.json();
      const idParents = [
        resultElement.parents[0].toNumber(),
        resultElement.parents[1].toNumber(),
      ];
      let image = json.image;
      let current = false;
      if (json.image.includes("gif")) {
        image = image.replace(".gif", ".png");
        current = true;
      }
      if (json.image.includes("ipfs")) {
        const x = json.image.split("eck/")[1];
        image = "https://ryupng.s3.amazonaws.com/images/" + x;
      }
      formatted.push({
        id: resultElement.id.toNumber(),
        incubationTime: resultElement.incubationTime.toNumber(),
        metadata: json,
        image,
        uri,
        parent1Image: getImage(idParents[0]),
        parent2Image: getImage(idParents[1]),
        current,
      });
    }
    commit(Gen2Mutations.SET_GEN2_NFTS, formatted);
  },
};
