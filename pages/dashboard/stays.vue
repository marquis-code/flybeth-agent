<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="text-2xl font-bold text-gray-900 ">Hotel Inventory</h2>
        <p class="text-[10px] text-gray-400 font-bold  ">Global wholesale inventory and luxury property search</p>
      </div>
    </div>
    <div class="bg-white border border-gray-100 rounded-xl overflow-visible p-1">
       <SearchWidget default-tab="Hotels" />
    </div>
    
    <!-- Inventory Placeholder - Condensed -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 opacity-30 grayscale pointer-events-none">
      <div v-for="i in 4" :key="i" class="h-48 bg-white rounded-xl border border-gray-100 p-4 flex flex-col justify-end">
        <div class="h-3 w-1/2 bg-gray-50 rounded mb-2"></div>
        <div class="h-3 w-3/4 bg-gray-50 rounded"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchWidget from '@/components/SearchWidget.vue'

definePageMeta({
  layout: 'dashboard'
})
</script>
