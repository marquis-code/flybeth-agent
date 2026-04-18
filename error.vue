<template>
  <div class="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-6 relative overflow-hidden font-sans">
    <!-- Animated Gradient Background -->
    <div class="absolute inset-0 z-0">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-pulse-slow"></div>
    </div>

    <!-- Glassmorphic Card -->
    <div class="relative z-10 w-full max-w-2xl bg-white/60 backdrop-blur-3xl border border-white/40 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(25,33,81,0.1)] overflow-hidden">
      <!-- Top Accent -->
      <div class="h-2 w-full bg-gradient-to-r from-primary via-secondary to-primary-dark"></div>
      
      <div class="p-12 md:p-16 text-center space-y-10">
        <!-- Error Status Code (Floating) -->
        <div class="relative inline-block">
          <h1 class="text-[12rem] md:text-[16rem] font-black text-primary-dark/5 leading-none er select-none">
            {{ error?.statusCode || '404' }}
          </h1>
          <div class="absolute inset-0 flex items-center justify-center">
             <div class="w-32 h-32 md:w-48 md:h-48 bg-white rounded-full shadow-2xl flex items-center justify-center border border-gray-50 transform hover:scale-110 transition-transform duration-700 group">
                <span class="text-6xl md:text-8xl group-hover:rotate-12 transition-transform">{{ errorIcon }}</span>
             </div>
          </div>
        </div>

        <!-- Text Content -->
        <div class="space-y-4 max-w-md mx-auto">
          <h2 class="text-3xl md:text-4xl font-black text-gray-900  leading-tight">
            {{ errorTitle }}
          </h2>
          <p class="text-neutral-500 font-medium leading-relaxed">
            {{ errorMessage }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            @click="handleError"
            class="w-full sm:w-auto px-10 py-4 bg-primary-dark text-white rounded-2xl font-bold text-sm   shadow-xl shadow-primary/20 hover:bg-black hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <HomeIcon class="h-5 w-5" />
            Back to Safety
          </button>
          <button 
            @click="isSupportModalOpen = true"
            class="w-full sm:w-auto px-10 py-4 bg-white/50 border border-white text-gray-900 rounded-2xl font-bold text-sm   hover:bg-white hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <ChatBubbleLeftRightIcon class="h-5 w-5 text-secondary" />
            Contact Support
          </button>
        </div>

        <!-- System Message -->
        <div class="pt-8 flex flex-col items-center">
            <div class="h-px w-24 bg-gray-200 mb-6"></div>
            <p class="text-[10px]  font-black  text-neutral-400 opacity-60">
              Flybeth Node: {{ nodeID }}
            </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { HomeIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  error: Object
})

const isSupportModalOpen = ref(false)
const nodeID = ref(`AGENT-PRIME-${Math.floor(Math.random() * 9999)}`)

const errorTitle = computed(() => {
  if (props.error?.statusCode === 404) return 'Destination Not Found'
  if (props.error?.statusCode === 500) return 'System Turbulence'
  return 'Unexpected Departure'
})

const errorMessage = computed(() => {
  if (props.error?.statusCode === 404) {
    return "The page you're looking for has been moved or doesn't exist in our current flight plan."
  }
  return "We've encountered some unexpected system turbulence. Our ground crew has been notified and is on the case."
})

const errorIcon = computed(() => {
  if (props.error?.statusCode === 404) return '🧭'
  if (props.error?.statusCode === 401) return '🔐'
  return '⚠️'
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 0.1; }
  50% { transform: scale(1.1); opacity: 0.15; }
}
.animate-pulse-slow {
  animation: pulse-slow 8s infinite ease-in-out;
}
</style>
