<template>
  <div class="relative w-full" ref="pickerRef">

    <!-- ── Trigger row ──────────────────────────────────────────────────────── -->
    <div
      class="w-full cursor-pointer flex flex-col justify-center select-none"
      :class="[
        variant === 'minimal' ? 'min-h-0 px-0 pt-0 pb-0' : 'px-4 pt-3 pb-2 min-h-[68px]',
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
          {{ placeholder || 'Search city...' }}
        </span>
      </div>

      <p v-if="selectedLocationSub && !showDropdown" class="text-sm text-neutral-400 font-bold mt-0.5 truncate uppercase tracking-tight">
        {{ selectedLocationSub }}
      </p>
    </div>

    <Teleport to="body">
      <Transition name="loc-fade">
        <div v-if="showDropdown" class="fixed z-[10011]">

          <!-- Backdrop -->
          <div
            class="fixed inset-0 bg-transparent"
            @click="closeDropdown"
          />

          <!-- Card -->
          <div
            :style="cardStyle"
            class="fixed bg-white rounded-2xl border border-gray-100 shadow-2xl transition-all"
            :class="[
              isMobile ? 'inset-x-4 top-1/2 -translate-y-1/2 w-auto' : 'w-[480px]'
            ]"
            @click.stop
          >

            <!-- Search input -->
            <div class="p-4 pb-3">
              <div class="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus-within:border-primary transition-all">
                <SearchIcon class="h-[18px] w-[18px] text-gray-800 shrink-0" />
                <input
                  ref="searchInputRef"
                  v-model="searchQuery"
                  :placeholder="placeholder || 'Search city...'"
                  class="flex-1 bg-transparent outline-none text-sm font-bold text-gray-900 placeholder:text-gray-800 placeholder:font-normal"
                  @input="onSearchInput"
                  @keydown.escape="closeDropdown"
                />
                <div v-if="isLoading" class="shrink-0">
                  <div class="animate-spin h-4 w-4 border-2 border-gray-200 border-t-gray-900 rounded-full" />
                </div>
                <button
                  v-else-if="searchQuery"
                  @click.stop="clearSearch"
                  class="shrink-0 h-5 w-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                >
                  <X class="h-3.5 w-3.5 text-gray-800" />
                </button>
              </div>
            </div>

            <div class="h-px bg-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)]" />

            <!-- Search results -->
            <div v-if="results.length" class="max-h-[340px] overflow-y-auto rounded-b-2xl no-scrollbar">
              <p class="px-5 pt-3 pb-1.5 text-sm  text-neutral-400 uppercase tracking-widest">
                Cities
              </p>
              <div
                v-for="res in results"
                :key="res.iataCode"
                @click="selectAmadeusResult(res)"
                class="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors group/item border-b border-gray-50 last:border-0"
              >
                <div class="h-9 w-9 rounded-xl bg-gray-50 group-hover/item:bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
                  <MapPin class="w-[18px] h-[18px] text-gray-800 group-hover/item:text-primary transition-colors" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-gray-900 group-hover/item:text-primary transition-colors truncate">
                    {{ res.address?.cityName || res.name }}, {{ res.address?.countryName || res.address?.countryCode }}
                  </p>
                  <p class="text-sm text-neutral-400 font-bold truncate mt-0.5 uppercase tracking-tighter">
                    {{ res.name }}
                  </p>
                </div>
                <span class="text-sm font-semibold text-gray-800 group-hover/item:text-primary transition-colors shrink-0 ml-2">
                  {{ res.iataCode }}
                </span>
              </div>
            </div>

            <!-- Loading -->
            <div v-else-if="isLoading" class="py-10 text-center rounded-b-2xl">
              <div class="animate-spin h-6 w-6 border-2 border-gray-200 border-t-primary rounded-full mx-auto mb-3" />
              <p class="text-sm text-neutral-400  uppercase tracking-widest">Searching cities...</p>
            </div>

            <!-- No results -->
            <div v-else-if="!isLoading && searchQuery.length >= 2" class="py-10 text-center rounded-b-2xl">
              <MapPin class="h-8 w-8 text-gray-100 mx-auto mb-3" />
              <p class="text-sm text-gray-800  uppercase tracking-widest">No results for "{{ searchQuery }}"</p>
            </div>

            <!-- Popular destinations -->
            <div v-else class="pb-3 rounded-b-2xl">
              <p class="px-5 pt-3 pb-2 text-sm  text-neutral-400 uppercase tracking-widest">
                Popular Destinations
              </p>
              <div class="grid grid-cols-2 gap-0">
                <div
                  v-for="dest in suggestions"
                  :key="dest.iataCode"
                  @click="selectSuggestion(dest)"
                  class="flex items-center gap-3 px-5 py-3 hover:bg-primary/5 cursor-pointer transition-colors group/sug"
                >
                  <div class="h-8 w-8 rounded-lg bg-gray-50 group-hover/sug:bg-primary/10 flex items-center justify-center shrink-0 transition-all">
                    <MapPin class="h-[15px] w-[15px] text-gray-800 group-hover/sug:text-primary" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-bold text-gray-800 group-hover/sug:text-gray-900 transition-colors truncate leading-tight">
                      {{ dest.city }}
                    </p>
                    <p class="text-sm  text-primary  tracking-widest uppercase">{{ dest.iataCode }}</p>
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
import { MapPin, Search as SearchIcon, X } from 'lucide-vue-next'
import { useCitySearch } from '@/composables/modules/experiences/useCitySearch'

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

