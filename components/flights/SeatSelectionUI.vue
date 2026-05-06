<template>
  <div class="seat-selection-container space-y-8 animate-in fade-in duration-500">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h3 class="text-xl  text-gray-900 tracking-tight">Select Your Seats</h3>
        <p class="text-sm font-medium text-gray-800 uppercase tracking-widest">Personalize your journey for every passenger</p>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"></div>
          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Available</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-gray-200"></div>
          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Occupied</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Selected</span>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-24 space-y-6">
      <div class="relative w-20 h-20">
         <div class="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
         <div class="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p class="text-sm  text-gray-900 uppercase  animate-pulse">Scanning Aircraft Configuration...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 p-8 rounded-[2rem] border border-red-100 text-center space-y-4">
      <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-red-500 mx-auto shadow-sm">
        <AlertTriangle class="h-8 w-8" />
      </div>
      <p class="text-sm font-bold text-red-900">{{ error }}</p>
      <button @click="fetchSeatmap" class="px-6 py-2 bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-all">Retry</button>
    </div>

    <!-- Seat Map Content -->
    <div v-else-if="seatmaps.length" class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      <!-- Seat Selection List (Per Passenger) -->
      <div class="lg:col-span-4 space-y-6">
        <div v-for="(p, idx) in passengers" :key="idx" 
          @click="activePassengerIdx = idx"
          class="p-6 rounded-[2rem] border transition-all cursor-pointer group relative overflow-hidden"
          :class="[
            activePassengerIdx === idx 
              ? 'border-primary bg-primary/[0.02] shadow-lg shadow-primary/5 ring-1 ring-primary' 
              : 'border-gray-100 bg-white hover:border-gray-200'
          ]"
        >
          <div class="flex items-center justify-between relative z-10">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center  text-sm transition-all"
                :class="activePassengerIdx === idx ? 'bg-primary text-white' : 'bg-gray-50 text-gray-800'"
              >
                {{ idx + 1 }}
              </div>
              <div>
                <p class="text-sm  text-gray-900">{{ p.firstName }} {{ p.lastName }}</p>
                <p v-if="selectedSeats[idx]" class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">
                  Seat {{ selectedSeats[idx].designator }} ({{ formatPrice(selectedSeats[idx].price) }})
                </p>
                <p v-else class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">No seat selected</p>
              </div>
            </div>
            <div v-if="selectedSeats[idx]" class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
              <Check class="h-4 w-4" />
            </div>
          </div>
          <div v-if="activePassengerIdx === idx" class="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl"></div>
        </div>

        <div class="bg-gray-900 rounded-[2.5rem] p-8 text-white space-y-6 mt-10">
          <div class="flex justify-between items-center">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Surcharges</span>
            <span class="text-xl ">{{ formatPrice(totalSeatPrice) }}</span>
          </div>
          <p class="text-[10px] text-gray-400 leading-relaxed font-medium">Prices include applicable agency margins. Seats are subject to airline availability at the point of ticketing.</p>
        </div>
      </div>

      <!-- Scrollable Seat Grid -->
      <div class="lg:col-span-8 bg-white border border-gray-100 rounded-[2.5rem] p-8 lg:p-12 shadow-sm relative overflow-hidden h-[700px] flex flex-col">
        
        <!-- Segment Toggles (In case of multiple stops) -->
        <div v-if="seatmaps.length > 1" class="flex gap-4 mb-10 overflow-x-auto no-scrollbar pb-2">
           <button 
             v-for="(map, idx) in seatmaps" :key="idx"
             @click="activeMapIdx = idx"
             class="px-6 py-3 rounded-2xl text-[10px]  uppercase tracking-widest whitespace-nowrap transition-all border"
             :class="activeMapIdx === idx ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-gray-800 border-gray-100 hover:bg-white'"
           >
             {{ map.segment_id ? "Segment " + (idx + 1) : "Flight" }}
           </button>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar pr-4">
          <!-- Aircraft Nose Placeholder -->
          <div class="w-24 h-12 bg-gray-50 rounded-t-[4rem] mx-auto mb-12 border-t-2 border-x-2 border-gray-100 flex items-center justify-center">
            <div class="w-8 h-1.5 bg-gray-200 rounded-full"></div>
          </div>

          <div v-if="currentMap" class="space-y-12 pb-24">
            <div v-for="(cabin, cIdx) in currentMap.cabins" :key="cIdx" class="space-y-8">
              <div class="text-center">
                <span class="px-6 py-2 bg-gray-50 rounded-xl text-[10px]  text-gray-400 uppercase  border border-gray-50">
                  {{ cabin.name || 'Cabin' }}
                </span>
              </div>

              <!-- Fixed Grid for Row Contents -->
              <div class="flex flex-col items-center gap-2">
                <div v-for="(row, rIdx) in cabin.rows" :key="rIdx" class="flex items-center gap-1 min-h-[3rem]">
                   <span class="w-8 text-[11px]  text-gray-300 text-right mr-4">{{ row.number }}</span>
                   
                   <div v-for="(section, sIdx) in row.sections" :key="sIdx" class="flex items-center gap-1" :class="{ 'ml-6': sIdx > 0 }">
                      <div v-for="(element, eIdx) in section.elements" :key="eIdx" class="relative group">
                        
                        <!-- Seat Element -->
                        <template v-if="element.type === 'seat'">
                          <button 
                            @click="handleSeatClick(element)"
                            :disabled="!isSeatAvailable(element)"
                            class="w-10 h-10 rounded-xl flex items-center justify-center transition-all relative overflow-hidden group/seat"
                            :class="[
                              isSeatSelectedByOther(element) ? 'bg-red-50 text-red-300' :
                              isSeatAvailable(element) ? 
                                (isSeatSelectedByActivePlayer(element) ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-primary/5 text-primary hover:bg-primary hover:text-white hover:scale-110') : 
                                'bg-gray-100 text-gray-300 cursor-not-allowed grayscale opacity-50'
                            ]"
                          >
                             <Armchair class="h-5 w-5" />
                             
                             <!-- Tiny indicator -->
                             <div v-if="isSeatSelectedByOtherActivePassenger(element)" class="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-full flex items-center justify-center p-0.5">
                                <div class="w-full h-full bg-emerald-500 rounded-full"></div>
                             </div>

                             <!-- Tooltip on Hover -->
                             <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-[9px] font-bold rounded-lg opacity-0 group-hover/seat:opacity-100 pointer-events-none transition-all scale-75 group-hover/seat:scale-100 z-50 whitespace-nowrap shadow-xl">
                                <p>{{ element.designator }} • {{ getSeatPrice(element) }}</p>
                                <p v-if="!isSeatAvailable(element)" class="text-red-400 mt-0.5">Occupied</p>
                             </div>
                          </button>
                        </template>

                        <!-- Empty Element (Aisle) -->
                        <template v-else-if="element.type === 'empty'">
                          <div class="w-10 h-10 flex items-center justify-center">
                            <div class="w-0.5 h-full bg-gray-50"></div>
                          </div>
                        </template>

                        <!-- Bassinet/Facility -->
                        <template v-else>
                          <div class="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 scale-75">
                             <component :is="element.type === 'bassinet' ? Baby : Info" class="h-4 w-4" />
                          </div>
                        </template>
                      </div>
                   </div>

                   <span class="w-8 text-[11px]  text-gray-300 text-left ml-4">{{ row.number }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none">
           <div class="max-w-xs mx-auto bg-gray-50 rounded-full h-1.5 overflow-hidden">
             <div class="h-full bg-primary transition-all duration-700" :style="{ width: ((activeMapIdx + 1) / seatmaps.length) * 100 + '%' }"></div>
           </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-gray-50 border-2 border-dashed border-gray-100 rounded-[2.5rem] py-24 text-center">
       <Armchair class="h-12 w-12 text-gray-300 mx-auto mb-6" />
       <p class="text-sm font-bold text-gray-400 uppercase tracking-widest">Seat Selection Unavailable for this Flight</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { 
  Armchair, 
  Baby, 
  Info, 
  Check, 
  AlertTriangle,
  Users
} from 'lucide-vue-next'
import { flightsApi } from '@/api_factory/modules/flights'
import { useSettings } from '@/composables/useSettings'
import { useCustomToast } from '@/composables/core/useCustomToast'

interface Seat {
  id: string;
  designator: string;
  price: number;
  serviceId: string;
  mapIdx: number;
}

const props = defineProps({
  flightOffer: { type: Object, required: true },
  passengers: { type: Array as () => any[], required: true },
  modelValue: { type: Array as () => any[], default: () => [] }
})

const emit = defineEmits(['update:modelValue', 'update:totalPrice'])

const { formatPrice, currentCurrency } = useSettings()
const { showToast } = useCustomToast()
const runtimeConfig = useRuntimeConfig()

const loading = ref(false)
const error = ref('')
const seatmaps = ref<any[]>([])
const activeMapIdx = ref(0)
const activePassengerIdx = ref(0)
const selectedSeats = ref<Record<number, Seat>>({})

const currentMap = computed(() => seatmaps.value[activeMapIdx.value])

const totalSeatPrice = computed(() => {
  return Object.values(selectedSeats.value).reduce((sum, s) => sum + (s.price || 0), 0)
})

watch(totalSeatPrice, (val) => {
  emit('update:totalPrice', val)
})

const fetchSeatmap = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await flightsApi.getSeatmaps({
      flightOffer: props.flightOffer.rawOffer || props.flightOffer,
      provider: props.flightOffer.provider || 'duffel'
    })
    
    if (res.data?.data) {
      seatmaps.value = res.data.data
    } else {
      error.value = 'Could not load seating data.'
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to retrieve aircraft configuration.'
  } finally {
    loading.value = false
  }
}

