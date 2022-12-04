<template>
  <div id="PotionCollection">
    <div class="top_collection" v-on:click="collapse">
      <span class="main_title">Available Potion Power-Ups ({{ count }})</span>
      <img
        src="@/assets/vector.png"
        class="collapse_collection_potion"
        alt="collapse"
        id="collapse_collection_potion"
      />
    </div>
    <div class="bot_collection_potion">
      <PotionTile
        v-for="index in count"
        :key="index"
        :index="index"
        :selected="selected === index"
        v-on:boostSelected="handleBoostSelected"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RyuTile from "@/components/RyuTile.vue";
import PotionTile from "@/components/PotionTile.vue";

@Component({
  components: { PotionTile, RyuTile },
})
export default class PotionCollection extends Vue {
  @Prop() count!: number;
  selected: number | null = null;

  /***
   * Collapse the potion collection by toggling the class
   * @return {void}
   */
  collapse(): void {
    const collapse = document.querySelector(
      ".collapse_collection_potion"
    ) as HTMLInputElement;
    const bot = document.querySelector(
      ".bot_collection_potion"
    ) as HTMLInputElement;
    if (bot) bot.classList.toggle("closed");
    if (collapse) collapse.classList.toggle("turn");
  }

  /***
   * Emit the `boostSelected` event and set the selected potion
   * @return {void}
   */
  handleBoostSelected(n: number): void {
    if (n === this.selected) {
      this.selected = null;
    } else {
      this.selected = n;
    }
    this.$emit("boostSelected", !!this.selected);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";

#PotionCollection {
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
    .collapse_collection_potion {
      margin-right: 0;
      margin-left: auto;
      width: 13.33px;
      height: 6.67px;
    }
  }

  .bot_collection_potion {
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
