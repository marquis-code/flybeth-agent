<template>
  <Transition name="fade">
    <div 
      v-if="isLoading" 
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/60 backdrop-blur-xl"
    >
      <div class="relative flex flex-col items-center justify-center scale-110">
        <!-- Outer pulsing rings -->
        <div class="absolute w-32 h-32 bg-primary/10 rounded-full animate-ping opacity-75"></div>
        <div class="absolute w-24 h-24 bg-primary/20 rounded-full animate-pulse"></div>
        
        <!-- Logo Container -->
        <div class="relative z-10 w-20 h-20 bg-white shadow-2xl shadow-primary/20 rounded-2xl flex items-center justify-center p-4">
          <img src="~/assets/img/logo.png" alt="Flybeth Loading..." class="w-12 h-12 object-contain animate-bounce-subtle" />
        </div>

        <div class="mt-8 text-center space-y-1">
          <p class="text-sm    text-primary-dark">Processing</p>
          <p class="text-xs font-medium text-neutral-500">Secure connection established...</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useGlobalLoader } from '~/composables/core/useGlobalLoader'

const { isLoading } = useGlobalLoader()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}
</style>
