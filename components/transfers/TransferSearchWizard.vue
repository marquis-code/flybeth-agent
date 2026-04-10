<template>
  <div class="bg-white rounded-[2.5rem] border border-gray-200 relative w-full shadow-sm">
    <!-- Premium Header Gradient -->
    <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent -z-10"></div>

    <div class="p-8 lg:p-12">
      <!-- Header Area -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-gray-100">
        <div class="space-y-1">
          <h2 class="text-3xl  text-gray-900 tracking-tight italic">Elite Airport Transfers</h2>
          <p class="text-xs font-bold text-gray-400 tracking-widest uppercase">Private & shared airport transfers from live provider networks</p>
        </div>
        
        <div class="flex items-center space-x-6">
          <label class="flex items-center space-x-3 cursor-pointer group">
            <div class="relative w-12 h-6 bg-gray-200 rounded-full transition-colors group-hover:bg-gray-300" :class="roundTrip ? 'bg-primary' : ''">
              <input type="checkbox" v-model="roundTrip" class="sr-only" />
              <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" :class="roundTrip ? 'translate-x-6' : ''"></div>
            </div>
            <span class="text-xs  text-gray-500 tracking-widest uppercase group-hover:text-primary transition-colors">Book Roundtrip</span>
          </label>
        </div>
      </div>

      <!-- Search Inputs Grid -->
      <div class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          <!-- Airport Input -->
          <div class="lg:col-span-6 relative" ref="airportContainerRef">
            <AnimatedInput 
              v-model="airportQuery" 
              label="Departure Airport" 
              :icon="MapPinIcon"
              @focus="airportOpen = true"
            />
            <!-- Suggestions Dropdown -->
            <Transition name="slide-up">
              <div v-if="airportOpen && filteredAirports.length" class="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 shadow-2xl rounded-[2rem] z-[9999] max-h-[400px] overflow-y-auto p-3 animate-in fade-in slide-in-from-top-4">
                <button 
                  v-for="airport in filteredAirports" :key="airport.code"
                  @click="selectAirport(airport)"
                  class="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group border border-transparent hover:border-gray-100 mb-1"
                >
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <MapPinIcon class="h-6 w-6" />
                    </div>
                    <div class="text-left">
                      <p class="text-sm  text-gray-900 group-hover:text-primary transition-colors">{{ airport.city }}</p>
                      <p class="text-[10px] font-bold text-gray-400">{{ airport.name }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="px-2 py-1 bg-gray-100 rounded text-[10px]  text-gray-500 group-hover:bg-primary group-hover:text-white transition-colors">{{ airport.code }}</span>
                  </div>
                </button>
              </div>
            </Transition>
          </div>

          <!-- Property Name Input -->
          <div class="lg:col-span-6">
             <AnimatedInput v-model="propertyName" label="Destination Property / Hotel" :icon="BuildingOffice2Icon" />
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <AnimatedInput v-model="arrivalDate" label="Arrival date" type="date" :icon="CalendarIcon" />
          <AnimatedInput v-model="arrivalTime" label="Arrival time" type="time" :icon="ClockIcon" />
          <AnimatedInput v-model="travelers" label="Travelers" type="number" :icon="UserIcon" />
        </div>
      </div>

      <!-- Bottom Actions -->
      <div class="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-8 border-t border-gray-100">
        <div class="flex items-center space-x-6 text-xs  tracking-widest text-gray-500 uppercase">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"></div>
            <span>Meet & Greet Included</span>
          </div>
           <div class="flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"></div>
            <span>60min Free Waiting</span>
          </div>
        </div>

        <BaseButton 
          @click="handleSearch" 
          :loading="isSearching" 
          variant="primary" 
          size="lg" 
          class="px-12 h-[58px] rounded-[1.5rem]  tracking-[0.2em] text-xs shadow-2xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all"
        >
          <MagnifyingGlassIcon class="h-5 w-5 mr-3" />
          SEARCH TRANSFERS
        </BaseButton>
      </div>
    </div>

    <!-- Results Section -->
    <Transition name="fade">
      <div v-if="transferResults.length > 0" class="border-t border-gray-200 bg-gray-50/50 p-8 lg:p-12">
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-xl  text-gray-900 tracking-tight italic">Recommended Transfers</h3>
        </div>
        
        <div class="space-y-4">
          <div
            v-for="transfer in transferResults"
            :key="transfer.id"
            class="bg-white border border-gray-200 rounded-[2.5rem] p-8 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-10"
          >
             <div class="flex items-center space-x-8 flex-1">
              <div class="w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all duration-700 group-hover:rotate-12 group-hover:scale-110 shadow-lg"
                :class="transfer.type === 'PRIVATE' ? 'bg-primary-dark text-white' : 'bg-secondary text-white'"
              >
                <ArrowsRightLeftIcon class="h-10 w-10 sticky" />
              </div>
              
              <div class="flex-1 space-y-4">
                <div>
                  <h4 class="text-2xl  text-gray-900 tracking-tight italic group-hover:text-primary transition-colors">{{ transfer.vehicle }}</h4>
                  <div class="flex items-center gap-3 mt-1 uppercase tracking-widest text-[10px] ">
                    <span :class="transfer.type === 'PRIVATE' ? 'text-primary' : 'text-secondary'">{{ transfer.type }}</span>
                    <span class="text-gray-200">•</span>
                    <span class="text-gray-400">{{ transfer.duration }}</span>
                    <span class="text-gray-200">•</span>
                    <span class="text-gray-400">{{ transfer.passengers }} passengers</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between lg:flex-col lg:items-end lg:justify-center border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-10 shrink-0 space-y-2">
              <div class="text-left lg:text-right">
                <p class="text-[10px]  text-gray-400 uppercase tracking-widest">Fixed Price</p>
                <p class="text-4xl  text-primary-dark tracking-tighter">${{ transfer.price }}</p>
              </div>
              <BaseButton variant="primary" class="rounded-xl px-10 h-12 text-[10px]  tracking-widest shadow-lg active:scale-95 transition-all uppercase">BOOK NOW</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTransfers } from '~/composables/modules/transfers/useTransfers'
