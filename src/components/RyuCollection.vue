<template>
  <div id="RyuCollection">
    <div class="top_collection" v-on:click="collapse">
      <span class="main_title">My Ryu Collection</span>
      <img
        src="@/assets/vector.png"
        class="collapse_collection"
        alt="collapse"
        id="collapse_collection"
      />
    </div>
    <div class="bot_collection">
      <RyuTile
        v-for="(token, index) in $rootState.gen1.gen1NftsBreeding"
        :key="index"
        :token="token"
        v-on:selectToken="emitEvent"
        :disabled="disabled.includes(token.tokenId)"
      />
    </div>
    <img
      alt="ellipse potion"
      src="@/assets/ellipse_potion.png"
      class="ellipse_potion"
      v-if="$rootState.gen1.gen1NftsBreeding.length > 0"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RyuTile from "@/components/RyuTile.vue";
import { MutationPayload } from "vuex";
import { Gen1Nfts } from "@/types/Interface";
import { Gen1Actions } from "@/store/modules/gen1/actions";
import { BreedingActions } from "@/store/modules/breeding/actions";
import { ConnectorMutations } from "@/store/modules/connector/mutations";
@Component({
  components: { RyuTile },
})
export default class RyuCollection extends Vue {
  @Prop() disabled!: number[];
  unsubscribe: () => void = () => null;

  /***
   * Initialize the component and subscribe to the store to update the data
   * @return {void}
   */
  mounted(): void {
    if (this.$rootState.connector.account) {
      this.$store.dispatch(Gen1Actions.GET_GEN1_NFTS_BREEDING);
      this.$store.dispatch(BreedingActions.GET_BREEDING_FACTORY_APPROVED);
    }
    this.unsubscribe = this.$store.subscribe((mutation: MutationPayload) => {
      if (
        mutation.type === ConnectorMutations.SET_ACCOUNT &&
        mutation.payload
      ) {
        this.$store.dispatch(Gen1Actions.GET_GEN1_NFTS_BREEDING);
        this.$store.dispatch(BreedingActions.GET_BREEDING_FACTORY_APPROVED);
      }
    });
  }

  /**
   * Unsubscribe to the store
   * @return {void}
   */
  unmounted(): void {
    this.unsubscribe();
  }

  /***
   * Collapse the RyuCollection section by toggling the class
   * @return {void}
   */
  collapse(): void {
    const collapse = document.querySelector(
      ".collapse_collection"
    ) as HTMLInputElement;
    const bot = document.querySelector(".bot_collection") as HTMLInputElement;
    const ellipse = document.querySelector(
      ".ellipse_potion"
    ) as HTMLInputElement;
    const ellipse_egg = document.querySelector(
      ".egg_ellipse_potion"
    ) as HTMLInputElement;
    if (bot) bot.classList.toggle("closed");
    if (ellipse) ellipse.classList.toggle("closed");
    if (ellipse_egg) ellipse_egg.classList.toggle("closed");
    if (collapse) collapse.classList.toggle("turn");
  }

  /***
   * Emit the `selectToken` event with the token
   * @param {Gen1Nfts} token - The token selected
   * @return {void}
   */
  emitEvent(token: Gen1Nfts): void {
    this.$emit("selectToken", token);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#RyuCollection {
  position: relative;
  margin-left: 5%;
  margin-right: 5%;
  padding-bottom: 200px;
  .ellipse_potion {
    position: absolute;
    top: -100px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .top_collection {
    cursor: pointer;
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 24px;
    .main_title {
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 27.34px;
      line-height: 35px;
      text-align: center;
      color: white;
      margin-left: 0;
      margin-right: auto;
    }
    .collapse_collection {
      margin-right: 0;
      margin-left: auto;
      width: 13.33px;
      height: 6.67px;
    }
  }

  .bot_collection {
    display: grid;
    column-gap: 24px;
    row-gap: 24px;
    grid-template-columns: repeat(4, 1fr);
    @media screen and (max-width: 1250px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 1000px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 640px) {
      grid-template-columns: repeat(1, 1fr);
      place-items: center;
    }
  }

  .closed {
    display: none;
  }

  .turn {
    transform: rotate(-180deg);
  }
}
</style>
