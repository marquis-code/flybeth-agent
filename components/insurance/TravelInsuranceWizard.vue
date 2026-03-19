<template>
  <div class="bg-white rounded-[2.5rem] border border-gray-200 relative w-full shadow-sm">
    <!-- Premium Header Gradient -->
    <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-blue-500/10 via-white to-transparent -z-10"></div>

    <div class="p-8 lg:p-12">
      <!-- Header Area -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-gray-100">
        <div class="space-y-1">
          <h2 class="text-3xl font-black text-gray-900 tracking-tight italic">Travel Protection</h2>
          <p class="text-xs font-bold text-gray-400 tracking-widest uppercase">Secure your journey with global coverage</p>
        </div>
      </div>

      <!-- Search Inputs Grid -->
      <div class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          <!-- Destination Input -->
          <div class="lg:col-span-12 relative">
            <AnimatedInput 
              v-model="destination" 
              label="Primary destination country" 
              :icon="ShieldCheckIcon"
            />
          </div>
        </div>

        <div class="grid grid-cols-1">
          <DateRangePicker v-model="insuranceRange" />
        </div>
      </div>

      <!-- Bottom Actions -->
      <div class="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-8 border-t border-gray-100">
        <div class="flex items-center space-x-6 text-xs font-black tracking-widest text-gray-500 uppercase">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Medical Coverage</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Trip Cancellation</span>
          </div>
        </div>

        <BaseButton 
          @click="handleSearch" 
          :loading="isSearching" 
          variant="primary" 
          size="lg" 
          class="px-12 h-[58px] rounded-[1.5rem] font-black tracking-[0.2em] text-xs shadow-2xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all uppercase"
        >
          <MagnifyingGlassIcon class="h-5 w-5 mr-3" />
          Get Quote
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'
import { 
  ShieldCheckIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/vue/24/outline'
import DateRangePicker from '@/components/ui/DateRangePicker.vue'

const destination = ref('')
const insuranceRange = ref({ start: '', end: '' })
const startDate = computed(() => insuranceRange.value.start)
const endDate = computed(() => insuranceRange.value.end)
const isSearching = ref(false)

const handleSearch = () => {
  if (!destination.value || !startDate.value) return
  isSearching.value = true
  setTimeout(() => {
    isSearching.value = false
    alert('Insurance search feature is coming soon to the live provider network.')
  }, 1000)
}
</script>
