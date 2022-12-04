import { ethers } from "ethers";

export interface ConnectorState {
  account: string;
  web3Provider: ethers.providers.Web3Provider | null;
  listeners: Array<() => void>;
  walletConnect: boolean;
}
