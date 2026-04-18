<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Itinerary Builder</h2>
        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Construct, brand and share high-fidelity travel experiences with your clients</p>
      </div>
      <button 
        @click="startNewItinerary"
        class="px-5 py-2.5 bg-primary text-white text-[11px] font-bold rounded-xl hover:bg-black transition-all flex items-center shadow-lg shadow-primary/10"
      >
        <PlusIcon class="h-4 w-4 mr-2" />
        Create Itinerary
      </button>
    </div>

    <!-- Active Itineraries -->
    <div v-if="loading" class="bg-white rounded-3xl border border-gray-100 p-8 space-y-4">
       <div v-for="i in 3" :key="i" class="h-12 bg-gray-50 rounded-xl animate-pulse"></div>
    </div>
    
    <div v-else-if="itinerariesList.length === 0" class="bg-white border-2 border-dashed border-gray-100 rounded-3xl p-32 text-center">
       <SparklesIcon class="h-16 w-16 text-primary/10 mx-auto mb-6" />
       <h3 class="text-lg font-bold text-gray-900 mb-2">Build Your First Masterpiece</h3>
       <p class="text-[11px] text-gray-400 font-medium max-w-xs mx-auto mb-8">Impress your clients with beautifully curated, day-by-day travel plans that stand out from competitors.</p>
       <button @click="startNewItinerary" class="px-8 py-3 bg-primary text-white text-[11px] font-bold rounded-xl shadow-lg">Begin Construction</button>
    </div>

    <div v-else class="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm shadow-gray-100/10">
       <div class="overflow-x-auto">
          <table class="w-full text-left">
             <thead>
                <tr class="bg-gray-50/50">
                   <th class="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-gray-400">Title & Destination</th>
                   <th class="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-gray-400">Duration</th>
                   <th class="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-gray-400">Creation Date</th>
                   <th class="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                   <th class="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                </tr>
             </thead>
             <tbody class="divide-y divide-gray-50">
                <tr v-for="iti in itinerariesList" :key="iti._id" class="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                   <td class="px-6 py-4" @click="editItinerary(iti)">
                      <div class="flex items-center space-x-3">
                         <div class="h-10 w-10 relative rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                             <img :src="iti.coverImage || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=200'" class="w-full h-full object-cover" />
                         </div>
                         <div>
                            <p class="text-[13px] font-black text-gray-900 group-hover:text-primary transition-colors">{{ iti.title }}</p>
                            <div class="flex items-center text-[10px] text-gray-400 font-bold mt-0.5">
                                <MapPinIcon class="h-3 w-3 mr-1" />
                                {{ iti.destination }}
                            </div>
                         </div>
                      </div>
                   </td>
                   <td class="px-6 py-4">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-black tracking-tighter bg-gray-100 text-gray-600 border border-gray-200">
                         {{ iti.days?.length || 0 }} Days
                      </span>
                   </td>
                   <td class="px-6 py-4">
                      <span class="text-[10px] font-bold text-gray-500 uppercase">{{ new Date(iti.createdAt).toLocaleDateString() }}</span>
                   </td>
                   <td class="px-6 py-4">
                      <span class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100 bg-emerald-50 text-emerald-600">Active</span>
                   </td>
                   <td class="px-6 py-4 text-right">
                      <div class="flex items-center justify-end space-x-2">
                         <button class="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="View details">
                            <EyeIcon class="h-4 w-4" />
                         </button>
                         <button class="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="Edit Itinerary">
                            <PencilSquareIcon class="h-4 w-4" />
                         </button>
                         <button class="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="Share">
                            <ShareIcon class="h-4 w-4" />
                         </button>
                      </div>
                   </td>
                </tr>
             </tbody>
          </table>
       </div>
    </div>

    <!-- Itinerary Builder Side Drawer -->
    <BaseSidedrawer :show="isBuilderOpen" :title="editingId ? 'Refining Itinerary' : 'New Itinerary Architecture'" @close="isBuilderOpen = false" size="xl">
       <div class="space-y-8 pb-32">
          <!-- Step 1: Base Details -->
          <div class="space-y-6">
             <h3 class="text-[11px] font-bold text-primary uppercase tracking-widest border-b border-gray-50 pb-2">1. Essential Narrative</h3>
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1.5">
                   <label class="text-[10px] font-bold text-gray-400 px-1">Itinerary Title</label>
                   <input v-model="form.title" placeholder="e.g., Ultimate Greek Odyssey" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold outline-none focus:border-primary transition-all" />
                </div>
                <div class="space-y-1.5 relative z-50">
                   <label class="text-[10px] font-bold text-gray-400 px-1">Primary Destination</label>
                   <input v-model="form.destination" @input="onLocationInput" @focus="onLocationInput" placeholder="Search... (e.g. Santorini, Greece)" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold outline-none focus:border-primary transition-all relative z-50" autocomplete="off" />
                   
                   <Transition name="fade">
                      <div v-if="locationPredictions.length" class="absolute left-0 top-full mt-2 w-full max-h-[250px] overflow-y-auto bg-white border border-gray-100 rounded-2xl shadow-2xl z-[60] py-2 custom-scrollbar">
                          <div v-for="pred in locationPredictions" :key="pred.place_id" @click="selectPrediction(pred)" class="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-all flex flex-col group border-b border-gray-50 last:border-0">
                              <span class="text-[11px] font-bold text-gray-900 group-hover:text-primary-dark">{{ pred.structured_formatting?.main_text || pred.description }}</span>
                              <span v-if="pred.structured_formatting?.secondary_text" class="text-[9px] font-medium text-gray-400 mt-0.5">{{ pred.structured_formatting.secondary_text }}</span>
                          </div>
                      </div>
                   </Transition>
                   <div v-if="locationPredictions.length" class="fixed inset-0 z-40" @click="locationPredictions = []"></div>
                </div>
             </div>
             <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-gray-400 px-1">Compelling Description</label>
                <textarea v-model="form.description" rows="3" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold outline-none focus:border-primary transition-all resize-none"></textarea>
             </div>
          </div>

          <!-- Step 2: Day Builder -->
          <div class="space-y-6">
             <div class="flex items-center justify-between border-b border-gray-50 pb-2">
                <h3 class="text-[11px] font-bold text-primary uppercase tracking-widest">2. Day-by-Day Experience</h3>
                <button @click="addDay" class="text-[10px] font-bold text-primary hover:underline">+ Add Sequential Day</button>
             </div>

             <div class="space-y-6">
                <div v-for="(day, idx) in form.days" :key="idx" class="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 space-y-4 relative overflow-visible">
                   <div class="absolute top-0 right-0 p-4">
                      <button @click="removeDay(idx)" class="p-2 text-gray-300 hover:text-rose-500 transition-all">
                         <TrashIcon class="h-4 w-4" />
                      </button>
                   </div>
                   <div class="flex items-center space-x-4">
                      <div class="h-10 w-10 bg-primary text-white rounded-xl flex items-center justify-center font-black text-xs">D{{ idx + 1 }}</div>
                      <input v-model="day.title" placeholder="Day Theme (e.g. Sunset Arrival)" class="bg-transparent border-0 text-sm font-bold text-gray-900 outline-none w-full" />
                   </div>
                   
                   <div class="space-y-3 pl-14">
                      <div v-for="(act, aIdx) in day.activities" :key="aIdx" class="flex items-center space-x-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm shadow-black/5 group">
                         <ClockIcon class="h-3.5 w-3.5 text-gray-400 shrink-0" />
                         <div class="relative w-24">
                           <input 
                               readonly
                               :value="timeOptions.find(t => t.value === act.time)?.label || act.time"
                               @click="activeTimePicker = activeTimePicker === `${idx}-${aIdx}` ? null : `${idx}-${aIdx}`"
                               placeholder="Time" 
                               class="w-full px-2 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold text-center text-gray-900 outline-none hover:border-primary focus:border-primary cursor-pointer transition-all relative z-50 shrink-0"
                           />
                           <Transition name="fade">
                               <div v-if="activeTimePicker === `${idx}-${aIdx}`" class="absolute left-0 top-full mt-2 w-32 max-h-[220px] overflow-y-auto bg-white border border-gray-100 rounded-xl shadow-2xl z-[60] py-2 custom-scrollbar">
                                   <div v-for="t in timeOptions" :key="t.value" @click="act.time = t.value; activeTimePicker = null" class="px-4 py-2 cursor-pointer transition-colors" :class="act.time === t.value ? 'bg-primary/5 text-primary-dark font-black' : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900 font-bold'">
                                       <span class="text-[10px]">{{ t.label }}</span>
                                   </div>
                               </div>
                           </Transition>
                         </div>
                         <input v-model="act.title" placeholder="Activity Title" class="flex-1 text-[10px] font-bold text-gray-600 outline-none bg-transparent relative z-20" />
                         <button @click="day.activities.splice(aIdx, 1)" class="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-300 hover:text-rose-500">
                           <XMarkIcon class="h-3.5 w-3.5" />
                         </button>
                      </div>
                      <button @click="day.activities.push({title: '', time: ''})" class="text-[10px] font-bold text-primary/60 hover:text-primary transition-all">+ Add Activity</button>
                   </div>
                </div>
             </div>
          </div>
       </div>

       <!-- Global Click Watcher for Time Picker -->
       <div v-if="activeTimePicker" class="fixed inset-0 z-40" @click="activeTimePicker = null"></div>

       <template #footer>
          <div class="flex items-center space-x-3">
             <button @click="isBuilderOpen = false" class="px-6 py-3 bg-gray-800 text-white text-xs font-bold rounded-xl hover:bg-black transition-all shadow-lg">Save as Draft</button>
             <button @click="handleSaveItinerary" :disabled="saving" class="flex-grow px-6 py-3 bg-primary-dark text-white text-xs font-bold rounded-xl hover:bg-black transition-all shadow-lg shadow-primary-dark/20 text-center">
                {{ saving ? 'Syncing...' : 'Finalize & Publish Itinerary' }}
             </button>
          </div>
       </template>
    </BaseSidedrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useHead, useRuntimeConfig } from '#imports'
