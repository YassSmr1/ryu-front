<template>
  <div id="HomeView">
    <Hero></Hero>
    <QuickView></QuickView>
    <Roadmap></Roadmap>
    <Explore></Explore>
    <img
      src="@/assets/background_homepage_footer.webp"
      alt="background_homepage_footer"
      id="background_homepage_footer"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Hero from "@/components/Hero.vue";
import QuickView from "@/components/QuickView.vue";
import Roadmap from "@/components/Roadmap.vue";
import Explore from "@/components/Explore.vue";
import Collection from "@/components/Collection.vue";

@Component({
  components: {
    Collection,
    Explore,
    Roadmap,
    QuickView,
    Hero,
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped lang="scss">
#background_homepage_footer {
  width: 100%;
  height: auto;
}
</style>
