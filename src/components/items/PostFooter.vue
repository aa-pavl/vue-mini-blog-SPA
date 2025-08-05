<script setup lang="ts">
import router from '@/router'
import type { PostWithAvtorType } from '@/types/post.type'
import IconComment from '../icons/IconComment.vue'

const props = defineProps<{
  isLight: boolean
  post: PostWithAvtorType
}>()

function openPageAvtor(id: number): void {
  router.push(`/avtor/${id}`)
}
</script>

<template>
  <div class="post-footer">
    <div class="post-info-left">
      <img
        src="@/assets/images/user_1.png"
        alt="user-photo"
        v-if="!props.isLight"
        class="post-info-image"
        @click="openPageAvtor(props.post.avtor.id)"
      />
      <div class="post-info-content">
        <div class="post-info-user-name" v-if="!props.isLight">{{ props.post.avtor.fullName }}</div>
        <div class="post-info-date-time">{{ props.post.dateTime }}</div>
      </div>
    </div>

    <div class="comment-count">
      <div class="count">{{ props.post.comments.length }}</div>
      <IconComment />
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/styles/base.css';
@import '@/assets/styles/_fonts.css';

.post-footer {
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
      cursor: pointer;
    }

    .post-info-content {
      display: flex;
      flex-direction: column;

      .post-info-date-time {
        color: var(--color-text-light);
      }
    }
  }

  .comment-count {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: var(--color-text-light);

    .count {
      font-weight: 600;
    }
  }
}

@media (max-width: 360px) {
  .post-info-image {
    display: none;
  }
}
</style>
