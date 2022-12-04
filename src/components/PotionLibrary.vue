<template>
  <div id="PotionLibrary">
    <div class="top_potion" v-on:click="collapse">
      <span class="main_title">Potion Library</span>
      <img
        src="@/assets/vector.png"
        class="collapse"
        alt="collapse"
        id="collapse"
      />
    </div>
    <div class="bot_potion">
      <div class="left_bot">
        <span class="title_left_potion"> Breeding Potions </span>
        <div class="text_left_potion">
          Breeding Potions are items that affect the outcome of your Gen2
          dragon. They available for purchase with $nRYU.
        </div>
      </div>
      <div class="right_bot">
        <div
          class="potion"
          :class="token && $rootState.breeding.speedUpLevel !== 2 ? '' : 'grey'"
          v-on:click="
            selectItem('Speed', $rootState.breeding.speedUpLevel !== 2)
          "
          ref="speed"
        >
          <div class="number">
            {{
              $rootState.breeding.speedUpLevel === 0
                ? "x2"
                : $rootState.breeding.speedUpLevel === 1
                ? "x1"
                : "x0"
            }}
            <img
              src="@/assets/interrogate.png"
              class="interrogate"
              alt="interrogate"
              :id="$rootState.breeding.speedUpLevel === 0 ? 'speed' : 'speed2'"
              v-on:mouseover="activeToolTip"
              v-on:mouseout="activeToolTip"
            />
            <div
              class="tooltip"
              id="tooltip_speed2"
              v-if="$rootState.breeding.speedUpLevel === 1"
            >
              Speed Up #2 - Reduces incubation time in half. Cannot be used
              until #1 is used. 5500 $nRYU
            </div>
            <div class="tooltip" id="tooltip_speed" v-else>
              Speed Up #1 - Reduces incubation time in half. 3300 $nRYU
            </div>
          </div>
          <img src="@/assets/boost.png" class="img_potion" alt="Potion 1" />
        </div>
        <div
          class="potion"
          :class="token && $rootState.labs.potionsUsage[0] ? '' : 'grey'"
          v-on:click="
            selectItem('Fraternal', token && $rootState.labs.potionsUsage[0])
          "
          ref="fraternal"
        >
          <div class="number">
            {{ $rootState.labs.potionsUsage[0] ? "x1" : "x0" }}
            <img
              src="@/assets/interrogate.png"
              class="interrogate"
              alt="interrogate"
              id="fraternal"
              v-on:mouseover="activeToolTip"
              v-on:mouseout="activeToolTip"
            />
            <div class="tooltip" id="tooltip_fraternal">
              Fraternal Twins - Two Gen2 dragons from 1 breeding session with
              unique trait sets. 7500 $nRYU
            </div>
          </div>
          <img src="@/assets/fraternal.png" class="img_potion" alt="Potion 2" />
        </div>
        <div
          class="potion"
          :class="token && $rootState.labs.potionsUsage[1] ? '' : 'grey'"
          v-on:click="selectItem('StripDown', $rootState.labs.potionsUsage[1])"
          ref="stripDown"
        >
          <div class="number">
            {{ $rootState.labs.potionsUsage[1] ? "x1" : "x0" }}
            <img
              src="@/assets/interrogate.png"
              class="interrogate"
              alt="interrogate"
              id="stripDown"
              v-on:mouseover="activeToolTip"
              v-on:mouseout="activeToolTip"
            />
            <div class="tooltip" id="tooltip_stripDown">
              Strip Down - Breeds a "Naked" Gen2. Only Background and body
              traits remain. 5000 $nRYU
            </div>
          </div>
          <img
            src="@/assets/strip_down.png"
            class="img_potion"
            alt="Potion 1"
          />
        </div>
        <div
          class="potion"
          :class="token && $rootState.labs.potionsUsage[2] ? '' : 'grey'"
          v-on:click="selectItem('Identical', $rootState.labs.potionsUsage[2])"
          ref="identical"
        >
          <div class="number">
            {{ $rootState.labs.potionsUsage[2] ? "x1" : "x0" }}
            <img
              src="@/assets/interrogate.png"
              class="interrogate"
              alt="interrogate"
              id="identical"
              v-on:mouseover="activeToolTip"
              v-on:mouseout="activeToolTip"
            />
            <div class="tooltip" id="tooltip_identical">
              Identical Twins - Two identical Gen2 dragons produced from 1
              breeding session. 15000 $nRYU
            </div>
          </div>
          <img src="@/assets/identical.png" class="img_potion" alt="Potion 1" />
        </div>
      </div>
    </div>
    <div class="btn_wrapper">
      <button
        v-if="
          token &&
          $rootState.breeding.breedingFactoryApproved &&
          $rootState.labs.labsApproved &&
          !$rootState.loader.loading
        "
        class="apply_potion"
        :disabled="!token || potionSelected === ''"
        v-on:click="triggerPotion"
      >
        Apply potion
      </button>
      <button
        v-if="
          token &&
          !$rootState.breeding.breedingFactoryApproved &&
          !$rootState.loader.loading
        "
        :disabled="!token || potionSelected === ''"
        class="apply_potion"
        v-on:click="triggerApproveBreeding"
      >
        Approve Breeding Factory
      </button>
      <button
        v-if="
          token && !$rootState.labs.labsApproved && !$rootState.loader.loading
        "
        class="apply_potion"
        v-on:click="triggerApproveLabs"
        :disabled="!token || potionSelected === ''"
      >
        Approve Labs
      </button>
      <button
        v-if="!token && !$rootState.loader.loading"
        class="apply_potion"
        disabled
      >
        Select a token
      </button>
      <Loader v-if="$rootState.loader.loading"></Loader>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Gen2Nfts } from "@/types/Interface";
