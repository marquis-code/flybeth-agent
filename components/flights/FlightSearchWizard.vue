<template>
  <div class="bg-white rounded-[2.5rem] border border-gray-200 relative w-full shadow-sm">
    <!-- Premium Header Gradient -->
    <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent -z-10"></div>

    <div class="p-8 lg:p-12">
      <!-- Trip Type & Travelers Header -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-gray-100">
        <div class="flex items-center p-1 bg-gray-50 rounded-full w-fit border border-gray-200">
          <button 
            v-for="type in tripTypes" 
            :key="type.id"
            @click="tripType = type.id"
            class="px-6 py-2.5 rounded-full text-xs  tracking-widest transition-all duration-300"
            :class="tripType === type.id ? 'bg-primary-dark text-white shadow-lg' : 'text-gray-500 hover:text-primary'"
          >
            {{ type.label.toUpperCase() }}
          </button>
        </div>

        <div class="flex items-center space-x-6">
          <!-- Travelers Selector -->
          <div class="relative" ref="travelerPopoverRef">
            <button 
              @click="showTravelers = !showTravelers"
              class="flex items-center space-x-3 px-5 py-3 bg-white border border-gray-200 rounded-2xl hover:border-primary transition-all group h-[58px]"
            >
              <UsersIcon class="h-5 w-5 text-gray-400 group-hover:text-primary" />
              <span class="text-sm font-bold text-gray-900">{{ totalTravelers }} Traveler{{ totalTravelers > 1 ? 's' : '' }}</span>
              <ChevronDownIcon class="h-4 w-4 text-gray-400 transition-transform" :class="showTravelers ? 'rotate-180' : ''" />
            </button>
            <!-- Travelers Dropdown -->
            <Transition name="slide-up">
              <div v-if="showTravelers" class="absolute top-full right-0 mt-3 w-80 bg-white border border-gray-200 shadow-2xl rounded-[2rem] z-[100] p-8 space-y-8 animate-in fade-in slide-in-from-top-4">
                <div v-for="cat in travelerCategories" :key="cat.id" class="flex items-center justify-between">
                  <div>
                    <p class="text-sm  text-gray-900">{{ cat.label }}</p>
                    <p class="text-[10px] font-bold text-gray-400 mt-0.5">{{ cat.description }}</p>
                  </div>
                  <div class="flex items-center space-x-4">
                    <button @click="updateTravelerCount(cat.id, -1)" class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-20 transition-all">-</button>
                    <span class="text-lg  w-6 text-center">{{ travelerCounts[cat.id as keyof typeof travelerCounts] }}</span>
                    <button @click="updateTravelerCount(cat.id, 1)" class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">+</button>
                  </div>
                </div>
                <BaseButton @click="showTravelers = false" variant="primary" block class="rounded-xl h-12">Apply</BaseButton>
              </div>
            </Transition>
          </div>

          <!-- Cabin Selector -->
          <div class="relative" ref="cabinRef">
            <button 
              @click="showCabin = !showCabin"
              class="flex items-center space-x-3 px-5 py-2.5 bg-white border border-gray-200 rounded-2xl hover:border-primary transition-all group h-[58px]"
            >
              <SparklesIcon class="h-5 w-5 text-gray-400 group-hover:text-primary" />
              <span class="text-sm font-bold text-gray-900">{{ activeCabinLabel }}</span>
              <ChevronDownIcon class="h-4 w-4 text-gray-400 transition-transform" :class="showCabin ? 'rotate-180' : ''" />
            </button>
            <!-- Cabin Dropdown -->
            <Transition name="slide-up">
              <div v-if="showCabin" class="absolute top-full right-0 mt-3 w-56 bg-white border border-gray-200 shadow-2xl rounded-[1.5rem] z-[9999] overflow-hidden p-2">
                <button 
                  v-for="cab in cabinClasses" :key="cab.id" 
                  @click="selectCabin(cab)"
                  class="w-full text-left px-5 py-3.5 text-xs  tracking-widest rounded-xl transition-all"
                  :class="cabinClass === cab.id ? 'bg-primary-dark text-white' : 'text-gray-500 hover:bg-gray-50'"
                >
                  {{ cab.label.toUpperCase() }}
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Search Inputs Grid -->
      <div class="space-y-6">
        <div 
          v-for="(leg, index) in flightLegs" 
          :key="index"
          class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end relative"
        >
          <div v-if="tripType === 'multi'" class="lg:col-span-12 mb-2">
            <div class="flex items-center justify-between">
              <h4 class="text-[10px]  text-primary uppercase tracking-[0.2em]">Flight {{ index + 1 }}</h4>
              <button v-if="flightLegs.length > 1" @click="removeLeg(index)" class="text-[10px]  text-red-500 uppercase tracking-widest hover:underline">Remove</button>
            </div>
          </div>

          <!-- Origin -->
          <div class="lg:col-span-4 relative" :ref="el => originRefs[index] = el">
            <AnimatedInput 
              v-model="leg.originQuery" 
              label="Leaving from" 
              :icon="MapPinIcon"
              @input="handleAirportSearch(leg.originQuery)"
              @focus="openOrigin(index)"
            />
            <!-- Suggestions Dropdown -->
            <div v-if="activeLeg === index && activeSide === 'origin'" class="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 shadow-2xl rounded-[2rem] z-[9999] max-h-[400px] overflow-y-auto p-3 animate-in fade-in slide-in-from-top-4">
              <div v-if="!airportResults.length" class="p-8 text-center space-y-4">
                <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                  <MagnifyingGlassIcon class="h-8 w-8 text-gray-300" />
                </div>
                <p class="text-sm font-bold text-gray-400">Search by city or airport</p>
              </div>
              <button 
                v-else
                v-for="airport in airportResults" :key="airport.iataCode"
                @click="selectAirport(index, 'origin', airport)"
                class="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group border border-transparent hover:border-gray-100 mb-1"
              >
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <PaperAirplaneIcon class="h-6 w-6" />
                  </div>
                  <div class="text-left">
                    <p class="text-sm  text-gray-900 group-hover:text-primary transition-colors">{{ airport.address?.cityName }}, {{ airport.address?.countryName }}</p>
                    <p class="text-[10px] font-bold text-gray-400">{{ airport.name }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="px-2 py-1 bg-gray-100 rounded text-[10px]  text-gray-500 group-hover:bg-primary group-hover:text-white transition-colors">{{ airport.iataCode }}</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Swap Button (desktop) -->
          <div v-if="tripType !== 'multi'" class="hidden lg:flex lg:col-span-1 justify-center -mx-5 pb-5 z-20">
            <button @click="swapLocations" class="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary hover:scale-110 shadow-lg transition-all">
              <ArrowsRightLeftIcon class="h-5 w-5" />
            </button>
          </div>

          <!-- Destination -->
          <div class="lg:col-span-4 relative" :ref="el => destRefs[index] = el">
            <AnimatedInput 
              v-model="leg.destQuery" 
              label="Going to" 
              :icon="MapPinIcon"
              @input="handleAirportSearch(leg.destQuery)"
              @focus="openDest(index)"
            />
            <!-- Suggestions Dropdown -->
            <div v-if="activeLeg === index && activeSide === 'dest'" class="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 shadow-2xl rounded-[2rem] z-[9999] max-h-[400px] overflow-y-auto p-3 animate-in fade-in slide-in-from-top-4">
              <div v-if="!airportResults.length" class="p-8 text-center space-y-4">
                <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                  <MagnifyingGlassIcon class="h-8 w-8 text-gray-300" />
                </div>
                <p class="text-sm font-bold text-gray-400">Search by city or airport</p>
              </div>
              <button 
                v-else
                v-for="airport in airportResults" :key="airport.iataCode"
                @click="selectAirport(index, 'dest', airport)"
                class="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group border border-transparent hover:border-gray-100 mb-1"
              >
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                    <PaperAirplaneIcon class="h-6 w-6" />
                  </div>
                  <div class="text-left">
                    <p class="text-sm  text-gray-900 group-hover:text-secondary transition-colors">{{ airport.address?.cityName }}, {{ airport.address?.countryName }}</p>
                    <p class="text-[10px] font-bold text-gray-400">{{ airport.name }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="px-2 py-1 bg-gray-100 rounded text-[10px]  text-gray-500 group-hover:bg-secondary group-hover:text-white transition-colors">{{ airport.iataCode }}</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Dates -->
          <div :class="tripType === 'round' ? 'lg:col-span-3' : 'lg:col-span-3'">
            <div v-if="tripType === 'round' && index === 0" class="w-full">
              <DateRangePicker 
                v-model="dateRange"
              />
            </div>
            <div v-else class="grid grid-cols-1 gap-3">
              <AnimatedInput v-model="leg.departureDate" label="Depart" type="date" :icon="CalendarIcon" />
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Actions -->
      <div class="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-8 border-t border-gray-100">
        <button 
          v-if="tripType === 'multi' && flightLegs.length < 5"
          @click="addLeg"
          class="flex items-center space-x-3 text-xs  tracking-[0.2em] text-primary hover:text-primary-dark transition-all group"
        >
          <div class="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <PlusIcon class="h-4 w-4" />
          </div>
          <span>ADD ANOTHER FLIGHT</span>
        </button>
        <div v-else></div>

        <BaseButton 
          @click="handleSearch" 
          :loading="isSearching" 
          variant="primary" 
          size="lg" 
          class="px-12 h-[58px] rounded-[1.5rem]  tracking-[0.2em] text-xs shadow-2xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all"
        >
          <MagnifyingGlassIcon class="h-5 w-5 mr-3" />
          SEARCH FLIGHTS
        </BaseButton>
      </div>
    </div>

    <!-- Results Section -->
    <Transition name="fade">
      <div v-if="flightResults.length > 0" class="border-t border-gray-200 bg-gray-50/50 p-8 lg:p-12">
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-xl  text-gray-900 tracking-tight">Available Departures</h3>
          <div class="flex items-center space-x-2 text-xs font-bold text-gray-500">
            <span>Sorted by</span>
            <span class="text-primary ">Best value</span>
          </div>
        </div>
        
        <div class="space-y-4">
          <div 
            v-for="flight in flightResults" 
            :key="flight.id" 
            class="bg-white border border-gray-200 rounded-[2rem] p-8 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group relative overflow-hidden"
          >
            <!-- Badge -->
            <div class="absolute top-0 right-10 px-4 py-1.5 bg-secondary text-[8px]  text-white rounded-b-xl tracking-widest uppercase shadow-sm">Cheapest</div>

            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div class="flex items-center space-x-8 flex-1">
                <div class="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center p-4 border border-gray-100 group-hover:border-primary/20 transition-colors">
                  <img :src="`https://ui-avatars.com/api/?name=${flight.airline}&background=random&bold=true&color=fff&rounded=true`" class="w-full h-full object-contain" />
                </div>
                
                <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div class="text-left">
                    <p class="text-2xl  text-gray-900">{{ flight.departureTime || '09:00' }}</p>
                    <p class="text-[10px]  tracking-[0.2em] text-gray-400 mt-1 uppercase">{{ flight.origin || 'ABC' }}</p>
                  </div>
                  
                  <div class="flex flex-col items-center justify-center relative">
                    <p class="text-[9px]  tracking-[0.3em] text-gray-300 uppercase mb-4">6h 45m • Direct</p>
                    <div class="w-full h-px bg-gray-100 relative mb-4">
                      <div class="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-gray-200 bg-white"></div>
                      <div class="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-gray-200 bg-white"></div>
                      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                        <PaperAirplaneIcon class="h-4 w-4 text-primary group-hover:translate-x-10 transition-transform duration-1000" />
                      </div>
                    </div>
                    <p class="text-[10px] font-bold text-gray-400">{{ flight.airline }} {{ flight.flightNumber }}</p>
                  </div>

                  <div class="text-right">
                    <p class="text-2xl  text-gray-900">{{ flight.arrivalTime || '15:45' }}</p>
                    <p class="text-[10px]  tracking-[0.2em] text-gray-400 mt-1 uppercase">{{ flight.destination || 'XYZ' }}</p>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between lg:flex-col lg:items-end lg:justify-center border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-10 shrink-0 space-y-2">
                <div class="text-left lg:text-right">
                  <p class="text-sm font-bold text-gray-400 line-through">${{ (flight.price * 1.2).toFixed(2) }}</p>
                  <p class="text-4xl  text-primary-dark tracking-tighter">${{ flight.price?.toFixed(2) }}</p>
                </div>
                <BaseButton variant="primary" class="rounded-xl px-8 h-12 text-[10px]  tracking-widest shadow-lg active:scale-95 transition-all">SELECT FLIGHT</BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useFlights } from '~/composables/modules/flights/useFlights'
import { onClickOutside } from '@vueuse/core'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'
import DateRangePicker from '@/components/ui/DateRangePicker.vue'
import { 
  MapPinIcon, 
  CalendarIcon, 
  SparklesIcon, 
  ChevronDownIcon, 
  MinusIcon, 
  PlusIcon,
  ArrowsRightLeftIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  UsersIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'

const { airportResults, flightResults, isSearching, searchAirports, searchFlights } = useFlights()

const tripType = ref('round')
const tripTypes = [
  { id: 'round', label: 'Roundtrip' },
  { id: 'oneway', label: 'One-way' },
  { id: 'multi', label: 'Multi-city' }
]

const flightLegs = ref([
  { originQuery: '', originCode: '', destQuery: '', destCode: '', departureDate: '' }
])
const dateRange = ref({ start: '', end: '' })
const returnDate = computed(() => dateRange.value.end)

watch(() => dateRange.value.start, (newVal) => {
  if (flightLegs.value[0]) flightLegs.value[0].departureDate = newVal
})

// Travelers Popover
const showTravelers = ref(false)
const travelerPopoverRef = ref(null)
const travelerCounts = ref({ adults: 1, children: 0, infants: 0 })
const travelerCategories = [
  { id: 'adults', label: 'Adults', description: 'Ages 18+' },
  { id: 'children', label: 'Children', description: 'Ages 2-17' },
  { id: 'infants', label: 'Infants', description: 'Under 2' }
]
const totalTravelers = computed(() => travelerCounts.value.adults + travelerCounts.value.children + travelerCounts.value.infants)

// Cabin Class
const showCabin = ref(false)
const cabinRef = ref(null)
const cabinClass = ref('ECONOMY')
const cabinClasses = [
  { id: 'ECONOMY', label: 'Economy' },
  { id: 'PREMIUM_ECONOMY', label: 'Premium Economy' },
  { id: 'BUSINESS', label: 'Business' },
  { id: 'FIRST', label: 'First Class' }
]
const activeCabinLabel = computed(() => cabinClasses.find(c => c.id === cabinClass.value)?.label)

// Dropdown state
const activeLeg = ref<number | null>(null)
const activeSide = ref<'origin' | 'dest' | null>(null)
const originRefs = ref<any[]>([])
const destRefs = ref<any[]>([])

onClickOutside(travelerPopoverRef, () => showTravelers.value = false)
onClickOutside(cabinRef, () => showCabin.value = false)

const openOrigin = (index: number) => {
  activeLeg.value = index
  activeSide.value = 'origin'
  const leg = flightLegs.value[index]
  if (leg && leg.originQuery.length >= 2) searchAirports(leg.originQuery)
}
const openDest = (index: number) => {
  activeLeg.value = index
  activeSide.value = 'dest'
  const leg = flightLegs.value[index]
  if (leg && leg.destQuery.length >= 2) searchAirports(leg.destQuery)
}

let searchTimeout: any = null
const handleAirportSearch = (val: string) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    if (val.length >= 2) searchAirports(val)
  }, 300)
}

