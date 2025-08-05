<script setup lang="ts">
import IconClose from '../icons/IconClose.vue'
import { UserInfoService } from '@/services/user-info.service'
import { inject } from 'vue'
import type { PostService } from '@/services/post.servive'
import { PopupEnum } from '@/types/popup'
import type { CommentService } from '@/services/comment.servive'

const props = defineProps(['id', 'title'])
const emit = defineEmits(['onClose', 'onUpdate', 'onMain'])

const popupEnum = PopupEnum
const userService = inject('UserInfoService') as UserInfoService
const postService = inject('PostService') as PostService
const commentService = inject('CommentService') as CommentService

async function doDelete() {
  console.log(props.title, props.id)
  if (!props.id) {
    alert('Ошибка: ID не указан')
    return
  }
  try {
    switch (props.title) {
      case popupEnum.AvtorDelete:
        await userService.delete(props.id)
        break

      case popupEnum.PostDelete:
        await postService.delete(props.id)
        break

      case popupEnum.CommentDelete:
        await commentService.delete(props.id)
        break

      default:
        break
    }
    await userService.requestData()
    emit('onUpdate')
    if (props.title !== popupEnum.CommentDelete) {
      emit('onMain')
    }
    closePopup()
  } catch (error) {
    console.error('Ошибка при удалении:', error)
    alert('Возникла ошибка при удаление! Обратитесь в поддержку.')
    closePopup()
  }
}

function closePopup() {
  emit('onClose')
}
</script>

<template>
  <div class="popup popup-approve">
    <div class="btn-close" @click="closePopup"><IconClose /></div>

    <div class="title-2">{{ props.title }}?</div>

    <div class="popup-btn-action">
      <div class="btn" @click="doDelete">Удалить</div>
      <div class="btn second" @click="closePopup">Отменить</div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/styles/base.css';
@import '@/assets/styles/_fonts.css';

.popup-approve {
  height: auto;

  .popup-btn-action {
    display: flex;
    gap: 15px;
    width: 100%;
  }
}
</style>