import Loader from "@/components/Loader.vue";
import { MutationPayload } from "vuex";
import { LoaderMutation } from "@/store/modules/loader/mutations";
import { LabsActions } from "@/store/modules/labs/actions";
import { ConnectorMutations } from "@/store/modules/connector/mutations";
import { BreedingActions } from "@/store/modules/breeding/actions";
@Component({
  components: { Loader },
})
export default class PotionLibrary extends Vue {
  @Prop() token!: Gen2Nfts | null;
  potionSelected = "";
  $refs!: {
    speed: HTMLDivElement;
    fraternal: HTMLDivElement;
    identical: HTMLDivElement;
    stripDown: HTMLDivElement;
  };
  unsubscribe: () => void = () => null;

  /***
   * Initialize the component and subscribe to the store to update the data if needed
   * @return {void}
   */
  mounted(): void {
    if (this.$rootState.connector.account) {
      this.$store.dispatch(LabsActions.GET_LABS_APPROVED);
    }
    this.unsubscribe = this.$store.subscribe((mutation: MutationPayload) => {
      if (
        mutation.type === ConnectorMutations.SET_ACCOUNT &&
        mutation.payload
      ) {
        this.$store.dispatch(LabsActions.GET_LABS_APPROVED);
        this.clearAllSelected();
      }
    });
  }

  /***
   * Unsubscribe to the store
   * @return {void}
   */
  unmounted(): void {
    this.unsubscribe();
  }

  /***
   * Collapse the potion library by toggling the class
   * @return {void}
   */
  collapse(): void {
    const collapse = document.querySelector(".collapse") as HTMLInputElement;
    const bot = document.querySelector(".bot_potion") as HTMLInputElement;
    const btn_wrapper = document.querySelector(
      ".btn_wrapper"
    ) as HTMLButtonElement;
    if (bot && collapse) {
      bot.classList.toggle("closed");
      collapse.classList.toggle("turn");
      btn_wrapper.classList.toggle("closed");
    }
  }

  /***
   * Select the potion to apply
   * @param {string} potion - Potion name
   * @param {boolean} valid - Is potion usable
   * @return {void}
   */
  selectItem(potion: string, valid: boolean): void {
    if (!this.token || !valid) return;
    this.clearAllSelected();
    this.potionSelected = potion;
    if (potion === "Speed") {
      this.$refs.speed.classList.add("selected");
    } else if (potion === "Fraternal") {
      this.$refs.fraternal.classList.add("selected");
    } else if (potion === "Identical") {
      this.$refs.identical.classList.add("selected");
    } else if (potion === "StripDown") {
      this.$refs.stripDown.classList.add("selected");
    }
  }

