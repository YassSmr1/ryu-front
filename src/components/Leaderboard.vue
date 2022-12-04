<template>
  <div id="Leaderboard">
    <div class="top_3" v-if="$rootState.gen2Staking.leaderboard.length === 7">
      <div class="top_3_tile">
        <div class="top_3_tile_img">
          <img
            :src="$rootState.gen2Staking.leaderboard[0].image"
            alt="Nft"
            class="nft_img"
          />
        </div>
        <div class="top_3_tile_text">
          <div class="position">1st</div>
          <div class="name">
            Ryu Gen2 #{{ $rootState.gen2Staking.leaderboard[0].id }}
          </div>
          <div class="level">
            Level {{ $rootState.gen2Staking.leaderboard[0].level }} /
            {{ $rootState.gen2Staking.leaderboard[0].rank }}
          </div>
        </div>
      </div>
      <div class="grid_mobile mobile">
        <div class="top_3_tile" id="p2">
          <div class="top_3_tile_img">
            <img
              :src="$rootState.gen2Staking.leaderboard[1].image"
              alt="Nft"
              class="nft_img"
            />
          </div>
          <div class="top_3_tile_text">
            <div class="position">2nd</div>
            <div class="name">
              Ryu Gen2 #{{ $rootState.gen2Staking.leaderboard[1].id }}
            </div>
            <div class="level">
              Level {{ $rootState.gen2Staking.leaderboard[1].level }} /
              {{ $rootState.gen2Staking.leaderboard[1].rank }}
            </div>
          </div>
        </div>
        <div class="top_3_tile" id="p3">
          <div class="top_3_tile_img">
            <img
              :src="$rootState.gen2Staking.leaderboard[2].image"
              alt="Nft"
              class="nft_img"
            />
          </div>
          <div class="top_3_tile_text">
            <div class="position">3rd</div>
            <div class="name">
              Ryu Gen2 #{{ $rootState.gen2Staking.leaderboard[2].id }}
            </div>
            <div class="level">
              Level {{ $rootState.gen2Staking.leaderboard[2].level }} /
              {{ $rootState.gen2Staking.leaderboard[2].rank }}
            </div>
          </div>
        </div>
      </div>
      <div class="top_3_tile desktop" id="p2">
        <div class="top_3_tile_img">
          <img
            :src="$rootState.gen2Staking.leaderboard[1].image"
            alt="Nft"
            class="nft_img"
          />
        </div>
        <div class="top_3_tile_text">
          <div class="position">2nd</div>
          <div class="name">
            Ryu Gen2 #{{ $rootState.gen2Staking.leaderboard[1].id }}
          </div>
          <div class="level">
            Level {{ $rootState.gen2Staking.leaderboard[1].level }} /
            {{ $rootState.gen2Staking.leaderboard[1].rank }}
          </div>
        </div>
      </div>
      <div class="top_3_tile desktop" id="p3">
        <div class="top_3_tile_img">
          <img
            :src="$rootState.gen2Staking.leaderboard[2].image"
            alt="Nft"
            class="nft_img"
          />
        </div>
        <div class="top_3_tile_text">
          <div class="position">3rd</div>
          <div class="name">
            Ryu Gen2 #{{ $rootState.gen2Staking.leaderboard[2].id }}
          </div>
          <div class="level">
            Level {{ $rootState.gen2Staking.leaderboard[2].level }} /
            {{ $rootState.gen2Staking.leaderboard[2].rank }}
          </div>
        </div>
      </div>
    </div>
    <div class="table" v-if="$rootState.gen2Staking.leaderboard.length === 7">
      <div class="top_table">
        <div class="hashtag">#</div>
        <div class="name">Nft Name</div>
        <div class="level">Level / Tier</div>
      </div>
      <div
        class="bot_table"
        :key="'hashtag_' + index"
        v-for="(item, index) in $rootState.gen2Staking.leaderboard"
      >
        <div class="wrapper">
          <div class="number" :class="'p' + index">
            {{ index + 1 }}
          </div>
        </div>
        <div class="nft_name">
          <img class="nft_img" :src="item.image" alt="Nft" />
          <div class="text_wrapper">Ryu Gen2 #{{ item.id }}</div>
        </div>
        <div class="nft_level">{{ item.level }} - {{ item.tier }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Gen2StakingActions } from "@/store/modules/gen2Staking/actions";
