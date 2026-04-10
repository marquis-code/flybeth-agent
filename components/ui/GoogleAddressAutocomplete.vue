<template>
  <div class="relative w-full group">
    <div class="absolute -top-2.5 left-4 px-2 bg-white text-[10px]  uppercase tracking-widest text-brand-gray/40 z-10 transition-colors group-focus-within:text-secondary">
      {{ label }}
    </div>
    <div class="relative">
      <MapPinIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray/20 group-focus-within:text-secondary transition-colors" />
      <input
        ref="inputRef"
        type="text"
        v-model="searchQuery"
        :placeholder="placeholder"
        class="w-full pl-12 pr-4 py-4 bg-white border border-neutral-100 rounded-2xl outline-none focus:border-secondary transition-all text-sm font-medium hover:border-neutral-200"
        @focus="handleFocus"
      />
    </div>
    
    <!-- Custom Dropdown UI -->
    <div v-if="suggestions.length > 0 && isFocused" class="absolute left-0 right-0 top-full mt-2 bg-white border border-neutral-100 rounded-2xl shadow-2xl shadow-neutral-200/50 z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-300">
      <button
        v-for="suggestion in suggestions"
        :key="suggestion.place_id"
        @click="selectSuggestion(suggestion)"
        class="w-full px-6 py-3 flex items-start space-x-3 hover:bg-neutral-50 transition-colors text-left group/item"
      >
        <div class="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0 group-hover/item:bg-secondary/10 transition-colors">
          <MapPinIcon class="w-4 h-4 text-brand-gray/40 group-hover/item:text-secondary" />
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-bold text-primary-dark">{{ suggestion.structured_formatting.main_text }}</span>
          <span class="text-[11px] text-neutral-400 font-medium">{{ suggestion.structured_formatting.secondary_text }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { MapPinIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  modelValue: string
  label: string
  placeholder?: string
  apiKey: string
}>()

const emit = defineEmits(['update:modelValue', 'address-selected'])

const inputRef = ref<HTMLInputElement | null>(null)
const searchQuery = ref(props.modelValue)
const suggestions = ref<any[]>([])
const isFocused = ref(false)

let autocompleteService: any = null
let placesService: any = null

const loadGoogleMaps = () => {
  const win = window as any
  if (win.google && win.google.maps && win.google.maps.places) {
    initServices()
    return
  }

  if (document.getElementById('google-maps-script')) return

  const script = document.createElement('script')
  script.id = 'google-maps-script'
  script.src = `https://maps.googleapis.com/maps/api/js?key=${props.apiKey}&libraries=places`
  script.async = true
  script.defer = true
  script.onload = () => initServices()
  document.head.appendChild(script)
}

const initServices = () => {
  const win = window as any
  autocompleteService = new win.google.maps.places.AutocompleteService()
  placesService = new win.google.maps.places.PlacesService(document.createElement('div'))
}

const getSuggestions = (query: string) => {
  if (!query || query.length < 3 || !autocompleteService) {
    suggestions.value = []
    return
  }

  autocompleteService.getPlacePredictions(
    { input: query },
    (predictions: any, status: any) => {
      const win = window as any
      if (status === win.google.maps.places.PlacesServiceStatus.OK && predictions) {
        suggestions.value = predictions
      } else {
        suggestions.value = []
      }
    }
  )
}

const selectSuggestion = (suggestion: any) => {
  searchQuery.value = suggestion.description
  suggestions.value = []
  isFocused.value = false
  
  if (placesService) {
    placesService.getDetails(
      { placeId: suggestion.place_id, fields: ['formatted_address', 'geometry', 'address_components'] },
      (place: any, status: any) => {
        const win = window as any
        if (status === win.google.maps.places.PlacesServiceStatus.OK) {
          emit('update:modelValue', place.formatted_address)
          emit('address-selected', {
            address: place.formatted_address,
            coordinates: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            },
            components: place.address_components
          })
        }
      }
    )
  }
}

const handleFocus = () => {
  isFocused.value = true
}

// Click outside handling
onMounted(() => {
  loadGoogleMaps()
  window.addEventListener('click', (e) => {
    if (inputRef.value && !inputRef.value.contains(e.target as Node)) {
      setTimeout(() => {
        isFocused.value = false
      }, 200)
    }
  })
})

watch(() => props.modelValue, (newVal) => {
  if (newVal !== searchQuery.value) {
    searchQuery.value = newVal
  }
})

watch(searchQuery, (newVal) => {
  getSuggestions(newVal)
})
</script>

<style scoped>
.animate-in {
  animation: animate-in 0.2s ease-out;
}

@keyframes animate-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
