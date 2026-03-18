<template>
  <div 
    :class="[
      'bg-white rounded-[2rem] overflow-hidden transition-all duration-500',
      hover ? 'hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2' : 'shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]',
      padding ? 'p-8' : '',
      border ? 'border border-gray-100' : ''
    ]"
  >
    <div v-if="$slots.header" class="px-8 py-5 border-b border-gray-50 bg-gray-50/30">
      <slot name="header" />
    </div>
    
    <div :class="[padding ? '' : 'p-8']">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="px-8 py-5 border-t border-gray-50 bg-gray-50/10">
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
