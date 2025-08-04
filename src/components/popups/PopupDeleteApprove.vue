<script setup lang="ts">
import IconClose from '../icons/IconClose.vue';


const props = defineProps(['title']);

</script>

<template>

  <div class="popup popup-approve">
    <div class="btn-close"><IconClose /></div>

    <div class="title-2">Удаленить пост?</div>

    <div class="popup-btn-action">
      <div class="btn">Удалить</div>
      <div class="btn second">Отменить</div>
    </div>
  </div>

</template>


<style scoped>
@import "@/assets/styles/base.css";
@import "@/assets/styles/_fonts.css";

.popup-approve {
  height: auto;

  .popup-btn-action {
    display: flex;
    gap: 15px;
    width: 100%;
  }
}
</style>
