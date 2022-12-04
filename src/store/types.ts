import { ConnectorState } from "@/store/modules/connector/types";
import { ToastState } from "@/store/modules/toast/type";
import { LabsState } from "@/store/modules/labs/types";
import { Gen1State } from "@/store/modules/gen1/types";
import { BreedingState } from "@/store/modules/breeding/types";
import { Gen2State } from "@/store/modules/gen2/types";
import { NRyuState } from "@/store/modules/nRyu/types";
import { NRyuStakingState } from "@/store/modules/nRyuStaking/types";
import { Gen1StakingState } from "@/store/modules/gen1Staking/types";
import { LoaderState } from "@/store/modules/loader/types";
import { Gen2StakingState } from "@/store/modules/gen2Staking/types";

export interface RootState {
  labs: LabsState;
  gen1: Gen1State;
  gen1Staking: Gen1StakingState;
  gen2Staking: Gen2StakingState;
  gen2: Gen2State;
  nRyu: NRyuState;
  nRyuStaking: NRyuStakingState;
  loader: LoaderState;
  breeding: BreedingState;
  connector: ConnectorState;
  toast: ToastState;
}
