<template>
  <div class="flex justify-between gap-2 sm:gap-3" @paste="handlePaste">
    <input
      v-for="(digit, index) in digits"
      :key="index"
      :id="'otp-' + index"
      ref="inputs"
      type="text"
      inputmode="numeric"
      maxlength="1"
      v-model="digits[index]"
      @input="onInput(index, $event)"
      @keydown="onKeyDown(index, $event)"
      class="w-12 h-16 sm:w-16 sm:h-20 text-center text-2xl sm:text-3xl font-black text-primary-dark bg-white border-2 border-gray-100 focus:border-secondary focus:ring-8 focus:ring-secondary/5 rounded-2xl sm:rounded-3xl outline-none transition-all shadow-sm"
      :class="{ 'border-secondary ring-4 ring-secondary/5': digits[index] }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  length: {
    type: Number,
    default: 6
  }
})

const emit = defineEmits(['update:modelValue', 'complete'])

const digits = ref(new Array(props.length).fill(''))
const inputs = ref<HTMLInputElement[]>([])

onMounted(() => {
  // Focus first input on mount
  nextTick(() => {
    inputs.value[0]?.focus()
  })
})

const onInput = (index: number, event: any) => {
  const val = event.target.value
  // Allow only numbers
  if (!/^\d*$/.test(val)) {
    digits.value[index] = ''
    return
  }

  if (val.length === 1 && index < props.length - 1) {
    // Focus next input
    inputs.value[index + 1]?.focus()
  }

  updateValue()
}

const onKeyDown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    // Focus previous input on backspace if current is empty
    inputs.value[index - 1]?.focus()
  } else if (event.key === 'ArrowLeft' && index > 0) {
    inputs.value[index - 1]?.focus()
  } else if (event.key === 'ArrowRight' && index < props.length - 1) {
    inputs.value[index + 1]?.focus()
  }
}

const handlePaste = (event: ClipboardEvent) => {
  const pasteData = event.clipboardData?.getData('text').slice(0, props.length) || ''
  if (!/^\d+$/.test(pasteData)) return

  pasteData.split('').forEach((char, i) => {
    if (i < props.length) {
      digits.value[i] = char
    }
  })

  // Focus the last input or the one after the pasted data
  const nextFocus = Math.min(pasteData.length, props.length - 1)
  inputs.value[nextFocus]?.focus()

  updateValue()
}

const updateValue = () => {
  const fullCode = digits.value.join('')
  emit('update:modelValue', fullCode)
  if (fullCode.length === props.length) {
    emit('complete', fullCode)
  }
}
</script>
