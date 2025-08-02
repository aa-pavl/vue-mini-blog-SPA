<script setup lang="ts">

import { ref } from 'vue'
import MainView from './views/MainView.vue';

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

  <MainView />

</template>

<style scoped></style>
