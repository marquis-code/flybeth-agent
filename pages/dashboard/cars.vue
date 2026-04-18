<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="text-2xl font-bold text-gray-900 ">Car Rentals</h2>
        <p class="text-[10px] text-gray-400 font-bold  ">Book global vehicle inventory across leading rental providers</p>
      </div>
    </div>
    <div class="bg-white border border-gray-100 rounded-xl overflow-visible p-1">
       <SearchWidget default-tab="Cars" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchWidget from '@/components/SearchWidget.vue'

definePageMeta({
  layout: 'dashboard'
})
</script>
