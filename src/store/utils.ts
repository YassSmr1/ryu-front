import { Commit } from "vuex";
import {
  Contract,
  ContractInterface,
  ContractTransaction,
  ethers,
} from "ethers";
import tokenIdToImage from "@/assets/tokenIdToImage.json";
import tokenIdToMetadata from "@/assets/tokenIdToMetadata.json";
import { Gen1Nfts, Metadata, StakingData } from "@/types/Interface";
import propertiesToValue from "@/assets/propertiesToValue.json";
import { ToastMutations } from "@/store/modules/toast/mutations";
import { LoaderMutation } from "@/store/modules/loader/mutations";

export function handleError(e: unknown, commit: Commit): void {
  if (e instanceof Error) {
    let message = e.message.split("error=")[1];
    if (message) {
      const index = message.indexOf("}");
      if (index !== -1) {
        message = message.slice(0, index + 1);
        message = message
          .split('"message":"')[2]
          .split('"')[0]
          .replace("execution reverted: ", "");
        commit(ToastMutations.SET_ERROR, message);
      }
    } else {
      commit(ToastMutations.SET_ERROR, e.message);
    }
  } else commit(ToastMutations.SET_ERROR, "Unknown Error");
  commit(LoaderMutation.SET_LOADING, false);
}

export async function handleTxResults(
  tx: ContractTransaction,
  commit: Commit,
  message: string
): Promise<boolean> {
  const receipt = await tx.wait();
  if (receipt.status !== 1) {
    commit(ToastMutations.SET_ERROR, "Transaction error");
    return false;
  } else {
    commit(ToastMutations.SET_SUCCESS, message);
    return true;
  }
}

export function getConnectedContract(
  address: string,
  abi: ContractInterface,
  provider: ethers.providers.Web3Provider
): Contract {
  const signer = provider.getSigner();
  return new ethers.Contract(address, abi, signer);
}

export function getImage(tokenId: number): string {
  let image = "";
  for (const tokenIdToImageElement of tokenIdToImage) {
    if (tokenIdToImageElement[0] === tokenId) {
      image = tokenIdToImageElement[1] as string;
      break;
    }
  }
  return image;
}

export function parseGen1Data(
  stakingData: StakingData,
  staked: boolean
): Gen1Nfts {
  const image = getImage(parseInt(stakingData.tokenId.toString()));
  const rawMetadata = tokenIdToMetadata.find(
    (element) => element[0] === stakingData.tokenId.toNumber()
  );
  let metadata = null;
  if (rawMetadata && rawMetadata[1]) {
    metadata = rawMetadata[1] as Metadata;
    for (const attribute of metadata.attributes) {
      try {
        const raw = propertiesToValue.find((element) => {
          return (
            element[0].toString().toUpperCase() ===
            attribute.value.toString().toUpperCase()
          );
        });
        if (raw && raw[1]) {
          attribute.percent = raw[1] as number;
        }
      } catch (e) {
        console.error("Attributes error : ", stakingData.tokenId.toNumber());
      }
    }
  }
  return {
    id: stakingData.tokenId.toNumber(),
    power:
      ethers.utils.formatEther(stakingData.rewardPerday.toString()) === "96.86"
        ? "Legendary"
        : "Basic",
    staked,
    earning: ethers.utils.formatEther(stakingData.rewardPerday.toString()),
    claimable: ethers.utils.formatEther(stakingData.accrual),
    image: image,
    tokenId: parseInt(image.split("images/")[1].split(".")[0]),
    metadata: metadata,
  };
}

export function getRank(level: number): string {
  let rank = "";
  if (level < 2) rank = "Newborn";
  else if (level < 5) rank = "Toddler";
  else if (level < 8) rank = "Junior";
  else if (level < 11) rank = "Young";
  else if (level < 14) rank = "Pre-Teen";
  else if (level < 17) rank = "Teen";
  else if (level < 20) rank = "Young Adult";
  else if (level < 23) rank = "Recruit";
  else if (level < 26) rank = "Academy";
  else if (level < 29) rank = "Private";
  else if (level < 32) rank = "Specialist";
  else if (level < 35) rank = "Corporal";
  else if (level < 38) rank = "Sergeant";
  else if (level < 41) rank = "Major";
  else if (level < 44) rank = "Lieutenant";
  else if (level < 47) rank = "General";
  else if (level < 50) rank = "Commander";
  else if (level === 50) rank = "Elder";
  return rank;
}
