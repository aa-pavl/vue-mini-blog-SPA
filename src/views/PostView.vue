<script setup lang="ts">
import IconEdit from '@/components/icons/IconEdit.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import PostFooter from '@/components/PostFooter.vue'
import PostMini from '@/components/PostMini.vue'
import type { UserInfoService } from '@/services/user-info.service'
import type { PostWithAvtorType } from '@/types/post.type'
import { inject, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  id: string
}>()

const postTarget = ref<PostWithAvtorType>()
const postList = ref<PostWithAvtorType[]>([])
const userService = inject('UserInfoService') as UserInfoService

// Первоначальная загрузка
onMounted(updateHandler)

// Следим за изменением `id`
watch(
  () => props.id,
  () => updateHandler(),
)

async function updateHandler() {
  // Получаем весь список постов + автор
  const resPosts: PostWithAvtorType[] | undefined = userService.getPostListAll()
  if (resPosts) {
    postList.value = resPosts
    console.log('Посты:', postList.value)
  }

  // Получаем пост по id
  const id = Number(props.id)
  const res = userService.getPostListById(id)
  if (res) {
    postTarget.value = res
  } else {
    console.log(`Пост с ID ${id} не найден`)
  }
}
</script>

<template>
  <div class="container">
    <section class="post-view">
      <div class="title-1">{{ postTarget?.title }}</div>
      <div class="post-view-brief">{{ postTarget?.briefDescription }}</div>

      <div class="post-view-action">
        <div class="btn-edit"><IconEdit /></div>
        <div class="btn-delete"><IconTrash /></div>
        <div class="btn btn-add">Добавить запись</div>
      </div>

      <div class="post-view-description">{{ postTarget?.fullDescription }}</div>

      <PostFooter v-if="postTarget" :is-light="false" :post="postTarget" />
    </section>

    <div class="line-h"></div>

    <section class="post-comments">коменты</section>

    <div class="line-h"></div>

    <section class="posts-more">
      <div class="posts-more-header">
        <div class="title-2">Читать также</div>
        <div class="posts-more-action">
          <div class="btn-prev">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5551 15.5002C10.4003 15.5002 10.2455 15.4437 10.1233 15.3226L4.81172 10.0577C3.94818 9.20176 3.94818 7.79671 4.81172 6.94076L10.1233 1.67588C10.3596 1.4417 10.7506 1.4417 10.9869 1.67588C11.2231 1.91005 11.2231 2.29765 10.9869 2.53182L5.67526 7.79671C5.28423 8.18431 5.28423 8.81416 5.67526 9.20176L10.9869 14.4666C11.2231 14.7008 11.2231 15.0884 10.9869 15.3226C10.8647 15.4356 10.7099 15.5002 10.5551 15.5002Z"
                fill="#202B21"
              />
            </svg>
          </div>
          <div class="btn-next">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.4449 1.50024C5.59968 1.50024 5.75447 1.55677 5.87667 1.67789L11.1883 6.94278C12.0518 7.79873 12.0518 9.20378 11.1883 10.0597L5.87667 15.3246C5.64042 15.5588 5.24938 15.5588 5.01313 15.3246C4.77687 15.0904 4.77687 14.7028 5.01313 14.4687L10.3247 9.20378C10.7158 8.81618 10.7158 8.18633 10.3247 7.79873L5.01313 2.53384C4.77687 2.29967 4.77687 1.91207 5.01313 1.67789C5.13533 1.56484 5.29011 1.50024 5.4449 1.50024Z"
                fill="#202B21"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="posts-more-list">
        <PostMini v-for="post in postList" :is-light="false" :post="post" />
      </div>
    </section>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 40px;

  .post-view {
    display: flex;
    flex-direction: column;
    gap: 30px;

    .title-1 {
      text-align: center;
    }

    .post-view-action {
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 30px;
    }

    .post-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .post-info-left {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        .post-info-image {
          width: 50px;
          height: 50px;
        }

        .post-info-content {
          display: flex;
          flex-direction: column;

          .post-info-date-time {
            color: var(--color-text-light);
          }
        }
      }
    }
  }

  .posts-more {
    .posts-more-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;

      .posts-more-action {
        display: flex;
        align-items: center;
        gap: 15px;
      }
    }

    .posts-more-list {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
    }
  }
}

@media (min-width: 1024px) {
  .post {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
