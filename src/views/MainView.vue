<script setup lang="ts">
import AvtorMini from '@/components/AvtorMini.vue'
import PostMini from '@/components/PostMini.vue'
import type { PostWithAvtorType } from '@/types/post.type'

import { inject, onMounted, ref } from 'vue'
import { AuthService } from '@/services/auth.servive'
import type { UserInfoService } from '@/services/user-info.service'
import type { UserInfoType } from '@/types/user-info.type'
import PopupMain from '@/components/popups/PopupMain.vue'
import { PopupEnum } from '@/types/popup'
import router from '@/router'

const flagPopup = ref<boolean>(false) 

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

function onMain() {
  router.push("/")
}

function popupAction(status: boolean) {
  flagPopup.value = status
}

</script>

<template>
  <PopupMain v-if="flagPopup"
    :title="PopupEnum.AvtorAdd" :post-id="0" :user-id="0" :comment-id="0" 
    @on-main="onMain" @on-update="updateHandler" @on-close="popupAction(false)"
  />

  <div class="container">
    <section class="main-view">

      <div class="block">
        <div class="title-1">Авторы</div>
        <div class="block-avtors">
          <div class="btn btn-add" @click="popupAction(true)">Добавить автора</div>
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

  .block {
    margin: 0 auto;
  }

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
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
  }
}

@media (max-width: 900px) {
  .main-view {
    flex-direction: column;

    .title-1 {
      text-align: center;
    }   

    .block-line {
      display: none;
    }
  }
}

</style>
