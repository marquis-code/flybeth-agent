<template>
  <div class="bg-white border border-gray-100 rounded-[1.5rem] p-4 lg:p-5 hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 group relative overflow-hidden flex flex-col lg:flex-row gap-6 lg:items-center">
    
    <!-- Premium Badge -->
    <div v-if="offer.priceWithCommission < 500" class="absolute top-0 left-8 px-4 py-1.5 bg-emerald-500 text-sm  text-white rounded-b-xl shadow-sm uppercase  z-10">
      Great Value
    </div>

    <!-- 1. Airline Identity & Cabin -->
    <div class="flex items-center lg:flex-col lg:items-center gap-4 lg:w-[140px] shrink-0 text-center">
      <div class="w-12 h-12 lg:w-14 lg:h-14 bg-gray-50 rounded-2xl flex items-center justify-center p-2 border border-gray-100 group-hover:scale-105 transition-transform duration-500">
        <img :src="offer.airlineLogo" :alt="offer.airline" class="w-full h-full object-contain" />
      </div>
      <div class="lg:w-full">
        <h4 class="text-sm  text-gray-900  leading-none uppercase truncate">{{ offer.airline }}</h4>
        <div class="flex items-center justify-center gap-1.5 mt-2">
           <span class="px-1.5 py-0.5 bg-gray-900 text-white text-sm  rounded uppercase er">{{ offer.flightNumbers[0] }}</span>
           <span class="text-sm font-medium text-gray-800 uppercase er">{{ offer.cabinClass.toLowerCase() }}</span>
        </div>
      </div>
    </div>

    <!-- 2. Flight Path (Creative Visualization) -->
    <div class="flex-1 flex items-center justify-between gap-4 lg:gap-8 px-4 lg:px-6 border-y lg:border-y-0 lg:border-x border-gray-50 py-4 lg:py-0">
      <div class="text-left">
        <p class="text-sm font-semibold text-gray-800 uppercase  mb-1">{{ offer.origin }}</p>
        <p class="text-2xl  text-gray-900  leading-none">{{ formatTime(offer.departureTime) }}</p>
      </div>

      <div class="flex-1 flex flex-col items-center">
        <div class="w-full h-px bg-gray-100 relative mb-3">
           <div class="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1 rounded-full bg-gray-200"></div>
           <div class="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-1 rounded-full bg-gray-200"></div>
           <div class="absolute inset-0 flex items-center justify-center">
              <div class="bg-white px-2">
                 <Plane class="h-3 w-3 text-primary/40 rotate-90" />
              </div>
           </div>
        </div>
        <div class="text-center">
           <p class="text-sm  text-gray-900 uppercase  leading-none">{{ formatDuration(offer.duration) }}</p>
           <p class="text-sm font-bold mt-1,5 uppercase er" :class="offer.stops === 0 ? 'text-emerald-500' : 'text-amber-500'">
              {{ offer.stops === 0 ? 'Direct' : `${offer.stops} Stop${offer.stops > 1 ? 's' : ''}` }}
           </p>
        </div>
      </div>

      <div class="text-right">
        <p class="text-sm font-semibold text-gray-800 uppercase  mb-1">{{ offer.destination }}</p>
        <p class="text-2xl  text-gray-900  leading-none">{{ formatTime(offer.arrivalTime) }}</p>
      </div>
    </div>

    <!-- 3. Settlement & Conversion -->
    <div class="lg:w-[220px] shrink-0 flex flex-col lg:items-end justify-center">
      <!-- Action Icons (Share & Love) -->
      <div class="flex items-center gap-3 mb-4">
        <button 
          @click="handleShare" 
          class="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-800 hover:text-primary hover:border-primary/30 transition-all active:scale-90"
          title="Share Offer"
        >
          <Share2 class="h-4 w-4" />
        </button>
        <button 
          @click="toggleFavorite" 
          class="w-9 h-9 rounded-xl border flex items-center justify-center transition-all active:scale-90"
          :class="isLoved ? 'bg-rose-50 border-rose-100 text-rose-500 shadow-sm' : 'bg-gray-50 border-gray-100 text-gray-800 hover:text-rose-500 hover:border-rose-100'"
          title="Save to Wishlist"
        >
          <Heart class="h-4 w-4" :class="{ 'fill-current': isLoved }" />
        </button>
      </div>

      <div class="flex flex-col lg:items-end gap-0.5 mb-4">
        <p class="text-sm font-semibold text-gray-800 uppercase ">Guaranteed Price</p>
        <div class="flex items-baseline gap-0.5">
          <span class="text-[32px]  text-gray-900 er leading-none">{{ formatPrice(offer.priceWithCommission) }}</span>
        </div>
        <div class="flex items-center gap-2 mt-0.5">
           <div class="px-1.5 py-0.5 bg-emerald-50 text-emerald-500 text-sm  rounded uppercase er">
              + {{ formatPrice(offer.priceWithCommission - offer.price) }} Margin
           </div>
        </div>
      </div>

      <button 
        @click="$emit('select', offer)"
        class="w-full lg:w-36 h-12 bg-neutral-900 text-white rounded-xl  text-sm uppercase  hover:bg-primary active:scale-95 transition-all shadow-md shadow-neutral-100 hover:shadow-primary/30"
      >
        Book Now
      </button>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  Plane, Share2, Heart
} from 'lucide-vue-next'
import { useSettings } from '@/composables/useSettings'
import { useCustomToast } from '@/composables/core/useCustomToast'

const props = defineProps({
  offer: { type: Object, required: true }
})

const emit = defineEmits(['select'])
const { formatPrice } = useSettings()
const { showToast } = useCustomToast()

const isLoved = ref(false)

const formatTime = (dateStr: string) => {
  if (!dateStr) return '--:--'
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h ${m}m`
}

const toggleFavorite = async () => {
  isLoved.value = !isLoved.value
  if (isLoved.value) {
    showToast({
      title: 'Offer Saved',
      message: `The ${props.offer.airline} offer has been added to your wishlist.`,
      toastType: 'success'
    })
  }
}

const handleShare = async () => {
  const shareData = {
    title: `Flight Deal: ${props.offer.airline} - ${props.offer.origin} to ${props.offer.destination}`,
    text: `Found an amazing flight deal from ${props.offer.origin} to ${props.offer.destination} for only ${formatPrice(props.offer.priceWithCommission)} with ${props.offer.airline}!`,
    url: window.location.href
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      await navigator.clipboard.writeText(`${shareData.text} \nCheck it out here: ${shareData.url}`)
      showToast({
        title: 'Link Copied',
        message: 'Flight details copied to clipboard for sharing.',
        toastType: 'info'
      })
    }
  } catch (err) {
    console.error('Error sharing', err)
  }
}
</script>

<style scoped>
.rounded-2.5xl {
  border-radius: 1.25rem;
}
</style>
