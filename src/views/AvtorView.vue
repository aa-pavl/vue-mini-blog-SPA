<script setup lang="ts">
import PostMini from '@/components/PostMini.vue';
import type { PostType } from '@/types/post.type';
import type { UserInfoType } from '@/types/user-info.type';


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


const avtor: UserInfoType = {  
  id: 1,
  fullName: "Paris Washington",
  blogName: "string",
  post: posts
};

</script>

<template>
  <div class="avtor-view">

    <div class="avtor-header">
        <img src="@/assets/images/user_1.png" alt="avtor-photo" class="avtor-image">

        <div class="avtor-info">
            <div class="title-1 avtor-full-name">{{ avtor.fullName }}</div>
            <div class="title-2 avtor-blog-name">{{ avtor.blogName }}</div>

            <div class="avtor-action">
              <div class="btn btn-add">Добавить запись</div>
            </div>
        </div>
    </div>
    
    <div class="avtor-posts">
      <div class="post-header">
        <div class="title-2">Статей автора: {{ avtor.post.length }}</div>
        <div class="btn-sort">Сортировать</div>
      </div>

      <div class="posts">
        <PostMini v-for="post in avtor.post" :is-light="true" :post="post" :user-name="avtor.fullName" />
      </div>
    </div>

  </div>

</template>

<style>
@import "@/assets/styles/base.css";
@import "@/assets/styles/_fonts.css";

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
        justify-content: end;
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
