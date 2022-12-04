<template>
  <div id="NRyuStaking">
    <div class="nryu_price">
      <div class="logo">
        <img src="@/assets/avax_logo.webp" alt="Avax Logo" class="img_logo" />
        <span>nRyu</span>
      </div>
      <div class="price">
        <span>$ N/A</span>
        <span class="changes">+N/A%</span>
      </div>
    </div>
    <div class="info_staking_grid desktop">
      <span class="title_item_staking"> Total stakeable nRYU </span>
      <span class="title_item_staking"> Amount to stake </span>
      <span class="title_item_staking"> % of total wallet </span>
      <span class="title_item_staking"> Timelock period </span>
      <span class="item_staking">
        {{
          $rootState.connector.account && $rootState.nRyu.nRyuToken
            ? $rootState.nRyu.nRyuToken
            : "N/A"
        }}
      </span>
      <span class="item_staking">
        {{
          $rootState.connector.account &&
          $rootState.nRyuStaking.nRyuTokenStaked.length > 0
            ? $rootState.nRyuStaking.nRyuTokenStaked[0].amount
            : "N/A"
        }}
      </span>
      <span class="item_staking">
        {{
          $rootState.connector.account &&
          $rootState.nRyuStaking.percentageStaked
            ? $rootState.nRyuStaking.percentageStaked
            : "N/A"
        }}
      </span>
      <span class="item_staking"> 14days </span>
    </div>
    <div class="info_staking_grid mobile">
      <span class="title_item_staking"> Total stakeable nRYU </span>
      <span class="title_item_staking"> Amount to stake </span>
      <span class="item_staking">
        {{
          $rootState.connector.account && $rootState.nRyu.nRyuToken
            ? $rootState.nRyu.nRyuToken
            : "N/A"
        }}
      </span>
      <span class="item_staking">
        {{
          $rootState.connector.account &&
          $rootState.nRyuStaking.nRyuTokenStaked.length > 0
            ? $rootState.nRyuStaking.nRyuTokenStaked[0].amount
            : "N/A"
        }}
      </span>
      <span class="title_item_staking"> % of total wallet </span>
      <span class="title_item_staking"> Timelock period </span>
      <span class="item_staking">
        {{
          $rootState.connector.account &&
          $rootState.nRyuStaking.percentageStaked
            ? $rootState.nRyuStaking.percentageStaked
            : "N/A"
        }}
      </span>
      <span class="item_staking"> 14days </span>
    </div>
    <div
      class="stake_timeline_head"
      v-if="
        $rootState.connector.account &&
        $rootState.nRyuStaking.nRyuTokenStaked.length > 0
      "
    >
      <div class="stake_timeline_title">Stake Timeline</div>
      <div class="month_choose">
        <img
          src="@/assets/left_month.webp"
          alt="Left Arrow"
          v-on:click="changeMonth($event, false)"
        />
        <div class="month_title">{{ monthName }}</div>
        <img
          src="@/assets/right_month.webp"
          alt="Right Arrow"
          v-on:click="changeMonth($event, true)"
        />
      </div>
    </div>
    <div
      class="wrapper_stake_timeline"
      v-if="
        $rootState.connector.account &&
        $rootState.nRyuStaking.nRyuTokenStaked.length > 0
      "
    >
      <div
        v-for="(item, index) in $rootState.nRyuStaking.nRyuTokenStaked.filter(
          (item) => {
            return (
              momentDate.month() >= item.startDate.month() &&
              momentDate.month() <= item.endDate.month()
            );
          }
        )"
        :key="'dateline-' + index"
        class="stake_timeline"
        ref="grids"
        :style="
          index === 0
            ? 'margin-top: 13px; grid-template-columns: repeat(' +
              dayInMonth +
              ', 1fr)'
            : 'grid-template-columns: repeat(' + dayInMonth + ', 1fr)'
        "
      >
        <div
          v-for="n in dayInMonth"
          v-bind:key="n"
          class="day"
          :style="index === 0 ? 'margin-bottom: 12px;' : ''"
        >
          {{ index === 0 ? n : "" }}
        </div>
        <div v-for="n in dayInMonth" v-bind:key="n + '-line'" class="lines">
          <div class="line"></div>
          <div
            class="staking_data"
            :style="'background-color: #' + item.color"
            v-if="
              (n === item.startDate.date() &&
                momentDate.month() === item.startDate.month()) ||
              (n === item.endDate.date() &&
                momentDate.month() === item.endDate.month())
            "
          >
            {{ item.amount }}
          </div>
          <div
            class="staking_data_line"
            :style="'background-color: #' + item.color"
            v-else-if="isAfter(item, n)"
          ></div>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div class="table_action">
      <div class="action_title">Staking History</div>
      <button
        class="btn_unstake zoom"
        v-if="!$rootState.loader.loading && selectedStaking.length > 0"
        v-on:click="withdraw"
      >
        Unstake and claim
      </button>
      <Loader
        v-if="$rootState.loader.loading && selectedStaking.length > 0"
      ></Loader>
    </div>
    <div
      class="table"
      v-if="
        !$rootState.connector.account ||
        $rootState.nRyuStaking.nRyuTokenStaked.length === 0
      "
    >
      <ul>
        <li class="title pair">
          <div class="table_title"></div>
          <span class="table_title">Date of Stake Start</span>
          <span class="table_title">Date of Stake End</span>
          <span class="table_title">Earnings</span>
          <span class="table_title">Status</span>
        </li>
        <li class="impair">
          <div class="table_title"></div>
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
          <div class="table_title"></div>
          <span class="table_title">Date of Stake Start</span>
          <span class="table_title">Date of Stake End</span>
          <span class="table_title">Earnings</span>
          <span class="table_title">Status</span>
        </li>
        <li
          :class="index % 2 !== 0 ? 'pair' : 'impair'"
          v-for="(stake, index) in $rootState.nRyuStaking.nRyuTokenStaked"
          :key="index"
        >
          <input
            class="checkbox table_item"
            type="checkbox"
            :value="stake"
            v-model="selectedStaking"
          />
          <span class="table_item desktop">
            {{ stake.startDate.format("DD/MM/YYYY") }}
          </span>
          <span class="table_item mobile">
            {{ stake.startDate.format("DD/MM") }}
          </span>
          <span class="table_item desktop">{{
            stake.endDate.format("DD/MM/YYYY")
          }}</span>
          <span class="table_item mobile">{{
            stake.endDate.format("DD/MM")
          }}</span>
          <span class="table_item">{{ stake.earnings }}</span>
          <span class="table_item active" v-if="stake.status === 0"
            >Active</span
          >
          <span class="table_item claimed" v-if="stake.status === 1"
            >Claimed</span
          >
          <span class="table_item unclaimed" v-if="stake.status === 2"
            >Unclaimed</span
          >
        </li>
      </ul>
    </div>
    <div
      class="wrapper_btn"
      v-if="
        $rootState.connector.account &&
        $rootState.nRyuStaking.nRyuTokenStaked.length === 0
      "
    >
      <div class="top_stake">
        <span class="left_top_stake">nRyu value to deposit</span>
        <span class="right_top_stake"
          >Available: {{ $rootState.nRyu.nRyuToken }} nRyu</span
        >
      </div>
      <div class="stake_input">
        <img
          src="@/assets/avax_logo.webp"
          alt="Avax Logo"
          class="img_logo"
          height="40px"
        />
        <input type="number" ref="stakingInput" placeholder="0.00" />
        <button class="btn_max" v-on:click="setMax()">MAX</button>
      </div>
      <button
        class="stake_btn right zoom"
        v-on:click="stake()"
        v-if="!$rootState.loader.loading"
      >
        Submit stake request
      </button>
      <Loader v-else></Loader>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import moment from "moment";
