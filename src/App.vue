<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import { ref } from 'vue'

const authData = ref(null)

async function login() {
  const response = await fetch('/auth/login?username=Tchaikovsky&password=Pyotr', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  
  authData.value = await response.json()
  console.log('Ответ auth: ', authData.value)
}
login()


async function request() {
    const response = await fetch('/api/userInfo/findAll', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  
  authData.value = await response.json()
  console.log('Ответ findAll: ', authData.value)
}
request()
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">

      
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
