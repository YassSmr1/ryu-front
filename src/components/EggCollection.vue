<template>
  <div id="EggCollection">
    <div class="egg_top_collection" v-on:click="collapse">
      <div class="left_egg_top_collection">
        <span class="main_title">My Breeds</span>
        <input
          type="checkbox"
          value="false"
          v-on:click.stop
          v-model="current"
          id="current"
        />
        <label for="current" class="labels" id="label_current" v-on:click.stop
          >Current</label
        >
        <input
          type="checkbox"
          value="false"
          v-on:click.stop
          v-model="pastBreeds"
          id="pastBreeds"
        />
        <label
          for="pastBreeds"
          class="labels"
          id="label_current"
          v-on:click.stop
          >Past Breeds</label
        >
      </div>
      <img
        src="@/assets/vector.png"
        class="egg_collapse_collection"
        alt="collapse"
        id="egg_collapse_collection"
      />
    </div>
    <div class="egg_bot_collection">
      <EggTile
        v-for="(token, index) in $rootState.gen2.gen2Nfts.filter((ryuToken) => {
          if (current && pastBreeds) {
            return true;
          } else if (current && !pastBreeds) {
            return ryuToken.metadata.attributes[0].trait_type === 'Egg';
          } else if (!current && pastBreeds) {
            return ryuToken.metadata.attributes[0].trait_type !== 'Egg';
          } else {
            return false;
          }
        })"
        :key="index"
        :token="token"
        v-on:selectPotion="emitEvent"
        v-on:clearPotion="emitEventClear"
      ></EggTile>
    </div>
    <img
      alt="ellipse potion"
      src="@/assets/ellipse_potion.png"
      class="egg_ellipse_potion"
      v-if="
        $rootState.gen2.gen2Nfts.filter((ryuToken) => {
          if (current && pastBreeds) {
            return true;
          } else if (current && !pastBreeds) {
            return ryuToken.metadata.attributes[0].trait_type === 'Egg';
          } else if (!current && pastBreeds) {
            return ryuToken.metadata.attributes[0].trait_type !== 'Egg';
          } else {
            return false;
          }
        }).length > 0
      "
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RyuTile from "@/components/RyuTile.vue";
import { MutationPayload } from "vuex";
import { Gen2Nfts } from "@/types/Interface";
import EggTile from "@/components/EggTile.vue";
import { ConnectorMutations } from "@/store/modules/connector/mutations";
import { Gen2Actions } from "@/store/modules/gen2/actions";
@Component({
  components: { EggTile, RyuTile },
})
export default class EggCollection extends Vue {
  current = true;
  pastBreeds = true;
  unsubscribe: () => void = () => null;

  /***
   * Initialize the component and subscribe to the store to update data when needed
   * @return {void}
   */
  mounted(): void {
    if (this.$rootState.connector.account) {
      this.$store.dispatch(Gen2Actions.GET_GEN2_NFTS);
    }
    this.unsubscribe = this.$store.subscribe((mutation: MutationPayload) => {
      if (
        mutation.type === ConnectorMutations.SET_ACCOUNT &&
        mutation.payload
      ) {
        this.$store.dispatch(Gen2Actions.GET_GEN2_NFTS);
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
   * Collapse the egg collection by toggling the class
   * @return {void}
   */
  collapse(): void {
    const collapse = document.querySelector(
      ".egg_collapse_collection"
    ) as HTMLInputElement;
    const bot = document.querySelector(
      ".egg_bot_collection"
    ) as HTMLInputElement;
    const ellipse = document.querySelector(
      ".egg_ellipse_potion"
    ) as HTMLInputElement;
    if (bot && collapse && ellipse) {
      bot.classList.toggle("closed");
      collapse.classList.toggle("turn");
      ellipse.classList.toggle("closed");
    }
  }

  /***
   * Emit the `selectPotion` event to the parent component
   * @param {Gen2Nfts} token - The token to emit
   * @return {void}
   */
  emitEvent(token: Gen2Nfts): void {
    this.$emit("selectPotion", token);
  }

  /***
   * Emit the `clearPotion` event to the parent component
   * @return {void}
   */
  emitEventClear(): void {
    this.$emit("clearPotion");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#EggCollection {
  position: relative;
  margin-left: 5%;
  margin-right: 5%;
  padding-bottom: 60px;
  .egg_ellipse_potion {
    position: absolute;
    top: 100px;
    left: 0;
    height: auto;
    z-index: -1;
    width: 100%;
  }

  .egg_top_collection {
    cursor: pointer;
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 24px;
    .left_egg_top_collection {
      .labels {
        font-family: "SpaceGrotesk-Regular", sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        color: #ffffff;
      }
      #current {
        margin-left: 40px;
      }
      #label_current {
        margin-left: 8px;
        margin-right: 24px;
      }
      #pastBreeds {
        margin-right: 8px;
      }
    }
    .main_title {
      cursor: pointer;
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
    .egg_collapse_collection {
      cursor: pointer;
      margin-right: 0;
      margin-left: auto;
      width: 13.33px;
      height: 6.67px;
    }
  }

  .egg_bot_collection {
    display: grid;
    column-gap: 41.5px;
    row-gap: 44px;
    grid-template-columns: repeat(2, 1fr);
    @media screen and (max-width: 1326px) {
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
