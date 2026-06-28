<template>
  <Transition name="fade-scale">
    <div v-if="show" class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-hidden" @click.self="$emit('close')">
      <div class="bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] w-full max-w-lg flex flex-col relative overflow-hidden transition-all duration-500">
        <!-- Close Button -->
        <button 
          @click="$emit('close')" 
          class="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition-colors z-[60] group"
        >
          <X class="h-5 w-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
        </button>

        <!-- Compact Header & Tab Switcher -->
        <div class="pt-8 px-8 pb-4 border-b border-gray-50">
          <h2 class="text-sm  text-gray-400   mb-6">Pipeline Preferences</h2>
          <div class="flex bg-gray-100 p-1.5 rounded-2xl">
            <button 
              class="flex-1 py-3 text-sm    rounded-xl transition-all duration-500 bg-white text-primary shadow-sm"
            >
              Currency
            </button>
          </div>
        </div>

        <!-- Scrollable Content -->
        <div class="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-grow min-h-[300px] max-h-[50vh]">
          <!-- Currency Selection -->
          <div class="animate-in">
            <div class="grid grid-cols-3 gap-3">
              <button 
                v-for="currency in currencies" 
                :key="currency.code"
                @click="setCurrency(currency.code)"
                class="flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all group relative"
                :class="currentCurrency.code === currency.code ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-primary/50 hover:bg-gray-50'"
              >
                <img :src="currency.flag" class="h-4 w-6 object-cover rounded shadow-sm mb-2 border border-gray-100" />
                <div class="text-sm font-bold text-gray-900">{{ currency.code }}</div>
                <div class="text-sm text-gray-400 font-bold ">{{ currency.symbol }}</div>
                
                <div v-if="currentCurrency.code === currency.code" class="absolute top-2 right-2">
                   <Check class="h-3 w-3 text-primary" />
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Compact Footer Action -->
        <div class="px-8 py-5 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
           <p class="text-sm  text-gray-400   text-center sm:text-left">
             Update your settlement currency for current pipeline
           </p>
           <button 
             @click="$emit('close')" 
             class="w-full sm:w-auto px-10 py-3 bg-neutral-900 text-white text-sm    rounded-full shadow-xl shadow-neutral-100 hover:scale-105 active:scale-95 transition-all "
           >
              Apply Changes
           </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { X, Check } from 'lucide-vue-next'
import { useSettings } from '@/composables/useSettings'

defineProps({
  show: Boolean
})

defineEmits(['close'])

const { currentCurrency, currencies, setCurrency } = useSettings()
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.98) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.animate-in {
  animation: fadeInScale 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
