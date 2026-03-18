<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-dark/40 backdrop-blur-sm" @click.self="$emit('close')">
        <Transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div 
            v-if="show"
            :class="[
              'bg-white rounded-2xl shadow-2xl w-full overflow-hidden transform transition-all',
              sizeClasses
            ]"
          >
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <h3 class="text-xl font-bold text-primary-dark">{{ title }}</h3>
              <button @click="$emit('close')" class="p-2 rounded-full hover:bg-gray-100 transition-colors text-neutral/50 hover:text-primary">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="px-6 py-6 max-h-[70vh] overflow-y-auto">
              <slot />
            </div>
            
            <div v-if="$slots.footer" class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-3">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  show: Boolean,
  title: String,
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
})

defineEmits(['close'])

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'max-w-md'
    case 'lg': return 'max-w-2xl'
    case 'xl': return 'max-w-4xl'
    default: return 'max-w-lg'
  }
})
</script>
