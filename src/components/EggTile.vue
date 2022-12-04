<template>
  <div class="EggTile" v-on:click="select" ref="main">
    <div class="img_wrapper">
      <img :src="token.image" class="img_token" alt="Image Nft" />
    </div>
    <div class="margin_wrapper" style="margin-left: 16px; margin-right: 16px">
      <div class="nft_title">
        <span class="nft_name">RYU Gen2 #{{ token.id }}</span>
        <span class="nft_id"
          >Token ID <span class="number">#{{ token.id }}</span></span
        >
      </div>
      <div class="bar">
        <div class="bar_title_wrapper bred">
          <span class="bar_title">Bred with</span>
          <div class="bred_value">
            <img :src="token.parent1Image" class="bred_img" alt="Bred 1" />
            <img :src="token.parent2Image" class="bred_img" alt="Bred 2" />
          </div>
        </div>
      </div>
      <div class="top_properties top" v-on:click.stop="collapseProperties">
        <span class="main_title">Properties</span>
        <img
          src="@/assets/vector.png"
          class="collapsable"
          :class="'gen2_collapse_properties_' + token.id"
          alt="collapse"
        />
      </div>
      <div
        v-if="
          token.metadata.attributes &&
          token.metadata.attributes[0] &&
          token.metadata.attributes[0].trait_type &&
          token.metadata.attributes[0].trait_type === 'Egg'
        "
        :class="'gen2_bot_properties_' + token.id"
      >
        <div class="divider"></div>
        <div class="bar">
          <div class="bar_title_wrapper">
            <span class="bar_title">Background</span>
            <span class="properties_value">
              <span class="bar_title">??</span>
            </span>
          </div>
          <div class="progress_bar">
            <div class="progress_bar_value" style="width: 0"></div>
          </div>
        </div>
        <div class="bar">
          <div class="bar_title_wrapper">
            <span class="bar_title">Body</span>
            <span class="properties_value">
              <span class="bar_title">??</span>
            </span>
          </div>
          <div class="progress_bar">
            <div class="progress_bar_value" style="width: 0"></div>
          </div>
        </div>
        <div class="bar">
          <div class="bar_title_wrapper">
            <span class="bar_title">Neck</span>
            <span class="properties_value">
              <span class="bar_title">??</span>
            </span>
          </div>
          <div class="progress_bar">
            <div class="progress_bar_value" style="width: 0"></div>
          </div>
        </div>
        <div class="bar">
          <div class="bar_title_wrapper">
            <span class="bar_title">Eyes</span>
            <span class="properties_value">
              <span class="bar_title">??</span>
            </span>
          </div>
          <div class="progress_bar">
            <div class="progress_bar_value" style="width: 0"></div>
          </div>
        </div>
      </div>
      <div v-else :class="'gen2_bot_properties_' + token.id" class="closed">
        <div class="divider"></div>
        <div
          class="bar"
          v-for="(trait, index) in token.metadata.attributes"
          :key="index"
        >
          <div class="bar_title_wrapper">
            <span class="bar_title">{{ trait.trait_type }}</span>
            <span class="properties_value">
              <span class="bar_value">?? %</span>
              <span class="bar_title">{{ trait.value }}</span>
            </span>
          </div>
          <div class="progress_bar">
            <div class="progress_bar_value" style="width: 14%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Gen2Nfts } from "@/types/Interface";

@Component
export default class EggTile extends Vue {
  selected = false;
  @Prop() token!: Gen2Nfts;
  $refs!: {
    main: HTMLElement;
  };

  /***
   * Collapse the properties section by toggling the class
   * @return {void}
   */
  collapseProperties(): void {
    const collapse = document.querySelector(
      ".gen2_collapse_properties_" + this.token.id
    ) as HTMLInputElement;
    const bot = document.querySelector(
      ".gen2_bot_properties_" + this.token.id
    ) as HTMLInputElement;
    if (bot && collapse) {
      bot.classList.toggle("closed");
      collapse.classList.toggle("turn");
    }
  }

  /***
   * Select the token
   * @return {void}
   */
  select(): void {
    this.$emit("clearPotion");
    document.querySelectorAll(".EggTile").forEach((element) => {
      element.classList.remove("selected");
    });
    this.selected = !this.selected;
    if (this.selected) {
      this.$refs.main.classList.add("selected");
      this.$emit("selectPotion", this.token);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.selected {
  border: 5px solid white;
}
.EggTile {
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
  width: 100%;

  a {
    display: flex;
    align-items: center;
    @media screen and (max-width: 600px) {
      margin-bottom: 15px;
    }
  }

  .img_wrapper {
    height: 100%;
  }

  .margin_wrapper {
    width: 100%;
  }

  .divider {
    height: 0.5px;
    width: 100%;
    background: #676767;
  }

  .img_token {
    width: 100%;
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
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
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
      &.bred {
        margin-top: 15px;
      }
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

      .bred_value {
        margin-right: 0;
        margin-left: auto;
        .bred_img {
          &:first-of-type {
            position: relative;
            left: 20%;
          }
          height: 24px;
          width: 24px;
          border-radius: 50%;
        }
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
    margin-top: 30px;
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

  .closed {
    display: none;
  }

  .turn {
    transform: rotate(-180deg);
  }
}
</style>
