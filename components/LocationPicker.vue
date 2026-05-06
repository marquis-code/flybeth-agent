<template>
  <div class="relative w-full" ref="pickerRef">

    <!-- ── Trigger row ──────────────────────────────────────────────────────── -->
  <div
    class="w-full cursor-pointer flex flex-col justify-center select-none"
    :class="[
      variant === 'minimal' ? 'min-h-0 px-0 pt-0 pb-0' : 'px-4 pt-3 pb-2 min-h-[68px] shadow-sm',
      showDropdown ? (variant === 'minimal' ? '' : 'bg-blue-50/40') : (variant === 'minimal' ? '' : 'hover:bg-gray-50/60')
    ]"
    @click="openDropdown"
  >
    <p
      v-if="label && variant !== 'minimal'"
      class="text-sm    mb-0.5 transition-colors"
      :class="showDropdown ? 'text-gray-900' : 'text-neutral-400 group-hover:text-gray-900'"
    >
      {{ label }}
    </p>

      <div v-if="selectedLocationName && !showDropdown" class="flex items-baseline gap-1.5 min-w-0">
        <span class="text-sm font-bold text-gray-900 leading-tight truncate">
          {{ selectedLocationName }}
        </span>
        <span class="text-sm  text-primary shrink-0">{{ modelValue }}</span>
      </div>

      <!-- Empty placeholder -->
      <div v-else class="flex items-center gap-2">
        <MapPin
          class="h-4 w-4 shrink-0 transition-colors"
          :class="showDropdown ? 'text-gray-900' : 'text-gray-800'"
        />
        <span class="text-sm font-medium text-gray-800">
          {{ placeholder || 'Search city or airport...' }}
        </span>
      </div>

      <p v-if="selectedLocationSub && !showDropdown" class="text-sm text-neutral-400 font-bold mt-0.5 truncate uppercase tracking-tight">
        {{ selectedLocationSub }}
      </p>
    </div>

    <!-- ── Dropdown Container ────────────────────────────────────────────────── -->
    <Teleport to="body">
      <Transition name="dropdown">
        <div v-if="showDropdown" class="fixed z-[10011]">
          
          <!-- Backdrop for closing -->
          <div class="fixed inset-0 bg-transparent" @click="closeDropdown" />

          <!-- Card -->
          <div
            :style="cardStyle"
            class="fixed bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden transition-all animate-in fade-in slide-in-from-top-4 duration-300"
            :class="[
               isMobile ? 'inset-x-4 top-1/2 -translate-y-1/2 w-auto' : 'w-[480px]'
            ]"
            @click.stop
          >
            <!-- Search input -->
            <div class="px-4 py-3">
              <div class="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus-within:border-primary transition-all">
                <SearchIcon class="h-4 w-4 text-gray-800 shrink-0" />
                <input
                  ref="searchInputRef"
                  v-model="searchQuery"
                  :placeholder="placeholder || 'Search city or airport...'"
                  class="flex-1 bg-transparent outline-none text-sm font-bold text-gray-900 placeholder:text-gray-800 placeholder:font-medium"
                  @input="onSearchInput"
                  @keydown.escape="closeDropdown"
                />
                <div v-if="isLoading" class="shrink-0">
                  <div class="animate-spin h-5 w-5 border-2 border-gray-200 border-t-gray-900 rounded-full" />
                </div>
                <button
                  v-else-if="searchQuery"
                  @click.stop="clearSearch"
                  class="shrink-0 h-6 w-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                >
                  <X class="h-3.5 w-3.5 text-gray-800" />
                </button>
              </div>
            </div>

            <!-- Detect location -->
            <div
              @click="detectLocation"
              class="flex items-center gap-3 mx-4 mb-3 px-4 py-3 rounded-xl hover:bg-primary/5 cursor-pointer transition-all group/detect border border-gray-100 hover:border-primary/20 hover:shadow-sm"
            >
              <div class="h-8 w-8 rounded-lg bg-gray-100 group-hover/detect:bg-primary flex items-center justify-center shrink-0 transition-all">
                <svg class="h-4 w-4 text-gray-800 group-hover/detect:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
                </svg>
              </div>
              <div class="min-w-0">
                <p class="text-sm  text-gray-900 uppercase tracking-widest leading-none">Detect My Location</p>
                <p class="text-sm text-gray-800 font-bold mt-1 uppercase tracking-tighter">Instant proximity lookup</p>
              </div>
            </div>

            <div class="h-px bg-gray-50" />

            <!-- Search results -->
            <div v-if="results.length" class="max-h-[380px] overflow-y-auto no-scrollbar">
              <div class="px-6 pt-5 pb-2">
                <p class="text-sm font-semibold text-gray-800 uppercase ">Nearby Airports & Cities</p>
              </div>
              <div
                v-for="res in results"
                :key="res.iataCode"
                @click="selectAmadeusResult(res)"
                class="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-all group/item border-b border-gray-50/50 last:border-0"
              >
                <div class="h-10 w-10 rounded-xl bg-gray-50 group-hover/item:bg-primary/10 flex items-center justify-center shrink-0 transition-all">
                  <Plane class="h-5 w-5 text-gray-800 group-hover/item:text-primary transition-colors" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[15px] font-bold text-gray-900 group-hover/item:text-primary transition-colors truncate">
                    {{ res.address?.cityName || res.name }}, {{ res.address?.countryName || res.address?.countryCode }}
                  </p>
                  <p class="text-sm text-gray-800 font-bold truncate mt-1">
                    {{ res.name }}{{ res.subType === 'AIRPORT' ? ' Airport' : '' }}
                  </p>
                </div>
                <div class="px-3 py-1.5 bg-gray-50 rounded-lg group-hover/item:bg-primary group-hover:text-white transition-all">
                  <span class="text-sm  text-gray-800 group-hover:text-white transition-colors">
                    {{ res.iataCode }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Loading -->
            <div v-else-if="isLoading" class="py-16 text-center">
              <div class="animate-spin h-8 w-8 border-3 border-gray-100 border-t-primary rounded-full mx-auto mb-4" />
              <p class="text-sm font-semibold text-gray-800 uppercase tracking-widest">Scanning Global Database...</p>
            </div>

            <!-- No results -->
            <div v-else-if="!isLoading && searchQuery.length >= 2" class="py-16 text-center">
              <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin class="h-8 w-8 text-gray-600" />
              </div>
              <p class="text-sm  text-gray-900 uppercase tracking-widest">No Matches Found</p>
              <p class="text-sm text-gray-800 mt-2 font-bold px-10">Try searching for a different city or airport code.</p>
            </div>

            <!-- Suggestions -->
            <div v-else class="pb-4">
              <div class="px-6 pt-5 pb-2">
                <p class="text-sm font-semibold text-gray-800 uppercase ">Popular Gateways</p>
              </div>
              <div class="grid grid-cols-2 gap-2 px-4">
                <div
                  v-for="dest in suggestions"
                  :key="dest.iataCode"
                  @click="selectSuggestion(dest)"
                  class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-2xl cursor-pointer transition-all group/sug border border-transparent hover:border-gray-100"
                >
                  <div class="h-9 w-9 rounded-xl bg-gray-50 group-hover/sug:bg-primary/10 flex items-center justify-center shrink-0 transition-all">
                    <MapPin class="h-4 w-4 text-gray-800 group-hover/sug:text-primary" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-[13px]  text-gray-800 group-hover/sug:text-gray-900 transition-colors truncate">
                      {{ dest.city }}
                    </p>
                    <p class="text-sm  text-primary  tracking-widest">{{ dest.iataCode }}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { MapPin, Search as SearchIcon, X, Plane } from 'lucide-vue-next'
import { useAmadeusLocations } from '@/composables/modules/flights/useAmadeusLocations'

const props = defineProps({
  modelValue:  { type: String, default: '' },
  label:       { type: String, default: '' },
  placeholder: { type: String, default: '' },
  id:          { type: String, default: '' },
  variant:     { type: String, default: '' },
})

const emit = defineEmits<{
  'update:modelValue': [v: string]
  select: [payload: any]
  focus:  []
  close:  []
}>()

const { locations: results, loading: isLoading, searchLocations, detectNearestAirports } = useAmadeusLocations()

const pickerRef       = ref<HTMLElement | null>(null)
const searchInputRef  = ref<HTMLInputElement | null>(null)
const showDropdown    = ref(false)
const isMobile        = ref(false)

const checkMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
  }
}

