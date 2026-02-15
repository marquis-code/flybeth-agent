<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-semibold text-primary/80 mb-1.5">{{ label }}</label>
    <div class="relative rounded-lg overflow-hidden transition-all duration-200">
      <div v-if="icon" class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <component :is="icon" class="h-5 w-5 text-neutral/50" aria-hidden="true" />
      </div>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :class="[
          'block w-full px-4 py-2.5 bg-white border border-gray-200 text-neutral placeholder:text-neutral/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200',
          icon ? 'pl-11' : '',
          error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''
        ]"
        v-bind="$attrs"
      />
    </div>
    <p v-if="error" class="mt-1 text-xs text-red-600 font-medium">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: String,
  id: String,
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text'
  },
  icon: Object,
  error: String
})

defineEmits(['update:modelValue'])
</script>
