<template>
  <div class="relative w-full" ref="target">
    <label v-if="label" class="text-[10px] font-bold text-gray-400 px-1 mb-1.5 block">{{ label }}</label>
    
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-900 transition-all hover:bg-gray-50 focus:border-primary text-left"
    >
      <span v-if="selectedOption" class="truncate">{{ selectedOption.label }}</span>
      <span v-else class="text-gray-400">{{ placeholder || 'Select option' }}</span>
      
      <ChevronDownIcon 
        class="h-4 w-4 text-gray-400 transition-transform duration-200" 
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <div
      v-if="isOpen"
      class="absolute z-50 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-xl shadow-gray-200/50 max-h-60 overflow-y-auto custom-scrollbar p-1"
    >
      <div
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-primary/5 hover:text-primary rounded-lg cursor-pointer transition-colors flex items-center justify-between group"
      >
        <span>{{ option.label }}</span>
        <CheckIcon 
          v-if="modelValue === option.value" 
          class="h-3.5 w-3.5 text-primary" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDownIcon, CheckIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  modelValue: [String, Number, Boolean],
  options: {
    type: Array as () => Array<{ label: string; value: any }>,
    required: true
  },
  label: String,
  placeholder: String
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const target = ref(null)

const selectedOption = computed(() => {
  return props.options.find(opt => opt.value === props.modelValue)
})

const selectOption = (option: any) => {
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (target.value && !(target.value as any).contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 10px;
}
</style>
