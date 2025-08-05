<script setup lang="ts">

import IconLogo from './components/icons/IconLogo.vue';
import IconExit from './components/icons/IconExit.vue';
import AuthView from './views/AuthView.vue';

</script>

<template>

  <!-- <template> -->
    <header class="header">
      <div class="container">
        <router-link to="/"><IconLogo /></router-link>
        <router-link to="/auth"><IconExit /></router-link>
      </div>
    </header>

    <RouterView />
  <!-- </template> -->

  <!-- <AuthView /> -->



</template>

<style scoped>
@import "@/assets/styles/base.css";
@import "@/assets/styles/_fonts.css";

.header {
  background-color: var(--color-green-dark);

  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
  }
}

</style>
