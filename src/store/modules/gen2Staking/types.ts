import { Gen2StakingData, LeaderboardData, Ryusaur } from "@/types/Interface";

export interface Gen2StakingState {
  stakedGen2Nft: Gen2StakingData[];
  ryusaurs: Ryusaur[];
  stakingGen2Approved: boolean;
  ryusaursApproved: boolean;
  nRyuApproved: boolean;
  leaderboard: LeaderboardData[];
}
