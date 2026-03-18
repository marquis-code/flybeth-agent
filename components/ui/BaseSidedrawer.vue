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
      <div v-if="show" class="fixed inset-0 z-50 bg-primary-dark/40 backdrop-blur-sm" @click.self="$emit('close')">
        <Transition
          enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div v-if="show" class="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div class="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              <div class="px-6 py-6 bg-white border-b border-gray-100 flex items-center justify-between">
                <h3 class="text-xl font-bold text-primary-dark">{{ title }}</h3>
                <button @click="$emit('close')" class="p-2 rounded-full hover:bg-gray-100 transition-colors text-neutral/50 hover:text-primary">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div class="flex-1 overflow-y-auto px-6 py-6">
                <slot />
              </div>
              
              <div v-if="$slots.footer" class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-3">
                <slot name="footer" />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps({
  show: Boolean,
  title: String
})

defineEmits(['close'])
</script>
