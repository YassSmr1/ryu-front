<template>
  <div id="NftStaking">
    <div class="top_table" v-if="$rootState.connector.account">
      <span class="your_collection">Your collection </span>
      <div class="button_grid" v-if="!$rootState.loader.loading">
        <button
          class="btn zoom"
          :disabled="
            !(
              stakedSelectedNfts.length === 1 ||
              stakedSelectedNfts.length ===
                $rootState.gen1Staking.stakedGen1nft.length
            )
          "
          :class="
            !$rootState.loader.loading &&
            (stakedSelectedNfts.length === 1 ||
              stakedSelectedNfts.length ===
                $rootState.gen1Staking.stakedGen1nft.length)
              ? ''
              : 'disabled'
          "
          v-on:click="claim($event)"
        >
          Claim
        </button>
        <button
          class="btn zoom"
          :disabled="
            !(
              stakedSelectedNfts.length === 1 ||
              stakedSelectedNfts.length ===
                $rootState.gen1Staking.stakedGen1nft.length
            )
          "
          :class="
            !$rootState.loader.loading &&
            (stakedSelectedNfts.length === 1 ||
              stakedSelectedNfts.length ===
                $rootState.gen1Staking.stakedGen1nft.length)
              ? ''
              : 'disabled'
          "
          v-on:click="unstakeAndClaim($event)"
          id="unStake"
        >
          Unstake & Claim
        </button>
      </div>
      <Loader v-if="$rootState.loader.loading"></Loader>
    </div>
    <div
      class="table"
      v-if="
        !$rootState.connector.account ||
        ($rootState.gen1.gen1Nfts.length === 0 &&
          $rootState.gen1Staking.stakedGen1nft.length === 0)
      "
    >
      <ul>
        <li class="title pair">
          <div class="table_title"></div>
          <span class="table_title desktop">#</span>
          <div class="table_title"></div>
          <span class="table_title">Staking power</span>
          <span class="table_title">Status</span>
          <span class="table_title">Earning per day</span>
          <span class="table_title">Claimable earnings</span>
        </li>
        <li class="impair">
          <div class="table_title"></div>
          <span class="table_title desktop">N/A</span>
          <span class="table_title"></span>
          <span class="table_title">N/A</span>
          <span class="table_title">N/A</span>
          <span class="table_title">N/A</span>
          <span class="table_title">N/A</span>
        </li>
      </ul>
    </div>
    <div class="table" v-else>
      <ul>
        <li class="title pair">
          <input
            class="checkbox table_title"
            type="checkbox"
            :value="$rootState.gen1.gen1Nfts"
            v-on:click="selectAll"
          />
          <span class="table_title desktop">#</span>
          <div class="table_title"></div>
          <span class="table_title">Staking power</span>
          <span class="table_title">Status</span>
          <span class="table_title">Earning per day</span>
          <span class="table_title">Claimable earnings</span>
        </li>
        <li
          :class="index % 2 !== 0 ? 'pair' : 'impair'"
          v-for="(nft, index) in $rootState.gen1Staking.stakedGen1nft"
          :key="nft.id"
        >
          <input
            class="checkbox table_item"
            type="checkbox"
            :value="nft"
            v-model="stakedSelectedNfts"
          />
          <span class="table_item desktop">{{ index + 1 }}</span>
          <span class="table_item img_container">
            <img :src="nft.image" :alt="nft.id" class="nft_img" />
            <span>RYU #{{ nft.tokenId }}</span>
          </span>
          <span class="table_item">{{ nft.power }}</span>
          <span class="table_item">{{
            nft.staked ? "Staked" : "Unstaked"
          }}</span>
          <span class="table_item">{{ nft.earning }}</span>
          <span class="table_item">{{ nft.claimable }}</span>
        </li>
        <li
          :class="
            (index + $rootState.gen1Staking.stakedGen1nft.length) % 2 !== 0
              ? 'pair'
              : 'impair'
          "
          v-for="(nft, index) in $rootState.gen1.gen1Nfts"
          :key="nft.id"
        >
          <input
            class="checkbox table_item"
            type="checkbox"
            :value="nft"
            v-model="selectedNfts"
          />
          <span class="table_item desktop">{{
            index + $rootState.gen1Staking.stakedGen1nft.length + 1
          }}</span>
          <span class="table_item img_container">
            <img :src="nft.image" :alt="nft.id" class="nft_img" />
            <span>RYU #{{ nft.tokenId }}</span>
          </span>
          <span class="table_item">{{ nft.power }}</span>
          <span class="table_item">{{
            nft.staked ? "Staked" : "Unstaked"
          }}</span>
          <span class="table_item">{{ nft.earning }}</span>
          <span class="table_item">{{ nft.claimable }}</span>
        </li>
      </ul>
    </div>
    <button
      class="confirm_stake zoom"
      v-if="
        !$rootState.loader.loading &&
        selectedNfts.length > 0 &&
        stakedSelectedNfts.length === 0 &&
        $rootState.gen1Staking.nftStakingGen1Approved
      "
      v-on:click="stake"
    >
      Stake NFTs
    </button>
    <button
      class="confirm_stake zoom"
      v-if="
        !$rootState.gen1Staking.nftStakingGen1Approved &&
        !$rootState.loader.loading
      "
      v-on:click="approve"
    >
      Approve NFTs
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Collection from "@/components/Collection.vue";
import Toggle from "@/components/Toggle.vue";
import { MutationPayload } from "vuex";
import Loader from "@/components/Loader.vue";
import { Gen1Nfts } from "@/types/Interface";
import { Gen1Actions } from "@/store/modules/gen1/actions";
import { ConnectorMutations } from "@/store/modules/connector/mutations";
import { Gen1StakingActions } from "@/store/modules/gen1Staking/actions";
import { LoaderMutation } from "@/store/modules/loader/mutations";
@Component({
  components: { Loader, Toggle, Collection },
})
export default class NftStaking extends Vue {
  selectedNfts: Gen1Nfts[] = [];
  stakedSelectedNfts: Gen1Nfts[] = [];
  unsubscribe: () => void = () => null;

