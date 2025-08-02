<script setup lang="ts">

import PostMini from "@/components/PostMini.vue"
import type { PostType } from '@/types/post.type';


let posts: PostType[] = [
  {
    id: 1,
    title: "Заголовок",
    briefDescription: "Краткое описание",
    fullDescription: "Полное описание",
    dateTime: '17 сентября 2024',
    comments: [{
      dateTime: "string",
      email: "string",
      id: 1,
      textComment: "string",
      userInfo: "string",
    }],
  },
];
let userName = "Paris Washington";

</script>

<template>

    <PostMini :is-light="false" :post="posts[0]" :user-name="userName" />
    <PostMini :is-light="true" :post="posts[0]" :user-name="userName" />

</template>

<style scoped></style>
