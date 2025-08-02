<script setup lang="ts">

import AvtorMini from "@/components/AvtorMini.vue";
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
  {
    id: 2,
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
  {
    id: 3,
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
  {
    id: 4,
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

let avtors: string[] = [
  "Paris Washington",
  "Lala Lo",
  "Vini Pux",
]

let userName = "Paris Washington";

</script>

<template>

  <div class="main-view">

    <div class="block">
      <div class="block-subtitle">Авторы</div>
      <div class="block-avtors">
        <AvtorMini v-for="avtor in avtors" :user-name="avtor" />
      </div>
    </div>

    <div class="block-line"></div>

    <div class="block">
      <div class="block-subtitle">Посты</div>
      <div class="block-posts">
        <PostMini v-for="post in posts" :is-light="false" :post="post" :user-name="userName" />
      </div>
    </div>

  </div>

</template>

<style scoped>

.main-view {
  display: flex;
  gap: 30px;

  .block-line {
    width: 2px;
    height: auto;
    background-color: var(--color-border);
  }

  .block-subtitle {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 30px;
  }

  .block-avtors {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 30px;
  }

  .block-posts {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }

}
</style>
