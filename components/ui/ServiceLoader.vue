<template>
  <Transition
    enter-active-class="transition duration-500 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="show" class="fixed inset-0 z-[999] flex items-center justify-center bg-white/95 backdrop-blur-xl">
      <div class="flex flex-col items-center max-w-md w-full px-6">
        <!-- Logo Animation -->
        <div class="relative w-24 h-24 mb-12">
          <div class="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-20"></div>
          <div class="absolute inset-0 bg-secondary/10 rounded-full animate-pulse delay-75"></div>
          <img src="@/assets/img/logo.png" class="relative z-10 w-full h-full object-contain" alt="Flybeth" />
        </div>

        <!-- Service Info -->
        <div class="text-center space-y-4">
          <h3 class="text-2xl  text-primary-dark tracking-widest animate-pulse">
            {{ serviceTitle }}
          </h3>
          <p class="text-neutral/60 font-medium">
            {{ serviceDetail }}
          </p>
        </div>

        <!-- Progress Bar -->
        <div class="mt-12 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div class="h-full bg-secondary w-full origin-left animate-progress"></div>
        </div>

        <!-- Fact/Info Box -->
        <div class="mt-8 p-6 bg-primary/5 rounded-3xl border border-primary/10">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
              <InformationCircleIcon class="h-6 w-6 text-primary" />
            </div>
            <div>
              <p class="text-sm  text-primary tracking-[0.2em] mb-1">Traveler tip</p>
              <p class="text-xs text-neutral/80 font-medium leading-relaxed">
                {{ currentTip }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  service: {
    type: String,
    default: 'General'
  }
})

const tips = [
  "Flybeth offers exclusive unlisted fares for group bookings of 10+ people.",
  "Agents can earn double points on luxury hotel bookings this month.",
  "Suggest travel insurance during checkout for easier one-click protection.",
  "Flybeth's global support is available 24/7 for you and your clients."
]

const currentTip = ref(tips[Math.floor(Math.random() * tips.length)])

const serviceTitle = computed(() => {
  switch (props.service) {
    case 'Flights': return 'Searching best fares'
    case 'Hotels': return 'Finding premium stays'
    case 'Cars': return 'Checking availability'
    default: return 'Loading service'
  }
})

const serviceDetail = computed(() => {
  switch (props.service) {
    case 'Flights': return 'Aggregating results from 400+ airlines worldwide...'
    case 'Hotels': return 'Verifying special agent rates at 1M+ properties...'
    case 'Cars': return 'Fetching real-time inventory from global partners...'
    default: return 'Perfecting your travel management experience...'
  }
})
</script>

<style scoped>
@keyframes progress {
  0% { transform: scaleX(0); }
  50% { transform: scaleX(0.7); }
  100% { transform: scaleX(1); }
}
.animate-progress {
  animation: progress 2.5s infinite ease-in-out;
}
</style>