  /***
   * Clear all the potion selected
   * @return {void}
   */
  clearAllSelected(): void {
    this.$refs.speed.classList.remove("selected");
    this.$refs.fraternal.classList.remove("selected");
    this.$refs.identical.classList.remove("selected");
    this.$refs.stripDown.classList.remove("selected");
  }

  /***
   * Dispatch the action to apply the potion depending on the selected potion
   * @return {void}
   */
  triggerPotion(): void {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    if (this.potionSelected === "Speed") {
      this.$store.dispatch(BreedingActions.SPEED_UP_BREEDING, this.token?.id);
    } else if (this.potionSelected === "Fraternal") {
      this.$store.dispatch(LabsActions.FRATERNAL_POTION, this.token?.id);
    } else if (this.potionSelected === "Identical") {
      this.$store.dispatch(LabsActions.IDENTICAL_POTION, this.token?.id);
    } else if (this.potionSelected === "StripDown") {
      this.$store.dispatch(LabsActions.STRIP_DOWN_POTION, this.token?.id);
    }
  }

  /***
   * Dispatch the action to approve the breeding factory
   * @return {void}
   */
  triggerApproveBreeding(): void {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    this.$store.dispatch(BreedingActions.APPROVE_BREEDING_FACTORY);
  }

  /***
   * Dispatch the action to approve the labs
   * @return {void}
   */
  triggerApproveLabs(): void {
    this.$store.commit(LoaderMutation.SET_LOADING, true);
    this.$store.dispatch(LabsActions.APPROVE_LABS);
  }

  /***
   * Display the tooltip to the user
   * @param {{target: HTMLImageElement}} $event Potion name
   * @return {void}
   */
  activeToolTip($event: { target: HTMLImageElement }): void {
    const element = document.getElementById("tooltip_" + $event.target.id);
    if (element) element.classList.toggle("visible");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./src/scss/_variables.scss";

#PotionLibrary {
  position: relative;
  margin-left: 5%;
  margin-right: 5%;
  padding-bottom: 72px;
  .tooltip {
    visibility: hidden;
    width: 100%;
    padding: 10px;
    bottom: 100%;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 12px;
    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
  }

  .visible {
    visibility: visible !important;
  }

  .top_potion {
    cursor: pointer;
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 24px;
    .main_title {
      font-family: "SpaceGrotesk-Regular", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 27.34px;
      line-height: 35px;
      text-align: center;
      color: white;
      margin-left: 0;
      margin-right: auto;
    }
    .collapse {
      margin-right: 0;
      margin-left: auto;
      width: 13.33px;
      height: 6.67px;
    }
  }

  .bot_potion {
    display: grid;
    width: 100%;
    grid-template-rows: 1fr;
    grid-template-columns: 20% 80%;
    @media screen and (max-width: $max-width-desktop) {
      grid-template-rows: auto 1fr;
      grid-template-columns: 1fr;
      row-gap: 20px;
    }
    column-gap: 30px;
    transition: max-height 0.2s ease-out;
    .left_bot {
      border: 0.5px solid #1f1f1f;
      border-radius: 4px;
      display: grid;
      grid-template-rows: auto auto;
      row-gap: 12px;
      padding: 10px;
      .title_left_potion {
        font-family: "SpaceGrotesk-Regular", sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 21.88px;
        line-height: 28px;
        color: #ffffff;
      }
      .text_left_potion {
        font-family: "SpaceGrotesk-Regular", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        color: #ffffff;
      }
    }
    .right_bot {
      display: grid;
      place-items: center;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 25px;
      @media screen and (max-width: $max-width-desktop) {
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        row-gap: 20px;
      }
      .number {
        img {
          margin-left: 11.33px;
        }
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
      }
      .potion {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        row-gap: 10px;
        padding: 12px 16px;
        border: 0.5px solid #d8d8d8;
        border-radius: 4px;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        .img_potion {
          width: 100%;
          max-width: 150px;
        }
      }
    }
  }

  .selected {
    border: 5px solid white !important;
  }

  .closed {
    display: none !important;
  }

  .turn {
    transform: rotate(-180deg);
  }

  .btn_wrapper {
    margin-top: 24px;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
  }

  .apply_potion {
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

  .grey {
    filter: grayscale(1);
  }
}
</style>
