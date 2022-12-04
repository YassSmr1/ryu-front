import moment from "moment";
import { BigNumber } from "ethers";

export interface NRyuTokenStaked {
  amount: string;
  earnings: string;
  status: number;
  color: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
}

export interface Gen1Nfts {
  id: number;
  power: string;
  staked: boolean;
  earning: string;
  claimable: string;
  image: string;
  tokenId: number;
  metadata: Metadata | null;
}

export interface StakingData {
  accrual: BigNumber;
  rewardPerday: BigNumber;
  tokenId: BigNumber;
  tokenURI: string;
}

export interface Gen2Nfts {
  id: number;
  incubationTime: number;
  uri: string;
  metadata: Metadata | null;
  image: string;
  parent1Image: string;
  parent2Image: string;
  current: boolean;
}

export interface Gen2StakingData {
  id: number;
  level: number;
  image: string;
  rank: string;
  staked: boolean;
  boostImg: string[];
  levelUpCost: string;
  upgradeTimestamp: moment.Moment;
  earnings: string;
  claimable: string;
  potionCount: number;
}

export interface Ryusaur {
  id: number;
  image: string;
}

export interface LeaderboardData {
  id: number;
  level: number;
  tier: number;
  rank: string;
  image: string;
}

export interface Gen1NftsBreeding {
  id: number;
  power: string;
  staked: boolean;
  earning: string;
  claimable: string;
  image: string;
  tokenId: number;
  metadata: Metadata | null;
  stamina: number;
}

export interface Trait {
  // eslint-disable-next-line camelcase
  trait_type: string;
  value: string;
  percent?: number;
}

export interface Metadata {
  name: string;
  description: string;
  image: string;
  attributes: Trait[];
}
