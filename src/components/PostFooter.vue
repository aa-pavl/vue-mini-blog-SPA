<script setup lang="ts">

import CommentCount from "@/components/CommentCount.vue"

const props  = defineProps(['isLight', 'post']);

</script>

<template>
    <div class="post-footer">

      <div class="post-info-left">
        <img src="@/assets/images/user_1.png" alt="user-photo" v-if="!props.isLight" class="post-info-image">
        <div class="post-info-content">
          <div class="post-info-user-name" v-if="!props.isLight">{{ props.post.avtor }}</div>
          <div class="post-info-date-time">{{ props.post.dateTime }}</div>
        </div>
      </div>

      <CommentCount :count="props.post.comments.length" />

    </div>
</template>


<style scoped>
@import "@/assets/styles/base.css";
@import "@/assets/styles/_fonts.css";

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
</style>
