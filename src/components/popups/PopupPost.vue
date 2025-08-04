<script setup lang="ts">
import type { PopupPostType } from '@/types/popup.type';
import IconClose from '../icons/IconClose.vue';
import LabelAndInput from '../items/LabelAndInput.vue';


const props = defineProps(['title']);
const emit = defineEmits(['onClose']);

const fields: PopupPostType[] = [
  { "label": "Заголовок", "maxLenght": 50 },  
  { "label": "Краткое описание", "maxLenght": 100  }, 
  { "label": "Полное описание", "maxLenght": 255  }
]

function closePopup() {
  // передаем родителю закрыть форму
  emit('onClose');
}

</script>

<template>

  <div class="popup popup-post">
    <div class="btn-close" @click="closePopup()"><IconClose /></div>

    <div class="title-2">Добавить пост</div>
    <div class="popup-content">
      <LabelAndInput v-for="field in fields" :field="field" />
    </div>
    <div class="popup-btn-action">
      <div class="btn">Опубликовать</div>
      <div class="btn second" @click="closePopup()">Отменить</div>
    </div>
  </div>

</template>


<style scoped>
@import "@/assets/styles/base.css";
@import "@/assets/styles/_fonts.css";

.popup-post {

  .popup-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    flex-grow: 1;

    &:deep(> *:last-child) {
      flex-grow: 1;

      .input {
        flex-grow: 1;
      }
    }
  }

  .popup-btn-action {
    display: flex;
    gap: 15px;
    width: 100%;
  }
}
</style>