const { locations: results, loading: isLoading, searchCities: searchLocations } = useCitySearch()

const pickerRef       = ref<HTMLElement | null>(null)
const searchInputRef  = ref<HTMLInputElement | null>(null)
const showDropdown    = ref(false)
const cardStyle       = ref<Record<string, string>>({})
const isMobile        = ref(false)

const checkMobile = () => { if (typeof window !== 'undefined') isMobile.value = window.innerWidth < 768 }

const searchQuery          = ref('')
const selectedLocationName = ref('')
const selectedLocationSub  = ref('')

const locationCache = new Map<string, { name: string; sub: string }>()

const suggestions = [
  { city: 'Paris',        iataCode: 'PAR', name: 'Paris',                subType: 'CITY' },
  { city: 'London',       iataCode: 'LON', name: 'London',               subType: 'CITY' },
  { city: 'New York',     iataCode: 'NYC', name: 'New York',             subType: 'CITY' },
  { city: 'Dubai',        iataCode: 'DXB', name: 'Dubai',                subType: 'CITY' },
  { city: 'Rome',         iataCode: 'ROM', name: 'Rome',                 subType: 'CITY' },
  { city: 'Tokyo',        iataCode: 'TYO', name: 'Tokyo',                subType: 'CITY' },
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
  cardStyle.value = { top:  `${rect.bottom + 8}px`, left: `${left}px` }
}

const openDropdown = () => { checkMobile(); updateCardPosition(); showDropdown.value = true; emit('focus'); nextTick(() => searchInputRef.value?.focus()) }
const closeDropdown = () => { showDropdown.value = false; searchQuery.value  = ''; results.value      = []; emit('close') }

const selectAmadeusResult = (location: any) => {
  const iataCode = location.iataCode || location.address?.cityCode || location.address?.iataCode
  const cityName = location.address?.cityName || location.name
  const sub      = `${location.name || ''}`.trim()
  locationCache.set(iataCode, { name: cityName, sub })
  selectedLocationName.value = cityName
  selectedLocationSub.value  = sub
  emit('update:modelValue', iataCode)
  emit('select', { iataCode, cityName, name: location.name, subType: location.subType })
  closeDropdown()
}

const selectSuggestion = (sug: typeof suggestions[0]) => {
  selectedLocationName.value = sug.city
  locationCache.set(sug.iataCode, { name: sug.city, sub: sug.name })
  emit('update:modelValue', sug.iataCode)
  emit('select', { ...sug, name: sug.city, address: { cityName: sug.city, countryCode: '' } })
  closeDropdown()
}

watch(
  () => props.modelValue,
  (val) => {
    if (!val) { selectedLocationName.value = ''; selectedLocationSub.value  = ''; return }
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
  window.addEventListener('scroll', updateCardPosition, true)
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('scroll', updateCardPosition, true)
  window.removeEventListener('resize', checkMobile)
  if (debounceTimer) clearTimeout(debounceTimer)
})
</script>

<style scoped>
.loc-fade-enter-active { transition: opacity 0.2s ease; }
.loc-fade-leave-active { transition: opacity 0.16s ease; }
.loc-fade-enter-from, .loc-fade-leave-to { opacity: 0; }
</style>
