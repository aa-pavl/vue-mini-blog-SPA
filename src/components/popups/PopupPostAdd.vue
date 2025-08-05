<script setup lang="ts">
import { PopupEnum, type PopupInputType, type PopupUpdateType } from '@/types/popup'
import IconClose from '../icons/IconClose.vue'
import LabelAndInput from '../items/LabelAndInput.vue'
import type { SavePostDtoType } from '@/types/post.type'
import { inject, ref } from 'vue'
import type { PostService } from '@/services/post.servive'
import type { UserInfoService } from '@/services/user-info.service'

const props = defineProps<{
  userId: number
  title: string
}>()
const emit = defineEmits(['onClose', 'onUpdate'])

const fields: PopupInputType[] = [
  { label: 'Заголовок', maxLength: 50, name: 'title' },
  { label: 'Краткое описание', maxLength: 100, name: 'briefDescription' },
  { label: 'Полное описание', maxLength: 255, name: 'fullDescription' },
]

const popupEnum = PopupEnum
const postService = inject('PostService') as PostService
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

async function doAction(): Promise<void> {
  if (
    !formData.value.title ||
    !formData.value.briefDescription ||
    !formData.value.fullDescription
  ) {
    alert('Заполните все поля')
    return
  }
  try {
    await postService.add(props.userId, formData.value)
    await userService.requestData()
    emit('onUpdate')
    closePopup()
  } catch (error) {
    console.error('Ошибка:', error)
    alert('Не удалось выполнить действие')
  }
}

function closePopup() {
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
      <div class="btn" @click="doAction">Сохранить</div>
      <div class="btn second" @click="closePopup">Отменить</div>
    </div>
  </div>
</template>

<style scoped></style>
