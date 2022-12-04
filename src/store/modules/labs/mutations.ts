import { MutationTree } from "vuex";
import { LabsState } from "@/store/modules/labs/types";

export enum LabsMutation {
  SET_LABS_APPROVED = "SET_LABS_APPROVED",
  SET_POTIONS_USAGE = "SET_POTIONS_USAGE",
}

export const mutations: MutationTree<LabsState> = {
  [LabsMutation.SET_LABS_APPROVED](state, labsApproved) {
    state.labsApproved = labsApproved;
  },
  [LabsMutation.SET_POTIONS_USAGE](state, potionsUsage) {
    state.potionsUsage = potionsUsage;
  },
};
