<template>
  <div id="RyusaurCollection">
    <div class="top_collection" v-on:click="collapse">
      <span class="main_title">Available Ryu Power-Ups</span>
      <img
        src="@/assets/vector.png"
        class="collapse_collection"
        alt="collapse"
        id="collapse_collection"
      />
    </div>
    <div class="bot_collection">
      <RyusaurTile
        v-for="(token, index) in $rootState.gen2Staking.ryusaurs"
        :key="index"
        :token="token"
        :selected="disabled ? token === null : selected === token"
        v-on:ryusaurSelected="handleRyusaurSelected"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RyuTile from "@/components/RyuTile.vue";
import { Ryusaur } from "@/types/Interface";
import RyusaurTile from "@/components/RyusaurTile.vue";
import { MutationPayload } from "vuex";
import { ConnectorMutations } from "@/store/modules/connector/mutations";
import { Gen2StakingActions } from "@/store/modules/gen2Staking/actions";

@Component({
  components: { RyusaurTile, RyuTile },
})
export default class RyuCollection extends Vue {
  unsubscribe: () => void = () => null;
  selected: Ryusaur | null = null;
  @Prop() disabled!: boolean;

  /***
   * Initialize the component and subscribe to the store to update the data
   * @return {void}
   */
  mounted(): void {
    if (this.$rootState.connector.account) {
      this.$store.dispatch(Gen2StakingActions.GET_RYUSAURS);
    }
    this.unsubscribe = this.$store.subscribe((mutation: MutationPayload) => {
      if (
        mutation.type === ConnectorMutations.SET_ACCOUNT &&
        mutation.payload
      ) {
        this.$store.dispatch(Gen2StakingActions.GET_RYUSAURS);
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
   * Collapse the Ryusaur Collection by toggling the class
   * @return {void}
   */
  collapse(): void {
    const collapse = document.querySelector(
      ".collapse_collection"
    ) as HTMLInputElement;
    const bot = document.querySelector(".bot_collection") as HTMLInputElement;
    if (bot) bot.classList.toggle("closed");
    if (collapse) collapse.classList.toggle("turn");
  }

  /***
   * Emit the `ryusaurSelected` event and pass the selected Ryusaur
   * @param {Ryusaur} token - The selected token
   * @return {void}
   */
  handleRyusaurSelected(token: Ryusaur): void {
    if (token === this.selected) {
      this.selected = null;
    } else {
      this.selected = token;
    }
    this.$emit("ryusaurSelected", this.selected);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";

#RyusaurCollection {
  position: relative;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 75px;
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
    grid-template-columns: repeat(5, 1fr);
    @media screen and (max-width: 1250px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: 1000px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
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
