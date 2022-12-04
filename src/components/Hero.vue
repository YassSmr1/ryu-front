<template>
  <div id="Hero">
    <div class="bg"></div>
    <div class="grid">
      <div class="grid_left">
        <h1 class="title">A new Era for NFT collections</h1>
        <div class="line desktop"></div>
        <h2 class="desc desktop">
          RYU is an expansive ecosystem built on top of Avalanche blockchain .
        </h2>
        <div class="double_btn desktop">
          <button class="btn_title zoom" v-on:click="scrollToRoadmap">
            Roadmap
          </button>
          <a
            class="btn_title_inv zoom"
            href="https://ryu-nft.gitbook.io/whitepaper/"
            target="_blank"
            >Whitepaper</a
          >
        </div>
      </div>
      <img
        src="@/assets/dragons_hero.webp"
        alt="Dragons Hero"
        id="dragon_hero"
      />
      <img
        class="mobile"
        src="@/assets/arrow_bottom.webp"
        alt="Arrow Bottom"
        id="arrow_bottom"
        height="50px"
        width="50px"
      />
      <div class="mobile_desc mobile">
        Discover our <span class="red">expansive ecosystem</span> built on top
        of the Avalanche blockchain
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Hero extends Vue {
  /***
   * Scroll to the roadmap element
   * @return {void}
   */
  scrollToRoadmap(): void {
    const element = document.getElementById("Roadmap");
    if (element)
      element.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";

#Hero {
  @media screen and (max-width: $max-width-desktop) {
    min-height: 90vh;
    padding-bottom: 0;
  }
  padding-bottom: 160px;

  .bg {
    @media screen and (max-width: $max-width-desktop) {
      background: url("../assets/background_home_mobile.webp") no-repeat;
      background-size: 100vw 80vh;
    }
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(
        181.82deg,
        rgba(0, 0, 0, 0) -21.05%,
        rgba(0, 0, 0, 0.96) 85.03%,
        #000000 98.48%
      ),
      url("../assets/background_home.webp") no-repeat;
    background-size: 100vw 100%;
  }

  .grid {
    @media screen and (max-width: $max-width-desktop) {
      display: grid;
      height: 90vh;
      place-items: center;
      grid-template-columns: auto;
      grid-template-rows: auto auto auto auto;
      margin-top: 0;
    }
    margin-top: 40px;
    display: flex;

    .grid_left {
      @media screen and (max-width: $max-width-desktop) {
        margin-right: 0;
        margin-left: 0;
        display: grid;
        place-items: center;
      }
      display: grid;
      grid-template-rows: repeat(4, auto);
      margin-left: 60px;
      margin-right: auto;

      .title {
        @media screen and (max-width: $max-width-desktop) {
          text-align: left;
          margin-left: 2.5%;
          font-size: 5.7vh;
          line-height: 6vh;
        }
        font-family: "SpaceGrotesk-Regular", sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: clamp(50px, 5vw, 100px);
        line-height: clamp(55px, 6vw, 110px);
        color: #ffffff;
      }

      .line {
        height: 8px;
        width: 0;
        background: linear-gradient(
          270deg,
          #dd87d0 0%,
          rgba(221, 135, 208, 0) 100%
        );
        border-radius: 2.5px;
        animation: right_move 2.3s 1 forwards;
      }

      @keyframes right_move {
        0% {
          width: 0;
        }
        100% {
          width: 30%;
        }
      }

      .desc {
        font-family: "SpaceGrotesk-Regular", sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: clamp(15px, 2.5vw, 27.34px);
        line-height: clamp(19px, 3vw, 35px);
        color: #ffffff;
      }

      .double_btn {
        height: 53px;
        display: flex;
        flex-direction: row;
        .btn_title {
          font-family: "SpaceGrotesk-Regular", sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          color: #f5f5ff;
          padding: 16px 24px;
          background-color: #6907a6;
          margin-right: 12px;

          outline: inherit;
          cursor: pointer;
          border: none;
          border-radius: 6px;

          &:hover {
            transform: scale(1.1);
          }
        }

        .btn_title_inv {
          text-decoration: none;
          font-family: "SpaceGrotesk-Regular", sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          color: #f5f5ff;
          background-color: transparent;
          margin-right: 12px;
          padding: 16px 18px;

          outline: inherit;
          cursor: pointer;
          border: 2px solid #6907a6;
          border-radius: 6px;
        }
      }
    }

    .mobile_desc {
      @media screen and (max-width: $max-width-desktop) {
        display: block;
        margin-bottom: 0;
        margin-left: 5%;
        margin-right: 5%;
      }
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 21px;
      text-align: center;
      color: #ffffff;
      .red {
        color: #ffa89c;
      }
    }

    #dragon_hero {
      @media screen and (max-width: $max-width-desktop) {
        margin-right: 10%;
        margin-left: 10%;
        width: 80%;
      }
      position: relative;
      margin-right: clamp(0px, 8vw, 108px);
      min-width: 200px;
      width: auto;
      margin-left: auto;
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
      0% {
        transform: translatey(0px);
      }
      50% {
        transform: translatey(15%);
      }
      100% {
        transform: translatey(0px);
      }
    }

    @keyframes float_arrow {
      0% {
        transform: translatey(0px);
      }
      50% {
        transform: translatey(40%);
      }
      100% {
        transform: translatey(0px);
      }
    }

    #arrow_bottom {
      display: none;
      @media screen and (max-width: $max-width-desktop) {
        display: block;
      }
      animation: float_arrow 6s ease-in-out infinite;
    }
  }
}
</style>
