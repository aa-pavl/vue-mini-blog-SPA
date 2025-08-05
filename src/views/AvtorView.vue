<script setup lang="ts">
import PopupDelete from '@/components/popups/PopupDelete.vue'
import PopupMain from '@/components/popups/PopupMain.vue'
import PopupPost from '@/components/popups/PopupPostUpdate.vue'
import PostMini from '@/components/PostMini.vue'
import router from '@/router'
import type { UserInfoService } from '@/services/user-info.service'
import { PopupEnum } from '@/types/popup'
import type { PostWithAvtorType } from '@/types/post.type'
import type { UserInfoType } from '@/types/user-info.type'
import { inject, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  id: string
}>()

const flagPopup = ref<boolean>(false) 
const titlePopup = ref<string>("")
const idAvtorPopup = ref<number>(0)
// const flagPopupPost = ref<boolean>(false) // флаги для открытия popups
// const flagPopupDelete = ref<boolean>(false)

const avtor = ref<UserInfoType>() // данные по автору
const postList = ref<PostWithAvtorType[]>([]) // список статей автора

const popupEnum = PopupEnum
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


function onMain() {
  router.push("/")
}

function popupAction(status: boolean, title: string = "", id: number = 0) {
  flagPopup.value = status
  titlePopup.value = title
  idAvtorPopup.value = id
}

</script>

<template>
  <PopupMain v-if="flagPopup"
    :title="titlePopup" 
    :user-id="idAvtorPopup"
    :post-id="0" 
    :comment-id="0" 
    @on-main="onMain" @on-update="updateHandler" @on-close="popupAction(false)"
  />

  <div class="container">
    <section class="avtor-view">
      <div class="avtor-header">
        <img src="@/assets/images/user_1.png" alt="avtor-photo" class="avtor-image" />

        <div class="avtor-info">
          <div class="title-1 avtor-full-name">{{ avtor?.fullName }}</div>
          <div class="title-2 avtor-blog-name">{{ avtor?.blogName }}</div>

          <div class="avtor-action">
            <div class="btn second" @click="popupAction(true, popupEnum.AvtorDelete, avtor!.id)">Удалить автора</div>
            <div class="btn" @click="popupAction(true, popupEnum.PostAdd, avtor!.id)">Добавить пост</div>
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