  /***
   * Initialize the component by fetching the data and subscribing to the store to update the data
   * @return {void}
   */
  mounted(): void {
    if (this.$rootState.connector.account) {
      this.init();
    }
    this.unsubscribe = this.$store.subscribe((mutation: MutationPayload) => {
      if (
        mutation.type === ConnectorMutations.SET_ACCOUNT &&
        mutation.payload
      ) {
        this.init();
      }
    });
  }

  /***
   * Unsubscribe from the store
   * @return {void}
   */
  unmounted(): void {
    this.unsubscribe();
  }

  /***
   * Fetch the data
   * @return {void}
   */
  init(): void {
    this.$store.dispatch(Gen1Actions.GET_GEN1_NFTS);
    this.$store.dispatch(Gen1StakingActions.GET_STAKED_GEN1_NFT);
    this.$store.dispatch(Gen1StakingActions.GET_NFT_STAKING_GEN1_APPROVED);
  }

  /***
   * Select all the NFTs
   * @return {void}
   */
  selectAll(): void {
    if (this.selectedNfts.length > 0 || this.stakedSelectedNfts.length > 0) {
      this.selectedNfts = [];
      this.stakedSelectedNfts = [];
      return;
    }
    this.selectedNfts = [];
    this.stakedSelectedNfts = [];
    this.stakedSelectedNfts.push(...this.$rootState.gen1Staking.stakedGen1nft);
    this.selectedNfts.push(...this.$rootState.gen1.gen1Nfts);
  }

  /***
   * Dispatch the claim action to get the rewards of the selected NFTs
   * @param {Event} event
   * @return {Promise<void>}
   */
  async claim(event: Event): Promise<void> {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    event.preventDefault();
    if (this.stakedSelectedNfts.length === 1) {
      await this.$store.dispatch(Gen1StakingActions.CLAIM_GEN1_NFT, {
        id: this.stakedSelectedNfts[0].id,
        unStake: false,
      });
    } else if (
      this.stakedSelectedNfts.length ===
      this.$rootState.gen1Staking.stakedGen1nft.length
    ) {
      await this.$store.dispatch(Gen1StakingActions.CLAIM_ALL_GEN1_NFT, false);
    }
    this.stakedSelectedNfts = [];
  }