const searchQuery          = ref('')
const selectedLocationName = ref('')
const selectedLocationSub  = ref('')
const cardStyle            = ref<Record<string, string>>({})

const locationCache = new Map<string, { name: string; sub: string }>()

const suggestions = [
  { city: 'Lagos',        iataCode: 'LOS', name: 'Murtala Muhammed Int\'l',    subType: 'AIRPORT' },
  { city: 'Abuja',        iataCode: 'ABV', name: 'Nnamdi Azikiwe Int\'l',       subType: 'AIRPORT' },
  { city: 'Dubai',        iataCode: 'DXB', name: 'Dubai International',         subType: 'AIRPORT' },
  { city: 'London',       iataCode: 'LON', name: 'All London Airports',         subType: 'CITY'    },
  { city: 'Portharcourt', iataCode: 'PHC', name: 'Port Harcourt International', subType: 'AIRPORT' },
  { city: 'Johannesburg', iataCode: 'JNB', name: 'OR Tambo International',      subType: 'AIRPORT' },
  { city: 'Accra',        iataCode: 'ACC', name: 'Kotoka International',        subType: 'AIRPORT' },
  { city: 'Istanbul',     iataCode: 'IST', name: 'Istanbul Airport',            subType: 'AIRPORT' },
]

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const onSearchInput = () => {
  if (debounceTimer) clearTimeout(debounceTimer)
  if (!searchQuery.value || searchQuery.value.length < 2) {
    results.value = []
    return
  }
  debounceTimer = setTimeout(() => searchLocations(searchQuery.value), 280)
}

