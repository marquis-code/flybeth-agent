<template>
  <div class="bg-white rounded-[2.5rem] border border-gray-200 overflow-hidden relative w-full">
    <!-- Premium Header Gradient or Image -->
    <div class="absolute inset-x-0 top-0 h-48 bg-gray-900 overflow-hidden -z-10">
      <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80" class="w-full h-full object-cover opacity-40 grayscale" />
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
    </div>

    <div class="p-8 lg:p-12">
      <!-- Header Area -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-white/10">
        <div class="space-y-1">
          <h2 class="text-3xl font-black text-white tracking-tight italic">Luxury Stays & Hotels</h2>
          <p class="text-xs font-bold text-white/40 tracking-widest uppercase">Curated collection of the world's finest accommodations</p>
        </div>
        
        <div class="flex items-center space-x-6">
          <label class="flex items-center space-x-3 cursor-pointer group">
            <div class="relative w-12 h-6 bg-white/10 rounded-full transition-colors group-hover:bg-white/20" :class="isLuxury ? 'bg-secondary' : ''">
              <input type="checkbox" v-model="isLuxury" class="sr-only" />
              <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" :class="isLuxury ? 'translate-x-6' : ''"></div>
            </div>
            <span class="text-xs font-black text-white/60 tracking-widest uppercase group-hover:text-white transition-colors">Luxury Only</span>
          </label>
        </div>
      </div>

      <!-- Search Inputs Grid -->
      <div class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          <!-- Destination Input -->
          <div class="lg:col-span-7 relative" ref="destContainerRef">
            <AnimatedInput 
              v-model="location" 
              label="Where are you going?" 
              :icon="MapPinIcon"
              @focus="destOpen = true"
            />
            <!-- Suggestions Dropdown -->
            <Transition name="slide-up">
              <div v-if="destOpen && filteredDestinations.length" class="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 shadow-2xl rounded-[2rem] z-[110] max-h-[400px] overflow-y-auto p-3 animate-in fade-in slide-in-from-top-4">
                <button 
                  v-for="dest in filteredDestinations" :key="dest.city"
                  @click="selectDest(dest)"
                  class="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group border border-transparent hover:border-gray-100 mb-1"
                >
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <HomeModernIcon class="h-6 w-6" />
                    </div>
                    <div class="text-left">
                      <p class="text-sm font-black text-gray-900 group-hover:text-primary transition-colors">{{ dest.city }}</p>
                      <p class="text-[10px] font-bold text-gray-400">{{ dest.country }}</p>
                    </div>
                  </div>
                  <ChevronDownIcon class="h-4 w-4 text-gray-300 -rotate-90" />
                </button>
              </div>
            </Transition>
          </div>

          <!-- Guests -->
          <div class="lg:col-span-5 relative" ref="guestPopoverRef">
             <button 
              @click="showGuests = !showGuests"
              class="w-full flex items-center justify-between px-5 py-3 bg-white border border-gray-200 rounded-2xl hover:border-primary transition-all group h-[58px]"
            >
              <div class="flex items-center space-x-3">
                <UsersIcon class="h-5 w-5 text-gray-400 group-hover:text-primary" />
                <div class="text-left">
                  <p class="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-0.5" v-if="totalGuests > 0">Travelers</p>
                  <p class="text-sm font-bold text-gray-900">{{ guests.adults + guests.children }} Guests, {{ guests.rooms }} Room</p>
                </div>
              </div>
              <ChevronDownIcon class="h-4 w-4 text-gray-400 transition-transform" :class="showGuests ? 'rotate-180' : ''" />
            </button>
            <!-- Guests Dropdown -->
            <Transition name="slide-up">
              <div v-if="showGuests" class="absolute top-full right-0 left-0 lg:left-auto mt-3 w-full lg:w-80 bg-white border border-gray-200 shadow-2xl rounded-[2rem] z-[100] p-8 space-y-8 animate-in fade-in slide-in-from-top-4">
                <div v-for="cat in guestCategories" :key="cat.id" class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-black text-gray-900">{{ cat.label }}</p>
                    <p class="text-[10px] font-bold text-gray-400 mt-0.5">{{ cat.description }}</p>
                  </div>
                  <div class="flex items-center space-x-4">
                    <button @click="updateGuestCount(cat.id, -1)" class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-20 transition-all">-</button>
                    <span class="text-lg font-black w-6 text-center">{{ guests[cat.id as keyof typeof guests] }}</span>
                    <button @click="updateGuestCount(cat.id, 1)" class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">+</button>
                  </div>
                </div>
                <BaseButton @click="showGuests = false" variant="primary" block class="rounded-xl h-12">Apply</BaseButton>
              </div>
            </Transition>
          </div>
        </div>

        <div class="grid grid-cols-1">
          <DateRangePicker v-model="stayRange" />
        </div>
      </div>

      <!-- Bottom Actions -->
      <div class="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-8 border-t border-gray-100">
        <div class="flex items-center space-x-6 text-xs font-black tracking-widest text-gray-500 uppercase">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(var(--secondary-rgb),0.5)]"></div>
            <span>Best Price Guaranteed</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(var(--secondary-rgb),0.5)]"></div>
            <span>Verified Properties Only</span>
          </div>
        </div>

        <BaseButton 
          @click="handleSearch" 
          :loading="isSearching" 
          variant="primary" 
          size="lg" 
          class="px-12 h-[58px] rounded-[1.5rem] font-black tracking-[0.2em] text-xs shadow-2xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all"
        >
          <MagnifyingGlassIcon class="h-5 w-5 mr-3" />
          FIND PROPERTIES
        </BaseButton>
      </div>
    </div>

    <!-- Results Section -->
    <Transition name="fade">
      <div v-if="stayResults.length > 0" class="border-t border-gray-200 bg-gray-50/50 p-8 lg:p-12">
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-xl font-black text-gray-900 tracking-tight italic">Luxury Results</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="stay in stayResults"
            :key="stay.id"
            class="bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group relative flex flex-col h-full"
          >
            <div class="h-60 bg-gray-100 relative overflow-hidden">
              <img :src="`https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80&sig=${stay.id}`" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div class="absolute top-4 right-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-black text-secondary uppercase tracking-widest rounded-full shadow-sm">Special Offer</div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div class="absolute bottom-4 left-6 text-white">
                <div class="flex items-center space-x-1">
                  <StarIcon class="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span class="text-xs font-black">{{ stay.rating || '4.9' }}</span>
                </div>
              </div>
            </div>

            <div class="p-8 space-y-4 flex-1 flex flex-col">
              <div class="space-y-2">
                <h4 class="text-xl font-black text-gray-900 tracking-tight group-hover:text-primary transition-colors leading-tight italic">{{ stay.name }}</h4>
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-1">
                  <MapPinIcon class="h-3 w-3" />
                  <span>{{ stay.address }}</span>
                </p>
              </div>

              <div class="pt-6 border-t border-gray-100 flex items-end justify-between mt-auto">
                <div class="space-y-0.5">
                  <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Starting at</p>
                  <p class="text-3xl font-black text-primary-dark tracking-tighter">${{ stay.price }}<span class="text-xs font-bold text-gray-400 ml-1">/night</span></p>
                </div>
                <BaseButton variant="primary" class="rounded-xl px-6 h-12 text-[10px] font-black tracking-widest active:scale-95 transition-all uppercase shadow-lg shadow-primary/10">Reserve</BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'