  /***
   * Dispatch the unstake action for the selected NFTs
   * @param {Event} event
   * @return {Promise<void>}
   */
  async unstakeAndClaim(event: Event): Promise<void> {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    event.preventDefault();
    if (this.stakedSelectedNfts.length === 1) {
      await this.$store.dispatch(Gen1StakingActions.CLAIM_GEN1_NFT, {
        id: this.stakedSelectedNfts[0].id,
        unStake: true,
      });
    } else if (
      this.stakedSelectedNfts.length ===
      this.$rootState.gen1Staking.stakedGen1nft.length
    ) {
      await this.$store.dispatch(Gen1StakingActions.CLAIM_ALL_GEN1_NFT, true);
    }
    this.stakedSelectedNfts = [];
  }

  /***
   * Dispatch the stake action for the selected NFTs
   * @return {Promise<void>}
   */
  async stake(): Promise<void> {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    await this.$store.dispatch(
      Gen1StakingActions.STAKE_GEN1_NFT,
      this.selectedNfts
    );
    this.selectedNfts = [];
  }

  /***
   * Dispatch the approval action
   * @return {Promise<void>}
   */
  async approve(): Promise<void> {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    await this.$store.dispatch(Gen1StakingActions.APPROVE_NFT_STAKING_GEN1);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";

#NftStaking {
  display: grid;
  grid-template-rows: repeat(3, auto);
  margin-left: auto;
  margin-right: auto;
  max-width: 1300px;
  @media screen and (max-width: $max-width-desktop) {
    margin-left: 2%;
    margin-right: 2%;
  }
  .top_table {
    margin-bottom: 27px;
    display: flex;

    .disabled {
      color: #888888 !important;
      background-color: #d8d8d8 !important;
    }

    .your_collection {
      margin-left: 0;
      margin-right: auto;

      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 27.34px;
      line-height: 35px;
      text-align: center;
      color: #ffffff;

      @media screen and (max-width: $max-width-desktop) {
        font-size: 20.34px;
        line-height: 28px;
      }
    }

    .button_grid {
      margin-right: 0;
      margin-left: auto;
      display: grid;
      grid-template-columns: repeat(2, auto);
      column-gap: 12px;
    }

    .btn {
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 21px;
      display: flex;
      align-items: center;
      color: #000000;
      padding: 10px 16px;
      background: #ffffff;
      border-radius: 4px;
      outline: inherit;
      cursor: pointer;
      border: none;
    }
  }

  .confirm_stake {
    margin-right: 0;
    margin-left: auto;
    padding: 10px 16px;
    background: #78b66d;
    outline: inherit;
    cursor: pointer;
    border: 1px solid #78b66d;
    border-radius: 4px;
    margin-top: 16px;

    font-family: "SpaceGrotesk-Regular", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    align-items: center;
    color: #000000;
  }

  .table {
    ul {
      list-style-type: none;
    }

    li {
      display: grid;
      grid-template-columns: auto repeat(6, 1fr);
      place-items: center flex-end;
      column-gap: 30px;
      text-align: right;
      padding-left: 24px;
      padding-right: 24px;

      @media screen and (max-width: $max-width-desktop) {
        grid-template-columns: auto repeat(5, 1fr);
        column-gap: 5px;
        text-align: center;
        padding-left: 8px;
        padding-right: 8px;
      }
    }

    .impair {
      background: #26264f;
    }

    .pair {
      background: #1d1e42;
    }

    .checkbox {
      height: 20px;
    }

    .table_title {
      padding-top: 16px;
      padding-bottom: 13px;
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      text-align: right;
      color: #ffffff;

      @media screen and (max-width: $max-width-desktop) {
        font-size: 13px;
        line-height: 17px;
      }
    }

    .table_item {
      padding-top: 27.5px;
      padding-bottom: 27.5px;
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      text-align: right;
      color: #ffffff;

      @media screen and (max-width: $max-width-desktop) {
        font-size: 12px;
        line-height: 15px;
      }
    }

    .img_container {
      @media screen and (max-width: $max-width-desktop) {
        flex-direction: column;
        text-align: center;
      }
      display: flex;
      width: 100%;
      align-items: center;
    }

    .nft_img {
      @media screen and (max-width: $max-width-desktop) {
        height: 30px;
        margin-right: 0;
        margin-bottom: 5px;
      }
      height: 40px;
      border-radius: 10px;
      margin-right: 8px;
    }
  }
}
</style>
