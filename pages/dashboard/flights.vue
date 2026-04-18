<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="text-2xl font-bold text-gray-900 ">Airline GDS Engine</h2>
        <p class="text-[10px] text-gray-400 font-bold  ">Book aggregated flight inventory with net fares and markups</p>
      </div>
    </div>
    <div class="bg-white border border-gray-100 rounded-xl overflow-visible p-1">
       <SearchWidget default-tab="Flights" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchWidget from '@/components/SearchWidget.vue'

definePageMeta({
  layout: 'dashboard'
})
</script>
