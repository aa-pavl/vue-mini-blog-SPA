<script setup lang="ts">
import router from '@/router'
import PostFooter from './items/PostFooter.vue'
import type { PostWithAvtorType } from '@/types/post.type'

const props = defineProps<{
  isLight: boolean
  post: PostWithAvtorType
}>()

function openPagePost(id: number): void {
  router.push(`/post/${id}`)
}
</script>

<template>
  <div class="post-mini">
    <div class="post-mini-main" @click="openPagePost(props.post.id)">
      <div class="post-title">{{ props.post.title }}</div>
      <div class="post-descriprion">{{ props.post.briefDescription }}</div>
    </div>

    <PostFooter :is-light="props.isLight" :post="props.post" />
  </div>
</template>

<style scoped>
@import '@/assets/styles/base.css';
@import '@/assets/styles/_fonts.css';

.post-mini {
  width: 350px;
  height: 300px;

  padding: 15px;
  box-sizing: border-box;
  border: 1px solid var(--color-border);
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  .post-mini-main {
    flex-grow: 1;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .post-title {
      font-size: 24px;
      font-weight: 700;
    }

    .post-descriprion {
      color: var(--tetx-border);
      flex-grow: 1;
    }
  }
}

@media (max-width: 768px) {
  .post-mini {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>
