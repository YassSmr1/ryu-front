<template>
  <div id="QuickView">
    <div class="card">
      <div class="bg">
        <img src="@/assets/background_roadmap.webp" alt="roadmap Background" />
      </div>
      <img
        src="@/assets/nft_staking.webp"
        alt="nft staking"
        class="rounded_img"
        height="80px"
        width="80px"
      />
      <span class="title">NFT Staking</span>
      <span class="desc"
        >Gen1 dragons include 3234 base and 99 legendary which can breed and be
        staked for daily $nRYU.
      </span>
      <button class="button_cta zoom" v-on:click="goTo">Dashboard</button>
    </div>
    <div class="card">
      <div class="bg">
        <img src="@/assets/background_roadmap.webp" alt="roadmap Background" />
      </div>
      <img
        src="@/assets/nryu_staking.webp"
        alt="nryu staking"
        class="rounded_img"
        height="80px"
        width="80px"
      />
      <span class="title">nRYU Staking</span>
      <span class="desc">
        &nbsp;<br />
        Stake you nRYU in a timelocked stake to earn gRYU tokens.<br />
        &nbsp;
      </span>
      <button class="button_cta disabled">Coming soon</button>
    </div>
    <div class="card">
      <div class="bg">
        <img src="@/assets/background_roadmap.webp" alt="roadmap Background" />
      </div>
      <img
        src="@/assets/breeding.webp"
        alt="breeding"
        class="rounded_img"
        height="80px"
        width="80px"
      />
      <span class="title">Breeding</span>
      <span class="desc">
        &nbsp;<br />
        The creation of Gen2 Ryu Dragons, paid for with nRYU.<br />
        &nbsp;
      </span>
      <router-link class="button_cta zoom" to="/breeding"
        >Dashboard</router-link
      >
    </div>
    <div class="card">
      <div class="bg">
        <img src="@/assets/background_roadmap.webp" alt="roadmap Background" />
      </div>
      <img
        src="@/assets/lottery.webp"
        alt="lottery"
        class="rounded_img"
        height="80px"
        width="80px"
      />
      <span class="title">RYU lottery</span>
      <span class="desc">
        Leveraging the unique characteristics of the gRYU token allow us to
        formulate a one-of-a-kind lottery.
      </span>
      <button class="button_cta disabled">Coming soon</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class QuickView extends Vue {
  /***
   * Redirect to the staking page and scroll to the top
   * @return {void}
   */
  goTo(): void {
    this.$router.push("/staking");
    window.scrollTo(0, 0);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";
#QuickView {
  @media screen and (max-width: $max-width-desktop) {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: 1fr;
    grid-row-gap: 30px;
    padding-bottom: 60px;
  }

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  margin-left: 5%;
  margin-right: 5%;
  grid-column-gap: 24px;
  padding-bottom: 120px;

  .card {
    display: grid;
    place-items: center;
    height: 100%;
    .bg {
      img {
        margin-left: 12px;
        margin-right: 12px;
        margin-top: 12px;
        width: calc(100% - 24px);
        border-radius: 5%;
      }
    }
    .rounded_img {
      position: relative;
      top: -40px;
      display: flex;
      margin-left: auto;
      margin-right: auto;
    }
    background: #0f0f13;
    border-radius: 6px;

    .title {
      text-align: center;
      display: flex;
      margin-bottom: 25px;
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 21.88px;
      line-height: 28px;
      color: #ffffff;
    }

    .desc {
      display: block;
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #d8d8d8;
      text-align: center;
      margin-bottom: 25px;
      width: 80%;
      min-height: 51px;
    }

    .disabled {
      color: #000000 !important;
      background: rgba(216, 216, 216, 0.6) !important;
      border-radius: 4px;
      border: none !important;
      cursor: auto !important;
    }

    .button_cta {
      padding: 10px 16px;
      margin: auto 10% 34px;
      width: 80%;
      background: rgba(216, 216, 216, 0.2);
      border: 1px solid #d8d8d8;
      border-radius: 4px;
      color: #d8d8d8;
      font-family: "SpaceGrotesk-Regular", sans-serif;
      text-align: center;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 21px;
      cursor: pointer;
      text-decoration: none;
    }
  }
}
</style>
