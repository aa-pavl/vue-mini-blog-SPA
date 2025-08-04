<script setup lang="ts">
import PopupDeleteApprove from '@/components/popups/PopupDeleteApprove.vue'
import PopupPost from '@/components/popups/PopupPost.vue'
import PostMini from '@/components/PostMini.vue'
import type { UserInfoService } from '@/services/user-info.service'
import type { PostWithAvtorType } from '@/types/post.type'
import type { UserInfoType } from '@/types/user-info.type'
import { inject, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  id: string
}>()

const flagPopupPost = ref<boolean>(false) // флаги для открытия popups
const flagPopupDelete = ref<boolean>(false)

const avtor = ref<UserInfoType>() // данные по автору
const postList = ref<PostWithAvtorType[]>([]) // список статей автора
const userService = inject('UserInfoService') as UserInfoService

// Первоначальная загрузка
onMounted(updateHandler)

// Следим за изменением `id`
watch(
  () => props.id,
  () => updateHandler(),
)

async function updateHandler() {
  // Находим нужного автора по id
  const resAvtor: UserInfoType | undefined = userService.getAvtorById(Number(props.id))
  if (resAvtor) {
    avtor.value = resAvtor as UserInfoType

    // Получаем список постов по id автора
    const resPosts: PostWithAvtorType[] | undefined = userService.getPostListByAvter(resAvtor)
    if (resPosts) {
      postList.value = resPosts
      console.log('Посты:', postList.value)
    }
  } else {
    console.log(`Автор с ID ${props.id} не найден`)
  }
}

function postPopup() {
  flagPopupPost.value = true
}
function deletePopup() {
  flagPopupDelete.value = true
}
function closePopupHandler() {
  flagPopupPost.value = false
  flagPopupDelete.value = false
}
</script>

<template>
  <div class="popup-bg" v-if="flagPopupPost || flagPopupDelete">
    <PopupPost
      v-if="flagPopupPost"
      title="Добавить пост"
      :user-id="avtor?.id"
      @on-close="closePopupHandler"
      @on-update-data="updateHandler"
    />
    <PopupDeleteApprove
      v-if="flagPopupDelete"
      title="автора"
      :user-id="avtor?.id"
      @on-close="closePopupHandler"
    />
  </div>

  <div class="container">
    <section class="avtor-view">
      <div class="avtor-header">
        <img src="@/assets/images/user_1.png" alt="avtor-photo" class="avtor-image" />

        <div class="avtor-info">
          <div class="title-1 avtor-full-name">{{ avtor?.fullName }}</div>
          <div class="title-2 avtor-blog-name">{{ avtor?.blogName }}</div>

          <div class="avtor-action">
            <div class="btn second" @click="deletePopup">Удалить автора</div>
            <div class="btn" @click="postPopup">Добавить пост</div>
          </div>
        </div>
      </div>

      <div class="avtor-posts">
        <div class="post-header">
          <div class="title-2">Статей автора: {{ avtor?.post.length }}</div>
          <div class="btn-sort">Сортировать</div>
        </div>

        <div class="posts">
          <PostMini
            v-for="post in postList"
            :is-light="true"
            :post="post"
            :user-name="avtor?.fullName"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style>
@import '@/assets/styles/base.css';
@import '@/assets/styles/_fonts.css';

.avtor-view {
  .avtor-header {
    display: flex;
    gap: 40px;
    margin-bottom: 40px;

    .avtor-image {
      width: 200px;
      height: 200px;
    }

    .avtor-info {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .avtor-blog-name {
        flex-grow: 1;
      }

      .avtor-action {
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 15px;
      }
    }
  }

  .avtor-posts {
    .post-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 40px;
    }

    .posts {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
    }
  }
}

@media (min-width: 1024px) {
  .avtor {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
