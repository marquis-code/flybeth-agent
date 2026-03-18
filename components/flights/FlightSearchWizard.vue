<template>
  <div class="bg-white rounded-[2rem] border border-neutral-200 shadow-xl shadow-neutral-200/50 overflow-hidden isolate relative w-full">
    <!-- Decorative subtle gradient bg -->
    <div class="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 -z-10"></div>
    
    <div class="p-8 lg:p-10">
      <!-- Header & Trip Type -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 class="text-2xl font-serif font-black text-primary-dark tracking-tight">Search global inventory</h2>
          <p class="text-xs text-neutral-500 font-medium mt-1">Live rates from Amadeus & Duffel providers</p>
        </div>
        
        <div class="flex items-center p-1 bg-neutral-100 rounded-xl w-fit">
          <button 
            @click="tripType = 'round'" 
            class="px-5 py-2 text-sm font-black tracking-wider rounded-lg transition-all text-neutral-500 hover:text-primary-dark"
            :class="tripType === 'round' ? 'bg-white shadow-sm text-primary-dark' : ''"
          >
            Round trip
          </button>
          <button 
            @click="tripType = 'oneway'" 
            class="px-5 py-2 text-sm font-black tracking-wider rounded-lg transition-all text-neutral-500 hover:text-primary-dark"
            :class="tripType === 'oneway' ? 'bg-white shadow-sm text-primary-dark' : ''"
          >
            One way
          </button>
        </div>
      </div>

      <!-- Search Inputs Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 relative">
        
        <!-- Origin Input with Dropdown -->
        <div class="md:col-span-3 relative" ref="originContainerRef">
          <label class="block text-sm font-black tracking-widest text-neutral-400 mb-2">Origin</label>
          <div class="relative bg-neutral-50 border border-neutral-200 rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">
              <AirplaneIcon class="h-4 w-4" />
            </span>
            <input 
              v-model="originQuery"
              @focus="originOpen = true"
              ref="originInputRef"
              type="text" 
              placeholder="City or airport code" 
              class="w-full bg-transparent pl-12 pr-4 py-4 text-sm font-bold text-gray-900 outline-none placeholder:font-medium placeholder:text-neutral-400"
            />
          </div>
          <!-- Origin Dropdown -->
          <div v-if="originOpen && filteredOrigin.length" class="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-100 shadow-2xl rounded-xl z-50 max-h-60 overflow-y-auto">
            <button 
              v-for="airport in filteredOrigin" 
              :key="airport.code"
              @click="selectOrigin(airport)"
              class="w-full text-left px-4 py-3 hover:bg-neutral-50 border-b border-neutral-50 last:border-0 transition-colors flex items-center justify-between group"
            >
              <div>
                <p class="text-sm font-bold text-gray-900 group-hover:text-primary">{{ airport.city }}</p>
                <p class="text-sm font-medium text-neutral-400 mt-0.5">{{ airport.name }}</p>
              </div>
              <span class="text-xs font-black text-neutral-300 bg-neutral-100 px-2 py-1 rounded-md">{{ airport.code }}</span>
            </button>
          </div>
        </div>

        <!-- Destination Input with Dropdown -->
        <div class="md:col-span-3 relative" ref="destContainerRef">
          <label class="block text-sm font-black tracking-widest text-neutral-400 mb-2">Destination</label>
          <div class="relative bg-neutral-50 border border-neutral-200 rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">
              <MapPinIcon class="h-4 w-4" />
            </span>
            <input 
              v-model="destQuery"
              @focus="destOpen = true"
              ref="destInputRef"
              type="text" 
              placeholder="City or airport code" 
              class="w-full bg-transparent pl-12 pr-4 py-4 text-sm font-bold text-gray-900 outline-none placeholder:font-medium placeholder:text-neutral-400"
            />
          </div>
          <!-- Dest Dropdown -->
          <div v-if="destOpen && filteredDest.length" class="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-100 shadow-2xl rounded-xl z-50 max-h-60 overflow-y-auto">
            <button 
              v-for="airport in filteredDest" 
              :key="airport.code"
              @click="selectDest(airport)"
              class="w-full text-left px-4 py-3 hover:bg-neutral-50 border-b border-neutral-50 last:border-0 transition-colors flex items-center justify-between group"
            >
              <div>
                <p class="text-sm font-bold text-gray-900 group-hover:text-secondary">{{ airport.city }}</p>
                <p class="text-sm font-medium text-neutral-400 mt-0.5">{{ airport.name }}</p>
              </div>
              <span class="text-xs font-black text-neutral-300 bg-neutral-100 px-2 py-1 rounded-md">{{ airport.code }}</span>
            </button>
          </div>
        </div>

        <!-- Dates -->
        <div class="md:col-span-3">
          <label class="block text-sm font-black tracking-widest text-neutral-400 mb-2">Dates</label>
          <div class="flex items-center bg-neutral-50 border border-neutral-200 rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all overflow-hidden h-[54px] px-4 gap-2">
            <CalendarIcon class="h-4 w-4 text-neutral-400 shrink-0" />
            <input 
              v-model="departureDate"
              ref="dateInputRef"
              type="date" 
              class="w-full bg-transparent text-sm font-bold text-gray-900 outline-none placeholder:font-medium placeholder:text-neutral-400 cursor-pointer"
            />
            <span class="text-neutral-300 pointer-events-none" v-if="tripType === 'round'">-</span>
            <input 
              v-if="tripType === 'round'"
              v-model="returnDate"
              type="date" 
              class="w-full bg-transparent text-sm font-bold text-gray-900 outline-none placeholder:font-medium placeholder:text-neutral-400 cursor-pointer"
            />
          </div>
        </div>

        <!-- Passengers & CTA -->
        <div class="md:col-span-3 flex items-end gap-3">
          <div class="w-1/3">
            <label class="text-sm font-black tracking-widest text-neutral-400 mb-2 flex items-center gap-1"><UserIcon class="h-3 w-3"/> Pax</label>
            <div class="bg-neutral-50 border border-neutral-200 rounded-xl h-[54px] flex items-center px-4">
              <input v-model.number="passengers" type="number" min="1" max="9" class="w-full bg-transparent text-sm font-bold text-gray-900 outline-none text-center" />
            </div>
          </div>
          <div class="w-2/3">
            <BaseButton @click="handleSearch" :loading="isSearching" variant="primary" size="lg" class="w-full h-[54px] text-xs shadow-xl shadow-primary/20 hover:scale-[1.02]">
              Search
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Render Results -->
    <div v-if="flightResults.length > 0" class="border-t border-neutral-100 bg-neutral-50 p-8 lg:p-10">
      <h3 class="text-lg font-serif font-black text-gray-900 mb-6 flex items-center gap-3">
        <SparklesIcon class="h-5 w-5 text-secondary" />
        Available flights
      </h3>
      <div class="space-y-4">
        <div 
          v-for="flight in flightResults" 
          :key="flight.id" 
          class="bg-white border border-neutral-200 rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
        >
          <div class="flex items-center gap-6 flex-1">
            <div class="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors">
              <span class="text-sm font-black text-neutral-400 group-hover:text-primary">{{ flight.airline.substring(0,3) }}</span>
            </div>
            <div class="flex-1 grid grid-cols-3 gap-4 items-center">
              <div>
                <p class="text-xl font-bold text-gray-900">{{ flight.departureTime }}</p>
                <p class="text-xs font-black tracking-wider text-neutral-400 mt-1">{{ flight.origin }}</p>
              </div>
              <div class="flex flex-col items-center justify-center px-4">
                <p class="text-[9px] font-black tracking-widest text-neutral-300 mb-1 border-b border-neutral-200 w-full text-center pb-1">Direct</p>
                <p class="text-sm font-bold text-secondary">{{ flight.airline }} {{ flight.flightNumber }}</p>
              </div>
              <div class="text-right">
                <p class="text-xl font-bold text-gray-900">{{ flight.arrivalTime }}</p>
                <p class="text-xs font-black tracking-wider text-neutral-400 mt-1">{{ flight.destination }}</p>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between md:flex-col md:items-end md:justify-center border-t border-neutral-100 md:border-t-0 md:border-l md:pl-6 pt-4 md:pt-0 shrink-0">
            <p class="text-2xl font-serif font-black text-primary-dark mb-2">${{ flight.price.toFixed(2) }}</p>
            <div class="flex items-center gap-2">
              <span class="text-[9px] font-black tracking-wider text-neutral-400 bg-neutral-100 px-2 py-1 rounded-md">via {{ flight.provider }}</span>
              <BaseButton size="sm" variant="outline" class="border-primary/20 text-primary hover:bg-primary hover:text-white">Select</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useFlights } from '~/composables/modules/flights/useFlights'
