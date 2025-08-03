<script setup lang="ts">

import PostFooter from "./PostFooter.vue";

const props  = defineProps(['isLight', 'post']);

</script>

<template>
  <div class="post-mini">

    <div class="post-title">{{ props.post.title }}</div>
    <div class="post-descriprion">{{ props.post.briefDescription }}</div>
    
    <PostFooter :is-light="props.isLight" :post="props.post" />

  </div>
</template>


<style scoped>
@import "@/assets/styles/base.css";
@import "@/assets/styles/_fonts.css";

.post-mini {
  width: 393px;
  height: 300px;

  padding: 15px;
  box-sizing: border-box;
  border: 1px solid var(--color-border);
  border-radius: 5px;

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
</style>
