<template>
  <div id="Collection">
    <a
      class="tiles"
      v-for="nft in nfts"
      :key="nft[0]"
      :href="nft[1]"
      target="_blank"
      rel="noreferrer"
    >
      <img
        :src="'/collection/' + nft[0] + '.webp'"
        :alt="'RYU #' + nft[0]"
        class="ryu_image"
      />
      <span class="ryu_title">
        RYU<br />
        #{{ nft[0] }}
      </span>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Collection extends Vue {
  baseUrl =
    "https://marketplace.kalao.io/token/0x13d933eb47f41cbc0687376622d03a8da10feab6/";
  nfts: [number, string][] = [
    [25, this.baseUrl + "1060"],
    [988, this.baseUrl + "1062"],
    [1031, this.baseUrl + "3141"],
    [1130, this.baseUrl + "3135"],
    [1477, this.baseUrl + "1174"],
    [1680, this.baseUrl + "529"],
    [2316, this.baseUrl + "127"],
    [2452, this.baseUrl + "2234"],
    [3049, this.baseUrl + "337"],
    [2326, this.baseUrl + "1099"],
    [1233, this.baseUrl + "3231"],
    [1717, this.baseUrl + "930"],
    [1919, this.baseUrl + "1306"],
    [2055, this.baseUrl + "3228"],
    [2477, this.baseUrl + "3229"],
    [2635, this.baseUrl + "250"],
  ];

  /***
   * Initialize the component by randomizing the nfts displayed
   * @return {void}
   */
  mounted(): void {
    this.nfts = this.nfts.sort(() => 0.5 - Math.random());
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#Collection {
  display: inline-flex;
  overflow: hidden;
  margin-left: -50px;
  padding-top: 36.5px;
  width: calc(100% + 50px);

  background: linear-gradient(
    180deg,
    #000000 4.74%,
    rgba(20, 20, 20, 0.7976) 35.5%,
    rgba(196, 196, 196, 0) 100%
  );
  background-blend-mode: multiply;
  .tiles {
    text-decoration: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-right: clamp(16px, 2vw, 40px);

    .ryu_image {
      height: clamp(30px, 6vw, 70px);
      margin-right: 20px;
      border-radius: 10px;
    }

    .ryu_title {
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: clamp(12px, 2vw, 27.34px);
      line-height: clamp(15px, 3vw, 35px);
      color: #ffffff;
    }
  }
}
</style>
