import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import StakingView from "../views/StakingView.vue";
import HomeView from "../views/HomeView.vue";
import BreedingView from "@/views/BreedingView.vue";
import StakingGen2View from "@/views/StakingGen2View.vue";
import LeaderboardView from "@/views/LeaderboardView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/staking",
    name: "StakingView",
    component: StakingView,
  },
  {
    path: "/breeding",
    name: "BreedingView",
    component: BreedingView,
  },
  {
    path: "/stakeGen2",
    name: "StakeGen2View",
    component: StakingGen2View,
  },
  {
    path: "/leaderboard",
    name: "LeaderboardView",
    component: LeaderboardView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
