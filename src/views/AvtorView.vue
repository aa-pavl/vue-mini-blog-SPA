<script setup lang="ts">
import IconEdit from '@/components/icons/IconEdit.vue';
import PostMini from '@/components/PostMini.vue';
import type { UserInfoService } from '@/services/user-info.service';
import type { PostType, PostWithAvtorType } from '@/types/post.type';
import type { UserInfoType } from '@/types/user-info.type';
import { inject, onMounted, ref } from 'vue';

const props = defineProps<{
  id: string; 
}>();

const avtor = ref<UserInfoType>();
const dataList = ref<UserInfoType[]>([]);
const postList = ref<PostWithAvtorType[]>([]);
const userService = inject('UserInfoService') as UserInfoService;

onMounted(async () => {
  await getDataList();

  const res: UserInfoType | undefined = dataList.value.find(item => item.id === Number(props.id));
  if (res) {
    avtor.value = res;
    getPostList();
  } else {
    console.log(`Автор с ID ${props.id} не найден`);
  }
});

async function getDataList(): Promise<void> {
  await userService.requestData();
  dataList.value = userService.getData();
}

function getPostList(): void {
  // const res =  dataList.value.aflatMap(avtor => 
  //   avtor.post.map(post => ({...post, avtor: { fullName: avtor.fullName, id: avtor.id }}))
  // );
  const res =  dataList.value.find(item => item.id == avtor.id);
  map(avtor => 
    avtor.post.map(post => ({...post, avtor: { fullName: avtor.fullName, id: avtor.id }}))
  );
  if (res) {
    postList.value = res;
    console.log('Посты:', postList.value);
  }
}

</script>

<template>
  <div class="container">

    <section class="avtor-view">

      <div class="avtor-header">
          <img src="@/assets/images/user_1.png" alt="avtor-photo" class="avtor-image">

          <div class="avtor-info">
              <div class="title-1 avtor-full-name">{{ avtor?.fullName }}</div>
              <div class="title-2 avtor-blog-name">{{ avtor?.blogName }}</div>

              <div class="avtor-action">
                <div class="btn-edit"><IconEdit /></div>
                <div class="btn btn-add">Добавить запись</div>
              </div>
          </div>
      </div>
      
      <div class="avtor-posts">
        <div class="post-header">
          <div class="title-2">Статей автора: {{ avtor?.post.length }}</div>
          <div class="btn-sort">Сортировать</div>
        </div>

        <div class="posts">
          <PostMini v-for="post in avtor?.post" :is-light="true" :post="post" :user-name="avtor?.fullName" />
        </div>
      </div>

    </section>
  
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
        align-items: center;
        justify-content: end;
        gap: 30px;
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
