<template>
  <header id="Header">
    <router-link to="/">
      <img src="@/assets/logo.webp" alt="Ryu Logo" id="logo" />
    </router-link>
    <nav id="nav_desktop" class="desktop">
      <router-link class="nav_item zoom" to="/">Home</router-link>
      <span class="nav_item zoom" v-on:click="goTo">Stake</span>
      <router-link class="nav_item zoom" to="/breeding">Breed</router-link>
      <router-link class="nav_item zoom" to="/stakeGen2"
        >Stake Gen2</router-link
      >
    </nav>
    <Connect classes=""></Connect>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Connect from "@/components/Connect.vue";
@Component({
  components: { Connect },
})
export default class Header extends Vue {
  /***
   * Redirect to the staking page and scroll to top
   * @return {void}
   */
  goTo(): void {
    if (this.$router.currentRoute.name !== "StakingView") {
      this.$router.push("/staking");
      window.scrollTo(0, 0);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";

#Header {
  @media screen and (max-width: $max-width-desktop) {
    display: grid;
    grid-template-columns: repeat(2, auto);
    backdrop-filter: none;
    background-color: transparent;
    padding-top: 1rem;
    padding-bottom: 1rem;
    max-height: 10vh;
  }
  backdrop-filter: blur(80px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-top: 1.875rem;
  padding-bottom: 1.5rem;
  background-color: rgba(0, 0, 0, 0.1);

  #logo {
    display: flex;
    margin-left: 2.063rem;
    margin-right: auto;
    height: 2.5rem;
    width: 2.5rem;
    color: white;
  }

  #nav_desktop {
    margin-left: auto;
    margin-right: auto;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1.813rem;
  }

  .nav_item {
    font-family: "SpaceGrotesk-Regular", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.25rem;
    color: white;
    text-decoration: none;
    cursor: pointer;
  }

  .green {
    background-color: #1d864a !important;
  }

  #burger {
    @media screen and (max-width: $max-width-desktop) {
      display: none;
    }
    margin-left: auto;
    margin-right: 20px;
    z-index: 100;
  }

  #nav_mobile {
    position: fixed;
    height: 100vh;
    right: 0;
    top: 0;
    z-index: 99;

    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    transition: all 0.3s ease;
    background-color: #212121;
    transform: translateX(100%);

    .nav_item {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }

  .open {
    transform: translateX(0%) !important;
  }

  .disabled {
    color: rgba(216, 216, 216, 0.6);
  }
}
</style>
