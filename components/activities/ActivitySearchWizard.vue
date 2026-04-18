<template>
  <div class="bg-white rounded-[2.5rem] border border-gray-200 relative w-full shadow-sm">
    <!-- Premium Header Gradient -->
    <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent -z-10"></div>

    <div class="p-8 lg:p-12">
      <!-- Header Area -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-gray-100">
        <div class="space-y-1">
          <h2 class="text-3xl  text-gray-900  ">Global Experiences</h2>
          <p class="text-xs font-bold text-gray-400  ">Curated tours, attractions & local secrets</p>
        </div>
      </div>

      <!-- Search Inputs Grid -->
      <div class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          <!-- Destination Input -->
          <div class="lg:col-span-6 relative" ref="destContainerRef">
            <AnimatedInput 
              v-model="destQuery" 
              label="Search destinations" 
              :icon="MapPinIcon"
              @focus="destOpen = true"
            />
            <!-- Suggestions Dropdown -->
            <Transition name="slide-up">
              <div v-if="destOpen && filteredDest.length" class="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 shadow-2xl rounded-[2rem] z-[9999] max-h-[400px] overflow-y-auto p-3 animate-in fade-in slide-in-from-top-4">
                <button 
                  v-for="dest in filteredDest" :key="dest.city"
                  @click="selectDest(dest)"
                  class="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group border border-transparent hover:border-gray-100 mb-1"
                >
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <MapPinIcon class="h-6 w-6" />
                    </div>
                    <div class="text-left">
                      <p class="text-sm  text-gray-900 group-hover:text-primary transition-colors">{{ dest.city }}</p>
                      <p class="text-[10px] font-bold text-gray-400">{{ dest.country }}</p>
                    </div>
                  </div>
                  <ChevronDownIcon class="h-4 w-4 text-gray-300 -rotate-90" />
                </button>
              </div>
            </Transition>
          </div>

          <!-- Date Range -->
          <div class="lg:col-span-6">
            <DateRangePicker v-model="activityRange" />
          </div>
        </div>
      </div>

      <!-- Bottom Actions -->
      <div class="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-8 border-t border-gray-100">
        <div class="flex -space-x-3 overflow-hidden p-1">
          <img v-for="i in 5" :key="i" class="inline-block h-8 w-8 rounded-full ring-2 ring-white" :src="`https://i.pravatar.cc/100?u=${i}`" />
          <div class="flex items-center justify-center h-8 px-3 rounded-full bg-gray-50 ring-2 ring-white text-[9px]  text-gray-400">10k+ booked this week</div>
        </div>

        <BaseButton 
          @click="handleSearch" 
          :loading="isSearching" 
          variant="primary" 
          size="lg" 
          class="px-12 h-[58px] rounded-[1.5rem]   text-xs shadow-2xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all"
        >
          <MagnifyingGlassIcon class="h-5 w-5 mr-3" />
          DISCOVER ACTIVITIES
        </BaseButton>
      </div>
    </div>

    <!-- Results Section -->
    <Transition name="fade">
      <div v-if="activityResults.length > 0" class="border-t border-gray-200 bg-gray-50/50 p-8 lg:p-12">
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-xl  text-gray-900  ">Top Recommended</h3>
          <div class="flex items-center space-x-4">
             <span class="text-[10px]  text-gray-400  ">Sort by Popularity</span>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="act in activityResults"
            :key="act.id"
            class="bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group relative flex flex-col h-full"
          >
            <!-- Badge -->
            <div class="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-md text-[9px]  text-primary   rounded-full shadow-sm">{{ act.category }}</div>
            
            <div class="h-56 bg-gray-100 relative overflow-hidden group-hover:h-48 transition-all duration-700">
              <img v-if="act.image" :src="act.image" :alt="act.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div v-else class="w-full h-full flex items-center justify-center">
                <SparklesIcon class="h-12 w-12 text-gray-200" />
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            <div class="p-8 space-y-4 flex-1 flex flex-col">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-1">
                    <StarIcon class="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span class="text-[10px]  text-gray-900">{{ act.rating }}</span>
                    <span class="text-[9px] font-bold text-gray-400">({{ act.reviews }} reviews)</span>
                  </div>
                  <span class="text-[10px]  text-gray-400  ">{{ act.duration }}</span>
                </div>
                <h4 class="text-lg  text-gray-900  group-hover:text-primary transition-colors leading-tight ">{{ act.name }}</h4>
              </div>

              <div class="pt-6 border-t border-gray-100 flex items-end justify-between mt-auto">
                <div class="space-y-0.5">
                  <p class="text-[10px]  text-gray-400  ">From</p>
                  <p class="text-2xl  text-primary-dark">${{ act.price }}<span class="text-[10px] font-bold text-gray-400 ml-1">/pp</span></p>
                </div>
                <BaseButton variant="primary" class="rounded-xl px-6 h-10 text-[9px]   active:scale-95 transition-all">VIEW PLAN</BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useActivities, popularDestinations } from '~/composables/modules/activities/useActivities'
import { onClickOutside } from '@vueuse/core'
import AnimatedInput from '@/components/ui/AnimatedInput.vue'
import { 
  MapPinIcon, 
  CalendarIcon, 
  SparklesIcon, 
  StarIcon, 
  ChevronDownIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/vue/24/outline'
import DateRangePicker from '@/components/ui/DateRangePicker.vue'

const { activityResults, isSearching, searchActivities } = useActivities()

const destQuery = ref('')
const selectedDest = ref<any>(null)
const destOpen = ref(false)

const activityRange = ref({ start: '', end: '' })
const fromDate = computed(() => activityRange.value.start)
const toDate = computed(() => activityRange.value.end)

const hasSearched = ref(false)

const destContainerRef = ref(null)

onClickOutside(destContainerRef, () => destOpen.value = false)

const filteredDest = computed(() => {
  if (!destQuery.value) return popularDestinations
  const lower = destQuery.value.toLowerCase()
  return popularDestinations.filter(d => d.city.toLowerCase().includes(lower) || d.country.toLowerCase().includes(lower))
})

const selectDest = (dest: any) => {
  destQuery.value = `${dest.city}, ${dest.country}`
  selectedDest.value = dest
  destOpen.value = false
}

const handleSearch = () => {
  if (!selectedDest.value) return
  hasSearched.value = true
  searchActivities({
    latitude: selectedDest.value.lat,
    longitude: selectedDest.value.lng,
    radius: 20,
    fromDate: fromDate.value || undefined,
    toDate: toDate.value || undefined,
  })
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-up-enter-from, .slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
