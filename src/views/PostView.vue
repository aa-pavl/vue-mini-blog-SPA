<script setup lang="ts">
import CommentCount from '@/components/CommentCount.vue';
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
  <div class="container">

    <section class="post-view">
      <div class="title-1">{{ posts[0].title }}</div> 
      <div class="post-view-brief">{{ posts[0].briefDescription }}</div> 

      <div class="post-view-action">
        <div class="btn-svg btn-edit">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_8_3261)">
          <path d="M17.3579 4.16683C17.3579 3.9668 17.3184 3.76854 17.2419 3.58374C17.1653 3.39891 17.0529 3.23083 16.9115 3.08936C16.77 2.94787 16.602 2.83552 16.4171 2.75895C16.2323 2.68238 16.0341 2.64298 15.834 2.64298C15.6339 2.64298 15.4358 2.68238 15.2509 2.75895C15.0661 2.83552 14.898 2.94787 14.7566 3.08936L3.6628 14.1827L2.8547 17.1453L5.81734 16.3376L16.9115 5.2439C17.0529 5.10245 17.1654 4.9347 17.2419 4.74992C17.3185 4.56511 17.3578 4.36687 17.3579 4.16683ZM19.0245 4.16683C19.0245 4.58572 18.9419 5.00052 18.7816 5.38753C18.6213 5.77461 18.3861 6.12644 18.0899 6.42269L6.83988 17.6727C6.73738 17.7752 6.60985 17.849 6.47001 17.8871L1.88668 19.1371C1.5982 19.2158 1.28962 19.1341 1.07817 18.9227C0.866734 18.7113 0.784688 18.4027 0.863321 18.1142L2.11332 13.5308L2.12919 13.4788C2.17032 13.3592 2.23845 13.2503 2.32817 13.1606L13.5782 1.91056C13.8744 1.61437 14.2263 1.37955 14.6133 1.21924C15.0004 1.05895 15.4151 0.976318 15.834 0.976318C16.2529 0.976318 16.6677 1.05895 17.0547 1.21924C17.4417 1.37955 17.7937 1.61437 18.0899 1.91056C18.3861 2.20681 18.6213 2.55865 18.7816 2.94572C18.9419 3.33279 19.0245 3.74787 19.0245 4.16683Z" fill="#456E49"/>
          </g>
          </svg>
        </div>
        <div class="btn-svg btn-delete">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9993 5.83325H4.99935V16.6666C4.99935 16.8876 5.08721 17.0995 5.24349 17.2558C5.39977 17.4121 5.61167 17.4999 5.83268 17.4999H14.166C14.387 17.4999 14.5989 17.4121 14.7552 17.2558C14.9115 17.0995 14.9993 16.8876 14.9993 16.6666V5.83325ZM12.4993 3.33325C12.4993 3.11224 12.4115 2.90034 12.2552 2.74406C12.0989 2.58778 11.887 2.49992 11.666 2.49992H8.33268C8.11167 2.49992 7.89977 2.58778 7.74349 2.74406C7.58721 2.90034 7.49935 3.11224 7.49935 3.33325V4.16659H12.4993V3.33325ZM14.166 4.16659H17.4993C17.9596 4.16659 18.3327 4.53968 18.3327 4.99992C18.3327 5.46016 17.9596 5.83325 17.4993 5.83325H16.666V16.6666C16.666 17.3296 16.4024 17.9653 15.9336 18.4342C15.4648 18.903 14.8291 19.1666 14.166 19.1666H5.83268C5.16964 19.1666 4.53394 18.903 4.0651 18.4342C3.59626 17.9653 3.33268 17.3296 3.33268 16.6666V5.83325H2.49935C2.03911 5.83325 1.66602 5.46016 1.66602 4.99992C1.66602 4.53968 2.03911 4.16659 2.49935 4.16659H5.83268V3.33325C5.83268 2.67021 6.09626 2.03451 6.5651 1.56567C7.03395 1.09683 7.66964 0.833252 8.33268 0.833252H11.666C12.3291 0.833252 12.9648 1.09683 13.4336 1.56567C13.9024 2.03451 14.166 2.67021 14.166 3.33325V4.16659Z" fill="#456E49"/>
          </svg>
        </div>
        <div class="btn btn-add">Добавить запись</div>
      </div>

      <div class="post-view-description">{{ posts[0].fullDescription }}</div>

      <div class="post-info">
        <div class="post-info-left">
          <img src="@/assets/images/user_1.png" alt="user-photo" class="post-info-image">
          <div class="post-info-content">
            <div class="post-info-user-name">{{ avtor.fullName }}</div>
            <div class="post-info-date-time">{{ posts[0].dateTime }}</div>
          </div>
        </div>

        <CommentCount :count="13" />
      </div>
    </section>

    <div class="line-h"></div>

    <section class="post-comments">
      коменты
    </section>

    <div class="line-h"></div>
    
    <section class="posts-more">
        <div class="posts-more-header">
          <div class="title-2">Читать также</div>
          <div class="posts-more-action">
            <div class="btn-prev">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5551 15.5002C10.4003 15.5002 10.2455 15.4437 10.1233 15.3226L4.81172 10.0577C3.94818 9.20176 3.94818 7.79671 4.81172 6.94076L10.1233 1.67588C10.3596 1.4417 10.7506 1.4417 10.9869 1.67588C11.2231 1.91005 11.2231 2.29765 10.9869 2.53182L5.67526 7.79671C5.28423 8.18431 5.28423 8.81416 5.67526 9.20176L10.9869 14.4666C11.2231 14.7008 11.2231 15.0884 10.9869 15.3226C10.8647 15.4356 10.7099 15.5002 10.5551 15.5002Z" fill="#202B21"/>
              </svg>
            </div>
            <div class="btn-next">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.4449 1.50024C5.59968 1.50024 5.75447 1.55677 5.87667 1.67789L11.1883 6.94278C12.0518 7.79873 12.0518 9.20378 11.1883 10.0597L5.87667 15.3246C5.64042 15.5588 5.24938 15.5588 5.01313 15.3246C4.77687 15.0904 4.77687 14.7028 5.01313 14.4687L10.3247 9.20378C10.7158 8.81618 10.7158 8.18633 10.3247 7.79873L5.01313 2.53384C4.77687 2.29967 4.77687 1.91207 5.01313 1.67789C5.13533 1.56484 5.29011 1.50024 5.4449 1.50024Z" fill="#202B21"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="posts-more-list">
          <PostMini v-for="post in avtor.post" :is-light="true" :post="post" :user-name="avtor.fullName" />
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
      gap: 15px;
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