import { 
  PlusIcon, 
  SparklesIcon, 
  MapPinIcon, 
  ClockIcon, 
  TrashIcon, 
  ShareIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
  EyeIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline'
import BaseSidedrawer from '@/components/ui/BaseSidedrawer.vue'
import { useItineraries } from '@/composables/modules/itineraries/useItineraries'
import { useCustomToast } from '@/composables/core/useCustomToast'

definePageMeta({
  layout: 'dashboard'
})

const { itinerariesList, loading, saving, fetchItineraries, createItinerary, updateItinerary } = useItineraries()

const config = useRuntimeConfig()
const isGoogleLoaded = ref(false)
const locationPredictions = ref<any[]>([])
let autocompleteService: any = null

useHead({
  script: [
    {
      src: `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsApiKey}&libraries=places`,
      async: true,
      defer: true,
      onload: () => {
         isGoogleLoaded.value = true
         if ((window as any).google?.maps?.places) {
             autocompleteService = new (window as any).google.maps.places.AutocompleteService()
         }
      }
    }
  ]
})

const onLocationInput = (e: any) => {
    form.destination = e.target.value || form.destination
    if (!autocompleteService || !form.destination || form.destination.length < 2) {
        locationPredictions.value = []
        return
    }
    autocompleteService.getPlacePredictions(
        { input: form.destination, types: ['(cities)'] },
        (predictions: any, status: any) => {
            if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && predictions) {
                locationPredictions.value = predictions
            } else {
                locationPredictions.value = []
            }
        }
    )
}

