<template>
  <div id="LeaderboardView">
    <div class="main">
      <Collection></Collection>
      <div class="title_container">
        <img src="@/assets/avax_logo.webp" alt="Avax Logo" id="avax_logo" />
        <span id="title"> Leaderboard </span>
        <span class="sub_title">
          The Leaderboard showcases which Ryu Gen2 dragons are the highest
          ranking in the Dragon Army.
        </span>
        <div id="line"></div>
        <button class="button_leaderboard zoom" v-on:click="goTo">
          Staking
        </button>
      </div>
    </div>
    <Leaderboard></Leaderboard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import Collection from "@/components/Collection.vue";
import Leaderboard from "@/components/Leaderboard.vue";

@Component({
  components: {
    Leaderboard,
    Footer,
    Header,
    Collection,
  },
})
export default class LeaderboardView extends Vue {
  /***
   * Navigate to the Staking page of Gen2 and scroll to top
   * @return {void}
   */
  goTo(): void {
    this.$router.push("/stakeGen2");
    window.scrollTo(0, 0);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";

#LeaderboardView {
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
      padding-bottom: 15px;
    }
    padding-bottom: 30px;
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

      .button_leaderboard {
        cursor: pointer;
        margin-top: 30px;
        font-family: "SpaceGrotesk-Regular", sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: -0.009em;
        color: #ffffff;
        padding: 12px 40px;
        background: #2e2e3a;
        border-radius: 4px;
        border: none;
      }
    }
  }
}
</style>