import { onClickOutside } from '@vueuse/core'
// Icons
import { PaperAirplaneIcon as AirplaneIcon, MapPinIcon, CalendarIcon, UserIcon, SparklesIcon } from '@heroicons/vue/24/outline'

const { majorAirports, flightResults, isSearching, searchFlights } = useFlights()

const tripType = ref('round')
const originQuery = ref('')
const selectedOrigin = ref('')
const originOpen = ref(false)

const destQuery = ref('')
const selectedDest = ref('')
const destOpen = ref(false)

const departureDate = ref('')
const returnDate = ref('')
const passengers = ref(1)

const originInputRef = ref<HTMLInputElement | null>(null)
const destInputRef = ref<HTMLInputElement | null>(null)
const dateInputRef = ref<HTMLInputElement | null>(null)

const originContainerRef = ref(null)
const destContainerRef = ref(null)

// Smart close on outside click
onClickOutside(originContainerRef, () => originOpen.value = false)
onClickOutside(destContainerRef, () => destOpen.value = false)

// Computed Filters
const filteredOrigin = computed(() => {
  if (!originQuery.value) return majorAirports
  const lower = originQuery.value.toLowerCase()
  return majorAirports.filter(a => a.city.toLowerCase().includes(lower) || a.code.toLowerCase().includes(lower) || a.name.toLowerCase().includes(lower))
})

const filteredDest = computed(() => {
  if (!destQuery.value) return majorAirports
  const lower = destQuery.value.toLowerCase()
  return majorAirports.filter(a => a.city.toLowerCase().includes(lower) || a.code.toLowerCase().includes(lower) || a.name.toLowerCase().includes(lower))
})

// Auto-Advance Handlers
const selectOrigin = (airport: any) => {
  originQuery.value = `${airport.city} (${airport.code})`
  selectedOrigin.value = airport.code
  originOpen.value = false
  // Instantly slide focus to destination for seamless wizard UX
  setTimeout(() => {
    destInputRef.value?.focus()
  }, 50)
}

const selectDest = (airport: any) => {
  destQuery.value = `${airport.city} (${airport.code})`
  selectedDest.value = airport.code
  destOpen.value = false
  // Instantly slide focus to dates
  setTimeout(() => {
    dateInputRef.value?.focus()
    // HTML5 date inputs can't be programmatically 'opened', but focusing them is standard semantic progression.
  }, 50)
}

const handleSearch = () => {
  if (!selectedOrigin.value || !selectedDest.value || !departureDate.value) return
  searchFlights({
    origin: selectedOrigin.value,
    destination: selectedDest.value,
    departureDate: departureDate.value,
    returnDate: tripType.value === 'round' ? returnDate.value : undefined,
    adults: passengers.value
  })
}
</script>
