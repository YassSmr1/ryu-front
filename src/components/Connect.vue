<template>
  <button
    v-if="!$rootState.connector.account"
    class="connect_wallet zoom"
    :class="classes"
    v-on:click="openConnectModal"
  >
    Connect to wallet
  </button>
  <button
    v-else
    class="connect_wallet zoom green"
    :class="classes"
    v-on:click="disconnect"
  >
    {{ truncate($rootState.connector.account, 16) }}
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ConnectorActions } from "@/store/modules/connector/actions";

@Component
export default class Connect extends Vue {
  @Prop({ default: "" }) readonly classes!: string;

  /***
   * Open the modal to connect to a wallet
   * @return {void}
   */
  openConnectModal(): void {
    this.$modal.show("connect");
  }

  /***
   * Dispatch the action to disconnect the wallet
   * @return {void}
   */
  disconnect(): void {
    this.$store.dispatch(ConnectorActions.DISCONNECT);
  }

  /***
   * Truncate a string to a given length using ellipsis
   * @param {string} fullStr - The string to truncate
   * @param {number} strLen - The len of the truncated string
   * @return {string} - The truncated string
   */
  truncate(fullStr: string, strLen: number): string {
    if (fullStr.length <= strLen) return fullStr;
    const separator = "...";
    const sepLen = separator.length,
      charsToShow = strLen - sepLen,
      frontChars = Math.ceil(charsToShow / 2),
      backChars = Math.floor(charsToShow / 2);
    return (
      fullStr.substring(0, frontChars) +
      separator +
      fullStr.substring(fullStr.length - backChars)
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";

.connect_wallet {
  @media screen and (max-width: $max-width-desktop) {
    margin-right: 1rem;
  }

  display: flex;
  margin-right: 2.5rem;
  margin-left: auto;
  background-color: #ab2d2e;
  border: none;
  border-radius: 0.375rem;
  padding: 0.625rem 1.25rem;

  font-family: "SpaceGrotesk-Regular", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.25rem;
  color: #f5f5ff;

  @media screen and (max-width: $max-width-desktop) {
    font-size: 0.8rem;
    line-height: 1rem;
  }

  outline: inherit;
  cursor: pointer;
}
</style>
