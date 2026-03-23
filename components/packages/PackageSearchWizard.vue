<template>
  <div class="bg-white rounded-[2.5rem] border border-gray-200 relative w-full shadow-sm">
    <!-- Premium Header Gradient -->
    <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent -z-10"></div>

    <div class="p-8 lg:p-12">
      <!-- Header Area -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-gray-100">
        <div class="space-y-1">
          <h2 class="text-3xl font-black text-gray-900 tracking-tight italic">Vacation Packages</h2>
          <p class="text-xs font-bold text-gray-400 tracking-widest uppercase">Bundle Flight + Hotel for exclusive savings</p>
        </div>
      </div>

      <!-- Search Inputs Grid -->
      <div class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          <!-- Origin -->
          <div class="lg:col-span-4 relative" ref="originContainerRef">
            <AnimatedInput 
              v-model="originQuery" 
              label="Leaving from" 
              :icon="MapPinIcon"
              @focus="originOpen = true"
            />
            <Transition name="slide-up">
              <div v-if="originOpen && filteredOrigins.length" class="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 shadow-2xl rounded-[2rem] z-[9999] max-h-[400px] overflow-y-auto p-3 animate-in fade-in slide-in-from-top-4">
                <button 
                  v-for="airport in filteredOrigins" :key="airport.code"
                  @click="selectOrigin(airport)"
                  class="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group border border-transparent hover:border-gray-100 mb-1"
                >
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <MapPinIcon class="h-6 w-6" />
                    </div>
                    <div class="text-left">
                      <p class="text-sm font-black text-gray-900 group-hover:text-primary transition-colors">{{ airport.city }}</p>
                      <p class="text-[10px] font-bold text-gray-400">{{ airport.name }}</p>
                    </div>
                  </div>
                  <span class="px-2 py-1 bg-gray-100 rounded text-[10px] font-black text-gray-500">{{ airport.code }}</span>
                </button>
              </div>
            </Transition>
          </div>

          <!-- Destination -->
          <div class="lg:col-span-4 relative" ref="destContainerRef">
            <AnimatedInput 
              v-model="destQuery" 
              label="Going to" 
              :icon="BuildingOffice2Icon"
              @focus="destOpen = true"
            />
            <Transition name="slide-up">
              <div v-if="destOpen && filteredDestinations.length" class="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 shadow-2xl rounded-[2rem] z-[9999] max-h-[400px] overflow-y-auto p-3 animate-in fade-in slide-in-from-top-4">
                <button 
                  v-for="dest in filteredDestinations" :key="dest.city"
                  @click="selectDest(dest)"
                  class="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group border border-transparent hover:border-gray-100 mb-1"
                >
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                      <BuildingOffice2Icon class="h-6 w-6" />
                    </div>
                    <div class="text-left">
                      <p class="text-sm font-black text-gray-900 group-hover:text-secondary transition-colors">{{ dest.city }}</p>
                      <p class="text-[10px] font-bold text-gray-400">{{ dest.country }}</p>
                    </div>
                  </div>
                </button>
              </div>
            </Transition>
          </div>

          <!-- Date Range -->
          <div class="lg:col-span-4">
            <DateRangePicker v-model="packageRange" />
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-5">
           <AnimatedInput v-model="travelers" label="Travelers" :icon="UsersIcon" type="number" />
        </div>
      </div>

      <!-- Bottom Actions -->
      <div class="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-8 border-t border-gray-100">
        <div class="flex items-center space-x-4 text-xs font-black tracking-widest text-primary uppercase">
          <div class="px-4 py-2 bg-primary/10 rounded-full border border-primary/20 flex items-center space-x-2">
            <SparklesIcon class="h-4 w-4" />
            <span>SAVE UP TO 15% ON BUNDLES</span>
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
          Search Packages
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'
import DateRangePicker from '@/components/ui/DateRangePicker.vue'
import { 
  MapPinIcon, 
  BuildingOffice2Icon, 
  UsersIcon, 
  SparklesIcon,
  MagnifyingGlassIcon 
} from '@heroicons/vue/24/outline'

// Mock data (replace with composables if available)
const majorAirports = [
  { code: 'LOS', city: 'Lagos', name: 'Murtala Muhammed', country: 'Nigeria' },
  { code: 'LHR', city: 'London', name: 'Heathrow', country: 'UK' },
  { code: 'DXB', city: 'Dubai', name: 'Dubai Intl', country: 'UAE' },
  { code: 'JFK', city: 'New York', name: 'John F Kennedy', country: 'USA' }
]

const popularDestinations = [
  { city: 'Banjul', country: 'Gambia', lat: 13.4549, lng: -16.5790 },
  { city: 'Dakar', country: 'Senegal', lat: 14.6928, lng: -17.4467 },
  { city: 'Accra', country: 'Ghana', lat: 5.6037, lng: -0.1870 },
  { city: 'Casablanca', country: 'Morocco', lat: 33.5731, lng: -7.5898 }
]

const originQuery = ref('')
const selectedOrigin = ref('')
const originOpen = ref(false)

const destQuery = ref('')
const selectedDest = ref<any>(null)
const destOpen = ref(false)

const packageRange = ref({ start: '', end: '' })
const travelers = ref(2)
const isSearching = ref(false)

const originContainerRef = ref(null)
const destContainerRef = ref(null)

onClickOutside(originContainerRef, () => originOpen.value = false)
onClickOutside(destContainerRef, () => destOpen.value = false)

const filteredOrigins = computed(() => {
  if (!originQuery.value) return majorAirports
  const lower = originQuery.value.toLowerCase()
  return majorAirports.filter(a => a.city.toLowerCase().includes(lower) || a.code.toLowerCase().includes(lower))
})

const filteredDestinations = computed(() => {
  if (!destQuery.value) return popularDestinations
  const lower = destQuery.value.toLowerCase()
  return popularDestinations.filter(d => d.city.toLowerCase().includes(lower) || d.country.toLowerCase().includes(lower))
})

const selectOrigin = (airport: any) => {
  originQuery.value = `${airport.city} (${airport.code})`
  selectedOrigin.value = airport.code
  originOpen.value = false
}

const selectDest = (dest: any) => {
  destQuery.value = `${dest.city}, ${dest.country}`
  selectedDest.value = dest
  destOpen.value = false
}

const handleSearch = () => {
  if (!selectedOrigin.value || !selectedDest.value || !packageRange.value.start) return
  isSearching.value = true
  setTimeout(() => {
    isSearching.value = false
    alert('Package search is being integrated with the live provider network.')
  }, 1000)
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-up-enter-from, .slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
