<template>
  <div class="PotionTile">
    <div class="img_wrapper">
      <img src="@/assets/boost.png" alt="boost" class="img_token" />
    </div>
    <div class="title">
      <div class="title_text">Boost Potion</div>
      <img src="@/assets/chrono.png" alt="chrono" class="chrono" />
    </div>
    <div class="percent">25% Boost</div>
    <div class="divider"></div>
    <div class="checkbox_wrapper">
      <input
        class="checkbox"
        type="checkbox"
        :checked="selected"
        v-on:change="boostSelected"
      />
      <span class="css_checkbox"></span>
      <div class="text_checkbox">Use for power up</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PotionTile extends Vue {
  @Prop() selected!: boolean;
  @Prop() index!: number;

  /***
   * Emit the `boostSelected` event with the index of the potion
   * @return {void}
   */
  boostSelected(): void {
    this.$emit("boostSelected", this.index);
  }
}
</script>

<style scoped lang="scss">
@import "./src/scss/_variables.scss";

.PotionTile {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #292929;
  border-radius: 0 0 4px 4px;

  .img_wrapper {
    display: flex;
    justify-content: center;
    .img_token {
      width: 100%;
      max-height: 150px;
      max-width: 131px;
      margin-bottom: 12px;
      border-radius: 4px 4px 0 0;
    }
  }

  .title {
    margin-bottom: 12px;
    font-family: "SpaceGrotesk-Regular", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: #ffffff;

    display: flex;
    align-items: center;

    margin-right: 16px;
    margin-left: 16px;

    .chrono {
      margin-right: 0;
      margin-left: auto;
      height: 14px;
      width: 12px;
    }
  }

  .percent {
    margin-bottom: 16px;
    margin-right: 16px;
    margin-left: 16px;

    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #dd87d0;
  }

  .divider {
    margin-bottom: 16px;
    margin-right: 16px;
    margin-left: 16px;
    background-color: #d8d8d8;
    height: 1px;
  }

  .checkbox_wrapper {
    margin-right: 16px;
    margin-left: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 17.5px;
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
      position: relative;
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

    .text_checkbox {
      margin-left: 12px;
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: white;
    }
  }
}
</style>
