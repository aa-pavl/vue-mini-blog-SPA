<script setup lang="ts">
import IconClose from '../icons/IconClose.vue';


const props = defineProps(['title']);

</script>

<template>

  <div class="popup popup-post">
    <div class="btn-close"><IconClose /></div>

    <div class="title-2">Добавить пост</div>
    <div class="popup-content">
      <div class="popup-input">
        <div class="input-lable">Заголовок ( 0 / 50)</div>
        <input type="text" class="input-text" placeholder="Введите текст...">
      </div>
      <div class="popup-input">
        <div class="input-lable">Заголовок ( 0 / 50)</div>
        <input type="text" class="input-text" placeholder="Введите текст...">
      </div>
      <div class="popup-input">
        <div class="input-lable">Заголовок ( 0 / 50)</div>
        <input type="text" class="input-text" placeholder="Введите текст...">
      </div>
    </div>
    <div class="popup-btn-action">
      <div class="btn">Опубликовать</div>
      <div class="btn second">Отменить</div>
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

    .popup-input {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .input-lable {
        color: var(--color-text-light);
      }

      .input-text {
        border: 1px solid var(--color-text-light);
        border-radius: 5px;
        min-height: 50px;
        height: 50px;
        padding: 10px;

        &::placeholder {
          font-size: 14px;
        }
      }

      &:last-child {
        flex-grow: 1;

        .input-text {
          flex-grow: 1;
        }
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