import { 
  MapPinIcon, 
  CalendarIcon, 
  HomeModernIcon, 
  UsersIcon, 
  ChevronDownIcon, 
  MagnifyingGlassIcon,
  StarIcon
} from '@heroicons/vue/24/outline'
import DateRangePicker from '@/components/ui/DateRangePicker.vue'

const props = defineProps<{
  isLuxury?: boolean
}>()

// Mock Data for Stays (simulating useStays)
const stayResults = ref<any[]>([])
const isSearching = ref(false)

const location = ref('')
const destOpen = ref(false)
const stayRange = ref({ start: '', end: '' })
const checkIn = computed(() => stayRange.value.start)
const checkOut = computed(() => stayRange.value.end)
const isLuxury = ref(props.isLuxury ?? true)

const showGuests = ref(false)
const guestPopoverRef = ref(null)
const destContainerRef = ref(null)

const guests = ref({ adults: 2, children: 0, rooms: 1 })
const guestCategories = [
  { id: 'adults', label: 'Adults', description: 'Ages 18+' },
  { id: 'children', label: 'Children', description: 'Ages 2-17' },
  { id: 'rooms', label: 'Rooms', description: 'Total rooms needed' }
]
const totalGuests = computed(() => guests.value.adults + guests.value.children)

const destinations = [
  { city: 'Bali', country: 'Indonesia' },
  { city: 'Santorini', country: 'Greece' },
  { city: 'Maldives', country: 'South Asia' },
  { city: 'Paris', country: 'France' },
  { city: 'Dubai', country: 'UAE' },
  { city: 'New York', country: 'USA' }
]

const filteredDestinations = computed(() => {
  if (!location.value) return destinations
  const lower = location.value.toLowerCase()
  return destinations.filter(d => d.city.toLowerCase().includes(lower) || d.country.toLowerCase().includes(lower))
})

onClickOutside(guestPopoverRef, () => showGuests.value = false)
onClickOutside(destContainerRef, () => destOpen.value = false)

const selectDest = (dest: any) => {
  location.value = `${dest.city}, ${dest.country}`
  destOpen.value = false
}

const updateGuestCount = (type: string, delta: number) => {
  const cat = type as keyof typeof guests.value
  const current = guests.value[cat]
  if (current + delta >= (type === 'adults' || type === 'rooms' ? 1 : 0)) {
    guests.value[cat] = current + delta
  }
}

const handleSearch = () => {
  if (!location.value || !checkIn.value) return
  isSearching.value = true
  
  // Simulate API call
  setTimeout(() => {
    stayResults.value = [
      { id: 1, name: 'Aman Tokyo', address: 'Otemachi Tower, Tokyo', price: 1250, rating: '5.0' },
      { id: 2, name: 'The Ritz-Carlton, Paris', address: 'Place Vendôme, Paris', price: 1800, rating: '4.9' },
      { id: 3, name: 'Burj Al Arab Jumeirah', address: 'Umm Suqeim, Dubai', price: 2100, rating: '5.0' },
      { id: 4, name: 'The Savoy', address: 'Strand, London', price: 950, rating: '4.8' },
      { id: 5, name: 'Four Seasons Maldives', address: 'Kuda Huraa, Maldives', price: 3400, rating: '5.0' },
      { id: 6, name: 'Hotel Plaza Athénée', address: 'Avenue Montaigne, Paris', price: 1450, rating: '4.9' }
    ]
    isSearching.value = false
  }, 1500)
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
