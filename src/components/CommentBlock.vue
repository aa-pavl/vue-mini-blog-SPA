<script setup lang="ts">
import type { CommentType } from '@/types/comment.type';
import IconEdit from './icons/IconEdit.vue';
import IconTrash from './icons/IconTrash.vue';
import { ref } from 'vue';
import { PopupEnum } from '@/types/popup';


const props = defineProps<{
  comment: CommentType;
}>();

const popupEnum = PopupEnum
const flagPopupEdit = ref<boolean>(false)  // флаги для открытия popups
const flagPopupDelete = ref<boolean>(false)

function editPopup() {
  flagPopupEdit.value = true
}
function deletePopup() {
  flagPopupDelete.value = true
}
function closePopupHandler() {
  flagPopupEdit.value = false
  flagPopupDelete.value = false
}
</script>

<template>
  <div class="popup-bg" v-if="flagPopupEdit || flagPopupDelete">
    <!-- <PopupPost
      v-if="flagPopupEdit"
      title="Добавить пост"
      :user-id="comment?.id"
      @on-close="closePopupHandler"
      @on-update-data="updateHandler"
    /> -->
    <PopupDelete
      v-if="flagPopupDelete"
      :title="popupEnum.CommentDelete"
      :id="comment?.id"
      @on-close="closePopupHandler"
    />
  </div>


  <div class="comment-block">

    <div class="comment-top">
      <div class="comment-info">
        <div class="title-3">{{ props.comment.userInfo }}</div>
        <div class="email">{{ props.comment.email }}</div>
      </div>
      <div class="comment-datetime">{{ props.comment.dateTime }}</div>
    </div>

    <div class="comment-text">{{ props.comment.textComment }}</div>

    <div class="comment-action">
        <div class="btn-edit" @click="editPopup"><IconEdit /></div>
        <div class="btn-delete" @click="deletePopup"><IconTrash /></div>
    </div>
  </div>

</template>


<style scoped>
@import "@/assets/styles/base.css";
@import "@/assets/styles/_fonts.css";

.comment-block {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  background-color: var(--color-green-light);

  .comment-top {
    display: flex;
    justify-content: space-between;

    .comment-info {
      display: flex;
      flex-direction: column;
    }
  }

  .comment-action {
    display: flex;
    justify-content: end;
    gap: 15px;
  }

}
</style>
