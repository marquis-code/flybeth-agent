<template>
  <div class="bg-white rounded-[2.5rem] border border-gray-200 relative w-full shadow-sm">
    <!-- Premium Header Gradient -->
    <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-blue-500/10 via-white to-transparent -z-10"></div>

    <div class="p-8 lg:p-12">
      <!-- Header Area -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-gray-100">
        <div class="space-y-1">
          <h2 class="text-3xl  text-gray-900  ">Travel Protection</h2>
          <p class="text-xs font-bold text-gray-400  ">Secure your journey with global coverage</p>
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
        <div class="flex items-center space-x-6 text-xs   text-gray-500 ">
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
          class="px-12 h-[58px] rounded-[1.5rem]   text-xs shadow-2xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all "
        >
          <MagnifyingGlassIcon class="h-5 w-5 mr-3" />
          Get Quote
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'
import { 
  ShieldCheckIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/vue/24/outline'
import DateRangePicker from '@/components/ui/DateRangePicker.vue'
import { useConfirmation } from '@/composables/core/useConfirmation'

const { confirm } = useConfirmation()
const destination = ref('')
const insuranceRange = ref({ start: '', end: '' })
const startDate = computed(() => insuranceRange.value.start)
const endDate = computed(() => insuranceRange.value.end)
const isSearching = ref(false)

const handleSearch = async () => {
  if (!destination.value || !startDate.value) return
  isSearching.value = true
  setTimeout(async () => {
    isSearching.value = false
    await confirm({
      title: 'Global Insurance Network',
      message: 'The insurance search feature is being wired to our live global provider network. Policies from AIG, Allianz, and others will be available here soon.',
      confirmText: 'Keep me posted',
      cancelText: ''
    })
  }, 1000)
}
</script>
