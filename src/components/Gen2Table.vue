<template>
  <div id="Gen2Table">
    <div class="table_wrapper">
      <div class="top_table">Your Collection</div>
      <div class="table">
        <div class="title"></div>
        <div class="title">#</div>
        <div class="title">Rank</div>
        <div class="title">Level</div>
        <div class="title">Status</div>
        <div class="title">Boosting status</div>
        <div class="title">Level up cost</div>
        <div class="title">EPL</div>
        <template v-for="(nft, index) in $rootState.gen2Staking.stakedGen2Nft">
          <div :key="index + '_cb'" class="checkbox_wrapper">
            <input
              class="checkbox"
              type="checkbox"
              :value="nft"
              v-model="selectedNfts"
              v-on:change="emitIfOneSelected"
            />
            <span class="css_checkbox"></span>
          </div>
          <div :key="index + '_nft_image'" class="nft_image">
            <img :src="nft.image" alt="nft" />
            <span class="text">RYU #{{ nft.id }}</span>
          </div>
          <div :key="index + '_rank'" class="text">{{ nft.rank }}</div>
          <div :key="index + '_level'" class="text">{{ nft.level }}</div>
          <div :key="index + '_staked'" class="text">
            {{ nft.staked ? "Staked" : "Unstaked" }}
          </div>
          <div :key="index + '_boosting'" class="boosting">
            <img
              v-for="(boost, i) in nft.boostImg"
              :key="i + '_boost'"
              :src="boost"
              alt="boost"
            />
            <span class="text desktop" v-if="nft.boostImg.length > 0"
              >Equipped</span
            >
            <span class="text" v-else>N/A</span>
          </div>
          <div :key="index + '_lvl_up_cost'" class="text">
            {{ nft.levelUpCost }}
          </div>
          <div :key="index + '_earnings'" class="text">{{ nft.earnings }}</div>
        </template>
      </div>
      <div class="bot_table">
        <button
          class="btn_actions_table zoom"
          v-if="
            !$rootState.loader.loading &&
            selectedNfts.length > 0 &&
            !selectedNfts.some((nft) => nft.staked) &&
            $rootState.gen2Staking.stakingGen2Approved
          "
          v-on:click="triggerStake"
        >
          Stake
        </button>
        <button
          class="btn_actions_table zoom"
          v-if="
            !$rootState.loader.loading &&
            selectedNfts.length > 0 &&
            !selectedNfts.some((nft) => nft.staked) &&
            !$rootState.gen2Staking.stakingGen2Approved
          "
          v-on:click="triggerApprove"
        >
          Approve
        </button>
        <button
          class="btn_actions_table zoom"
          v-if="
            !$rootState.loader.loading &&
            selectedNfts.length > 0 &&
            !selectedNfts.some((nft) => !nft.staked)
          "
          v-on:click="triggerUnstake"
        >
          Unstake
        </button>
        <button
          class="btn_actions_table zoom"
          :disabled="!(selectedNfts.length === 1 && selectedNfts[0].staked)"
          v-if="
            !$rootState.loader.loading &&
            $rootState.gen2Staking.nRyuApproved &&
            selectedNfts.length === 1 &&
            selectedNfts[0].upgradeTimestamp
          "
          v-on:click="emitUpgrade"
        >
          {{
            today.isAfter(selectedNfts[0].upgradeTimestamp)
              ? potion
                ? "Upgrade + Boost"
                : "Upgrade"
              : selectedNfts[0].upgradeTimestamp.format("DD-MM-YYYY HH:mm UTC")
          }}
        </button>
        <button
          class="btn_actions_table zoom"
          :disabled="!(selectedNfts.length === 1 && selectedNfts[0].staked)"
          v-if="
            !$rootState.loader.loading && !$rootState.gen2Staking.nRyuApproved
          "
          v-on:click="triggerApproveNRyu"
        >
          Approve $nRyu
        </button>
        <button
          class="btn_actions_table zoom"
          v-if="
            !$rootState.loader.loading &&
            selectedNfts.length > 0 &&
            !selectedNfts.some((nft) => !nft.staked)
          "
          v-on:click="triggerClaim"
        >
          Claim : {{ total }} $nRyu
        </button>
        <button
          class="btn_actions_table zoom"
          :disabled="
            !(
              selectedNfts.length === 1 &&
              selectedNfts[0].staked &&
              selectedNfts[0].boostImg.length !== 2 &&
              ryusaur
            )
          "
          v-if="
            !$rootState.loader.loading &&
            $rootState.gen2Staking.ryusaursApproved &&
            selectedNfts.length === 1 &&
            !selectedNfts[0].boostImg.some((img) => img.includes('ryusaur'))
          "
          v-on:click="triggerBoost"
        >
          Add Ryusaur
        </button>
        <button
          class="btn_actions_table zoom"
          :disabled="!(selectedNfts.length === 1 && selectedNfts[0].staked)"
          v-if="
            !$rootState.loader.loading &&
            $rootState.gen2Staking.ryusaursApproved &&
            selectedNfts.length === 1 &&
            selectedNfts[0].boostImg.some((img) => img.includes('ryusaur'))
          "
          v-on:click="triggerRemoveRyusaur"
        >
          Remove Boost
        </button>
        <button
          class="btn_actions_table zoom"
          :disabled="
            !(
              selectedNfts.length === 1 &&
              selectedNfts[0].staked &&
              selectedNfts[0].boostImg.length !== 2 &&
              (ryusaur || potion)
            )
          "
          v-if="
            !$rootState.loader.loading &&
            !$rootState.gen2Staking.ryusaursApproved
          "
          v-on:click="triggerApproveRyusaur"
        >
          Approve Ryusaur
        </button>
        <Loader v-if="$rootState.loader.loading" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Loader from "@/components/Loader.vue";
