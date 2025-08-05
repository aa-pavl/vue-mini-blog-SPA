<script setup lang="ts">
import type { PopupInputType, PopupUpdateType } from '@/types/popup'
import { ref, watch } from 'vue'

const props = defineProps<{
  field: PopupInputType
  data?: string
}>()

const emit = defineEmits<{
  (e: 'update', payload: PopupUpdateType): void
}>()
const inputValue = ref<string>(props.data || '') // Реактивная переменная для хранения значения

// Обработчик потери фокуса
const handleBlur = () => {
  if (props.field.name === 'email' && !validateEmail(inputValue.value)) {
    alert('Почта введена неверно')
    return // Не отправляем данные, если email невалидный
  }
  emit('update', {
    fieldName: props.field.name,
    value: inputValue.value,
  })
}

// Проверка валидности email
const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}
</script>

<template>
  <div class="label-input-block">
    <div class="lable">
      {{ props.field.label }} ( {{ inputValue.length }} / {{ props.field.maxLength }})
    </div>
    <input
      v-if="props.field.name !== 'fullDescription'"
      type="text"
      class="field input"
      placeholder="Введите текст..."
      v-model="inputValue"
      :maxlength="props.field.maxLength"
      @blur="handleBlur"
    />
    <textarea
      v-if="props.field.name === 'fullDescription'"
      class="field textarea"
      placeholder="Введите текст..."
      v-model="inputValue"
      :maxlength="props.field.maxLength"
      @blur="handleBlur"
    ></textarea>
  </div>
</template>

<style scoped>
@import '@/assets/styles/base.css';
@import '@/assets/styles/_fonts.css';

.label-input-block {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  height: auto;

  .lable {
    color: var(--color-text-light);
  }

  .field {
    border: 1px solid var(--color-text-light);
    border-radius: 5px;
    padding: 20px 15px;
    box-sizing: border-box;

    width: 100%;

    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 16px;

    &::placeholder {
      color: var(--color-text-light);
      font-size: 14px;
    }
  }

  .input {
    height: 50px;
  }

  .textarea {
    height: 250px;
  }
}
</style>
