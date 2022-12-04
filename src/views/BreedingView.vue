<template>
  <div id="BreedingView">
    <div class="main">
      <Collection></Collection>
      <div class="title_container">
        <img src="@/assets/avax_logo.webp" alt="Avax Logo" id="avax_logo" />
        <span id="title">Breeding</span>
        <span class="sub_title">
          Breeding requires two Gen1 Dragons. Breeding cost 2000 $nRYU. The egg
          will incubate for 33 days before revealing your Gen2 dragon. Potions
          can be purchased to affect the outcome off the Gen2 dragon. There are
          4 potions that can affect breeding and incubation. Potions consist of
          Speed Ups, Strip Down, Fraternal Twins, and Identical Twins.
        </span>
        <div id="line"></div>
      </div>
      <div class="two_sides">
        <div class="side">
          <span class="title_side"> What's next ? </span>
          <span class="text_side">
            Select two dragons and add a potion if you dare. Each dragon has a
            limited number of stamina points, so use them wisely. Incubation
            lasts 33 days, the eggs are transferable during this period. Eggs
            can be affected by a maximum of two Speed Up potions during the
            incubation period.
          </span>
        </div>
        <span class="vertical_line"></span>
        <div class="side">
          <span class="title_side"> Disclaimer </span>
          <span class="text_side">
            Breeding Potions are nontransferable. They are wallet bound pay-for
            activities. Potions are limited in the breeding game and may run
            out. Once the supply of potions runs out for the breeding game, they
            may not be restocked.
          </span>
        </div>
      </div>
    </div>
    <SelectBreed
      :token1="this.firstToken"
      :token2="this.secondToken"
      v-on:clear="
        () => {
          this.firstToken = null;
          this.secondToken = null;
        }
      "
    ></SelectBreed>
    <PotionLibrary :token="potionToken"></PotionLibrary>
    <EggCollection
      v-on:selectPotion="handleSelectPotion"
      v-on:clearPotion="handleClearPotion"
    ></EggCollection>
    <RyuCollection
      v-on:selectToken="handleSelectToken"
      :disabled="[
        firstToken ? firstToken.tokenId : -1,
        secondToken ? secondToken.tokenId : -1,
      ]"
    ></RyuCollection>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Collection from "@/components/Collection.vue";
import Toggle from "@/components/Toggle.vue";
import SelectBreed from "@/components/SelectBreed.vue";
import { Gen1NftsBreeding, Gen2Nfts } from "@/types/Interface";
import PotionLibrary from "@/components/PotionLibrary.vue";
import RyuCollection from "@/components/RyuCollection.vue";
import EggCollection from "@/components/EggCollection.vue";
import { LabsActions } from "@/store/modules/labs/actions";
import { BreedingActions } from "@/store/modules/breeding/actions";
import { LabsMutation } from "@/store/modules/labs/mutations";
import { BreedingMutations } from "@/store/modules/breeding/mutations";
@Component({
  components: {
    EggCollection,
    RyuCollection,
    PotionLibrary,
    SelectBreed,
    Toggle,
    Collection,
  },
})
export default class BreedingView extends Vue {
  firstToken: Gen1NftsBreeding | null = null;
  secondToken: Gen1NftsBreeding | null = null;
  potionToken: Gen2Nfts | null = null;

  /***
   * Handle the `selectToken` event from the RyuCollection component
   * @param {Gen1NftsBreeding} token
   * @return {void}
   */
  handleSelectToken(token: Gen1NftsBreeding): void {
    if (this.firstToken === null) {
      this.firstToken = token;
    } else if (this.secondToken === null) {
      this.secondToken = token;
    } else {
      this.firstToken = token;
      this.secondToken = null;
    }
  }

  /***
   * Handle the `selectPotion` event from the EggCollection component
   * @param {Gen2Nfts} token - The Gen2Nft token that was selected
   * @return {void}
   */
  async handleSelectPotion(token: Gen2Nfts): Promise<void> {
    await this.$store.dispatch(LabsActions.GET_POTIONS_USAGE, token.id);
    await this.$store.dispatch(BreedingActions.GET_SPEED_UP_LEVEL, token.id);
    this.potionToken = token;
  }

  /***
   * Handle the `clearPotion` event from the EggCollection component
   * @return {void}
   */
  handleClearPotion(): void {
    this.$store.commit(LabsMutation.SET_POTIONS_USAGE, [
      false,
      false,
      false,
      false,
    ]);
    this.$store.commit(BreedingMutations.SET_SPEED_UP_LEVEL, 2);
    this.potionToken = null;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";

#BreedingView {
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
    grid-template-rows: repeat(3, auto);
    place-items: center;
    padding-bottom: 60px;
    @media screen and (max-width: $max-width-desktop) {
      padding-bottom: 30px;
    }

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
        max-width: 559px;
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
    }

    .two_sides {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      @media screen and (max-width: $max-width-desktop) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto 1fr;
        text-align: center;
        row-gap: 20px;
        margin-left: 5%;
        margin-right: 5%;
      }
      column-gap: 49px;
      place-items: center;
      max-width: 902px;
      border: 1px solid #676767;
      border-radius: 4px;
      padding: 24px;
    }

    .side {
      display: grid;
      grid-template-rows: auto auto;
      .title_side {
        font-family: "SpaceGrotesk-Regular", sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        color: #ffffff;
        @media screen and (max-width: $max-width-desktop) {
          font-size: 13px;
          line-height: 17px;
        }
      }
      .text_side {
        font-family: "SpaceGrotesk-Light", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        color: #ffffff;
        @media screen and (max-width: $max-width-desktop) {
          font-size: 13px;
          line-height: 17px;
        }
      }
    }

    .vertical_line {
      height: 75px;
      width: 1px;
      background-color: #676767;
      @media screen and (max-width: $max-width-desktop) {
        width: 80%;
        height: 1px;
      }
    }
  }
}
</style>
