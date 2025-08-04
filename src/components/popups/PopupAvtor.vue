<script setup lang="ts">
import type { PopupInputType, PopupUpdateType } from '@/types/popup.type';
import IconClose from '../icons/IconClose.vue';
import LabelAndInput from '../items/LabelAndInput.vue';
import type { SaveUserInfoDtoType } from '@/types/user-info.type';
import { inject, ref } from 'vue';
import type { UserInfoService } from '@/services/user-info.service';


const emit = defineEmits(['onClose', 'onUpdateData']);

const fields: PopupInputType[] = [
  { label: "Полное имя", maxLength: 50, name: "fullName" },
  { label: "Название блога", maxLength: 50, name: "blogName" }
]

const userService = inject('UserInfoService') as UserInfoService;
const formData = ref<SaveUserInfoDtoType>({
  fullName: '',
  blogName: ''
});

function handleFieldUpdate({ fieldName, value }: PopupUpdateType): void {
  formData.value[fieldName as keyof SaveUserInfoDtoType] = value;
  console.log('Текущие данные формы:', formData.value);
}

async function addAvtor(): Promise<void> {
  if (!formData.value.fullName || !formData.value.blogName) {
    alert('Заполните все поля');
    return;
  }

  try {
    await userService.add(formData.value);
    emit("onUpdateData");
    closePopup();
  } catch (error) {
    console.error('Ошибка при добавлении автора:', error);
    alert('Не удалось добавить автора');
  }
}

function closePopup(): void {
  emit('onClose');
}


</script>

<template>

  <div class="popup popup-post">
    <div class="btn-close" @click="closePopup()"><IconClose /></div>

    <div class="title-2">Добавить автора</div>
    <div class="popup-content">
      <LabelAndInput v-for="field in fields" :field="field" @update="handleFieldUpdate" />
    </div>
    <div class="popup-btn-action">
      <div class="btn" @click="addAvtor()">Добавить</div>
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
