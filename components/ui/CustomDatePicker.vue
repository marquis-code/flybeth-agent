<template>
  <div class="relative w-full group">
    <AnimatedInput
      v-model="internalValue"
      :label="label"
      type="date"
      :required="required"
      :disabled="disabled"
      class="w-full custom-date-picker"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Date],
    default: ''
  },
  label: {
    type: String,
    default: 'SELECT DATE'
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const internalValue = computed({
  get: () => {
    if (!props.modelValue) return ''
    if (props.modelValue instanceof Date) {
      return props.modelValue.toISOString().split('T')[0]
    }
    return props.modelValue
  },
  set: (val: string) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
})
</script>

<style scoped>
/* Ensure the native date picker icon is consistent or hidden on some browsers if we want full custom */
.custom-date-picker {
  cursor: pointer;
}
.custom-date-picker::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}
.custom-date-picker::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style>
