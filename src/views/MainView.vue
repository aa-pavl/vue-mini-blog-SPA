<script setup lang="ts">
import AvtorMini from '@/components/AvtorMini.vue'
import PostMini from '@/components/PostMini.vue'
import type { PostWithAvtorType } from '@/types/post.type'

import { inject, onMounted, ref } from 'vue'
import { AuthService } from '@/services/auth.servive'
import type { UserInfoService } from '@/services/user-info.service'
import type { UserInfoType } from '@/types/user-info.type'
import PopupAvtor from '@/components/popups/PopupAvtor.vue'

const flagPopupAvtor = ref<boolean>(false) // флаги для открытия popups

const userService = inject('UserInfoService') as UserInfoService
const avtorList = ref<UserInfoType[]>([])
const postList = ref<PostWithAvtorType[]>([])

const authService = inject('AuthService') as AuthService

// Первоначальная загрузка
onMounted(async () => {
  try {
    // 1. Авторизация
    await authService.login(authService.defaultUsername, authService.defaultPassword)
    await userService.requestData()

    // 2. Загрузка данных
    await updateHandler()
  } catch (error) {
    console.error('Ошибка при инициализации:', error)
    alert('Не удалось загрузить данные')
  }
})

// Обновление данных после изменения
async function updateHandler(): Promise<void> {
  // Получение всех данных (список авторов и их посты)
  avtorList.value = userService.getAvtorList()

  // Получаем весь список постов + автор
  const resPosts: PostWithAvtorType[] | undefined = userService.getPostListAll()
  if (resPosts) {
    postList.value = resPosts
    console.log('Посты:', postList.value)
  }
}

function avtorPopup() {
  flagPopupAvtor.value = true
}
function closePopupHandler() {
  flagPopupAvtor.value = false
}
</script>

<template>
  <div class="popup-bg" v-if="flagPopupAvtor">
    <PopupAvtor @on-close="closePopupHandler" @on-update-data="updateHandler" />
  </div>

  <div class="container">
    <section class="main-view">
      <div class="block">
        <div class="title-1">Авторы</div>
        <div class="block-avtors">
          <div class="btn btn-add" @click="avtorPopup">Добавить автора</div>
          <AvtorMini v-for="avtor in avtorList" :avtor="avtor" />
        </div>
      </div>

      <div class="line-v"></div>

      <div class="block">
        <div class="title-1">Посты</div>
        <div class="block-posts">
          <PostMini v-for="post in postList" :is-light="false" :post="post" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.main-view {
  display: flex;
  gap: 30px;

  .block-line {
    width: 2px;
    height: auto;
    background-color: var(--color-border);
  }

  .title-1 {
    margin-bottom: 30px;
  }

  .block-avtors {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 15px;
  }

  .block-posts {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }
}
</style>
