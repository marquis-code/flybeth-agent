<template>
  <div class="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
    <table class="min-w-full divide-y divide-gray-100">
      <thead class="bg-gray-50/50">
        <tr>
          <th 
            v-for="header in headers" 
            :key="header.key"
            class="px-6 py-4 text-left text-xs font-bold text-primary-dark/60 uppercase tracking-wider"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-50">
        <tr 
          v-for="(item, index) in items" 
          :key="index"
          class="hover:bg-primary/5 transition-colors cursor-default"
        >
          <td 
            v-for="header in headers" 
            :key="header.key"
            class="px-6 py-4 whitespace-nowrap text-sm text-neutral"
          >
            <slot :name="header.key" :item="item" :index="index">
              {{ item[header.key] }}
            </slot>
          </td>
        </tr>
        <tr v-if="items.length === 0">
          <td :colspan="headers.length" class="px-6 py-12 text-center text-neutral/40">
            <div class="flex flex-col items-center">
              <svg class="w-12 h-12 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              No data available
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps({
  headers: {
    type: Array as () => Array<{ key: string, label: string }>,
    required: true
  },
  items: {
    type: Array as () => Array<any>,
    required: true
  }
})
</script>
