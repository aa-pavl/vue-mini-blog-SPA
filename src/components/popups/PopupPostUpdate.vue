<script setup lang="ts">
import { type PopupInputType, type PopupUpdateType } from '@/types/popup'
import IconClose from '../icons/IconClose.vue'
import LabelAndInput from '../items/LabelAndInput.vue'
import type { PostWithAvtorType, SavePostDtoType } from '@/types/post.type'
import { inject, ref } from 'vue'
import type { PostService } from '@/services/post.servive'
import type { UserInfoService } from '@/services/user-info.service'

const props = defineProps<{
  postId: number
  title: string
}>()
const emit = defineEmits(['onClose', 'onUpdate'])

const fields: PopupInputType[] = [
  { label: 'Заголовок', maxLength: 50, name: 'title' },
  { label: 'Краткое описание', maxLength: 100, name: 'briefDescription' },
  { label: 'Полное описание', maxLength: 255, name: 'fullDescription' },
]

const postService = inject('PostService') as PostService
const userService = inject('UserInfoService') as UserInfoService

// Забираем данные о текущем посте
const storedData = localStorage.getItem('post_' + props.postId)
let json: PostWithAvtorType | {} = {}
try {
  json = storedData ? (JSON.parse(storedData) as PostWithAvtorType) : {}
} catch (e) {
  console.error('Error parsing post data:', e)
  json = {}
}
const formData = ref<SavePostDtoType>({
  title: 'title' in json ? json.title : '',
  briefDescription: 'briefDescription' in json ? json.briefDescription : '',
  fullDescription: 'fullDescription' in json ? json.fullDescription : '',
})

console.log('post_' + props.postId, storedData, formData.value)

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
    await postService.update({ ...formData.value, id: props.postId })
    await userService.requestData()
    emit('onUpdate')
    closePopup()
  } catch (error) {
    console.error('Ошибка:', error)
    alert('Не удалось выполнить обновить пост')
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
      <LabelAndInput
        v-for="field in fields"
        :field="field"
        :data="formData[field.name]"
        @update="handleFieldUpdate"
      />
    </div>
    <div class="popup-btn-action">
      <div class="btn" @click="doAction">Сохранить</div>
      <div class="btn second" @click="closePopup">Отменить</div>
    </div>
  </div>
</template>

<style scoped></style>