const clearSearch = () => {
  searchQuery.value = ''
  results.value = []
  searchInputRef.value?.focus()
}

const updateCardPosition = () => {
  if (isMobile.value) return
  if (!pickerRef.value) return
  const rect      = pickerRef.value.getBoundingClientRect()
  const cardWidth = 480
  let   left      = rect.left
  if (left + cardWidth > window.innerWidth - 12) left = window.innerWidth - cardWidth - 12
  if (left < 12) left = 12
  cardStyle.value = {
    top:  `${rect.bottom + 8}px`,
    left: `${left}px`,
  }
}

const openDropdown = () => {
  checkMobile()
  updateCardPosition()
  showDropdown.value = true
  emit('focus')
  nextTick(() => searchInputRef.value?.focus())
}

const closeDropdown = () => {
  showDropdown.value = false
  searchQuery.value  = ''
  results.value      = []
  emit('close')
}

const selectAmadeusResult = (location: any) => {
  const iataCode = location.iataCode || location.address?.cityCode || location.address?.iataCode
  const cityName = location.address?.cityName || location.name
  const sub      = `${location.name || ''}${location.subType === 'AIRPORT' ? ' Airport' : ''}`.trim()

  locationCache.set(iataCode, { name: cityName, sub })
  selectedLocationName.value = cityName
  selectedLocationSub.value  = sub

  emit('update:modelValue', iataCode)
  emit('select', { iataCode, cityName, name: location.name, subType: location.subType })

  closeDropdown()
}

const selectSuggestion = (dest: { city: string; iataCode: string; name: string; subType: string }) => {
  locationCache.set(dest.iataCode, { name: dest.city, sub: dest.name })
  selectedLocationName.value = dest.city
  selectedLocationSub.value  = dest.name

  emit('update:modelValue', dest.iataCode)
  emit('select', { iataCode: dest.iataCode, cityName: dest.city, name: dest.name, subType: dest.subType })

  closeDropdown()
}

const detectLocation = () => {
  if (!('geolocation' in navigator)) return
  isLoading.value = true
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const data = await detectNearestAirports(pos.coords.latitude, pos.coords.longitude)
        if (data?.length) selectAmadeusResult(data[0])
      } finally { isLoading.value = false }
    },
    () => { isLoading.value = false }
  )
}

watch(
  () => props.modelValue,
  (val) => {
    if (!val) {
      selectedLocationName.value = ''
      selectedLocationSub.value  = ''
      return
    }
    const cached = locationCache.get(val)
    const sug    = suggestions.find(s => s.iataCode === val)
    if (cached)   { selectedLocationName.value = cached.name; selectedLocationSub.value = cached.sub }
    else if (sug) { selectedLocationName.value = sug.city;    selectedLocationSub.value = sug.name   }
    else          { selectedLocationName.value = val;         selectedLocationSub.value = ''          }
  },
  { immediate: true }
)

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  window.addEventListener('scroll', updateCardPosition, true)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  window.removeEventListener('scroll', updateCardPosition, true)
  if (debounceTimer) clearTimeout(debounceTimer)
})
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active { transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1); }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
