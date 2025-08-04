<script setup lang="ts">

import AvtorMini from "@/components/AvtorMini.vue";
import PostMini from "@/components/PostMini.vue"
import type { PostType, PostWithAvtorType } from '@/types/post.type';

import { inject, onMounted, ref } from "vue";
import { AuthService }  from "@/services/auth.servive";
import type { UserInfoService } from "@/services/user-info.service";
import type { SaveUserInfoDtoType, UserInfoType } from "@/types/user-info.type";
import router from "@/router";
import PopupPost from "@/components/popups/PopupPost.vue";
import PopupDeleteApprove from "@/components/popups/PopupDeleteApprove.vue";


const userService = inject('UserInfoService') as UserInfoService;
const dataList = ref<UserInfoType[]>([]);
const postList = ref<PostWithAvtorType[]>([]);

onMounted(async () => {
  const authService = inject('AuthService') as AuthService;
  authService.login(authService.defaultUsername, authService.defaultPassword);

  await getDataList();
  getPostList();
});


async function getDataList(): Promise<void> {
  await userService.requestData();
  dataList.value = userService.getData();
}

function getPostList(): void {
  const res = dataList.value.flatMap(avtor => 
    avtor.post.map(post => ({...post, avtor: { fullName: avtor.fullName, id: avtor.id }}))
  );
  if (res) {
    postList.value = res;
    console.log('Посты:', postList.value);
  }
}

async function addAvtor(): Promise<void> {
  const params: SaveUserInfoDtoType = {
    "fullName":"Test Add1", 
    "blogName": "Test blog1"
  };

  if (await userService.add(params)) {
    await getDataList();
  }
}

function openPageAvtor(id: number): void {
    router.push(`/avtor/${id}`)
}

</script>

<template>
  <div class="container">
    <!-- <PopupPost title="Добавить пост" /> -->
    <!-- <PopupDeleteApprove title="Удалить пост" /> -->

    <section class="main-view">
      
      <div class="block">
        <div class="title-1">Авторы</div>
        <div class="block-avtors">
          <div class="btn btn-add" @click="addAvtor">Добавить автора</div>
            <AvtorMini v-for="avtor in dataList" :user-name="avtor.fullName" @click="openPageAvtor(avtor.id)"/>
        </div>
      </div>

      <div class="line-v"></div>

      <div class="block">
        <div class="title-1">Посты</div>
        <div class="block-posts">
          <PostMini v-for="post in postList" :is-light="false" :post="post" />
        </div>
      </div>

    </section>

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

  .title-1 {
    margin-bottom: 30px;
  }

  .block-avtors {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 15px;
  }

  .block-posts {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }

}
</style>
