<template>
  <div class="bg-white rounded-[2.5rem] border border-gray-200 relative w-full shadow-sm">
    <!-- Premium Header Gradient -->
    <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent -z-10"></div>

    <div class="p-8 lg:p-12">
      <!-- Header Area -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-gray-100">
        <div class="space-y-1">
          <h2 class="text-3xl  text-gray-900 tracking-tight italic">Premium Car Rentals</h2>
          <p class="text-xs font-bold text-gray-400 tracking-widest uppercase">Drive the best vehicles from global providers</p>
        </div>
        
        <div class="flex items-center space-x-6">
          <label class="flex items-center space-x-3 cursor-pointer group">
            <div class="relative w-12 h-6 bg-gray-200 rounded-full transition-colors group-hover:bg-gray-300" :class="driverAgeToggle ? 'bg-primary' : ''">
              <input type="checkbox" v-model="driverAgeToggle" class="sr-only" />
              <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" :class="driverAgeToggle ? 'translate-x-6' : ''"></div>
            </div>
            <span class="text-xs  text-gray-500 tracking-widest uppercase group-hover:text-primary transition-colors">Special Age Requirements</span>
          </label>
        </div>
      </div>

      <!-- Search Inputs Grid -->
      <div class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          <!-- Pick-up Location -->
          <div class="lg:col-span-5 relative" ref="pickUpContainerRef">
            <AnimatedInput 
              v-model="pickUpQuery" 
              label="Pick-up location" 
              :icon="MapPinIcon"
              @focus="pickUpOpen = true"
            />
            <!-- Suggestions Dropdown -->
            <Transition name="slide-up">
              <div v-if="pickUpOpen && filteredPickUp.length" class="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 shadow-2xl rounded-[2rem] z-[9999] max-h-[400px] overflow-y-auto p-3 animate-in fade-in slide-in-from-top-4">
                <button 
                  v-for="loc in filteredPickUp" :key="loc.code"
                  @click="selectPickUp(loc)"
                  class="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group border border-transparent hover:border-gray-100 mb-1"
                >
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <MapPinIcon class="h-6 w-6" />
                    </div>
                    <div class="text-left">
                      <p class="text-sm  text-gray-900 group-hover:text-primary transition-colors">{{ loc.city }}</p>
                      <p class="text-[10px] font-bold text-gray-400">{{ loc.name }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="px-2 py-1 bg-gray-100 rounded text-[10px]  text-gray-500 group-hover:bg-primary group-hover:text-white transition-colors">{{ loc.code }}</span>
                  </div>
                </button>
              </div>
            </Transition>
          </div>

          <!-- Drop-off Location -->
          <div class="lg:col-span-5 relative" ref="dropOffContainerRef">
            <AnimatedInput 
              v-model="dropOffQuery" 
              label="Drop-off location (optional)" 
              :icon="MapPinIcon"
              @focus="dropOffOpen = true"
            />
            <!-- Suggestions Dropdown -->
            <Transition name="slide-up">
              <div v-if="dropOffOpen && filteredDropOff.length" class="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 shadow-2xl rounded-[2rem] z-[9999] max-h-[400px] overflow-y-auto p-3 animate-in fade-in slide-in-from-top-4">
                <button 
                  v-for="loc in filteredDropOff" :key="loc.code"
                  @click="selectDropOff(loc)"
                  class="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group border border-transparent hover:border-gray-100 mb-1"
                >
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                      <MapPinIcon class="h-6 w-6" />
                    </div>
                    <div class="text-left">
                      <p class="text-sm  text-gray-900 group-hover:text-secondary transition-colors">{{ loc.city }}</p>
                      <p class="text-[10px] font-bold text-gray-400">{{ loc.name }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="px-2 py-1 bg-gray-100 rounded text-[10px]  text-gray-500 group-hover:bg-secondary group-hover:text-white transition-colors">{{ loc.code }}</span>
                  </div>
                </button>
              </div>
            </Transition>
          </div>
          
          <!-- Age Input (Conditional) -->
          <div class="lg:col-span-2" v-if="driverAgeToggle">
            <AnimatedInput v-model="driverAge" label="Age" type="number" :icon="UsersIcon" />
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          <div class="lg:col-span-8">
            <DateRangePicker v-model="carRange" />
          </div>
          <div class="lg:col-span-2">
            <AnimatedInput v-model="pickUpTime" label="Pick-up" type="time" :icon="ClockIcon" />
          </div>
          <div class="lg:col-span-2">
            <AnimatedInput v-model="dropOffTime" label="Drop-off" type="time" :icon="ClockIcon" />
          </div>
        </div>
      </div>

      <!-- Bottom Actions -->
      <div class="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-8 border-t border-gray-100">
        <div class="flex items-center space-x-6 text-xs  tracking-widest text-gray-500 uppercase">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <span>Unlimited Mileage</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <span>Free Cancellation</span>
          </div>
        </div>

        <div class="flex items-center space-x-4">
           <button @click="discountToggle = !discountToggle" class="text-xs  tracking-widest text-primary hover:text-primary-dark transition-all uppercase border-b-2 border-primary/20 hover:border-primary pb-1">
            {{ discountToggle ? 'Hide Promo' : 'Add Discount Code' }}
          </button>
          
          <BaseButton 
            @click="handleSearch" 
            :loading="isSearching" 
            variant="primary" 
            size="lg" 
            class="px-12 h-[58px] rounded-[1.5rem]  tracking-[0.2em] text-xs shadow-2xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all"
          >
            <MagnifyingGlassIcon class="h-5 w-5 mr-3" />
            SEARCH VEHICLES
          </BaseButton>
        </div>
      </div>

      <!-- Discount Section -->
      <Transition name="slide-up">
        <div v-if="discountToggle" class="mt-8 p-8 bg-gray-50 rounded-[2rem] border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div class="space-y-4">
            <label class="block text-xs  tracking-[0.2em] text-gray-400 uppercase">Preferred Provider</label>
            <div class="grid grid-cols-4 gap-2">
              <button 
                v-for="brand in carBrands.slice(0, 8)" :key="brand"
                @click="discountBrand = brand"
                class="px-3 py-2 rounded-xl text-[10px]  border border-gray-200 transition-all"
                :class="discountBrand === brand ? 'bg-primary-dark text-white border-primary-dark' : 'bg-white text-gray-500 hover:border-primary/30'"
              >
                {{ brand.toUpperCase() }}
              </button>
            </div>
          </div>
          <div class="space-y-4">
            <label class="block text-xs  tracking-[0.2em] text-gray-400 uppercase">Discount Type</label>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="type in [{id: 'corporate', label: 'Corporate'}, {id: 'coupon', label: 'Coupon'}, {id: 'promo', label: 'Promo'}]" :key="type.id"
                @click="discountType = type.id"
                class="px-4 py-2 rounded-xl text-[10px]  border border-gray-200 transition-all"
                :class="discountType === type.id ? 'bg-secondary text-white border-secondary' : 'bg-white text-gray-500 hover:border-secondary/30'"
              >
                {{ type.label.toUpperCase() }}
              </button>
            </div>
            <p class="text-[10px] font-bold text-gray-400 italic">Discounts will be applied at checkout</p>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Results Section -->
    <Transition name="fade">
      <div v-if="carResults.length > 0" class="border-t border-gray-200 bg-gray-50/50 p-8 lg:p-12">
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-xl  text-gray-900 tracking-tight italic">Available Fleet</h3>
          <div class="flex items-center space-x-2 text-xs font-bold text-gray-500">
            <span>Filter by</span>
            <span class="text-primary  uppercase tracking-widest">Luxury Category</span>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6">
          <div
            v-for="car in carResults"
            :key="car.id"
            class="bg-white border border-gray-200 rounded-[2.5rem] p-8 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-10"
          >
            <!-- Car Image / Icon Area -->
            <div class="flex items-center space-x-8 flex-1">
              <div class="w-32 h-32 bg-gray-50 rounded-[2rem] flex items-center justify-center p-6 border border-gray-100 group-hover:border-primary/20 transition-colors shadow-inner">
                <TruckIcon class="h-12 w-12 text-gray-300 group-hover:text-primary transition-all duration-700 group-hover:scale-110" />
              </div>
              
              <div class="flex-1 space-y-4">
                <div>
                  <h4 class="text-2xl  text-gray-900 tracking-tight italic group-hover:text-primary transition-colors">{{ car.name }}</h4>
                  <div class="flex items-center gap-3 mt-1 uppercase tracking-widest text-[10px] ">
                    <span class="text-primary">{{ car.vendor }}</span>
                    <span class="text-gray-200">•</span>
                    <span class="text-secondary">{{ car.category }}</span>
                  </div>
                </div>

                <div class="flex flex-wrap gap-4">
                  <div v-for="spec in [
                    {label: car.specs?.transmission, icon: '⚙️'},
                    {label: car.specs?.fuel, icon: '⛽'},
                    {label: `${car.capacity?.passengers} Pass`, icon: '👥'},
                    {label: `${car.capacity?.luggage} Bags`, icon: '🧳'}
                  ]" :key="spec.label" class="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100/50">
                    <span class="text-xs">{{ spec.icon }}</span>
                    <span class="text-[10px]  text-gray-500 uppercase tracking-widest">{{ spec.label }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between lg:flex-col lg:items-end lg:justify-center border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-10 shrink-0 space-y-2">
              <div class="text-left lg:text-right">
                <p class="text-[10px]  text-gray-400 uppercase tracking-widest">Total Price</p>
                <p class="text-4xl  text-primary-dark tracking-tighter">${{ car.pricing?.baseRate }}<span class="text-sm font-bold text-gray-400">/day</span></p>
              </div>
              <BaseButton variant="primary" class="rounded-xl px-10 h-12 text-[10px]  tracking-widest shadow-lg active:scale-95 transition-all uppercase">RESERVE VEHICLE</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCars, popularLocations } from '~/composables/modules/cars/useCars'
import { onClickOutside } from '@vueuse/core'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'
import { 
  MapPinIcon, 
  CalendarIcon, 
  ClockIcon, 
  ChevronDownIcon, 
  TruckIcon, 
  UsersIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/vue/24/outline'
import DateRangePicker from '@/components/ui/DateRangePicker.vue'

const { carResults, isSearching, searchCars } = useCars()

const pickUpQuery = ref('')
const selectedPickUp = ref('')
const pickUpOpen = ref(false)

const dropOffQuery = ref('')
const selectedDropOff = ref('')
const dropOffOpen = ref(false)

const carRange = ref({ start: '', end: '' })
const pickUpDate = computed(() => carRange.value.start)
const dropOffDate = computed(() => carRange.value.end)
const pickUpTime = ref('10:30 AM')
const dropOffTime = ref('10:30 AM')

const driverAgeToggle = ref(false)
const driverAge = ref(30)

const discountToggle = ref(false)
const discountBrand = ref('')
const discountType = ref('')

const hasSearched = ref(false)

const pickUpContainerRef = ref(null)
const dropOffContainerRef = ref(null)

onClickOutside(pickUpContainerRef, () => pickUpOpen.value = false)
onClickOutside(dropOffContainerRef, () => dropOffOpen.value = false)

const carBrands = ['Avis', 'Hertz', 'Europcar', 'Enterprise', 'Budget', 'Sixt', 'National', 'Alamo']

const filteredPickUp = computed(() => {
  if (!pickUpQuery.value) return popularLocations
  const lower = pickUpQuery.value.toLowerCase()
  return popularLocations.filter(l => l.city.toLowerCase().includes(lower) || l.code.toLowerCase().includes(lower) || l.name.toLowerCase().includes(lower))
})

const filteredDropOff = computed(() => {
  if (!dropOffQuery.value) return popularLocations
  const lower = dropOffQuery.value.toLowerCase()
  return popularLocations.filter(l => l.city.toLowerCase().includes(lower) || l.code.toLowerCase().includes(lower) || l.name.toLowerCase().includes(lower))
})

const selectPickUp = (loc: any) => {
  pickUpQuery.value = `${loc.city} (${loc.code})`
  selectedPickUp.value = loc.city
  pickUpOpen.value = false
}

const selectDropOff = (loc: any) => {
  dropOffQuery.value = `${loc.city} (${loc.code})`
  selectedDropOff.value = loc.city
  dropOffOpen.value = false
}

const handleSearch = () => {
  if (!selectedPickUp.value || !pickUpDate.value) return
  hasSearched.value = true
  searchCars({
    pickUpLocation: selectedPickUp.value,
    dropOffLocation: selectedDropOff.value || selectedPickUp.value,
    pickUpDate: pickUpDate.value,
    dropOffDate: dropOffDate.value,
    pickUpTime: pickUpTime.value,
    dropOffTime: dropOffTime.value,
    driverAge: driverAgeToggle.value ? driverAge.value : undefined,
    discountBrand: discountBrand.value || undefined,
    discountType: discountType.value || undefined,
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
