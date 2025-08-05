<script setup lang="ts">
import { PopupEnum } from '@/types/popup'
import PopupCommentAdd from './PopupCommentAdd.vue'
import PopupDelete from './PopupDelete.vue'
import PopupAvtorAdd from './PopupAvtorAdd.vue'
import PopupPostAdd from './PopupPostAdd.vue'
import PopupPostUpdate from './PopupPostUpdate.vue'

const props = defineProps<{
  title: string
  userId: number
  postId: number
  commentId: number
}>()
const emit = defineEmits(['onMain', 'onClose', 'onUpdate'])

const popupEnum = PopupEnum
function popupClose() {
  emit('onClose')
}
function updateHandler() {
  emit('onUpdate')
}

function onMainHandler() {
  emit('onMain')
}
</script>

<template>
  <div class="popup-bg">
    <!-- Добавление -->
    <PopupAvtorAdd
      v-if="props.title === popupEnum.AvtorAdd"
      @on-close="popupClose"
      @on-update="updateHandler"
    />
    <PopupPostAdd
      v-if="props.title === popupEnum.PostAdd"
      :title="props.title"
      :user-id="props.userId"
      @on-close="popupClose"
      @on-update="updateHandler"
    />
    <PopupCommentAdd
      v-if="props.title === popupEnum.CommentAdd"
      :title="props.title"
      :post-id="props.postId"
      @on-close="popupClose"
      @on-update="updateHandler"
    />

    <PopupPostUpdate
      v-if="props.title === popupEnum.PostUpdate"
      :title="props.title"
      :post-id="props.postId"
      @on-close="popupClose"
      @on-update="updateHandler"
    />

    <!-- Удаление -->
    <PopupDelete
      v-if="props.title === popupEnum.AvtorDelete"
      :title="props.title"
      :id="props.userId"
      @on-close="popupClose"
      @on-update="updateHandler"
      @on-main="onMainHandler"
    />
    <PopupDelete
      v-if="props.title === popupEnum.PostDelete"
      :title="props.title"
      :id="props.postId"
      @on-close="popupClose"
      @on-update="updateHandler"
      @on-main="onMainHandler"
    />
    <PopupDelete
      v-if="props.title === popupEnum.CommentDelete"
      :title="props.title"
      :id="props.commentId"
      @on-close="popupClose"
      @on-update="updateHandler"
    />
  </div>
</template>

<style scoped>
/* @import '@/assets/styles/base.css'; */
/* @import '@/assets/styles/_fonts.css'; */
</style>
