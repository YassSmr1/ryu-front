<template>
  <div id="SelectBreed">
    <div class="wrapper">
      <div class="grid_image">
        <div class="grid_image_container">
          <img
            :src="token1.image"
            :alt="token1.id"
            class="nft_img"
            v-if="token1"
          />
          <div class="placeholder" v-else>Select a RYU NFT for breeding</div>
          <div class="img_info" v-if="token1">
            <span class="nft_name"> RYU#{{ token1.tokenId }} </span>
            <div class="bar">
              <div class="bar_title_wrapper">
                <span class="bar_title">Stamina</span>
                <span class="bar_value">{{ token1.stamina }}%</span>
              </div>
              <div class="progress_bar">
                <div
                  class="progress_bar_value"
                  :style="'width: ' + token1.stamina + '%'"
                ></div>
              </div>
            </div>
            <span class="token_id"
              >Token ID<span class="number">#{{ token1.id }}</span></span
            >
          </div>
        </div>
        <img src="@/assets/arrow_horizontal.png" alt="4" class="swap" />
        <div class="grid_image_container">
          <div class="img_info mobile" v-if="token2">
            <span class="nft_name"> RYU#{{ token2.tokenId }}</span>
            <div class="bar">
              <div class="bar_title_wrapper">
                <span class="bar_title">Stamina</span>
                <span class="bar_value">{{ token2.stamina }}%</span>
              </div>
              <div class="progress_bar">
                <div
                  class="progress_bar_value"
                  :style="'width: ' + token2.stamina + '%'"
                ></div>
              </div>
            </div>
            <span class="token_id">
              Token ID <span class="number">#{{ token2.id }}</span>
            </span>
          </div>
          <img
            :src="token2.image"
            :alt="token2.id"
            class="nft_img"
            v-if="token2"
          />
          <div class="placeholder" v-else>Select a RYU NFT for breeding</div>
          <div class="img_info desktop" v-if="token2">
            <span class="nft_name"> RYU#{{ token2.tokenId }}</span>
            <div class="bar">
              <div class="bar_title_wrapper">
                <span class="bar_title">Stamina</span>
                <span class="bar_value">{{ token2.stamina }}%</span>
              </div>
              <div class="progress_bar">
                <div
                  class="progress_bar_value"
                  :style="'width: ' + token2.stamina + '%'"
                ></div>
              </div>
            </div>
            <span class="token_id">
              Token ID <span class="number">#{{ token2.id }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="info">
        <button
          class="btn_confirm"
          :disabled="!(token1 && token2)"
          v-on:click="triggerBreed"
          v-if="
            !$rootState.loader.loading &&
            $rootState.breeding.breedingFactoryApproved
          "
        >
          Confirm breeding
        </button>
        <button
          class="btn_confirm"
          :disabled="!(token1 && token2)"
          v-on:click="triggerApprove"
          v-if="
            !$rootState.loader.loading &&
            !$rootState.breeding.breedingFactoryApproved
          "
        >
          Approve
        </button>
        <Loader v-if="$rootState.loader.loading"></Loader>
      </div>
    </div>
    <img class="ellipse" src="../assets/background_select.png" alt="4" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Gen1NftsBreeding } from "@/types/Interface";
import Loader from "@/components/Loader.vue";
import { LoaderMutation } from "@/store/modules/loader/mutations";
import { BreedingActions } from "@/store/modules/breeding/actions";
@Component({
  components: { Loader },
})
export default class SelectBreed extends Vue {
  @Prop() token1!: Gen1NftsBreeding | null;
  @Prop() token2!: Gen1NftsBreeding | null;
  startSwap = 0;
  startWrapper = 0;
  timer = 0;

