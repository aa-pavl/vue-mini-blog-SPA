<script setup lang="ts">

import CommentCount from "@/components/CommentCount.vue"

const props  = defineProps(['isLight', 'post', 'userName']);

</script>

<template>

  <div class="post-mini">
    <div class="post-title">{{ props.post.title }}</div>
    <div class="post-descriprion">{{ props.post.briefDescription }}</div>

    <div class="post-info">
      <div class="post-info-left">
        <img src="@/assets/images/user_1.png" alt="user-photo" v-if="!props.isLight" class="post-info-image">
        <div class="post-info-content">
          <div class="post-info-user-name" v-if="!props.isLight">{{ props.userName }}</div>
          <div class="post-info-date-time">{{ props.post.dateTime }}</div>
        </div>
      </div>

      <CommentCount :count="props.post.comments.length" />
    </div>
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
</style>
