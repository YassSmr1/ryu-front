<template>
  <modal
    name="connect"
    width="300px"
    height="auto"
    :adaptive="true"
    classes="modal_connect"
  >
    <div class="connect_header">
      <div>Connect Wallet</div>
      <div>
        <svg
          viewBox="0 0 24 24"
          color="primary"
          width="20px"
          xmlns="http://www.w3.org/2000/svg"
          class="sc-8a800401-0 wNVai"
          v-on:click="() => $modal.hide('connect')"
        >
          <path
            fill="currentColor"
            d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="grid">
      <div class="col" v-on:click="connectMetamask">
        <img src="@/assets/metamask.png" alt="Logo Metamask" />
        Metamask
      </div>
      <div class="col" v-on:click="connectWalletConnect">
        <img src="@/assets/wallet_connect.png" alt="Logo Wallet Connect" />
        WalletConnect
      </div>
      <div class="col" v-on:click="connectMetamask">
        <img src="@/assets/coinbase.png" alt="Logo Coinbase" />
        Coinbase
      </div>
      <div class="col" v-on:click="connectMetamask">
        <img src="@/assets/brave.webp" alt="Logo Brave" />
        Brave
      </div>
      <div class="col" v-on:click="connectMetamask">
        <img src="@/assets/core.png" alt="Logo Core" />
        Core
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ConnectorActions } from "@/store/modules/connector/actions";

@Component
export default class ConnectModal extends Vue {
  /***
   * Dispatch the action to connect to Metamask
   * @return {void}
   */
  connectMetamask(): void {
    this.$store.dispatch(ConnectorActions.CONNECT_METAMASK);
    this.$modal.hide("connect");
  }

  /***
   * Dispatch the action to connect using WalletConnect
   * @return {void}
   */
  connectWalletConnect(): void {
    this.$store.dispatch(ConnectorActions.CONNECT_WALLET_CONNECT);
    this.$modal.hide("connect");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.modal_connect {
  border-radius: 25px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Space Grotesk", sans-serif;
  .connect_header {
    display: flex;
    font-size: 20px;
    font-weight: bold;
    padding: 12px 24px;
    color: white;
    width: 100%;
    align-items: center;
    background: linear-gradient(139.73deg, #313d5c, #3d2a54);
    :nth-child(1) {
      margin-left: 0;
      margin-right: auto;
    }
    :nth-child(2) {
      margin-left: auto;
      margin-right: 0;
      cursor: pointer;
      :hover {
        color: red;
      }
      display: flex;
      align-items: center;
    }
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #27262c;
    color: white;
    font-size: 16px;
    img {
      height: 48px;
      width: 48px;
      :hover {
        filter: grayscale(50%);
      }
    }
  }
  .col {
    padding: 16px 24px;
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    align-items: center;
    cursor: pointer;
    :hover {
      filter: grayscale(50%);
    }
  }
}
</style>