import { MutationPayload } from "vuex";
import Loader from "@/components/Loader.vue";
import { NRyuTokenStaked } from "@/types/Interface";
import { ConnectorMutations } from "@/store/modules/connector/mutations";
import { NRyuActions } from "@/store/modules/nRyu/actions";
import { NRyuStakingActions } from "@/store/modules/nRyuStaking/actions";
import { LoaderMutation } from "@/store/modules/loader/mutations";

@Component({
  components: { Loader },
})
export default class NRyuStaking extends Vue {
  @Ref() grids!: HTMLElement[];
  @Ref() stakingInput!: HTMLInputElement;
  selectedStaking: NRyuTokenStaked[] = [];
  momentDate = moment();
  monthName = this.momentDate.format("MMMM");
  dayInMonth = this.momentDate.daysInMonth();
  unsubscribe: () => void = () => null;

  /***
   * Initialize the component by fetching the data and subscribing to the store to update the data
   * @return {void}
   */
  mounted(): void {
    if (this.$rootState.connector.account) {
      this.$store.dispatch(NRyuActions.GET_NRYU_TOKEN);
      this.$store.dispatch(NRyuStakingActions.GET_NRYU_TOKEN_STAKED);
    }
    this.unsubscribe = this.$store.subscribe((mutation: MutationPayload) => {
      if (
        mutation.type === ConnectorMutations.SET_ACCOUNT &&
        mutation.payload
      ) {
        this.$store.dispatch(NRyuActions.GET_NRYU_TOKEN);
        this.$store.dispatch(NRyuStakingActions.GET_NRYU_TOKEN_STAKED);
      }
    });
  }

