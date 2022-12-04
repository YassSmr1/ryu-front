import { MutationTree } from "vuex";
import { BreedingState } from "@/store/modules/breeding/types";

export enum BreedingMutations {
  SET_SPEED_UP_LEVEL = "SET_SPEED_UP_LEVEL",
  SET_BREEDING_FACTORY_APPROVED = "SET_BREEDING_FACTORY_APPROVED",
}

export const mutations: MutationTree<BreedingState> = {
  [BreedingMutations.SET_SPEED_UP_LEVEL](state, speedUpLevel: number) {
    state.speedUpLevel = speedUpLevel;
  },
  [BreedingMutations.SET_BREEDING_FACTORY_APPROVED](
    state,
    breedingFactoryApproved: boolean
  ) {
    state.breedingFactoryApproved = breedingFactoryApproved;
  },
};
