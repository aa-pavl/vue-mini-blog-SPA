<script setup lang="ts">
import type { PopupInputType, PopupUpdateType } from '@/types/popup.type'
import IconClose from '../icons/IconClose.vue'
import LabelAndInput from '../items/LabelAndInput.vue'
import type { SavePostDtoType } from '@/types/post.type'
import { inject, ref } from 'vue'
import type { PostService } from '@/services/post.servive'
import type { UserInfoService } from '@/services/user-info.service'

const props = defineProps(['userId', 'title'])
const emit = defineEmits(['onClose', 'onUpdateData'])

const fields: PopupInputType[] = [
  { label: 'Заголовок', maxLength: 50, name: 'title' },
  { label: 'Краткое описание', maxLength: 100, name: 'briefDescription' },
  { label: 'Полное описание', maxLength: 255, name: 'fullDescription' },
]

const posrService = inject('PostService') as PostService
const userService = inject('UserInfoService') as UserInfoService
const formData = ref<SavePostDtoType>({
  title: '',
  briefDescription: '',
  fullDescription: '',
})

function handleFieldUpdate({ fieldName, value }: PopupUpdateType): void {
  formData.value[fieldName as keyof SavePostDtoType] = value
  console.log('Текущие данные формы:', formData.value)
}

async function addPost(): Promise<void> {
  if (
    !formData.value.title ||
    !formData.value.briefDescription ||
    !formData.value.fullDescription
  ) {
    alert('Заполните все поля')
    return
  }

  try {
    await posrService.add(props.userId, formData.value)
    await userService.requestData()
    emit('onUpdateData')
    closePopup()
  } catch (error) {
    console.error('Ошибка при добавлении поста:', error)
    alert('Не удалось добавить пост')
  }
}

function closePopup() {
  emit('onClose')
}
</script>

<template>
  <div class="popup popup-post">
    <div class="btn-close" @click="closePopup"><IconClose /></div>

    <div class="title-2">Добавить пост</div>
    <div class="popup-content">
      <LabelAndInput v-for="field in fields" :field="field" @update="handleFieldUpdate" />
    </div>
    <div class="popup-btn-action">
      <div class="btn" @click="addPost">Добавить</div>
      <div class="btn second" @click="closePopup">Отменить</div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/styles/base.css';
@import '@/assets/styles/_fonts.css';

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
