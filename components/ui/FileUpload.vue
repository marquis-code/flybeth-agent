<template>
  <div class="space-y-2">
    <label v-if="label" class="text-xs  text-primary-dark tracking-widest uppercase">{{ label }}</label>
    <div 
      class="relative group cursor-pointer"
      @click="triggerFileInput"
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
          <div class="w-full relative group/preview rounded-2xl overflow-hidden">
            <!-- PDF Document View -->
            <div v-if="isPdfUrl" class="w-full flex items-center space-x-4 p-4 bg-white rounded-xl border border-neutral-100">
                <div class="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 shrink-0">
                    <DocumentIcon class="w-6 h-6" />
                </div>
                <div class="flex-grow min-w-0">
                   <p class="text-sm font-bold text-primary-dark truncate">{{ fileName || 'Document' }}</p>
                   <div class="flex items-center space-x-3 mt-1">
                      <a :href="modelValue" target="_blank" class="text-[10px] text-secondary font-bold hover:underline uppercase tracking-wider">Preview</a>
                   </div>
                </div>
                <button 
                    class="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-500 transition-colors"
                    @click.stop="clearFile"
                >
                    <XMarkIcon class="w-5 h-5" />
                </button>
            </div>
            
            <!-- Image View -->
            <div v-else class="w-full relative aspect-[2/1] rounded-xl overflow-hidden bg-neutral-100 shadow-inner">
               <img :src="modelValue" class="w-full h-full object-cover" alt="Preview" />
               <div class="absolute inset-0 bg-black/50 opacity-0 group-hover/preview:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <button 
                      @click.stop="clearFile" 
                      class="bg-white/10 hover:bg-red-500 text-white p-3 rounded-full transition-colors backdrop-blur-md border border-white/20 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20"
                  >
                      <XMarkIcon class="w-6 h-6" />
                  </button>
               </div>
            </div>
          </div>
        </template>
      </div>

      <div v-if="loading" class="absolute inset-0 bg-white/60 backdrop-blur-[2px] rounded-[2rem] flex items-center justify-center z-20">
         <div class="flex flex-col items-center">
            <div class="w-8 h-8 border-3 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
            <p class="text-[10px]  text-secondary tracking-widest uppercase mt-3">Uploading...</p>
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

const isPdfUrl = computed(() => {
  return props.modelValue?.toLowerCase().includes('.pdf') || isDocument.value && fileName.value.toLowerCase().includes('.pdf')
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

const triggerFileInput = () => {
  fileInput.value?.click()
}
</script>
