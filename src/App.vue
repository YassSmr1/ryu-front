<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
    <modal name="success" height="auto" width="60%">
      <img
        src="@/assets/cancel.png"
        alt="Cancel"
        class="modal_cancel"
        v-on:click="closeModal"
      />
      <div class="modal_wrapper">
        <img src="@/assets/check.png" alt="Check Success" />
        <span class="modal_title_success"
          >Your transaction request was successful !</span
        >
        <span class="modal_desc">{{ $store.state.success }}</span>
      </div>
    </modal>
    <ConnectModal></ConnectModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";
import Footer from "@/components/Footer.vue";
import { ConnectorActions } from "@/store/modules/connector/actions";
import ConnectModal from "@/components/ConnectModal.vue";

@Component({
  components: {
    ConnectModal,
    Header,
    Footer,
  },
})
export default class App extends Vue {
  /***
   * Initialize the app and check if there is a wallet connected
   * @return {void}
   */
  mounted(): void {
    this.$store.dispatch(ConnectorActions.GET_FROM_LOCAL_STORAGE);
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  /***
   * Close modal
   * @return {void}
   */
  closeModal(): void {
    this.$modal.hide("success");
  }
}
</script>

<style lang="scss">
@import "./src/scss/_variables.scss";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  height: calc(var(--vh, 1vh) * 100);
  background: black;
}

.txError {
  margin-top: 1rem;
  margin-right: 0.6rem;
  padding: 1rem 1rem 1rem 1rem;
  font-family: AlegrayaRegular, serif;
  font-size: 1rem;
  color: black;
  background-color: #923636 !important;
}

.mobile {
  @media screen and (min-width: $max-width-desktop) {
    display: none !important;
  }
}

.desktop {
  @media screen and (max-width: $max-width-desktop) {
    display: none !important;
  }
}

.zoom:hover {
  transform: scale(1.1);
}

.vm--modal {
  color: white;
  background-color: black !important;
  border: 0.5px solid rgba(120, 182, 109, 0.4);
  box-shadow: 0 60px 120px rgba(38, 51, 77, 0.03);
  border-radius: 8px;
}

.modal_cancel {
  margin-top: 5px;
  margin-left: 5px;
}

.modal_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal_title_success {
  font-family: "SpaceGrotesk-Regular", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 21.88px;
  line-height: 28px;
  color: #ffffff;
  text-align: center;

  @media screen and (max-width: $max-width-desktop) {
    font-size: 14px;
    line-height: 21.12px;
  }
}

.modal_desc {
  padding-top: 10px;
  font-family: "SpaceGrotesk-Regular", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  margin-bottom: 30px;
  text-align: center;

  @media screen and (max-width: $max-width-desktop) {
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 15px;
  }
}
.v-toast {
  font-family: "SpaceGrotesk-Regular", sans-serif;
}

@font-face {
  font-family: "SpaceGrotesk-Bold";
  src: url("~@/assets/font/SpaceGrotesk-Bold.ttf");
  font-display: swap;
}

@font-face {
  font-family: "SpaceGrotesk-Light";
  src: url("~@/assets/font/SpaceGrotesk-Light.ttf");
  font-display: swap;
}

@font-face {
  font-family: "SpaceGrotesk-Medium";
  src: url("~@/assets/font/SpaceGrotesk-Medium.ttf");
  font-display: swap;
}

@font-face {
  font-family: "SpaceGrotesk-Regular";
  src: url("~@/assets/font/SpaceGrotesk-Regular.ttf");
  font-display: swap;
}

@font-face {
  font-family: "SpaceGrotesk-SemiBold";
  src: url("~@/assets/font/SpaceGrotesk-SemiBold.ttf");
  font-display: swap;
}
</style>