const isSeatAvailable = (element: any) => {
  if (element.type !== 'seat') return false
  return element.available_services && element.available_services.length > 0
}

const getSeatPrice = (element: any) => {
  const service = element.available_services?.[0]
  if (!service) return 'N/A'
  return formatPrice(parseFloat(service.total_amount))
}

const isSeatSelectedByActivePlayer = (element: any) => {
  const seat = selectedSeats.value[activePassengerIdx.value]
  return seat && seat.designator === element.designator && seat.mapIdx === activeMapIdx.value
}

const isSeatSelectedByOtherActivePassenger = (element: any) => {
  return Object.entries(selectedSeats.value).some(([idx, seat]) => {
    return parseInt(idx) !== activePassengerIdx.value && 
           seat.designator === element.designator && 
           seat.mapIdx === activeMapIdx.value
  })
}

const isSeatSelectedByOther = (element: any) => {
  // Logic for occupied from airline data is usually handled by absence of available_services
  return false 
}

const handleSeatClick = (element: any) => {
  if (!isSeatAvailable(element)) return

  // Check if seat is already taken by another passenger in our group
  const otherIdx = Object.entries(selectedSeats.value).find(([idx, seat]) => {
    return parseInt(idx) !== activePassengerIdx.value && 
           seat.designator === element.designator && 
           seat.mapIdx === activeMapIdx.value
  })?.[0]

  if (otherIdx !== undefined) {
    showToast({ title: 'Seat Taken', message: `Passenger ${parseInt(otherIdx)+1} has already selected this seat.`, toastType: 'info' })
    return
  }

  const service = element.available_services[0]
  
  if (isSeatSelectedByActivePlayer(element)) {
    // Deselect
    delete selectedSeats.value[activePassengerIdx.value]
  } else {
    // Select
    selectedSeats.value[activePassengerIdx.value] = {
      id: element.id,
      designator: element.designator,
      price: parseFloat(service.total_amount),
      serviceId: service.id,
      mapIdx: activeMapIdx.value
    }
    
    // Auto-advance to next passenger if unset
    if (activePassengerIdx.value < props.passengers.length - 1) {
       activePassengerIdx.value++
    }
  }

  updateModelValue()
}

const updateModelValue = () => {
  const services: any[] = []
  Object.entries(selectedSeats.value).forEach(([pIdx, seat]) => {
    services.push({
      id: seat.serviceId,
      quantity: 1,
      passenger_id: props.passengers[parseInt(pIdx)].duffelId || `pas_${pIdx}` // Pass passenger ref if needed
    })
  })
  emit('update:modelValue', services)
}

onMounted(fetchSeatmap)
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E2E8F0;
  border-radius: 10px;
}
.transition-premium {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
