<template>
  <div class="relative w-full" ref="pickerRef">

    <!-- ── Trigger row ──────────────────────────────────────────────────────── -->
    <div
      class="w-full px-4 pt-3 pb-2 cursor-pointer min-h-[68px] flex flex-col justify-center group select-none"
      :class="showDropdown ? 'bg-blue-50/40' : 'hover:bg-gray-50/60'"
      @click="openDropdown"
    >
      <p
        class="text-[11px]    mb-0.5 transition-colors"
        :class="showDropdown ? 'text-gray-900' : 'text-neutral-400 group-hover:text-gray-900'"
      >
        {{ label }}
      </p>

      <div v-if="selectedLocationName && !showDropdown" class="flex items-baseline gap-2 min-w-0">
        <span class="text-base  text-gray-900 leading-tight truncate">
          {{ selectedLocationName }}
        </span>
        <span class="text-xs  text-neutral-400  shrink-0">{{ modelValue }}</span>
      </div>

      <!-- Empty placeholder -->
      <div v-else class="flex items-center gap-2">
        <MapPinIcon
          class="h-5 w-5 shrink-0 transition-colors"
          :class="showDropdown ? 'text-gray-900' : 'text-gray-300'"
        />
        <span class="text-base  text-gray-300">
          {{ placeholder || 'Search city...' }}
        </span>
      </div>

      <p v-if="selectedLocationSub && !showDropdown" class="text-[11px] text-neutral-400 font-medium mt-0.5 truncate">
        {{ selectedLocationSub }}
      </p>
    </div>

    <Teleport to="body">
      <Transition name="loc-fade">
        <div v-if="showDropdown">

          <!-- Backdrop -->
          <div
            class="fixed inset-0 z-[10010] bg-black/50 backdrop-blur-[3px]"
            @click="closeDropdown"
          />

          <!-- Card -->
          <div
            :style="cardStyle"
            class="fixed z-[10011] bg-white rounded-2xl border border-gray-100 shadow-2xl transition-all"
            :class="[
              isMobile ? 'inset-x-4 top-1/2 -translate-y-1/2 w-auto' : 'w-[480px]'
            ]"
            @click.stop
          >

            <!-- Search input -->
            <div class="p-4 pb-3">
              <div class="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-900">
                <MagnifyingGlassIcon class="h-[18px] w-[18px] text-gray-900 shrink-0" />
                <input
                  ref="searchInputRef"
                  v-model="searchQuery"
                  :placeholder="placeholder || 'Search city...'"
                  class="flex-1 bg-transparent outline-none text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal"
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
                  <XMarkIcon class="h-3 w-3 text-gray-500" />
                </button>
              </div>
            </div>

            <div class="h-px bg-gray-100" />

            <!-- Search results -->
            <div v-if="results.length" class="max-h-[340px] overflow-y-auto rounded-b-2xl">
              <p class="px-5 pt-3 pb-1.5 text-[11px] font-bold text-neutral-400  ">
                Cities
              </p>
              <div
                v-for="res in results"
                :key="res.iataCode"
                @click="selectAmadeusResult(res)"
                class="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors group/item border-b border-gray-50 last:border-0"
              >
                <div class="h-9 w-9 rounded-xl bg-gray-50 group-hover/item:bg-gray-100 flex items-center justify-center shrink-0 transition-colors">
                  <MapPinIcon class="w-[18px] h-[18px] text-gray-400 group-hover/item:text-gray-900 transition-colors" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-gray-900 transition-colors truncate">
                    {{ res.address?.cityName || res.name }}, {{ res.address?.countryName || res.address?.countryCode }}
                  </p>
                  <p class="text-xs text-neutral-400 font-medium truncate mt-0.5">
                    {{ res.name }}
                  </p>
                </div>
                <span class="text-xs font-bold text-gray-300 group-hover/item:text-gray-900 transition-colors shrink-0 ml-2">
                  {{ res.iataCode }}
                </span>
              </div>
            </div>

            <!-- Loading -->
            <div v-else-if="isLoading" class="py-10 text-center rounded-b-2xl">
              <div class="animate-spin h-6 w-6 border-2 border-gray-200 border-t-gray-900 rounded-full mx-auto mb-3" />
              <p class="text-sm text-neutral-400 font-medium font-bold">Searching cities...</p>
            </div>

            <!-- No results -->
            <div v-else-if="!isLoading && searchQuery.length >= 2" class="py-10 text-center rounded-b-2xl">
              <MapPinIcon class="h-8 w-8 text-gray-200 mx-auto mb-3" />
              <p class="text-sm text-gray-500 font-semibold">No results for "{{ searchQuery }}"</p>
              <p class="text-xs text-neutral-400 mt-1">Try a different city</p>
            </div>

            <!-- Popular destinations -->
            <div v-else class="pb-3 rounded-b-2xl">
              <p class="px-5 pt-3 pb-2 text-[11px] font-bold text-neutral-400  ">
                Popular Destinations
              </p>
              <div class="grid grid-cols-2 gap-0">
                <div
                  v-for="dest in suggestions"
                  :key="dest.iataCode"
                  @click="selectSuggestion(dest)"
                  class="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors group/sug"
                >
                  <div class="h-8 w-8 rounded-lg bg-gray-100 group-hover/sug:bg-blue-50 flex items-center justify-center shrink-0 transition-all">
                    <MapPinIcon class="h-[15px] w-[15px] text-gray-900" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-bold text-gray-700 group-hover/sug:text-gray-900 transition-colors truncate leading-tight">
                      {{ dest.city }}
                    </p>
                    <p class="text-sm  text-gray-300  tracking-wide">{{ dest.iataCode }}</p>
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
import { MapPinIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useCitySearch } from '@/composables/modules/experiences/useCitySearch'

const props = defineProps({
  modelValue:  { type: String, default: '' },
  label:       { type: String, default: '' },
  placeholder: { type: String, default: '' },
  id:          { type: String, default: '' },
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