import { Gen2StakingData, Ryusaur } from "@/types/Interface";
import { MutationPayload } from "vuex";
import { ConnectorMutations } from "@/store/modules/connector/mutations";
import { Gen2StakingActions } from "@/store/modules/gen2Staking/actions";
import { LoaderMutation } from "@/store/modules/loader/mutations";
import moment from "moment";

@Component({
  components: { Loader },
})
export default class Gen2Table extends Vue {
  @Prop() ryusaur!: Ryusaur | null;
  @Prop() potion!: boolean;
  today = moment.utc();
  selectedNfts: Gen2StakingData[] = [];
  total = 0;
  unsubscribe: () => void = () => null;

  /***
   * Initialize the component and subscribe to the store to update data when needed
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
   * Initialize the component by fetching the data
   * @return {void}
   */
  init(): void {
    this.$store.dispatch(Gen2StakingActions.GET_STAKED_GEN2_NFTS);
    this.$store.dispatch(Gen2StakingActions.GET_STAKING_GEN2_APPROVED);
    this.$store.dispatch(Gen2StakingActions.GET_RYUSAUR_APPROVED);
    this.$store.dispatch(Gen2StakingActions.GET_NRYU_APPROVE);
  }

  /***
   * Emit the `oneSelected` event if only one nft is selected
   * @return {void}
   */
  emitIfOneSelected(): void {
    if (this.selectedNfts.length === 1) {
      this.$emit("oneSelected", this.selectedNfts[0]);
    } else {
      this.$emit("oneSelected", null);
    }
    this.total = 0;
    for (const selectedNft of this.selectedNfts) {
      this.total += parseFloat(selectedNft.claimable);
    }
  }

  /***
   * Dispatch the approval action for gen2 staking
   * @return {Promise<void>}
   */
  async triggerApprove(): Promise<void> {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    await this.$store.dispatch(Gen2StakingActions.APPROVE_STAKING_GEN2);
  }

  /***
   * Dispatch the stake action for the selected nfts
   * @return {Promise<void>}
   */
  async triggerStake(): Promise<void> {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    await this.$store.dispatch(Gen2StakingActions.STAKE, this.selectedNfts);
    this.selectedNfts = [];
  }

  /***
   * Dispatch the unstake action for the selected nfts
   * @return {Promise<void>}
   */
  async triggerUnstake(): Promise<void> {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    await this.$store.dispatch(Gen2StakingActions.UNSTAKE, this.selectedNfts);
    this.selectedNfts = [];
  }

  /***
   * Dispatch the claim action for the selected nfts
   * @return {Promise<void>}
   */
  async triggerClaim(): Promise<void> {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    await this.$store.dispatch(Gen2StakingActions.CLAIM, this.selectedNfts);
    this.selectedNfts = [];
  }

  /***
   * Dispatch the approval action for the $nRyu token
   * @return {Promise<void>}
   */
  async triggerApproveNRyu(): Promise<void> {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    await this.$store.dispatch(Gen2StakingActions.APPROVE_NRYU);
  }

