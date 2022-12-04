<template>
  <div id="Explore">
    <div class="main_grid">
      <div class="first_grid">
        <img src="@/assets/avax_logo.webp" alt="Avax Logo" id="avax_logo" />
      </div>
      <div class="circle desktop">
        <img src="@/assets/circle_1.webp" alt="circle_1" id="circle_1" />
        <img src="@/assets/circle_2.webp" alt="circle_2" id="circle_2" />
      </div>
      <div class="second_grid">
        <span class="title"
          >Explore our <span class="red">Gen 1</span> Mint</span
        >
        <div class="line"></div>
        <span class="text"
          >Gen1 Ryu Dragons can be found for sale on Kalao and are verified with
          the blue checkmark. Always make sure you are trading the verified
          collection.
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Explore extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";
#Explore {
  @media screen and (max-width: $max-width-desktop) {
    background: radial-gradient(circle, rgba(0, 0, 0, 0) 0%, black 99%),
      url("../assets/background_explore.webp") repeat;
    background-size: 40px;
  }
  background: radial-gradient(circle, rgba(0, 0, 0, 0) 0%, black 93%),
    url("../assets/background_explore.webp") repeat;
  background-size: 40px;

  .main_grid {
    @media screen and (max-width: $max-width-desktop) {
      margin-right: 2%;
      margin-left: 2%;
      width: auto;
      padding-top: 50px;
      padding-bottom: 50px;
      background-size: contain;
    }
    padding-top: 115px;
    padding-bottom: 146px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;
    width: 462px;
    background: url("../assets/inside_elipse.webp") no-repeat center;
  }

  .first_grid {
    display: grid;
    grid-template-rows: repeat(1, auto);
    place-items: center;
    row-gap: 19px;
    grid-auto-columns: minmax(0, 1fr);
  }

  .second_grid {
    display: grid;
    grid-template-rows: repeat(3, auto);
    place-items: center;
    row-gap: 19px;
    grid-auto-columns: minmax(0, 1fr);
  }

  .circle {
    position: relative;
    z-index: 0;
    width: 462px;
    height: 1px;
    margin-left: auto;
    margin-right: auto;
    flex-direction: column;
    align-items: flex-end;
    display: flex;
    top: -40px;

    #circle_1 {
      position: absolute;
      right: -30%;
      overflow: hidden;
    }

    #circle_2 {
      position: absolute;
      right: -30%;
      overflow: hidden;
    }
  }

  .title {
    @media screen and (max-width: $max-width-desktop) {
      font-size: 34.18px;
      line-height: 44px;
    }
    font-family: "SpaceGrotesk-Regular", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 42.72px;
    line-height: 55px;
    text-align: center;
    color: #ffffff;
    z-index: 1;
    .red {
      color: #ffa89c;
    }
  }

  .line {
    height: 1px;
    width: 50%;
    background: linear-gradient(
      270deg,
      rgba(255, 168, 156, 0.8) 0%,
      rgba(255, 168, 156, 0.2) 53.92%,
      rgba(255, 168, 156, 0.8) 100%
    );
  }

  .text {
    @media screen and (max-width: $max-width-desktop) {
      font-size: 14px;
      line-height: 18px;
    }
    font-family: "SpaceGrotesk-Regular", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
  }
}
</style>
