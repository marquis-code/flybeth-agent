<template>
  <div 
    class="bg-white border border-gray-100 shadow-[0_8px_60px_rgb(0,0,0,0.05)] font-sans relative z-10 rounded-[2rem]"
  >
    <!-- ─── Tab Bar ─── -->
    <div class="border-b border-gray-50 bg-white sticky top-0 z-20 rounded-t-[2rem]">
      <!-- Mobile Tabs -->
      <div class="md:hidden flex items-center gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          @click="currentTab = tab.name"
          class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all shrink-0 border"
          :class="currentTab === tab.name
            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
            : 'bg-white text-gray-800 border-gray-100 hover:border-gray-200'"
        >
          <component :is="tab.icon" class="h-3.5 w-3.5" />
          {{ tab.label }}
        </button>
      </div>
 
      <!-- Desktop Tabs -->
      <nav class="hidden md:flex items-center px-10 gap-2 overflow-x-auto no-scrollbar" aria-label="Search tabs">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          @click="currentTab = tab.name"
          class="flex items-center gap-2 px-6 py-5 text-sm font-bold tracking-tight transition-all border-b-2 whitespace-nowrap group translate-y-[1px]"
          :class="currentTab === tab.name
            ? 'text-primary border-primary'
            : 'text-gray-800 border-transparent hover:text-gray-800'"
        >
          <component :is="tab.icon" class="h-4 w-4" :class="currentTab === tab.name ? 'text-primary' : 'text-gray-800 group-hover:text-gray-800'" />
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Backdrop Overlay -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isFocused" class="fixed inset-0 bg-black/10 backdrop-blur-[4px] z-[9]" @click="isFocused = false"></div>
      </Transition>
    </Teleport>

    <!-- ─── Content Area ─── -->
    <div class="p-6 md:p-8 space-y-6">
      
      <!-- Stays Panel -->
      <div v-if="currentTab === 'Hotels'" class="space-y-6">
        <div class="flex items-center gap-8">
          <label v-for="mode in stayModes" :key="mode.value" class="radio-label group">
            <input type="radio" :value="mode.value" v-model="stayMode" class="sr-only" />
            <span class="radio-dot" :class="stayMode === mode.value ? 'radio-dot--active' : ''" />
            <span class="radio-text" :class="stayMode === mode.value ? '!text-gray-900 font-bold' : ''">{{ mode.label }}</span>
          </label>
        </div>

        <div class="space-y-4">
          <div class="modern-grid bg-white border border-gray-100 rounded-[2rem] shadow-sm flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-100 overflow-visible">
            <div class="flex-[1.5] cell-padding hover:bg-gray-50/50 transition-all">
              <p class="cell-label">Where to?</p>
              <LocationPicker v-model="searchState.location" label="" placeholder="City, hotel or area" variant="minimal" @focus="isFocused = true" @close="isFocused = false" />
            </div>
            <div class="flex-1 cell-padding hover:bg-gray-50/50 transition-all">
              <p class="cell-label">Dates</p>
              <FlightDateRangePicker v-model:departure="searchState.checkIn" v-model:return="searchState.checkOut" mode="roundtrip" variant="minimal" @focus="isFocused = true" @close="isFocused = false" />
            </div>
            <div class="flex-1 cell-padding hover:bg-gray-50/50 transition-all">
              <p class="cell-label">Travelers</p>
              <Occupancypicker v-model:rooms="occupancy.rooms" v-model:adults="occupancy.adults" v-model:children="occupancy.children" label="" displayVariant="minimal" @focus="isFocused = true" @close="isFocused = false" />
            </div>
          </div>

          <div class="flex items-center justify-between pt-4">
            <div class="flex items-center gap-6">
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-sm font-medium text-gray-800 uppercase tracking-widest">Confidential Agent Pricing</span>
              </div>
              <button @click="showHotelAdvancedSearch = !showHotelAdvancedSearch" class="flex items-center gap-2 text-gray-800 hover:text-primary transition-all">
                <span class="text-sm font-bold uppercase tracking-widest">Advanced Search</span>
                <ChevronDown class="h-3 w-3 transition-transform" :class="{ 'rotate-180': showHotelAdvancedSearch }" />
              </button>
            </div>
            <button @click="handleSearch" class="h-10 px-8 bg-neutral-900 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-black transition-all shadow-lg flex items-center gap-2">
              <Search class="h-3.5 w-3.5" />
              Search Hotels
            </button>
          </div>
        </div>
      </div>

      <!-- Flights Panel -->
      <div v-if="currentTab === 'Flights'" class="space-y-6">
        <div class="flex items-center gap-8">
          <label v-for="mode in flightModeOptions" :key="mode.value" class="radio-label group">
            <input type="radio" :value="mode.value" v-model="flightMode" class="sr-only" />
            <span class="radio-dot" :class="flightMode === mode.value ? 'radio-dot--active' : ''" />
            <span class="radio-text" :class="flightMode === mode.value ? '!text-gray-900 font-bold' : ''">{{ mode.label }}</span>
          </label>
        </div>

        <div class="space-y-4">
          <div 
            v-for="(leg, idx) in flightMode === 'multicity' ? multiFlightLegs : [flightSearchState]" 
            :key="idx" 
            class="relative"
          >
            <div class="modern-grid bg-white border border-gray-100 rounded-[2rem] shadow-sm flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-100 !overflow-visible relative">
              <div class="flex-1 cell-padding hover:bg-gray-50/50 transition-all">
                <p class="cell-label">From</p>
                <LocationPicker v-model="leg.origin" label="" placeholder="Origin" variant="minimal" @focus="isFocused = true" @close="isFocused = false" />
              </div>
              <div class="flex-1 cell-padding hover:bg-gray-50/50 transition-all">
                <p class="cell-label">To</p>
                <LocationPicker v-model="leg.destination" label="" placeholder="Destination" variant="minimal" @focus="isFocused = true" @close="isFocused = false" />
              </div>
              <div class="flex-1 cell-padding hover:bg-gray-50/50 transition-all">
                <p class="cell-label">Departing</p>
                <FlightDateRangePicker :mode="flightMode === 'roundtrip' ? 'roundtrip' : 'oneway'" v-model:departure="leg.departureDate" v-model:return="leg.returnDate" variant="minimal" @focus="isFocused = true" @close="isFocused = false" />
              </div>
            </div>
            <button v-if="flightMode === 'multicity' && multiFlightLegs.length > 1" @click="multiFlightLegs.splice(idx, 1)" class="absolute -right-8 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-rose-500 transition-colors">
              <X class="h-4 w-4" />
            </button>
          </div>

          <!-- Advanced Toggle -->
          <div class="flex items-center justify-between pt-2">
            <button 
              @click="showFlightAdvancedSearch = !showFlightAdvancedSearch" 
              class="flex items-center gap-2 text-sm  uppercase  text-gray-800 hover:text-primary transition-all group"
            >
              <div class="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <ChevronDown class="h-3 w-3 transition-transform duration-500" :class="{ 'rotate-180': showFlightAdvancedSearch }" />
              </div>
              Advanced Search
            </button>
            <button @click="handleSearch" class="hidden md:flex h-12 px-10 bg-neutral-900 text-white rounded-2xl  text-sm uppercase  hover:bg-black transition-all shadow-xl items-center gap-3">
              <Search class="h-4 w-4" />
              Find Flights
            </button>
          </div>

          <!-- Advanced Panel -->
          <Transition name="fade-slide">
            <div v-if="showFlightAdvancedSearch" class="pt-6 border-t border-gray-50 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              <div class="space-y-2">
                <label class="text-sm font-semibold text-gray-800 uppercase tracking-widest pl-1">Adults</label>
                <SelectInput v-model="flightTravelers.adults" label="" :options="[1,2,3,4,5,6,7,8]" variant="minimal" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold text-gray-800 uppercase tracking-widest pl-1">Children</label>
                <SelectInput v-model="flightTravelers.children" label="" :options="[0,1,2,3,4,5,6]" variant="minimal" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold text-gray-800 uppercase tracking-widest pl-1">Infants</label>
                <SelectInput v-model="flightTravelers.infants" label="" :options="[0,1,2,3,4]" variant="minimal" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold text-gray-800 uppercase tracking-widest pl-1">Cabin Class</label>
                <SelectInput v-model="flightClass" label="" :options="flightClasses" variant="minimal" />
              </div>
            </div>
          </Transition>

          <!-- Mobile Only Search Button -->
          <div class="md:hidden pt-4">
            <button @click="handleSearch" class="w-full h-14 bg-neutral-900 text-white rounded-[1.5rem]  text-sm uppercase  hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3">
              <Search class="h-5 w-5" />
              Find Flights
            </button>
          </div>
        </div>
      </div>

      <!-- Other Panels -->
      <div v-if="['Transfers', 'Activities', 'Cars', 'Packages', 'Cruises'].includes(currentTab)" class="space-y-6">
        <div class="modern-grid bg-white border border-gray-100 rounded-[2rem] shadow-sm flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-100 overflow-visible">
          <template v-if="currentTab === 'Transfers'">
            <div class="flex-1 cell-padding"><p class="cell-label uppercase">From</p><LocationPicker v-model="transferSearchState.origin" variant="minimal" /></div>
            <div class="flex-[1.2] cell-padding"><p class="cell-label uppercase">To</p><LocationPicker v-model="transferSearchState.destination" variant="minimal" /></div>
            <div class="flex-1 cell-padding"><p class="cell-label uppercase">Date</p><FlightDateRangePicker v-model:departure="transferSearchState.date" mode="oneway" variant="minimal" /></div>
          </template>

          <template v-if="currentTab === 'Activities'">
            <div class="flex-[1.5] cell-padding"><p class="cell-label uppercase">Destination</p><CityPicker v-model="activitiesSearchState.destination" label="" placeholder="Search any city" variant="minimal" /></div>
            <div class="flex-1 cell-padding"><p class="cell-label uppercase">When?</p><FlightDateRangePicker v-model:departure="activitiesSearchState.date" mode="oneway" variant="minimal" /></div>
          </template>

          <template v-if="currentTab === 'Cars'">
            <div class="flex-1 cell-padding"><p class="cell-label uppercase">Location</p><LocationPicker v-model="carSearchState.origin" variant="minimal" /></div>
            <div class="flex-1 cell-padding"><p class="cell-label uppercase">Pick-up</p><FlightDateRangePicker v-model:departure="carSearchState.pickUpDate" mode="oneway" variant="minimal" /></div>
          </template>

          <template v-if="currentTab === 'Packages'">
            <div class="flex-1 cell-padding"><p class="cell-label uppercase">From</p><LocationPicker v-model="packageSearchState.origin" variant="minimal" /></div>
            <div class="flex-1 cell-padding"><p class="cell-label uppercase">To</p><LocationPicker v-model="packageSearchState.destination" variant="minimal" /></div>
            <div class="flex-1 cell-padding"><p class="cell-label uppercase">Dates</p><FlightDateRangePicker v-model:departure="packageSearchState.departureDate" v-model:return="packageSearchState.returnDate" mode="roundtrip" variant="minimal" /></div>
          </template>

          <template v-if="currentTab === 'Cruises'">
            <div class="flex-1 cell-padding"><SelectInput v-model="cruiseSearchState.destination" label="Destination" :options="cruiseDestinations" variant="minimal" /></div>
            <div class="flex-1 cell-padding"><SelectInput v-model="cruiseSearchState.departingMonth" label="Month" :options="cruiseMonths" variant="minimal" /></div>
          </template>
        </div>

        <div class="flex justify-end pt-4">
           <button @click="handleSearch" class="h-10 px-10 bg-neutral-900 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-black transition-all shadow-lg flex items-center gap-2">
             <Search class="h-3.5 w-3.5" />
             Search {{ currentTab }}
           </button>
        </div>
      </div>
    </div>


    <!-- ─── Flight Results Modal ─── -->
    <FlightResultsModal
      :is-open="showResultsModal"
      :results="flightResults"
      :query="currentSearchQuery"
      @close="showResultsModal = false"
      @select="selectFlight"
    />

  </div>

  <!-- ─── Booking Flow Overlay ─── -->
  <Teleport to="body">
    <FlightBookingWizard 
      v-if="activeStep === 'booking'" 
      :selected-flight="selectedFlight" 
      :travelers="flightTravelers"
      @close="activeStep = 'search'" 
    />
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { 
  Plane, Bed, Car, Package, Anchor, Ticket, Truck,
  Search, ChevronDown, Plus, X, Check, Clock, Sparkles
} from 'lucide-vue-next'

