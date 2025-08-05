<script setup lang="ts">
import type { PopupInputType, PopupUpdateType } from '@/types/popup'
import IconClose from '../icons/IconClose.vue'
import LabelAndInput from '../items/LabelAndInput.vue'
import type { SaveUserInfoDtoType } from '@/types/user-info.type'
import { inject, ref } from 'vue'
import type { UserInfoService } from '@/services/user-info.service'
import type { SaveCommentDtoType } from '@/types/comment.type'
import type { CommentService } from '@/services/comment.servive'


const props = defineProps(['postId', "title"])
const emit = defineEmits(['onClose', 'onUpdate'])

const fields: PopupInputType[] = [
  { label: 'Имя', maxLength: 50, name: 'userInfo' },
  { label: 'Email', maxLength: 50, name: 'email' },
  { label: 'Комментарий', maxLength: 50, name: 'textComment' },
]

const userService = inject('UserInfoService') as UserInfoService
const commentService = inject('CommentService') as CommentService
const formData = ref<SaveCommentDtoType>({
  userInfo: '',
  email: '',
  textComment: '',
})

function handleFieldUpdate({ fieldName, value }: PopupUpdateType): void {
  formData.value[fieldName as keyof SaveCommentDtoType] = value
  console.log('Текущие данные формы:', formData.value)
}

async function onAdd(): Promise<void> {
  if (!formData.value.userInfo || !formData.value.email || !formData.value.textComment) {
    alert('Заполните все поля')
    return
  }

  try {
    await commentService.add(props.postId, formData.value)
    await userService.requestData()
    emit('onUpdate')
    closePopup()
  } catch (error) {
    console.error('Ошибка при добавлении комментария:', error)
    alert('Не удалось добавить автора')
  }
}

function closePopup(): void {
  emit('onClose')
}
</script>

<template>
  <div class="popup popup-post">
    <div class="btn-close" @click="closePopup"><IconClose /></div>

    <div class="title-2">{{ props.title }}</div>
    <div class="popup-content">
      <LabelAndInput v-for="field in fields" :field="field" @update="handleFieldUpdate" />
    </div>
    <div class="popup-btn-action">
      <div class="btn" @click="onAdd">Сохранить</div>
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
