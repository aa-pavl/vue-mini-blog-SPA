<script setup lang="ts">

import { ref } from 'vue'
import MainView from './views/MainView.vue';
import IconLogo from './components/icons/IconLogo.vue';
import IconExit from './components/icons/IconExit.vue';

// const authData = ref(null)

// async function login() {
//   const response = await fetch('/auth/login?username=Tchaikovsky&password=Pyotr', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' }
//   })

//   authData.value = await response.json()
//   console.log('Ответ auth: ', authData.value)
// }
// login()


// async function request() {
//     const response = await fetch('/api/userInfo/findAll', {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' }
//   })

//   authData.value = await response.json()
//   console.log('Ответ findAll: ', authData.value)
// }
// request()

</script>

<template>

  <header class="header">
    <div class="container">
      <router-link to="/"><IconLogo /></router-link>
      <router-link to="/avtor">avtor</router-link>
      <router-link to="/post">post</router-link>
      <router-link to="/auth"><IconExit /></router-link>
    </div>
  </header>

  <RouterView />

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