import { useTracking } from '@/composables/core/useTracking'
import { useFlights } from '~/composables/modules/flights/useFlights'
import FlightOfferCard from '@/components/flights/FlightOfferCard.vue'
import FlightBookingWizard from '@/components/flights/FlightBookingWizard.vue'
import FlightResultsModal from '@/components/flights/FlightResultsModal.vue'

const props = defineProps({
  defaultTab: { type: String, default: 'Flights' }
})

const { trackAction } = useTracking()
const { searchFlights, flightResults, isSearching } = useFlights()
const isFocused = ref(false)
const activeStep = ref('search')
const selectedFlight = ref<any>(null)
const showResultsModal = ref(false)
const currentSearchQuery = ref<any>({})

const selectFlight = (offer: any) => {
  selectedFlight.value = offer
  activeStep.value = 'booking'
}

const tabs = [
  { name: 'Flights',    label: 'Flights',     icon: Plane },
  { name: 'Hotels',     label: 'Hotels',      icon: Bed },
  { name: 'Transfers',  label: 'Transfers',   icon: Truck },
  { name: 'Activities', label: 'Activities',  icon: Ticket },
  { name: 'Cars',       label: 'Car Rentals', icon: Car },
  { name: 'Packages',   label: 'Packages',    icon: Package },
  { name: 'Cruises',    label: 'Cruises',     icon: Anchor }
]

