<template>
  <div class="relative w-full max-w-[1400px] mx-auto z-10 -mt-10">
    <!-- Service Selection Tabs -->
    <div class="flex items-center space-x-1 p-1 bg-gray-100 rounded-full w-fit border border-gray-200 mb-6 mx-auto overflow-x-auto no-scrollbar relative shadow-sm">
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
        :class="activeService === service.id ? 'text-white' : 'text-gray-600 hover:text-primary'"
      >
        <component :is="service.icon" class="h-4 w-4 transition-transform group-hover:scale-125" />
        <span class="text-sm font-black tracking-widest uppercase">{{ service.label }}</span>
      </button>
    </div>

    <!-- Wizard Transition Container -->
    <div class="relative min-h-[400px]">
      <Transition name="page-fade" mode="out-in">
        <div :key="activeService" class="w-full">
          <FlightSearchWizard v-if="activeService === 'flights'" />
          <StaySearchWizard v-else-if="activeService === 'hotels' || activeService === 'luxury-hotels'" :is-luxury="activeService === 'luxury-hotels'" />
          <CarSearchWizard v-else-if="activeService === 'cars'" />
          <TransferSearchWizard v-else-if="activeService === 'transfers'" />
          <TravelInsuranceWizard v-else-if="activeService === 'insurance'" />
          <ActivitySearchWizard v-else-if="activeService === 'activities'" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { 
  PaperAirplaneIcon, 
  HomeModernIcon, 
  StarIcon, 
  KeyIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  RocketLaunchIcon
} from '@heroicons/vue/24/outline'

// Wizards
import FlightSearchWizard from '@/components/flights/FlightSearchWizard.vue'
import StaySearchWizard from '@/components/stays/StaySearchWizard.vue'
import CarSearchWizard from '@/components/cars/CarSearchWizard.vue'
import TransferSearchWizard from '@/components/transfers/TransferSearchWizard.vue'
import TravelInsuranceWizard from '@/components/insurance/TravelInsuranceWizard.vue'
import ActivitySearchWizard from '@/components/activities/ActivitySearchWizard.vue'

const props = defineProps<{
  initialService?: string
}>()

const activeService = ref(props.initialService || 'flights')
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
  { id: 'flights', label: 'Flights', icon: PaperAirplaneIcon },
  { id: 'hotels', label: 'Stays', icon: HomeModernIcon },
  { id: 'luxury-hotels', label: 'Luxury', icon: StarIcon },
  { id: 'cars', label: 'Car Rentals', icon: KeyIcon },
  { id: 'transfers', label: 'Transfers', icon: TruckIcon },
  { id: 'insurance', label: 'Insurance', icon: ShieldCheckIcon },
  { id: 'activities', label: 'Activities', icon: RocketLaunchIcon },
]
</script>

<style scoped>
.page-fade-enter-active, .page-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-fade-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
