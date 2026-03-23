<template>
  <div class="space-y-2">
    <label v-if="label" class="text-xs font-black text-primary-dark tracking-widest uppercase">{{ label }}</label>
    <div 
      class="relative group cursor-pointer"
      @click="$refs.fileInput.click()"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <input 
        ref="fileInput"
        type="file" 
        class="hidden" 
        :accept="accept"
        @change="handleFileChange"
      >
      
      <div 
        class="flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 border-dashed transition-all duration-300"
        :class="[
          isDragging ? 'border-secondary bg-secondary/5' : 'border-neutral-100 bg-neutral-50 hover:bg-white hover:border-neutral-200',
          error ? 'border-red-200 bg-red-50/30' : ''
        ]"
      >
        <template v-if="!modelValue">
          <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-neutral-400 mb-4 group-hover:scale-110 group-hover:text-secondary transition-all">
            <CloudArrowUpIcon class="w-6 h-6" />
          </div>
          <p class="text-sm font-bold text-neutral-600">Click to upload or drag and drop</p>
          <p class="text-[10px] text-neutral-400 mt-1 font-medium uppercase tracking-wider">{{ helpText }}</p>
        </template>
        
        <template v-else>
          <div class="flex items-center space-x-4 w-full">
            <div class="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                <DocumentIcon v-if="isDocument" class="w-6 h-6" />
                <PhotoIcon v-else class="w-6 h-6" />
            </div>
            <div class="flex-grow min-w-0">
               <p class="text-sm font-bold text-primary-dark truncate">{{ fileName || 'File selected' }}</p>
               <p class="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">File ready for upload</p>
            </div>
            <button 
                class="p-2 hover:bg-red-50 rounded-xl text-neutral-400 hover:text-red-500 transition-colors"
                @click.stop="clearFile"
            >
                <XMarkIcon class="w-5 h-5" />
            </button>
          </div>
        </template>
      </div>

      <div v-if="loading" class="absolute inset-0 bg-white/60 backdrop-blur-[2px] rounded-[2rem] flex items-center justify-center z-20">
         <div class="flex flex-col items-center">
            <div class="w-8 h-8 border-3 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
            <p class="text-[10px] font-black text-secondary tracking-widest uppercase mt-3">Uploading...</p>
         </div>
      </div>
    </div>
    <p v-if="error" class="text-[10px] font-bold text-red-500 uppercase tracking-widest pl-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  CloudArrowUpIcon, 
  DocumentIcon, 
  PhotoIcon,
  XMarkIcon 
} from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: String,
  label: String,
  accept: {
    type: String,
    default: 'image/*'
  },
  helpText: {
    type: String,
    default: 'JPG, PNG or PDF (max. 10MB)'
  },
  loading: Boolean,
  error: String
})

const emit = defineEmits(['update:modelValue', 'change'])

const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const fileName = ref('')

const isDocument = computed(() => {
  return props.accept.includes('pdf') || props.accept.includes('doc')
})

const handleFileChange = (event: Event) => {
  const el = event.target as HTMLInputElement
  if (el.files && el.files[0]) {
    const file = el.files[0]
    fileName.value = file.name
    emit('change', file)
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    const file = event.dataTransfer.files[0]
    fileName.value = file.name
    emit('change', file)
  }
}

const clearFile = () => {
  fileName.value = ''
  emit('update:modelValue', '')
  if (fileInput.value) fileInput.value.value = ''
}
</script>