  /***
   * Initialize the component by displaying the UI and update it on resize
   * @return {void}
   */
  mounted(): void {
    const swap = document.querySelector(".swap") as HTMLElement;
    const wrapper = document.querySelector(".wrapper") as HTMLElement;
    if (swap && window.innerWidth < 800) {
      this.startSwap = swap.offsetTop;
    }
    if (wrapper && window.innerWidth >= 800) {
      this.startWrapper = wrapper.offsetTop;
    }
    this.putElipse();
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  /***
   * Remove the event listener
   * @return {void}
   */
  unmounted(): void {
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  /***
   * Dispatch the approval action
   * @return {void}
   */
  triggerApprove(): void {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    this.$store.dispatch(BreedingActions.APPROVE_BREEDING_FACTORY);
  }

  /***
   * Dispatch the breeding action and emit the `clear` event
   * @return {Promise<void>}
   */
  async triggerBreed(): Promise<void> {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    await this.$store.dispatch(BreedingActions.BREED, {
      token1: this.token1,
      token2: this.token2,
    });
    this.$emit("clear");
  }

  /***
   * Update the UI on resize
   * @return {void}
   */
  handleResize(): void {
    clearTimeout(this.timer);
    this.timer = window.setTimeout(this.putElipse.bind(this), 200);
  }

  /***
   * Update the position of the elipse
   * @return {void}
   */
  putElipse(): void {
    const elipse = document.querySelector(".ellipse") as HTMLElement;
    const wrapper = document.querySelector(".wrapper") as HTMLElement;
    const swap = document.querySelector(".swap") as HTMLElement;
    if (elipse && wrapper && window.innerWidth >= 800) {
      if (this.startWrapper === 0) {
        this.startWrapper = wrapper.offsetTop;
      }
      let value = wrapper.offsetTop;
      if (this.startWrapper !== wrapper.offsetTop) {
        value -= wrapper.offsetTop - this.startWrapper;
      }
      elipse.style.top = `${value}px`;
    } else if (elipse && swap && window.innerWidth < 800) {
      if (this.startSwap === 0) {
        this.startSwap = swap.offsetTop;
      }
      let value = swap.offsetTop + swap.getBoundingClientRect().height / 2;
      if (this.startSwap !== swap.offsetTop) {
        value -= swap.offsetTop - this.startSwap;
      }
      elipse.style.top = `${value}px`;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";

#SelectBreed {
  position: relative;
  margin-bottom: 128px;
  .wrapper {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    max-width: 902px;
    flex-direction: column;
    @media screen and (max-width: $max-width-desktop) {
      margin-left: 5%;
      margin-right: 5%;
    }
  }
  .ellipse {
    position: absolute;
    width: 100%;
  }
  .grid_image {
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    @media screen and (max-width: $max-width-desktop) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto 1fr;
      row-gap: 20px;
    }
    place-items: center;
    column-gap: 40px;
    .grid_image_container {
      display: grid;
      grid-template-rows: 1fr auto;
      row-gap: 16px;
      height: 100%;
      width: 100%;
      .placeholder {
        background: rgba(255, 255, 255, 0.1);
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #d8d8d8;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1.05038px solid #d8d8d8;
        filter: drop-shadow(0px 10px 40px rgba(0, 0, 0, 0.25));
        border-radius: 4px;
        backdrop-filter: blur(40px);
        height: 372px;
      }

      .nft_img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .img_info {
        display: grid;
        grid-template-columns: auto auto auto;
        place-items: center;
        .nft_name {
          width: 100%;
          margin-right: 10px;
          font-family: "SpaceGrotesk-Regular", sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: 21.88px;
          line-height: 28px;
          color: #ffffff;
        }

        .bar {
          display: grid;
          grid-template-rows: auto auto;
          width: 100%;

          .bar_title_wrapper {
            display: flex;
            flex-direction: row;
            .bar_title {
              margin-left: 0;
              margin-right: auto;
              font-family: "Inter", sans-serif;
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 17px;
              color: #bcbcbc;
            }

            .properties_value {
              .bar_title {
                margin-left: 5px;
              }
            }

            .bar_value {
              margin-right: 0;
              margin-left: auto;
              font-family: "Inter", sans-serif;
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              line-height: 17px;
              color: #dd87d0;
            }
          }

          .progress_bar {
            height: 4px;
            width: 100%;
            border: 0.5px solid #d8d8d8;
            border-radius: 4px;
            margin-top: 8px;
            .progress_bar_value {
              height: 100%;
              background: linear-gradient(
                90deg,
                #dd87d0 0%,
                #6907a6 25%,
                #e4761b 47.92%,
                #dd87d0 73.44%,
                #6907a6 100%
              );
              border-radius: 4px;
            }
          }
        }

        .token_id {
          margin-right: 0;
          margin-left: auto;
          font-family: "SpaceGrotesk-Light", sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          color: #d8d8d8;
          width: 100%;

          .number {
            margin-left: 6px;
            font-family: "SpaceGrotesk-Regular", sans-serif;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 20px;
            display: flex;
            align-items: center;
            color: #ffffff;
          }
        }
      }
    }
  }

  .info {
    position: relative;
    z-index: 2;
    margin-top: 24px;
    margin-left: auto;
    margin-right: 0;

    .btn_confirm {
      z-index: 2;
      padding: 10px 16px;
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 21px;
      outline: inherit;
      cursor: pointer;
      border: 1px solid #ffffff;
      border-radius: 4px;
      color: white;
      background: transparent;
      &:disabled {
        background: rgba(216, 216, 216, 0.3);
        border-radius: 4px;
        color: #676767;
        border: none;
      }
    }
  }
}
</style>
