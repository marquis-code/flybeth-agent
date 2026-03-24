<template>
  <div class="relative inline-block group ml-2">
    <div class="w-4 h-4 rounded-full bg-neutral-100 flex items-center justify-center cursor-help group-hover:bg-secondary/10 transition-colors">
      <InformationCircleIcon class="w-3 h-3 text-brand-gray/40 group-hover:text-secondary transition-colors" />
    </div>
    
    <!-- Tooltip Card -->
    <div class="absolute top-full right-0 mt-3 w-96 p-5 bg-primary-dark text-white rounded-[2rem] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] pointer-events-none border border-white/10">
      <div class="relative">
        <!-- Arrow pointing up -->
        <div class="absolute -top-[7px] right-4 w-3.5 h-3.5 bg-primary-dark rotate-45 border-t border-l border-white/10"></div>
        <p class="text-[11.5px] font-medium leading-relaxed text-neutral-200">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InformationCircleIcon } from '@heroicons/vue/24/outline'

defineProps<{
  text: string
}>()
</script>