  /***
   * Unsubscribe to the store
   * @return {void}
   */
  unmounted(): void {
    this.unsubscribe();
  }

  /***
   * Dispatch the withdrawal action
   * @return {Promise<void>}
   */
  async withdraw(): Promise<void> {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    await this.$store.dispatch(NRyuStakingActions.WITHDRAW_NRYU_TOKEN);
  }

  /***
   * Dispatch the stake action
   * @return {Promise<void>}
   */
  async stake(): Promise<void> {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    await this.$store.dispatch(
      NRyuStakingActions.STAKE_NRYU_TOKEN,
      this.stakingInput.value
    );
  }

  /***
   * Set the max value of the input
   * @return {void}
   */
  setMax(): void {
    this.stakingInput.value = this.$rootState.nRyu.nRyuToken;
  }

  /***
   * Change the displayed month
   * @param {Event} event
   * @param {boolean} add
   * @return {void}
   */
  changeMonth(event: Event, add: boolean): void {
    event.preventDefault();
    if (add) {
      this.momentDate = this.momentDate.add("1", "month");
    } else {
      this.momentDate = this.momentDate.subtract("1", "month");
    }
    this.monthName = this.momentDate.format("MMMM");
    this.dayInMonth = this.momentDate.daysInMonth();
  }

  /***
   * Check if the stake item is after the day n
   * @param {NRyuTokenStaked} item
   * @param {number} n
   * @return {boolean}
   */
  isAfter(item: NRyuTokenStaked, n: number): boolean {
    const date = this.momentDate.set("date", n);
    return date.isAfter(item.startDate) && !date.isAfter(item.endDate);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";

#NRyuStaking {
  .nryu_price {
    margin-left: 7.5%;
    margin-right: 7.5%;
    width: 85%;
    display: flex;
    .logo {
      display: grid;
      grid-template-columns: auto auto;
      column-gap: 5px;
      place-items: center;
      margin-left: 0;
      margin-right: auto;
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      color: #ffffff;
      .img_logo {
        height: 30px;
      }
    }
    .price {
      display: grid;
      grid-template-rows: auto auto;
      margin-right: 0;
      margin-left: auto;
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      text-align: right;
      color: #ffffff;

      .changes {
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #11bb8d;
      }
    }
  }
  .info_staking_grid {
    margin-left: 7.5%;
    margin-right: 7.5%;
    width: 85%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto;
    column-gap: 40px;
    margin-top: 56px;
    @media screen and (max-width: $max-width-desktop) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 1fr);
      margin-left: 7.5%;
      margin-right: 7.5%;
      width: 85%;
    }
    .title_item_staking {
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 21.88px;
      line-height: 28px;
      display: flex;
      color: #e8e8e8;

      @media screen and (max-width: $max-width-desktop) {
        font-size: 16.88px;
        line-height: 23px;
      }
    }

