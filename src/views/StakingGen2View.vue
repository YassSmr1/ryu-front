<template>
  <div id="StakingGen2View">
    <div class="main">
      <Collection></Collection>
      <div class="title_container">
        <img src="@/assets/avax_logo.webp" alt="Avax Logo" id="avax_logo" />
        <span id="title"> Gen 2 Staking </span>
        <span class="sub_title">
          Gen2 Dragons earn nRYU and burn nRYU to level up through the ranks of
          the Dragon Army.
          <br />Ryusaurs and potions help boost your earnings as you ascend up
          the leaderboard
        </span>
        <div id="line"></div>
        <button class="button_leaderboard zoom" v-on:click="goTo">
          Leaderboard
        </button>
      </div>
    </div>
    <Gen2Table
      v-on:oneSelected="handleOneSelected"
      v-on:boost="handleBoost"
      v-on:upgrade="handleUpgrade"
      :ryusaur="ryusaurSelected"
      :potion="boostSelected"
    ></Gen2Table>
    <RyusaurCollection
      v-on:ryusaurSelected="handleRyusaurSelected"
      :disabled="boostSelected"
    ></RyusaurCollection>
    <PotionCollection
      v-on:boostSelected="handleBoostSelected"
      v-if="tokenSelected"
      :count="tokenSelected.potionCount"
    ></PotionCollection>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import Collection from "@/components/Collection.vue";
import Gen2Table from "@/components/Gen2Table.vue";
import { Gen2StakingData, Ryusaur } from "@/types/Interface";
import RyusaurCollection from "@/components/RyusaurCollection.vue";
import PotionCollection from "@/components/PotionCollection.vue";
import { LoaderMutation } from "@/store/modules/loader/mutations";
import { Gen2StakingActions } from "@/store/modules/gen2Staking/actions";

@Component({
  components: {
    PotionCollection,
    RyusaurCollection,
    Gen2Table,
    Footer,
    Header,
    Collection,
  },
})
export default class StakingGen2View extends Vue {
  tokenSelected: Gen2StakingData | null = null;
  ryusaurSelected: Ryusaur | null = null;
  boostSelected = false;

  /***
   * Handle the `oneSelected` event from the Gen2Table component
   * @param {Gen2StakingData} token
   * @return {void}
   */
  handleOneSelected(token: Gen2StakingData): void {
    this.tokenSelected = token;
  }

  /***
   * Handle the `boost` event from the RyusaurCollection component
   * @param {Ryusaur} ryusaur
   * @return {void}
   */
  handleRyusaurSelected(ryusaur: Ryusaur): void {
    this.ryusaurSelected = ryusaur;
  }

  /***
   * Handle the `boostSelected` event from the PotionCollection component
   * @param {boolean} boost
   * @return {void}
   */
  handleBoostSelected(boost: boolean): void {
    this.boostSelected = boost;
  }

  /***
   * Handle the `boost` event from the Gen2Table component and dispatch the
   * Ryusaur Boost action if the user has selected a Ryusaur
   * @return {Promise<void>}
   */
  async handleBoost(): Promise<void> {
    if (this.ryusaurSelected && this.tokenSelected) {
      this.$store.commit(LoaderMutation.SET_LOADING, true);
      await this.$store.dispatch(Gen2StakingActions.RYUSAUR_BOOST, {
        id: this.tokenSelected.id,
        ryusaurId: this.ryusaurSelected.id,
      });
      this.ryusaurSelected = null;
    }
  }

  /***
   * Handle the `upgrade` event from the Gen2Table component and dispatch the
   * Upgrade action
   * @return {Promise<void>}
   */
  async handleUpgrade(): Promise<void> {
    if (this.tokenSelected) {
      this.$store.commit(LoaderMutation.SET_LOADING, true);
      await this.$store.dispatch(Gen2StakingActions.UPGRADE, {
        id: this.tokenSelected.id,
        boost: this.boostSelected,
      });
      this.tokenSelected = null;
    }
  }

  /***
   * Navigate to the leaderboard page and scroll to the top
   * @return {void}
   */
  goTo(): void {
    this.$router.push("/leaderboard");
    window.scrollTo(0, 0);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";

#StakingGen2View {
  .main {
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 1) 7%,
        rgba(0, 0, 0, 0.4458377100840336) 45%,
        rgba(0, 0, 0, 1) 91%
      ),
      url("../assets/background_staking.webp") no-repeat;
    background-size: 100vw 110%;
    display: grid;
    grid-template-rows: repeat(5, auto);
    place-items: center;
    @media screen and (max-width: $max-width-desktop) {
      padding-bottom: 15px;
    }
    padding-bottom: 30px;
    .title_container {
      display: grid;
      grid-template-rows: repeat(4, auto);
      place-items: center;
      margin: 30px 10% 70px;

      #avax_logo {
        margin-bottom: 19px;
      }

      #title {
        font-family: "SpaceGrotesk-Regular", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 42.72px;
        line-height: 55px;
        text-align: center;
        color: #ffffff;
        margin-bottom: 24px;
      }

      .sub_title {
        font-family: "SpaceGrotesk-Light", sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0;
        text-align: center;
        color: #ffffff;
        margin-bottom: 24px;
      }

      #line {
        height: 2px;
        background: linear-gradient(
          270deg,
          rgba(255, 168, 156, 0.1) 0%,
          #ffa89c 50.52%,
          rgba(255, 168, 156, 0.1) 100%
        );
        width: 45%;
      }

      .button_leaderboard {
        cursor: pointer;
        margin-top: 30px;
        font-family: "SpaceGrotesk-Regular", sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: -0.009em;
        color: #ffffff;
        padding: 12px 40px;
        background: #2e2e3a;
        border-radius: 4px;
        border: none;
      }
    }
  }
}
</style>
