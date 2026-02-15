<template>
  <div 
    :class="[
      'bg-white rounded-xl overflow-hidden transition-all duration-300',
      hover ? 'hover:shadow-lg hover:-translate-y-1' : 'shadow-sm',
      padding ? 'p-6' : '',
      border ? 'border border-gray-100' : ''
    ]"
  >
    <div v-if="$slots.header" class="px-6 py-4 border-b border-gray-50 bg-gray-50/30">
      <slot name="header" />
    </div>
    
    <div :class="[padding ? '' : 'p-6']">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-50 bg-gray-50/10">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  hover: {
    type: Boolean,
    default: false
  },
  padding: {
    type: Boolean,
    default: true
  },
  border: {
    type: Boolean,
    default: true
  }
})
</script>
