<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="fixed inset-0 z-[9998] bg-[#F8FAFC] flex flex-col overflow-hidden">
        
        <!-- Header: Search Summary & Controls -->
        <header class="bg-white border-b border-gray-100 px-6 lg:px-10 py-3.5 shrink-0 z-30 shadow-sm">
          <div class="max-w-[1400px] mx-auto flex items-center justify-between">
            <div class="flex items-center gap-4">
              <button @click="$emit('close')" class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-800 hover:text-rose-500 hover:bg-rose-50 transition-all group">
                <ChevronLeft class="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              </button>
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="text-sm lg:text-sm  text-gray-900  lowercase first-letter:uppercase">{{ query.origin }} to {{ query.destination }}</h2>
                  <div class="px-2 py-0.5 bg-primary/10 text-primary text-sm  rounded-full uppercase ">Live</div>
                </div>
                <p class="text-sm font-medium text-gray-800 uppercase  mt-0.5">
                  {{ formatDate(query.departureDate) }} • {{ query.adults }} Traveler(s) • {{ query.cabinClass }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                <Sparkles class="h-3.5 w-3.5 text-primary" />
                <span class="text-sm  text-gray-900 uppercase ">{{ results.length }} Matches</span>
              </div>
              <button @click="$emit('close')" class="lg:hidden w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-800">
                <Filter class="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <!-- Main Body: Sidebar + Results -->
        <div class="flex-1 overflow-hidden flex flex-col lg:flex-row relative">
          
          <!-- Filters Sidebar (Fixed) -->
          <aside class="hidden lg:block w-[280px] border-r border-gray-50 bg-white p-7 overflow-y-auto no-scrollbar shrink-0">
            <div class="space-y-8">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold text-gray-800 uppercase ">Refine Search</h3>
                <button @click="resetFilters" class="text-sm  text-primary uppercase  hover:underline">Clear All</button>
              </div>

              <!-- Stops -->
              <div class="space-y-4">
                <label class="text-sm  text-gray-900 uppercase ">Flight Stops</label>
                <div class="space-y-3">
                  <label v-for="stopIdx in [0, 1, 2]" :key="stopIdx" class="flex items-center gap-3 cursor-pointer group" @click="toggleStopFilter(stopIdx)">
                    <div 
                      class="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all"
                      :class="activeFilters.stops.includes(stopIdx) ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'bg-white border-gray-100 group-hover:border-primary/40'"
                    >
                      <Check v-if="activeFilters.stops.includes(stopIdx)" class="h-3 w-3 text-white" />
                    </div>
                    <span class="text-sm font-bold text-gray-800 group-hover:text-gray-900 transition-colors uppercase">
                      {{ stopIdx === 0 ? 'Non-stop' : `${stopIdx} Stop${stopIdx > 1 ? 's' : ''}` }}
                    </span>
                  </label>
                </div>
              </div>

              <!-- Airlines -->
              <div class="space-y-4">
                <label class="text-sm  text-gray-900 uppercase ">Preferred Airlines</label>
                <div class="space-y-3 max-h-[250px] overflow-y-auto pr-2 no-scrollbar">
                  <label v-for="airline in uniqueAirlines" :key="airline" class="flex items-center gap-3 cursor-pointer group" @click="toggleAirlineFilter(airline)">
                    <div 
                      class="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all"
                      :class="activeFilters.airlines.includes(airline) ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'bg-white border-gray-100 group-hover:border-primary/40'"
                    >
                      <Check v-if="activeFilters.airlines.includes(airline)" class="h-3 w-3 text-white" />
                    </div>
                    <span class="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors uppercase truncate">{{ airline }}</span>
                  </label>
                </div>
              </div>

              <!-- Price Slider -->
              <div class="space-y-5">
                <label class="text-sm  text-gray-900 uppercase ">Price Limit</label>
                <div class="space-y-4">
                  <input 
                    type="range" 
                    v-model="activeFilters.maxPrice" 
                    :min="minPrice" 
                    :max="maxPrice" 
                    class="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div class="flex justify-between items-center px-1">
                    <span class="text-sm  text-gray-900">${{ minPrice }}</span>
                    <div class="px-3 py-1.5 bg-primary/5 rounded-lg border border-primary/10">
                      <span class="text-sm  text-primary">${{ activeFilters.maxPrice }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Protection Overlay -->
               <div class="bg-neutral-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group mt-10">
                  <div class="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full translate-x-12 -translate-y-12 blur-2xl"></div>
                  <h4 class="text-sm  uppercase  text-white/80 mb-4">Agent Tip</h4>
                  <p class="text-sm font-bold leading-relaxed">Book with 'Secure Settlement' to guarantee pricing for 24 hours.</p>
               </div>
            </div>
          </aside>

          <!-- Results Scroll Area -->
          <main class="flex-1 overflow-y-auto bg-[#F8FAFC] custom-scrollbar p-6 lg:p-8">
            <div class="max-w-[900px] mx-auto space-y-6 pb-20">
              <div v-if="filteredResults.length > 0" class="flex items-center justify-between px-2">
                 <p class="text-sm font-semibold text-gray-800 uppercase ">{{ filteredResults.length }} Results Found</p>
                 <div class="flex items-center gap-2 text-sm  text-primary uppercase ">
                    Sorted by: Best Value
                 </div>
              </div>

              <div class="grid grid-cols-1 gap-5">
                <FlightOfferCard 
                  v-for="(offer, idx) in filteredResults" 
                  :key="idx" 
                  :offer="offer" 
                  @select="(o) => $emit('select', o)"
                />
              </div>

              <!-- Empty State in Modal -->
              <div v-if="filteredResults.length === 0" class="py-32 text-center bg-white border border-gray-100 rounded-[3rem] shadow-sm">
                <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Search class="h-10 w-10 text-gray-600" />
                </div>
                <h4 class="text-sm  text-gray-900 uppercase ">No Matches Found</h4>
                <p class="text-sm text-gray-800 mt-3 font-bold px-12">Adjust your filters to see more available departures for this route.</p>
                <button @click="resetFilters" class="mt-10 px-8 py-4 bg-primary text-white rounded-2xl  text-sm uppercase  shadow-lg shadow-primary/20">Reset All Filters</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { 
  ChevronLeft, Filter, Search, Sparkles, Check
} from 'lucide-vue-next'
import FlightOfferCard from './FlightOfferCard.vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  results: { type: Array as () => any[], default: () => [] },
  query: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['close', 'select'])

const activeFilters = reactive({
  stops: [] as number[],
  airlines: [] as string[],
  maxPrice: 10000
})

const uniqueAirlines = computed(() => {
  const airlines = props.results.map(o => o.airline)
  return [...new Set(airlines)]
})

const minPrice = computed(() => {
  if (props.results.length === 0) return 0
  return Math.min(...props.results.map(o => o.priceWithCommission))
})

const maxPrice = computed(() => {
  if (props.results.length === 0) return 10000
  return Math.max(...props.results.map(o => o.priceWithCommission))
})

watch(() => props.results, (newVal) => {
  if (newVal.length > 0) {
    activeFilters.maxPrice = maxPrice.value
  }
}, { immediate: true })

const toggleStopFilter = (stop: number) => {
  const idx = activeFilters.stops.indexOf(stop)
  if (idx > -1) activeFilters.stops.splice(idx, 1)
  else activeFilters.stops.push(stop)
}

const toggleAirlineFilter = (airline: string) => {
  const idx = activeFilters.airlines.indexOf(airline)
  if (idx > -1) activeFilters.airlines.splice(idx, 1)
  else activeFilters.airlines.push(airline)
}

const resetFilters = () => {
  activeFilters.stops = []
  activeFilters.airlines = []
  activeFilters.maxPrice = maxPrice.value
}

const filteredResults = computed(() => {
  return props.results.filter(offer => {
    const matchStop = activeFilters.stops.length === 0 || activeFilters.stops.includes(offer.stops)
    const matchAirline = activeFilters.airlines.length === 0 || activeFilters.airlines.includes(offer.airline)
    const matchPrice = offer.priceWithCommission <= activeFilters.maxPrice
    return matchStop && matchAirline && matchPrice
  })
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-fade-enter-from { opacity: 0; transform: translateY(100%); }
.modal-fade-leave-to { opacity: 0; transform: translateY(100%); }

.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
