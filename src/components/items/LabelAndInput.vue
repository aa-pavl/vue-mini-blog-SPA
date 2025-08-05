<script setup lang="ts">
import type { PopupInputType, PopupUpdateType } from '@/types/popup';
import { ref, watch } from 'vue';


const props = defineProps<{
  field: PopupInputType;
}>();

const emit = defineEmits<{
  (e: 'update', payload: PopupUpdateType): void;
}>(); 
const inputValue = ref<string>(''); // Реактивная переменная для хранения значения

// Обработчик потери фокуса
const handleBlur = () => {
  emit('update', {
    fieldName: props.field.name,
    value: inputValue.value
  });
};

// // Отслеживаем изменения и отправляем родителю
// watch(inputValue, (newValue) => {
//   emit('update', {
//     fieldName: props.field.name,
//     value: newValue
//   });
// });

</script>

<template>

    <div class="label-input-block">
      <div class="lable">{{ props.field.label }} ( {{ inputValue.length }} / {{ props.field.maxLength }})</div>
      <input 
        type="text" 
        class="input" 
        placeholder="Введите текст..."
        v-model="inputValue"
        :maxlength="props.field.maxLength"
        @blur="handleBlur"
      >
    </div>

</template>


<style scoped>
@import "@/assets/styles/base.css";
@import "@/assets/styles/_fonts.css";

.label-input-block {
  display: flex;
  flex-direction: column;
  gap: 5px;
  

  .lable {
    color: var(--color-text-light);
  }

  .input {
    border: 1px solid var(--color-text-light);
    border-radius: 5px;

    min-height: 50px;
    height: auto;
    flex-grow: 1;
    padding: 0 10px;

    &::placeholder {
      font-size: 14px;
    }
  }
}
</style>