const selectPrediction = (pred: any) => {
    form.destination = pred.description
    locationPredictions.value = []
}

// Custom Time Picker System
const activeTimePicker = ref<string | null>(null)
const timeOptions = Array.from({ length: 48 }).map((_, i) => {
  const hour = Math.floor(i / 2)
  const minute = i % 2 === 0 ? '00' : '30'
  const ampm = hour < 12 ? 'AM' : 'PM'
  const displayHour = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour)
  const HH = hour.toString().padStart(2, '0')
  return { value: `${HH}:${minute}`, label: `${displayHour}:${minute} ${ampm}` }
})

const isBuilderOpen = ref(false)
const editingId = ref(null)

const { showToast } = useCustomToast()

const form = reactive({
   title: '',
   destination: '',
   description: '',
   coverImage: '',
   days: [] as any[]
})

const startNewItinerary = () => {
   editingId.value = null
   Object.assign(form, { title: '', destination: '', description: '', coverImage: '', days: [{ title: '', activities: [] }] })
   isBuilderOpen.value = true
}

const editItinerary = (iti: any) => {
   editingId.value = iti._id
   Object.assign(form, { 
       title: iti.title || '', 
       destination: iti.destination || '', 
       description: iti.description || '', 
       coverImage: iti.coverImage || '', 
       days: JSON.parse(JSON.stringify(iti.days || [])) 
   })
   isBuilderOpen.value = true
}

const addDay = () => {
   form.days.push({ title: '', activities: [] })
}

const removeDay = (idx: number) => {
   form.days.splice(idx, 1)
}

const handleSaveItinerary = async () => {
   try {
      if (!form.title || !form.destination) {
          showToast('Title and destination are required', 'error')
          return
      }
      
      const payload = {
          title: form.title,
          destination: form.destination,
          description: form.description,
          coverImage: form.coverImage,
          days: form.days
      }
      
      if (editingId.value) {
          await updateItinerary(editingId.value, payload)
      } else {
          await createItinerary(payload)
      }
      isBuilderOpen.value = false
   } catch (e) {
      console.error(e)
   }
}

onMounted(() => {
  fetchItineraries()
})
</script>
