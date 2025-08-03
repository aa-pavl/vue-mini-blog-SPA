<script setup lang="ts">

import AvtorMini from "@/components/AvtorMini.vue";
import PostMini from "@/components/PostMini.vue"
import type { PostType } from '@/types/post.type';

import { inject, onMounted, ref } from "vue";
import { AuthService }  from "@/services/auth.servive";
import type { UserInfoService } from "@/services/user-info.service";
import type { SaveUserInfoDtoType, UserInfoType } from "@/types/user-info.type";


let userService = inject('UserInfoService') as UserInfoService;
let dataList = ref<UserInfoType[]>([]);
let postList = ref<(PostType& { avtor: string })[]>([]);

onMounted(async () => {
  const authService = inject('AuthService') as AuthService;
  authService.login(authService.defaultUsername, authService.defaultPassword);

  await getDataList();
  getPostList();
});


async function getDataList(): Promise<void> {
  dataList.value = await userService.getData();
}

function getPostList(): void {
  postList.value = dataList.value.flatMap(user => 
    user.post.map(post => ({...post, avtor: user.fullName }))
  );
  console.log('Посты:', postList.value);
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

</script>

<template>
  <div class="container">

    <section class="main-view">
      
      <div class="block">
        <div class="title-1">Авторы</div>
        <div class="block-avtors">
          <div class="btn btn-add" @click="addAvtor">Добавить автора</div>
            <AvtorMini v-for="avtor in dataList" :user-name="avtor.fullName" />
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
