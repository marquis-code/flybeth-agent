<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="text-2xl font-bold text-gray-900 ">Ground Transfers</h2>
        <p class="text-[10px] text-gray-400 font-bold  ">Manage airport transfers and local fleet reservations</p>
      </div>
    </div>
    <div class="bg-white border border-gray-100 rounded-xl overflow-visible p-1">
       <SearchWidget default-tab="Transfers" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchWidget from '@/components/SearchWidget.vue'

definePageMeta({
  layout: 'dashboard'
})
</script>