import { onClickOutside } from '@vueuse/core'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'
import { 
  MapPinIcon, 
  BuildingOffice2Icon, 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  ArrowsRightLeftIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon 
} from '@heroicons/vue/24/outline'

const { airports, transferResults, isSearching, searchTransfers } = useTransfers()

const airportQuery = ref('')
const selectedAirport = ref('')
const airportOpen = ref(false)

const propertyName = ref('')
const arrivalDate = ref('')
const arrivalTime = ref('10:30 AM')
const travelers = ref(2)
const roundTrip = ref(false)

const hasSearched = ref(false)

const airportContainerRef = ref(null)

onClickOutside(airportContainerRef, () => airportOpen.value = false)

const filteredAirports = computed(() => {
  if (!airportQuery.value) return airports
  const lower = airportQuery.value.toLowerCase()
  return airports.filter((a: any) => 
    a.city.toLowerCase().includes(lower) || 
    a.code.toLowerCase().includes(lower) || 
    a.name.toLowerCase().includes(lower)
  )
})

const selectAirport = (airport: any) => {
  airportQuery.value = `${airport.city} (${airport.code})`
  selectedAirport.value = airport.code
  airportOpen.value = false
}

const handleSearch = () => {
  if (!selectedAirport.value || !arrivalDate.value) return
  hasSearched.value = true

  // Build ISO datetime from date + time
  const timeParts = arrivalTime.value.match(/(\d+):(\d+)\s*(AM|PM)/i)
  let hour = 10
  let minute = '00'
  let ampm = 'AM'
  if (timeParts && timeParts[1] && timeParts[2] && timeParts[3]) {
    hour = parseInt(timeParts[1])
    minute = timeParts[2]
    ampm = timeParts[3].toUpperCase()
  }
  if (ampm === 'PM' && hour !== 12) hour += 12
  if (ampm === 'AM' && hour === 12) hour = 0
  const startDateTime = `${arrivalDate.value}T${String(hour).padStart(2, '0')}:${minute}:00`

  searchTransfers({
    startLocationCode: selectedAirport.value,
    endAddressLine: propertyName.value || undefined,
    endCityName: undefined,
    startDateTime,
    passengers: travelers.value,
    roundTrip: roundTrip.value,
  })
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
