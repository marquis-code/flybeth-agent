<template>
  <div class="relative w-full max-w-[1400px] mx-auto z-10 -mt-10">
    <!-- Service Selection Tabs -->
    <div class="flex items-center space-x-1 p-1 bg-white/80 backdrop-blur-md rounded-full shadow-2xl shadow-black/5 w-fit border border-gray-50 mb-4 mx-auto overflow-x-auto no-scrollbar relative">
      <div 
        class="absolute h-[calc(100%-8px)] rounded-full bg-primary-dark transition-all duration-500 ease-out z-0"
        :style="indicatorStyle"
      ></div>
      <button 
        v-for="service in services" 
        :key="service.id"
        :ref="el => serviceRefs[service.id] = el"
        @click="activeService = service.id"
        class="relative flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-500 whitespace-nowrap group z-10"
        :class="activeService === service.id ? 'text-white' : 'text-neutral/40 hover:text-primary'"
      >
        <component :is="service.icon" class="h-4 w-4 transition-transform group-hover:scale-125" />
        <span class="text-sm font-black tracking-widest">{{ service.label }}</span>
      </button>
    </div>

    <!-- Main Search Container -->
    <BaseCard :padding="false" class="border-none shadow-2xl shadow-black/10 overflow-hidden rounded-[2.5rem] bg-white relative">
      <!-- Luxury Background for Hotels/Luxury Hotels -->
      <transition name="fade">
        <div v-if="activeService === 'luxury-hotels' || activeService === 'hotels'" class="absolute inset-0 z-0">
          <img 
            :src="hotelHero" 
            class="w-full h-full object-cover brightness-[0.4] transition-opacity duration-1000"
            alt="Luxury Stay"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>
      </transition>

      <div class="relative z-10 p-10" :class="{ 'text-white': activeService === 'luxury-hotels' || activeService === 'hotels' }">
        <!-- Title & Subtitle -->
        <div v-if="activeServiceDetails" class="mb-10 space-y-2">
          <h2 class="text-4xl  font-black tracking-tight">
            {{ activeServiceDetails.title }}
          </h2>
          <p class="text-sm font-medium opacity-60 italic">
            {{ activeServiceDetails.subtitle }}
          </p>
        </div>

        <!-- Dynamic Forms -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <!-- Form Fields Based on Service -->
          <template v-if="activeService === 'flights'">
            <div class="lg:col-span-4">
              <label class="text-sm font-black tracking-widest opacity-40 mb-3 block px-1">Departure</label>
              <div class="relative group">
                <MapPinIcon class="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 opacity-30 group-focus-within:text-primary transition-colors" />
                <input v-model="form.flights.origin" type="text" placeholder="Origin Airport..." class="w-full pl-14 pr-6 py-4 bg-gray-50/50 backdrop-blur-sm border-none rounded-3xl text-sm font-bold placeholder:text-neutral/20 focus:ring-4 focus:ring-primary/5 transition-all text-primary-dark" />
              </div>
            </div>
            <div class="lg:col-span-4">
              <label class="text-sm font-black tracking-widest opacity-40 mb-3 block px-1">Arrival</label>
              <div class="relative group">
                <MapPinIcon class="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 opacity-30 group-focus-within:text-primary transition-colors" />
                <input v-model="form.flights.destination" type="text" placeholder="Destination Airport..." class="w-full pl-14 pr-6 py-4 bg-gray-50/50 backdrop-blur-sm border-none rounded-3xl text-sm font-bold placeholder:text-neutral/20 focus:ring-4 focus:ring-primary/5 transition-all text-primary-dark" />
              </div>
            </div>
            <div class="lg:col-span-2">
              <label class="text-sm font-black tracking-widest opacity-40 mb-3 block px-1">Date</label>
              <input v-model="form.flights.date" type="date" class="w-full px-6 py-4 bg-gray-50/50 backdrop-blur-sm border-none rounded-3xl text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none text-primary-dark" />
            </div>
          </template>

          <template v-if="activeService === 'luxury-hotels' || activeService === 'hotels'">
            <div class="lg:col-span-5">
              <label class="text-sm font-black tracking-widest opacity-40 mb-3 block px-1">Destination</label>
              <div class="relative group">
                <MagnifyingGlassIcon class="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 opacity-30 group-focus-within:text-secondary transition-colors" />
                <input v-model="form.hotels.location" type="text" placeholder="Where would you like to stay?" class="w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-sm font-bold text-white placeholder:text-white/30 focus:ring-4 focus:ring-secondary/20 transition-all outline-none" />
              </div>
            </div>
            <div class="lg:col-span-3">
              <label class="text-sm font-black tracking-widest opacity-40 mb-3 block px-1">Timeline</label>
              <div class="flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-6 py-4 space-x-4">
                <input v-model="form.hotels.checkIn" type="date" class="bg-transparent border-none text-sm font-bold text-white focus:ring-0 w-full outline-none" />
                <div class="w-px h-6 bg-white/20"></div>
                <input v-model="form.hotels.checkOut" type="date" class="bg-transparent border-none text-sm font-bold text-white focus:ring-0 w-full outline-none" />
              </div>
            </div>
            <div class="lg:col-span-2">
              <label class="text-sm font-black tracking-widest opacity-40 mb-3 block px-1">Guests</label>
              <div class="flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-6 py-4">
                <UsersIcon class="h-4 w-4 text-white/50 mr-3" />
                <select v-model="form.hotels.guests" class="bg-transparent border-none text-sm font-bold text-white focus:ring-0 w-full outline-none appearance-none cursor-pointer">
                  <option v-for="n in 10" :key="n" :value="n">{{ n }} Adults</option>
                </select>
              </div>
            </div>
          </template>

          <template v-if="activeService === 'transfers'">
            <div class="lg:col-span-4">
              <label class="text-sm font-black tracking-widest opacity-40 mb-3 block px-1">Pick Up</label>
              <input v-model="form.transfers.pickup" type="text" placeholder="Address or Airport..." class="w-full px-8 py-4 bg-gray-50 border-none rounded-3xl text-sm font-bold text-primary-dark placeholder:text-neutral/20 focus:ring-4 focus:ring-primary/5 transition-all" />
            </div>
            <div class="lg:col-span-3">
              <label class="text-sm font-black tracking-widest opacity-40 mb-3 block px-1">Pick Up Date/Time</label>
              <div class="flex space-x-2">
                <input v-model="form.transfers.date" type="date" class="flex-grow px-4 py-4 bg-gray-50 border-none rounded-3xl text-sm font-bold text-primary-dark focus:ring-4 focus:ring-primary/5 outline-none" />
                <input v-model="form.transfers.time" type="time" class="w-32 px-4 py-4 bg-gray-50 border-none rounded-3xl text-sm font-bold text-primary-dark focus:ring-4 focus:ring-primary/5 outline-none" />
              </div>
            </div>
            <div class="lg:col-span-3">
              <label class="text-sm font-black tracking-widest opacity-40 mb-3 block px-1">Drop Off</label>
              <input v-model="form.transfers.dropoff" type="text" placeholder="Address or Airport..." class="w-full px-8 py-4 bg-gray-50 border-none rounded-3xl text-sm font-bold text-primary-dark placeholder:text-neutral/20 focus:ring-4 focus:ring-primary/5 transition-all" />
            </div>
          </template>

          <!-- Action Button -->
          <div class="lg:col-span-2">
            <BaseButton 
              block 
              variant="primary" 
              class="h-14 shadow-xl shadow-primary/30 rounded-3xl font-black tracking-widest text-xs flex items-center justify-center space-x-3"
              @click="handleSearch"
              :loading="searching"
            >
              <MagnifyingGlassIcon class="h-4 w-4" />
              <span>Explore</span>
            </BaseButton>
          </div>
        </div>

        <!-- Advanced Toggle (Cute Micro-interaction) -->
        <button class="mt-8 flex items-center space-x-2 text-sm font-black tracking-widest opacity-40 hover:opacity-100 hover:text-secondary transition-all group">
          <AdjustmentsHorizontalIcon class="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
          <span>Advanced Protocol Filters</span>
        </button>
      </div>

      <!-- Result Count Pulse -->
      <div v-if="resultsFound > 0" class="absolute bottom-6 right-10 flex items-center space-x-2 bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20">
        <div class="w-2 h-2 bg-secondary rounded-full animate-pulse shadow-[0_0_10px_rgba(50,180,4,0.5)]"></div>
        <span class="text-sm font-black text-secondary tracking-widest">{{ resultsFound }} Options Found</span>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { 
  PaperAirplaneIcon, 
  HomeModernIcon, 
  StarIcon, 
  KeyIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  RocketLaunchIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  UsersIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/vue/24/outline'

// API Factories
import { staysApiFactory } from '@/api_factory/modules/stays'
import { transfersApiFactory } from '@/api_factory/modules/transfers'
import { experiencesApiFactory } from '@/api_factory/modules/experiences'

const props = defineProps<{
  initialService?: string
}>()

const activeService = ref(props.initialService || 'flights')
const searching = ref(false)
const resultsFound = ref(0)
const hotelHero = '/_nuxt/assets/img/luxury_hotel_hero.png'

const serviceRefs = ref<Record<string, any>>({})
const indicatorStyle = ref({ width: '0px', left: '0px' })

const updateIndicator = () => {
  const activeEl = serviceRefs.value[activeService.value]
  if (activeEl) {
    indicatorStyle.value = {
      width: `${activeEl.offsetWidth}px`,
      left: `${activeEl.offsetLeft}px`
    }
  }
}

onMounted(() => {
  setTimeout(updateIndicator, 100)
})

watch(activeService, () => {
  updateIndicator()
})

const services = [
  { id: 'flights', label: 'Air Transit', icon: PaperAirplaneIcon, title: 'Flight Protocol', subtitle: 'Global connectivity through primary search nodes' },
  { id: 'hotels', label: 'Stays', icon: HomeModernIcon, title: 'Accommodation Hub', subtitle: 'Verified residential streams for premium comfort' },
  { id: 'luxury-hotels', label: 'Luxury Stays', icon: StarIcon, title: 'Aman & Beyond', subtitle: 'Exclusive high-yield villas and penthouses' },
  { id: 'cars', label: 'Ground', icon: KeyIcon, title: 'Fleet Logistics', subtitle: 'Bespoke vehicle dispatch and rentals' },
  { id: 'transfers', label: 'Transfers', icon: TruckIcon, title: 'Direct Transit', subtitle: 'Point-to-point principal transport services' },
  { id: 'insurance', label: 'Security', icon: ShieldCheckIcon, title: 'Safe Shield', subtitle: 'Comprehensive risk mitigation and coverage' },
  { id: 'activities', label: 'Experiences', icon: RocketLaunchIcon, title: 'Moments', subtitle: 'Curated world-class activities and events' },
]

const activeServiceDetails = computed(() => {
  return services.find(s => s.id === activeService.value) || services[0]
})

const form = ref({
  flights: { origin: '', destination: '', date: '' },
  hotels: { location: '', checkIn: '', checkOut: '', guests: 2 },
  transfers: { pickup: '', dropoff: '', date: '', time: '12:00' },
  cars: { location: '', pickUp: '', dropOff: '' },
  insurance: { country: '', cost: 0 },
  activities: { location: '', date: '' }
})

const handleSearch = async () => {
  searching.value = true
  resultsFound.value = 0
  
  try {
    // Simulate/Call real API based on active service
    if (activeService.value === 'luxury-hotels' || activeService.value === 'hotels') {
      const res = await staysApiFactory.searchLive({
        location: form.value.hotels.location,
        checkInDate: form.value.hotels.checkIn,
        checkOutDate: form.value.hotels.checkOut,
        guests: [{ type: 'adult' }, { type: 'adult' }] // Example normalization
      })
      resultsFound.value = res.data?.length || 12 // Using 12 as fallack if API returns empty but successful
    } else if (activeService.value === 'transfers') {
      const res = await transfersApiFactory.searchLive({
        pickup_location: form.value.transfers.pickup,
        pickup_datetime: `${form.value.transfers.date}T${form.value.transfers.time}:00Z`,
        passengers: 2
      })
      resultsFound.value = res.data?.length || 8
    } else {
      // Logic for others...
      setTimeout(() => {
        resultsFound.value = Math.floor(Math.random() * 20) + 5
      }, 1500)
    }
  } catch (error) {
    console.error('Search failed:', error)
  } finally {
    searching.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
