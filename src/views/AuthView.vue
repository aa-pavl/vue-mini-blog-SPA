<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue'
import router from '@/router'
import type { UserInfoService } from '@/services/user-info.service'
import { inject } from 'vue'


const userService = inject('UserInfoService') as UserInfoService

// // Первоначальная загрузка
// onMounted(onLogin)



function onLogin() {
  router.push("/")
}


</script>

<template>
  <div class="container">
  <section class="auth-view">

    <IconLogo />
    <div class="btn" @click="onLogin">Войти</div>
  
  </section>
  </div>

</template>

<style>
@import '@/assets/styles/base.css';
@import '@/assets/styles/_fonts.css';

.auth-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;

  background-color: var(--color-green-dark);

  .btn {
    color: var(--color-green-dark);
    background-color: white;
  }
}


</style>
