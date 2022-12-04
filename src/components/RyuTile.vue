<template>
  <div class="RyuTile">
    <div>
      <img :src="token.image" class="img_token" alt="Image Nft" />
    </div>
    <div class="margin_wrapper" style="margin-left: 16px; margin-right: 16px">
      <div class="nft_title">
        <span class="nft_name">RYU#{{ token.tokenId }}</span>
        <span class="nft_id"
          >Token ID <span class="number">#{{ token.id }}</span></span
        >
      </div>
      <div class="bar">
        <div class="bar_title_wrapper">
          <span class="bar_title">Stamina</span>
          <span class="bar_value">{{ token.stamina }}%</span>
        </div>
        <div class="progress_bar">
          <div
            class="progress_bar_value"
            :style="'width: ' + token.stamina + '%'"
          ></div>
        </div>
      </div>
      <div class="top_properties top" v-on:click="collapseProperties">
        <span class="main_title">Properties</span>
        <img
          src="@/assets/vector.png"
          class="collapsable turn"
          :class="'collapse_properties_' + token.tokenId"
          alt="collapse"
        />
      </div>
      <div :class="'bot_properties_' + token.tokenId" class="closed">
        <div class="divider"></div>
        <div
          class="bar"
          v-for="(trait, index) in token.metadata.attributes"
          :key="index"
        >
          <div class="bar_title_wrapper">
            <span class="bar_title">{{ trait.trait_type }}</span>
            <span class="properties_value">
              <span class="bar_value"
                >{{ trait.percent ? trait.percent : 0 }}%</span
              >
              <span class="bar_title">{{ trait.value }}</span>
            </span>
          </div>
          <div class="progress_bar">
            <div
              class="progress_bar_value"
              :style="'width: ' + (trait.percent ? trait.percent + '%' : 0)"
            ></div>
          </div>
        </div>
      </div>
      <div class="top_lore top" v-on:click="collapseLore">
        <span class="main_title">Lore</span>
        <img
          src="@/assets/vector.png"
          class="collapsable"
          :class="'collapse_lore_' + token.tokenId"
          alt="collapse"
        />
      </div>
      <div :class="'bot_lore_' + token.tokenId" class="bot">
        <div class="divider"></div>
        <div class="text">
          RYU NFT Gen1 is a collection of breeding and staking dragons that
          earns $RYU
        </div>
      </div>
      <button class="btn_select" v-on:click="emitEvent" :disabled="disabled">
        Use for breeding
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Gen1NftsBreeding } from "@/types/Interface";

@Component
export default class RyuTile extends Vue {
  @Prop() token!: Gen1NftsBreeding;
  @Prop() disabled!: boolean;

  /***
   * Emit the `selectToken` event with the token and scroll to the Breeding section
   * @return {void}
   */
  emitEvent(): void {
    this.$emit("selectToken", this.token);
    const element = document.getElementById("SelectBreed");
    if (element)
      element.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
  }

  /***
   * Collapse the Properties section by toggling the class
   * @return {void}
   */
  collapseProperties(): void {
    const collapse = document.querySelector(
      ".collapse_properties_" + this.token.tokenId
    ) as HTMLInputElement;
    const bot = document.querySelector(
      ".bot_properties_" + this.token.tokenId
    ) as HTMLInputElement;
    if (bot && collapse) {
      bot.classList.toggle("closed");
      collapse.classList.toggle("turn");
    }
  }

  /***
   * Collapse the Lore section by toggling the class
   * @return {void}
   */
  collapseLore(): void {
    const collapse = document.querySelector(
      ".collapse_lore_" + this.token.tokenId
    ) as HTMLInputElement;
    const bot = document.querySelector(
      ".bot_lore_" + this.token.tokenId
    ) as HTMLInputElement;
    if (bot && collapse) {
      bot.classList.toggle("closed");
      collapse.classList.toggle("turn");
    }
  }
}
</script>

<style scoped lang="scss">
.RyuTile {
  background: #1f1f1f;
  border-radius: 4px;
  padding: 8px;
  max-width: 395px;
  height: fit-content;

  .divider {
    height: 0.5px;
    width: 100%;
    background: #676767;
  }

  .img_token {
    width: 100%;
    margin-bottom: 16px;
  }

  .nft_title {
    display: flex;
    flex-direction: row;
    .nft_name {
      margin-left: 0;
      margin-right: auto;
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 21.88px;
      line-height: 28px;
      color: #ffffff;
    }

    .nft_id {
      margin-right: 0;
      margin-left: auto;
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      display: flex;
      align-items: center;
      color: #d8d8d8;
      .number {
        margin-left: 6px;
        font-family: "SpaceGrotesk-Regular", sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        display: flex;
        align-items: center;
        color: #ffffff;
      }
    }
  }

  .bar {
    display: grid;
    grid-template-rows: auto auto;
    margin-top: 12px;

    .bar_title_wrapper {
      display: flex;
      flex-direction: row;
      .bar_title {
        margin-left: 0;
        margin-right: auto;
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #bcbcbc;
      }

      .properties_value {
        .bar_title {
          margin-left: 5px;
        }
      }

      .bar_value {
        margin-right: 0;
        margin-left: auto;
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #dd87d0;
      }
    }

    .progress_bar {
      height: 4px;
      width: 100%;
      border: 0.5px solid #d8d8d8;
      border-radius: 4px;
      margin-top: 8px;
      .progress_bar_value {
        height: 100%;
        background: linear-gradient(
          90deg,
          #dd87d0 0%,
          #6907a6 25%,
          #e4761b 47.92%,
          #dd87d0 73.44%,
          #6907a6 100%
        );
        border-radius: 4px;
      }
    }
  }

  .top {
    cursor: pointer;
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 14px;
    margin-top: 26px;
    .main_title {
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      color: #d8d8d8;
      margin-left: 0;
      margin-right: auto;
    }
    .collapsable {
      margin-right: 0;
      margin-left: auto;
      width: 13.33px;
      height: 6.67px;
    }
  }

  .bot {
    .text {
      margin-top: 12px;
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      color: #d8d8d8;
    }
  }

  .btn_select {
    padding-top: 12px;
    padding-bottom: 12px;
    margin-top: 24px;
    margin-bottom: 16px;
    width: 100%;
    font-family: "SpaceGrotesk-Regular", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
    outline: inherit;
    cursor: pointer;
    border: 1px solid #ffffff;
    border-radius: 4px;
    color: white;
    background: transparent;
    &:disabled {
      background: rgba(216, 216, 216, 0.3);
      border-radius: 4px;
      color: #676767;
      border: none;
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