const currentTab = ref(props.defaultTab)
const stayMode   = ref('single')
const flightMode = ref('roundtrip')
const carMode    = ref('pickup')
const transferMode = ref('pickup')
const packageType = ref('Hotel+Flight')

const stayModes = [{ label: 'Single Set', value: 'single' }, { label: 'Multi Property', value: 'multi' }]
const flightModeOptions = [{ label: 'One Way', value: 'oneway' }, { label: 'Round Trip', value: 'roundtrip' }, { label: 'Multi-City', value: 'multicity' }]

const occupancy = reactive({ rooms: 1, adults: 2, children: 0 })
const searchState = reactive({ location: '', checkIn: '', checkOut: '' })
const showHotelAdvancedSearch = ref(false)

const flightTravelers = reactive({ adults: 1, children: 0, infants: 0 })
const flightSearchState = reactive({ origin: '', destination: '', departureDate: '', returnDate: '' })
const multiFlightLegs = ref([{ origin: '', destination: '', departureDate: '', returnDate: '' }])

const flightClass = ref('economy')
const flightClasses = [ 
  { label: 'economy', value: 'economy' }, 
  { label: 'premium', value: 'premium_economy' }, 
  { label: 'business', value: 'business' }, 
  { label: 'first', value: 'first' } 
]
const showFlightAdvancedSearch = ref(false)

