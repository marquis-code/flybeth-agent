<template>
  <NuxtLink v-if="to" :to="to" :class="buttonClasses" v-bind="$attrs">
    <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot />
  </NuxtLink>
  <button
    v-else
    :class="buttonClasses"
    :disabled="loading"
    v-bind="$attrs"
  >
    <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  to: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
  },
  block: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary-dark text-white hover:bg-neutral-800 focus:ring-primary-dark/20'
    case 'secondary':
      return 'bg-secondary text-white hover:brightness-110 focus:ring-secondary/20'
    case 'outline':
      return 'border border-neutral-200 text-primary-dark bg-white hover:border-primary-dark hover:bg-neutral-50 focus:ring-primary-dark/10'
    case 'ghost':
      return 'text-neutral-600 hover:bg-neutral-50 focus:ring-neutral-100'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600/20'
    default:
      return ''
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-4 py-2 text-sm'
    case 'lg':
      return 'px-8 py-3.5 text-xs'
    default:
      return 'px-6 py-2.5 text-[11px]'
  }
})

const buttonClasses = computed(() => {
  return [
    'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 transform active:scale-[0.98] outline-none focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses.value,
    sizeClasses.value,
    props.block ? 'w-full flex' : ''
  ]
})
</script>
