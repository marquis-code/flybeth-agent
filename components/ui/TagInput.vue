<template>
  <div class="space-y-4">
    <div class="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-100 rounded-2xl min-h-[56px] transition-all focus-within:bg-white focus-within:border-primary">
      <div v-for="(tag, index) in modelValue" :key="index" class="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-xl shadow-sm text-[10px] font-black uppercase text-gray-700">
        <span>{{ tag }}</span>
        <button @click="removeTag(index)" class="hover:text-rose-500 transition-colors">
          <XMarkIcon class="h-3.5 w-3.5" />
        </button>
      </div>
      <input 
        v-model="inputValue"
        @keydown.enter.prevent="addTag"
        @keydown.comma.prevent="addTag"
        @keydown.space.prevent="addTag"
        @blur="addTag"
        :placeholder="modelValue.length === 0 ? placeholder : ''"
        class="flex-grow bg-transparent border-none outline-none text-[11px] font-bold text-gray-900 min-w-[150px] placeholder:text-gray-300"
      />
    </div>
    <p class="text-[9px] text-gray-400 font-bold uppercase tracking-widest px-2">Press enter, comma, or space to add address</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  modelValue: string[]
  placeholder?: string
}>()

const emit = defineEmits(['update:modelValue'])

const inputValue = ref('')

const addTag = () => {
  const val = inputValue.value.trim().replace(/,/g, '')
  if (val && !props.modelValue.includes(val)) {
    // Basic email validation if needed
    if (val.includes('@')) {
       emit('update:modelValue', [...props.modelValue, val])
       inputValue.value = ''
    }
  }
}

const removeTag = (index: number) => {
  const newTags = [...props.modelValue]
  newTags.splice(index, 1)
  emit('update:modelValue', newTags)
}
</script>