import { MutationPayload } from "vuex";
import { ConnectorMutations } from "@/store/modules/connector/mutations";

@Component
export default class Leaderboard extends Vue {
  unsubscribe: () => void = () => null;

  /***
   * Initialize the component by fetching the data
   * @return {void}
   */
  mounted(): void {
    if (this.$rootState.connector.account) {
      this.$store.dispatch(Gen2StakingActions.GET_LEADERBOARD);
    }
    this.unsubscribe = this.$store.subscribe((mutation: MutationPayload) => {
      if (
        mutation.type === ConnectorMutations.SET_ACCOUNT &&
        mutation.payload
      ) {
        this.$store.dispatch(Gen2StakingActions.GET_LEADERBOARD);
      }
    });
  }

  /***
   * Unsubscribe from the store
   * @return {void}
   */
  unmounted(): void {
    this.unsubscribe();
  }
}
</script>

<style scoped lang="scss">
@import "./src/scss/_variables.scss";
#Leaderboard {
  margin-left: 20%;
  margin-right: 20%;
  width: 60%;
  @media screen and (max-width: $max-width-desktop) {
    margin-left: 5%;
    margin-right: 5%;
    width: 90%;
  }
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 24px;

  .top_3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media screen and (max-width: $max-width-desktop) {
      display: flex;
      flex-direction: column;
      row-gap: 12px;
    }
    column-gap: 12px;

    @media screen and (max-width: $max-width-desktop) {
      #p3,
      #p2 {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
      }

      .grid_mobile {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 12px;
        place-items: center;
        .top_3_tile_text {
          place-items: center;
          .level {
            text-align: center;
          }
        }
      }
    }

    &_tile {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 12px;
      place-items: center;
      background: #292929;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
      padding: 25px;
      @media screen and (max-width: $max-width-desktop) {
        padding: 12.5px;
      }
      &_img {
        .nft_img {
          width: 100%;
          height: 100%;
          border: 5px solid #dcb83a;
          border-radius: 100px;
        }
      }
      &_text {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto 1fr;
        row-gap: 12px;
        .position {
          font-family: "SpaceGrotesk-Regular", sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
          @media screen and (max-width: $max-width-desktop) {
            font-size: 12px;
            line-height: 16px;
          }
          color: #ffffff;
        }

        .level {
          font-family: "SpaceGrotesk-Regular", sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: 21.88px;
          line-height: 28px;
          @media screen and (max-width: $max-width-desktop) {
            font-size: 17.88px;
            line-height: 18px;
          }
          color: #dd87d0;
        }

        .name {
          font-family: "SpaceGrotesk-Regular", sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
          color: #ffffff;
        }
      }
    }
  }

  .table {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;

    .top_table {
      display: grid;
      grid-template-columns: 5% auto auto;
      column-gap: 16px;
      padding: 16px;
      background: #1f1f1f;
      .hashtag,
      .name,
      .level {
        font-family: "Montserrat", sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
        width: auto;
      }

      .hashtag {
        display: flex;
        justify-content: center;
      }

      .level {
        justify-self: end;
      }
    }

    .bot_table {
      display: grid;
      grid-template-columns: 5% auto auto;
      column-gap: 16px;
      padding: 16px;
      background-color: #292929;
      border-bottom: 1px solid #676767;

      &:last-child {
        border-bottom: none;
      }

      .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        .number {
          border-radius: 50%;
          width: 24px;
          height: 24px;
          aspect-ratio: 1/1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "Inter", sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
        }
      }

      .nft_name {
        display: flex;
        align-items: center;
        .nft_img {
          height: 40px;
          width: 40px;
          margin-right: 12px;
          border-radius: 10px;
        }
        .text_wrapper {
          font-family: "SpaceGrotesk-Regular", sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          color: #ffffff;
        }
      }

      .nft_level {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        width: 100%;
        font-family: "SpaceGrotesk-Regular", sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        color: #ffffff;
      }

      .p0 {
        background: #dcb83a;
      }

      .p1 {
        background: #d8d8d8;
      }

      .p2 {
        background: #ae5416;
      }
    }
  }
}
</style>