    .item_staking {
      text-align: left;
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 27.34px;
      line-height: 35px;

      @media screen and (max-width: $max-width-desktop) {
        font-size: 22.34px;
        line-height: 30px;
      }

      display: flex;
      color: #ffa89c;
    }
  }
  .stake_btn {
    background-color: transparent;
    font-family: "SpaceGrotesk-Regular", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
    color: #78b66d;
    cursor: pointer;
    outline: inherit;
    border: solid 2px #78b66d;
    border-radius: 5px;
    padding: 10px;
  }
  .wrapper_btn {
    border: solid 2px #1d864a;
    border-radius: 10px;
    padding: 20px;
    width: 40%;
    @media screen and (max-width: $max-width-desktop) {
      width: 90%;
    }
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top_stake {
      display: flex;
      width: 100%;
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      color: #ffffff;
      margin-bottom: 15px;

      @media screen and (max-width: $max-width-desktop) {
        font-size: 12px;
        line-height: 16px;
      }

      .left_top_stake {
        margin-left: 0;
        margin-right: auto;
      }

      .right_top_stake {
        margin-right: 0;
        margin-left: auto;
      }
    }
    .stake_input {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-right: 10px;
      margin-bottom: 15px;
      img {
        margin-right: 7px;
        width: auto;
      }
      input {
        margin-right: 7px;
        text-align: right;
        width: 70%;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        @media screen and (max-width: $max-width-desktop) {
          font-size: 12px;
          line-height: 16px;
        }
      }
      .btn_max {
        font-family: "SpaceGrotesk-Regular", sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        padding-left: 5px;
        padding-right: 5px;
        color: gold;
        cursor: pointer;
        outline: inherit;
        border: solid 2px gold;
        border-radius: 5px;
        background-color: transparent;
        width: 15%;
      }
    }
  }
  .stake_timeline_head {
    display: flex;
    margin-top: 36px;
    margin-left: 7.5%;
    margin-right: 7.5%;
    width: 85%;
    .stake_timeline_title {
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 27.34px;
      line-height: 35px;
      color: #ffffff;
      margin-left: 0;
      margin-right: auto;

      @media screen and (max-width: $max-width-desktop) {
        font-size: 22.34px;
        line-height: 30px;
      }
    }
    .month_choose {
      :first-child {
        margin-right: 19px;
      }
      :last-child {
        margin-left: 19px;
      }
      display: grid;
      align-items: center;
      grid-template-columns: repeat(3, auto);
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      color: #ffffff;
      img {
        cursor: pointer;
      }
    }
  }
  .wrapper_stake_timeline {
    margin-left: 7.5%;
    overflow-x: scroll;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      background-color: transparent;
      height: 10px;
      width: 12px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: white;
      border-radius: 4px;
    }
  }
  .stake_timeline {
    display: grid;
    width: max-content;
    grid-template-rows: auto auto;
    grid-template-columns: repeat(30, 1fr);
    .day {
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
      height: auto;
      text-align: center;
    }

    .staking_data {
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      background: #dd87d0;
      border-radius: 20px;
      padding: 4px 10px;
    }

    .staking_data_line {
      height: 5px;
      width: 100%;
      background: #dd87d0;
    }

    .lines {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      min-width: 55px;
    }

    .line {
      width: 1px;
      height: 100%;
      padding-top: 20px;
      padding-bottom: 20px;
      background-color: rgba(208, 208, 238, 0.3);
    }
  }
  .table_action {
    display: flex;
    padding-top: 49px;
    padding-bottom: 34px;
    margin-left: 7.5%;
    margin-right: 7.5%;
    width: 85%;
    .action_title {
      margin-left: 0;
      margin-right: auto;
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 27.34px;
      line-height: 35px;
      color: #ffffff;

      @media screen and (max-width: $max-width-desktop) {
        font-size: 22.34px;
        line-height: 30px;
      }
    }

    .btn_unstake {
      margin-right: 0;
      margin-left: auto;
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 21px;
      color: #ffffff;
      cursor: pointer;
      border: none;
      outline: inherit;
      background-color: transparent;
    }
  }
  .table {
    margin-left: 7.5%;
    margin-right: 7.5%;
    width: 85%;

    @media screen and (max-width: $max-width-desktop) {
      margin-left: 2.5%;
      margin-right: 2.5%;
      width: 95%;
    }

    margin-bottom: 34px;
    ul {
      list-style-type: none;
    }

    li {
      display: grid;
      grid-template-columns: auto repeat(4, 1fr);
      place-items: flex-end;
      align-items: center;
      column-gap: 30px;
      text-align: right;
      padding-left: 24px;
      padding-right: 24px;

      @media screen and (max-width: $max-width-desktop) {
        column-gap: 15px;
      }
    }

    .impair {
      background: #1f1f1f;
    }

    .pair {
      background: #292929;
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
        font-size: 12px;
        line-height: 16px;
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
    }

    .img_container {
      display: flex;
      align-items: center;
    }

    .nft_img {
      height: 40px;
      border-radius: 10px;
      margin-right: 8px;
    }
  }
}
</style>
