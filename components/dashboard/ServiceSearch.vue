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
          <StaySearchWizard v-if="activeService === 'properties'" />
          <FlightSearchWizard v-else-if="activeService === 'flights'" />
          <PackageSearchWizard v-else-if="activeService === 'packages'" />
          <CarSearchWizard v-else-if="activeService === 'cars'" />
          <ActivitySearchWizard v-else-if="activeService === 'activities'" />
          <TransferSearchWizard v-else-if="activeService === 'airport-transfers'" />
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
  BuildingOffice2Icon,
  ShoppingBagIcon,
  KeyIcon, 
  RocketLaunchIcon,
  TruckIcon
} from '@heroicons/vue/24/outline'

// Wizards
import FlightSearchWizard from '@/components/flights/FlightSearchWizard.vue'
import StaySearchWizard from '@/components/stays/StaySearchWizard.vue'
import PackageSearchWizard from '@/components/packages/PackageSearchWizard.vue'
import CarSearchWizard from '@/components/cars/CarSearchWizard.vue'
import TransferSearchWizard from '@/components/transfers/TransferSearchWizard.vue'
import ActivitySearchWizard from '@/components/activities/ActivitySearchWizard.vue'

const props = defineProps<{
  initialService?: string
}>()

const activeService = ref(props.initialService || 'properties')
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
  { id: 'properties', label: 'Properties', icon: BuildingOffice2Icon },
  { id: 'flights', label: 'Flights', icon: PaperAirplaneIcon },
  { id: 'packages', label: 'Packages', icon: ShoppingBagIcon },
  { id: 'cars', label: 'Cars', icon: KeyIcon },
  { id: 'activities', label: 'Activities', icon: RocketLaunchIcon },
  { id: 'airport-transfers', label: 'Airport transfers', icon: TruckIcon },
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
