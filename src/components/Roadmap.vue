<template>
  <div id="Roadmap">
    <div class="desc">
      <div class="wave_name_grid">
        <span class="wave_name_title"> Wave {{ wave }} </span>
        <div class="underline_wave"></div>
      </div>
      <div class="grid_desc">
        <ul>
          <li :class="waveItem[wave][0] ? '' : 'no_decoration'">
            {{ waveItem[wave][0] ? waveItem[wave][0] : "" }}
          </li>
          <li :class="waveItem[wave][1] ? '' : 'no_decoration'">
            {{ waveItem[wave][1] ? waveItem[wave][1] : "" }}
          </li>
        </ul>
        <ul>
          <li :class="waveItem[wave][2] ? '' : 'no_decoration'">
            {{ waveItem[wave][2] ? waveItem[wave][2] : "" }}
          </li>
          <li :class="waveItem[wave][3] ? '' : 'no_decoration'">
            {{ waveItem[wave][3] ? waveItem[wave][3] : "" }}
          </li>
        </ul>
      </div>
      <div class="arrow_wrapper">
        <button
          class="left_arrow zoom"
          :class="wave === 0 ? 'transparent invisible' : null"
          v-on:click="wave > 0 ? wave-- : undefined"
        >
          <img
            src="@/assets/left_arrow.webp"
            alt="Left Arrow"
            id="left_arrow_img"
            height="37px"
            width="37px"
          />
        </button>
        <button
          class="mobile right_arrow zoom"
          :class="wave === 3 ? 'transparent' : null"
          v-on:click="wave < 3 ? wave++ : undefined"
        >
          <img
            src="@/assets/right_arrow.webp"
            alt="Right Arrow"
            height="37px"
            width="37px"
            :class="wave === 3 ? 'invisible' : null"
          />
        </button>
      </div>
    </div>
    <div class="desktop right_grid">
      <button
        class="right_arrow zoom"
        :class="wave === 3 ? 'transparent' : null"
        v-on:click="wave < 3 ? wave++ : undefined"
      >
        <img
          src="@/assets/right_arrow.webp"
          alt="Right Arrow"
          id="right_arrow"
          height="37px"
          width="37px"
          :class="wave === 3 ? 'invisible' : null"
        />
      </button>
      <img src="@/assets/elipse.webp" alt="Elipse" id="elipse" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Roadmap extends Vue {
  wave = 3;
  waveItem: string[][] = [
    ["Twitter Launch", "Discord Launch", "Website Launch"],
    ["Genesis Nft Mint"],
    ["NFT Staking", "RYU Token Launch"],
    ["NFT Breeding", "Whitepapers Pt. 2", "Advanced DeFi", "RoadMap Pt. 2"],
  ];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";
#Roadmap {
  display: grid;
  grid-template-columns: 45% 55%;
  @media screen and (max-width: $max-width-desktop) {
    display: grid;
    grid-template-columns: 1fr;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    padding-bottom: 40px;
  }
  .desc {
    display: grid;
    padding-left: clamp(10px, 2vw, 33px);
    grid-template-rows: repeat(4, auto);
    place-items: flex-start;
    .wave_name_grid {
      display: grid;
      place-items: flex-start;
      grid-template-rows: auto auto;
      margin-bottom: 46px;
      .wave_name_title {
        font-family: "SpaceGrotesk-Regular", sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: clamp(30px, 3vw, 41.2365px);
        line-height: clamp(25px, 3.4vw, 53px);
        color: #ffffff;
        padding-left: 62px;
      }
      .underline_wave {
        margin-top: 2px;
        height: 9.65px;
        width: 100%;
        background: linear-gradient(
          270deg,
          #6907a6 0%,
          rgba(105, 7, 166, 0) 100%
        );
      }
    }
    .grid_desc {
      margin-left: clamp(20px, 5vw, 96px);
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: clamp(20px, 6vw, 95px);
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: clamp(16px, 1.5vw, 19.3032px);
      line-height: clamp(24px, 3vw, 36px);
      color: #ffffff;
      margin-bottom: 62px;
      @media screen and (max-width: $max-width-desktop) {
        li:first-child {
          margin-bottom: 12px;
        }
      }
    }
    .left_arrow {
      @media screen and (max-width: $max-width-desktop) {
        height: auto;
        padding: 10px 10px;
        display: flex;
      }
      padding: 12px 30px;
      background: white;
      outline: none;
      border: none;
      cursor: pointer;
    }
  }

  .arrow_wrapper {
    display: flex;
    margin-right: 0;
    margin-left: auto;

    @media screen and (max-width: $max-width-desktop) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      place-items: center;
    }
  }

  .right_grid {
    background: url("../assets/background_roadmap.webp") no-repeat;
    background-size: cover;
    width: 100%;
    display: flex;
    align-items: flex-end;
    #elipse {
      position: absolute;
      z-index: -1;
      top: -1200%;
    }
  }

  .right_arrow {
    padding: 12px 30px;
    background: black;
    border: none;
    outline: none;
    color: white;
    cursor: pointer;
    @media screen and (max-width: $max-width-desktop) {
      height: auto;
      padding: 10px 10px;
      display: flex;
    }
  }

  .transparent {
    background-color: transparent !important;
  }

  .invisible {
    visibility: hidden;
  }

  .no_decoration {
    color: black;
  }
}
</style>
