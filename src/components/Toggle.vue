<template>
  <div id="Toggle">
    <span class="choose_stake">nRYU Staking Grounds</span>
    <label class="switch">
      <input type="checkbox" :checked="true" disabled />
      <span></span>
    </label>
    <span class="choose_stake active">NFT Staking Grounds</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Toggle extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";

#Toggle {
  padding-top: 60px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-column-gap: 25px;
  place-items: center;

  @media screen and (max-width: $max-width-desktop) {
    grid-column-gap: 12.5px;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .choose_stake {
    font-family: "SpaceGrotesk-Regular", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 21.88px;
    line-height: 28px;
    color: #d8d8d8;
    text-align: center;

    @media screen and (max-width: $max-width-desktop) {
      font-size: 14px;
      line-height: 16px;
    }
  }

  .active {
    color: #ffffff;
  }

  .switch {
    display: inline-block;
    position: relative;
    width: 70px;
    height: 40px;
    cursor: pointer;
    overflow: hidden;
  }

  .switch input {
    position: absolute;
    top: -30px;
    left: -30px;
    width: 0;
    height: 0;
  }

  .switch input + span {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: transparent;
    border-radius: 20px;
    border: 3px solid #d8d8d8;
  }

  .switch input + span:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 3px;
    width: 29px;
    height: 29px;
    background: #d8d8d8;
    border-radius: 50%;
    transform: translateY(-50%);
    transition: all 0.5s;
  }

  .switch input:checked + span:before {
    left: 30px;
  }
}
</style>
