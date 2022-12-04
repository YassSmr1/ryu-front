<template>
  <div id="StakingView">
    <div class="main">
      <Collection></Collection>
      <Toggle></Toggle>
      <div class="title_container">
        <img src="@/assets/avax_logo.webp" alt="Avax Logo" id="avax_logo" />
        <span id="title"> Staking grounds </span>
        <span class="sub_title" v-if="nftStaking">
          Gen1 Ryu include 3234 base and 99 legendary which can breed and be
          staked for daily $nRYU
        </span>
        <span class="sub_title" v-else>
          Stake your nRYU in a timelocked stake to earn gRYU tokens.
        </span>
        <div id="line"></div>
      </div>
    </div>
    <NftStaking v-if="nftStaking"></NftStaking>
    <NRyuStaking v-else></NRyuStaking>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Staking from "@/components/NftStaking.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import Collection from "@/components/Collection.vue";
import Toggle from "@/components/Toggle.vue";
import NftStaking from "@/components/NftStaking.vue";
import NRyuStaking from "@/components/NRyuStaking.vue";

@Component({
  components: {
    NRyuStaking,
    NftStaking,
    Staking,
    Footer,
    Header,
    Collection,
    Toggle,
  },
})
export default class StakingView extends Vue {
  @Prop({
    type: Boolean,
    default: true,
  })
  nftStaking!: boolean;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";

#StakingView {
  .main {
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 1) 7%,
        rgba(0, 0, 0, 0.4458377100840336) 45%,
        rgba(0, 0, 0, 1) 91%
      ),
      url("../assets/background_staking.webp") no-repeat;
    background-size: 100vw 110%;
    display: grid;
    grid-template-rows: repeat(5, auto);
    place-items: center;
    @media screen and (max-width: $max-width-desktop) {
      padding-bottom: 30px;
    }
    padding-bottom: 60px;
    .title_container {
      display: grid;
      grid-template-rows: repeat(4, auto);
      place-items: center;
      margin: 30px 10% 70px;

      #avax_logo {
        margin-bottom: 19px;
      }

      #title {
        font-family: "SpaceGrotesk-Regular", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 42.72px;
        line-height: 55px;
        text-align: center;
        color: #ffffff;
        margin-bottom: 24px;
      }

      .sub_title {
        font-family: "SpaceGrotesk-Light", sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0;
        text-align: center;
        color: #ffffff;
        margin-bottom: 24px;
      }

      #line {
        height: 2px;
        background: linear-gradient(
          270deg,
          rgba(255, 168, 156, 0.1) 0%,
          #ffa89c 50.52%,
          rgba(255, 168, 156, 0.1) 100%
        );
        width: 45%;
      }
    }
  }
}
</style>
