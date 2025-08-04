<script setup lang="ts">
import router from '@/router';
import IconClose from '../icons/IconClose.vue';
import { UserInfoService } from '@/services/user-info.service';
import { inject } from 'vue';


const props = defineProps(['id', "title"]);
const emit = defineEmits(['onClose']);

const userService = inject('UserInfoService') as UserInfoService;

async function doDelete() {
  console.log(props.id);
  if (props.id) {
    await userService.delete(props.id);
    closePopup();
    router.push(`/`);
  } else {
    alert("Возникла ошибка при удаление автора! Обратитесь в поддержку.")
    closePopup();
  }
}

function closePopup() {
  // передаем родителю закрыть форму
  emit('onClose');
}


</script>

<template>

  <div class="popup popup-approve">
    <div class="btn-close" @click="closePopup()"><IconClose /></div>

    <div class="title-2">Удалить {{ props.title }}?</div>

    <div class="popup-btn-action">
      <div class="btn" @click="doDelete()">Удалить</div>
      <div class="btn second" @click="closePopup()">Отменить</div>
    </div>
  </div>

</template>


<style scoped>
@import "@/assets/styles/base.css";
@import "@/assets/styles/_fonts.css";

.popup-approve {
  height: auto;

  .popup-btn-action {
    display: flex;
    gap: 15px;
    width: 100%;
  }
}
</style>