const carSearchState = reactive({ origin: '', destination: '', pickUpDate: '' })
const transferSearchState = reactive({ origin: '', destination: '', date: '', time: '10:00' })
const activitiesSearchState = reactive({ destination: '', date: '' })
const packageSearchState = reactive({ origin: '', destination: '', departureDate: '', returnDate: '' })

const cruiseDestinations = [ { value: '', label: 'Any Destination' }, { value: 'C', label: 'Caribbean' } ]
const cruiseMonths = [ { value: 'ANY', label: 'Any Month' } ]
const cruiseSearchState = reactive({ destination: '', departingMonth: 'ANY', line: '' })

const handleSearch = () => {
  isFocused.value = false
  if (currentTab.value === 'Flights') {
    const mainLeg = flightSearchState
    currentSearchQuery.value = {
      origin: mainLeg.origin,
      destination: mainLeg.destination,
      departureDate: mainLeg.departureDate,
      adults: flightTravelers.adults,
      cabinClass: flightClass.value
    }
    searchFlights(currentSearchQuery.value)
    showResultsModal.value = true
    return
  }
  // For other services, stay on the same page for now.
  console.log('Search triggered for:', currentTab.value)
}

// Inline filters removed, logic moved to FlightResultsModal.vue
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.cell-padding {
  padding: 0.85rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 70px;
}
.cell-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #030712;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
}

.radio-label { display: flex; align-items: center; gap: 12px; cursor: pointer; }
.radio-dot {
  width: 18px; height: 18px; border-radius: 50%;
  border: 2px solid #d1d5db;
  transition: all 0.3s;
}
.radio-dot--active { border-color: #111; background: #111; box-shadow: 0 0 0 4px rgba(0,0,0,0.05); }
.radio-text { font-size: 15px; font-weight: 500; color: #030712; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
</style>
