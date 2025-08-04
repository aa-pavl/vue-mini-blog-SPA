<script setup lang="ts">
import router from '@/router';
import type { UserInfoType } from '@/types/user-info.type';


// const props = defineProps(['avtor']);
const props = defineProps<{
  avtor: UserInfoType; 
}>();


function openPageAvtor(id: number): void {
  router.push(`/avtor/${id}`)
}

</script>

<template>

  <div class="avtor-mini" @click="openPageAvtor(avtor.id)">
    <img src="@/assets/images/user_1.png" alt="user-photo" class="avtor-image">
    <div class="avtor-user-name">{{ props.avtor.fullName }}</div>
  </div>

</template>


<style scoped>
@import "@/assets/styles/base.css";
@import "@/assets/styles/_fonts.css";

.avtor-mini {
  width: 343px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid var(--color-border);
  border-radius: 5px;

  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 15px;

  background-color: var(--color-green-light);

  .avtor-image {
    width: 50px;
    height: 50px;
  }

  .avtor-user-name {
    font-size: 18px;
  }

}
</style>
