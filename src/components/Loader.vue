<template>
  <div class="loader" id="loader-1"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class Loader extends Vue {}
</script>

<style scoped>
:root {
  --color: black;
  --bg: white;
}
.loader {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  position: relative;
  margin: 0 auto;
}
/* LOADER 1 */
#loader-1:before,
#loader-1:after {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: 10px solid transparent;
  border-top-color: black;
}
#loader-1:before {
  z-index: 100;
  animation: spin 1s infinite;
}
#loader-1:after {
  border: 10px solid #ccc;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
