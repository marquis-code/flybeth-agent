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
      <div v-if="show" class="fixed inset-0 z-50 bg-gray-900/10 backdrop-blur-sm" @click.self="handleBackdropClick">
        <Transition
          enter-active-class="transform transition ease-in-out duration-400"
          :enter-from-class="position === 'left' ? '-translate-x-full' : 'translate-x-full'"
          :enter-to-class="'translate-x-0'"
          leave-active-class="transform transition ease-in-out duration-300"
          :leave-from-class="'translate-x-0'"
          :leave-to-class="position === 'left' ? '-translate-x-full' : 'translate-x-full'"
        >
          <div v-if="show" :class="[position === 'left' ? 'left-0 border-r' : 'right-0 border-l', 'fixed inset-y-0 max-w-full flex']">
            <div :class="width" class="w-screen bg-white flex flex-col shadow-2xl border-gray-100">
              <div class="border-b border-gray-50 flex items-center justify-center">
                <div class="px-6 py-4 w-full max-w-4xl flex items-center justify-between">
                  <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest">{{ title }}</h3>
                  <button @click="$emit('close')" class="p-1.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-400 hover:text-gray-900">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center">
                <div class="w-full max-w-4xl p-6">
                  <slot />
                </div>
              </div>
              
              <div v-if="$slots.footer" class="border-t border-gray-50 bg-gray-50 flex items-center justify-center">
                 <div class="px-6 py-4 w-full max-w-4xl flex items-center justify-end space-x-3">
                   <slot name="footer" />
                 </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps({
  show: Boolean,
  title: String,
  width: { type: String, default: 'max-w-full w-[100vw]' },
  closeOnClickOutside: { type: Boolean, default: true },
  position: { type: String, default: 'right' }
})

const emit = defineEmits(['close'])

const handleBackdropClick = () => {
  if (props.closeOnClickOutside) {
    emit('close')
  }
}
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