const selectAirport = (index: number, side: 'origin' | 'dest', airport: any) => {
  const leg = flightLegs.value[index]
  if (!leg) return
  if (side === 'origin') {
    leg.originQuery = `${airport.address.cityName} (${airport.iataCode})`
    leg.originCode = airport.iataCode
  } else {
    leg.destQuery = `${airport.address.cityName} (${airport.iataCode})`
    leg.destCode = airport.iataCode
  }
  activeLeg.value = null
  activeSide.value = null
}

const swapLocations = () => {
  const leg = flightLegs.value[0]
  if (!leg) return
  const tempQuery = leg.originQuery
  const tempCode = leg.originCode
  leg.originQuery = leg.destQuery
  leg.originCode = leg.destCode
  leg.destQuery = tempQuery
  leg.destCode = tempCode
}

const updateTravelerCount = (type: string, delta: number) => {
  const catId = type as keyof typeof travelerCounts.value
  const current = travelerCounts.value[catId]
  if (current + delta >= 0 && totalTravelers.value + delta <= 9) {
     if (type === 'adults' && current + delta < 1) return
     travelerCounts.value[catId] = current + delta
  }
}

const selectCabin = (cab: any) => {
  cabinClass.value = cab.id
  showCabin.value = false
}

const addLeg = () => {
  const lastLeg = flightLegs.value[flightLegs.value.length - 1]
  if (!lastLeg) return
  flightLegs.value.push({
    originQuery: lastLeg.destQuery,
    originCode: lastLeg.destCode,
    destQuery: '',
    destCode: '',
    departureDate: ''
  })
}
const removeLeg = (index: number) => {
  flightLegs.value.splice(index, 1)
}

const handleSearch = () => {
  if (flightLegs.value.length === 0) return
  const leg = flightLegs.value[0]!
  if (!leg.originCode || !leg.destCode || !leg.departureDate) return
  
  searchFlights({
    origin: leg.originCode,
    destination: leg.destCode,
    departureDate: leg.departureDate,
    returnDate: tripType.value === 'round' ? returnDate.value : undefined,
    adults: travelerCounts.value.adults,
    children: travelerCounts.value.children,
    infants: travelerCounts.value.infants,
    cabinClass: cabinClass.value
  })
}

watch(tripType, (newVal) => {
  if (newVal !== 'multi' && flightLegs.value.length > 1) {
    flightLegs.value = [flightLegs.value[0]!]
  }
})
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
