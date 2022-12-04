<template>
  <footer id="Footer">
    <img src="@/assets/logo.webp" alt="Ryu Logo" id="logo" loading="lazy" />
    <span id="footer_text">
      Ryu NFT will never direct message or email you.<br />
      Ryu NFT and affiliated collections are registered IP and copyright of our
      artist.
    </span>
    <div id="nav_footer">
      <a
        class="nav_item"
        target="_blank"
        href="https://ryu-nft.gitbook.io/whitepaper/"
        >Whitepaper</a
      >
      <a
        class="nav_item"
        href="https://www.discord.gg/TqwtdcCTdz"
        target="_blank"
        rel="noreferrer"
        >Discord</a
      >
    </div>
    <div id="socials">
      <a href="https://twitter.com/RyuNFT" target="_blank" rel="noreferrer">
        <img
          src="@/assets/twitter.webp"
          class="social_logo"
          alt="Twitter Logo"
          loading="lazy"
          height="18px"
          width="22px"
        />
      </a>
      <a
        href="https://www.discord.gg/TqwtdcCTdz"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="@/assets/discord.webp"
          class="social_logo"
          alt="Discord Logo"
          loading="lazy"
          height="18px"
          width="22px"
        />
      </a>
      <a
        href="https://marketplace.kalao.io/collection/0x13d933eb47f41cbc0687376622d03a8da10feab6"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="@/assets/shop.webp"
          class="social_logo"
          alt="Shop Logo"
          loading="lazy"
          height="18px"
          width="22px"
        />
      </a>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";
#Footer {
  @media screen and (max-width: $max-width-desktop) {
    row-gap: 20px;
    padding-bottom: 40px;
  }
  display: grid;
  place-items: center;
  grid-template-rows: repeat(4, auto);
  row-gap: 40px;
  padding-bottom: 138px;
  padding-top: 34px;
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 1) 7%,
      rgba(0, 0, 0, 0) 100%
    ),
    url("../assets/background_footer.webp") repeat;
  background-size: 40px;

  #logo {
    margin-top: 40px;
    height: 40px;
  }

  #footer_text {
    font-family: "SpaceGrotesk-Regular", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: center;

    @media screen and (max-width: $max-width-desktop) {
      font-size: 13px;
      line-height: 17px;
    }

    color: #ffffff;

    mix-blend-mode: normal;
    opacity: 0.5;
  }

  #nav_footer {
    @media screen and (max-width: $max-width-desktop) {
      column-gap: 30px;
    }
    display: grid;
    place-items: center;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 77px;
  }

  .nav_item {
    font-family: "DM Sans", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 20px;

    @media screen and (max-width: $max-width-desktop) {
      font-size: 12px;
      line-height: 17px;
    }

    letter-spacing: -0.204545px;
    color: #ffffff;
    text-decoration: none;
  }

  #socials {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20px;
  }
}
</style>