  /***
   * Emit the `boost` event
   * @return {Promise<void>}
   */
  triggerBoost(): void {
    this.$emit("boost");
  }

  /***
   * Dispatch the approval action for the Ryusaur tokens
   * @return {Promise<void>}
   */
  async triggerApproveRyusaur(): Promise<void> {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    await this.$store.dispatch(Gen2StakingActions.APPROVE_RYUSAURS);
  }

  /***
   * Emit the `upgrade` event
   * @return {Promise<void>}
   */
  async emitUpgrade(): Promise<void> {
    this.$emit("upgrade");
  }

  /***
   * Dispatch the Ryusaur removal action on the selected nft
   * @return {Promise<void>}
   */
  async triggerRemoveRyusaur(): Promise<void> {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    await this.$store.dispatch(
      Gen2StakingActions.REMOVE_RYUSAUR,
      this.selectedNfts[0].id
    );
    this.selectedNfts = [];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";

#Gen2Table {
  .table_wrapper {
    margin-left: 5%;
    margin-right: 5%;
    @media screen and (max-width: $max-width-desktop) {
      margin-left: 0;
      margin-right: 0;
    }
    .top_table {
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 27.34px;
      line-height: 35px;
      color: #ffffff;

      @media screen and (max-width: $max-width-desktop) {
        margin-left: 2%;
      }

      @media screen and (max-width: $max-width-desktop) {
        font-size: 20.34px;
        line-height: 28px;
      }
    }
    .table {
      margin-top: 30px;
      display: grid;
      grid-template-columns: repeat(8, 1fr);

      div:nth-child(-n + 8) {
        background: #292929;
      }
      background: #3a3a3a;

      div {
        padding-top: 16px;
        padding-bottom: 22.5px;
        padding-right: 25px;

        @media screen and (max-width: $max-width-desktop) {
          padding-top: 8px;
          padding-bottom: 11.5px;
          padding-right: 12.5px;
        }
      }

      .title {
        font-family: "Montserrat", sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        text-align: right;
        color: #ffffff;

        @media screen and (max-width: $max-width-desktop) {
          font-size: 12px;
          line-height: 15px;
        }

        &:nth-child(2) {
          text-align: left;
        }
      }

      .text {
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        text-align: right;
        color: #ffffff;
        display: flex;
        align-items: center;

        @media screen and (max-width: $max-width-desktop) {
          font-size: 11px;
          line-height: 15px;
        }
      }

      .checkbox_wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        .checkbox {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          z-index: 2;
          height: 18px;
          width: 18px;
          @media screen and (max-width: $max-width-desktop) {
            height: 12px;
            width: 12px;
          }
        }

        .css_checkbox {
          position: absolute;
          height: 18px;
          width: 18px;
          border: 3px solid #ffffff;
          border-radius: 10px;
          @media screen and (max-width: $max-width-desktop) {
            height: 12px;
            width: 12px;
          }
        }

        input:hover ~ .css_checkbox {
          background-color: #6f6f6f;
        }

        input:checked ~ .css_checkbox {
          background-color: white;
        }
      }

      .nft_image {
        display: flex;
        align-items: center;
        img {
          margin-right: 5px;
          height: 24px;
          width: 24px;
          @media screen and (max-width: $max-width-desktop) {
            display: none;
          }
          border-radius: 10px;
        }
      }

      .boosting {
        display: flex;
        justify-content: flex-end;
        gap: 5px;
        align-items: center;
        img {
          height: 24px;
          width: 24px;
          @media screen and (max-width: $max-width-desktop) {
            height: 14px;
            width: 14px;
          }
          border-radius: 10px;
        }
      }
    }
    .bot_table {
      margin-top: 20px;
      display: flex;
      flex-direction: row-reverse;
      @media screen and (max-width: $max-width-desktop) {
        justify-content: center;
      }
      .btn_actions_table {
        padding: 14px 40px;
        background: #2e2e3a;
        border-radius: 4px;

        font-family: "SpaceGrotesk-Regular", serif;
        color: white;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 16px;
        @media screen and (max-width: $max-width-desktop) {
          font-size: 13px;
          line-height: 13px;
          padding: 7px 20px;
          justify-content: center;
        }
        border: none;
        cursor: pointer;
        margin-right: 12px;
        &:first-child {
          margin-right: 0;
        }

        &:disabled {
          border: solid 1px white;
          color: #9d9d9d;
          background-color: transparent;
        }
      }
    }
  }
}
</style>
