<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Holiday Management</h2>
        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Construct and deploy curated travel bundles and dynamic commercial offers</p>
      </div>
      <button 
        @click="isCreateDrawerOpen = true"
        class="px-5 py-2.5 bg-primary text-white text-[11px] font-bold rounded-xl hover:bg-black transition-all flex items-center shadow-lg shadow-primary/10"
      >
        <PlusIcon class="h-4 w-4 mr-2" />
        Construct Bundle
      </button>
    </div>

    <div class="bg-white border border-gray-100 rounded-3xl overflow-hidden p-1 shadow-sm shadow-gray-100/20">
       <SearchWidget default-tab="Packages" />
    </div>

    <div class="space-y-4">
       <div class="flex items-center justify-between">
          <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Commercial Offers</h3>
          <div class="flex space-x-2">
             <button class="px-3 py-1.5 text-[10px] font-bold border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">Trending</button>
             <button class="px-3 py-1.5 text-[10px] font-bold border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">My Customs</button>
          </div>
       </div>

       <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="h-80 bg-white rounded-3xl border border-gray-50 animate-pulse"></div>
       </div>

       <div v-else-if="packagesList.length === 0" class="bg-white border-2 border-dashed border-gray-100 rounded-3xl p-24 text-center">
          <BuildingOfficeIcon class="h-16 w-16 text-primary/10 mx-auto mb-6" />
          <h3 class="text-lg font-bold text-gray-900 mb-2">No Active Offers</h3>
          <p class="text-[11px] text-gray-400 font-medium max-w-xs mx-auto mb-8">Construct a curated bundle to share with your clients and display on your storefront.</p>
          <button @click="startNewOffer" class="px-8 py-3 bg-primary text-white text-[11px] font-bold rounded-xl shadow-lg">Construct Bundle</button>
       </div>

       <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="pkg in packagesList" :key="pkg._id" class="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col group cursor-pointer" @click="editOffer(pkg)">
             <div class="relative h-56 overflow-hidden">
                <img :src="pkg.image || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800'" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div class="absolute top-4 left-4">
                   <span class="px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-black uppercase text-primary rounded-full shadow-sm">
                      {{ pkg.tag || 'Standard' }}
                   </span>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div class="absolute bottom-4 left-4 right-4">
                   <div class="flex items-center space-x-2 text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">
                      <component v-for="icon in (pkg.includes || [])" :key="icon" :is="getIcon(icon)" class="h-3 w-3" />
                   </div>
                   <h4 class="text-lg font-bold text-white">{{ pkg.title }}</h4>
                </div>
             </div>
             <div class="p-6 flex-1 flex flex-col justify-between">
                <div class="space-y-4">
                   <p class="text-xs text-gray-400 font-medium leading-relaxed line-clamp-2">{{ pkg.description }}</p>
                   <div class="flex items-center justify-between py-4 border-t border-gray-50">
                      <div>
                         <p class="text-[9px] font-bold text-gray-400 uppercase">Starting From</p>
                         <p class="text-xl font-black text-gray-900">${{ pkg.price?.toLocaleString() || 0 }}</p>
                      </div>
                      <div class="text-right">
                         <p class="text-[9px] font-bold text-gray-400 uppercase">Agency Commission</p>
                         <p class="text-xs font-black text-emerald-500">{{ pkg.commission || 0 }}% Earn</p>
                      </div>
                   </div>
                </div>
                <div class="pt-4 flex items-center space-x-2">
                   <button class="flex-1 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-[10px] font-bold rounded-xl transition-all">Details</button>
                   <button class="flex-1 py-2.5 bg-primary text-white text-[10px] font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-black transition-all">Sell Offer</button>
                </div>
             </div>
          </div>
       </div>
    </div>

    <!-- Create Bundle Drawer -->
    <BaseSidedrawer :show="isCreateDrawerOpen" title="New Dynamic Offer Architecture" @close="isCreateDrawerOpen = false">
       <form @submit.prevent="handleCreatePackage" class="space-y-6">
          <div class="space-y-4 pt-2 border-b border-gray-50 pb-4">
             <label class="text-[10px] font-bold text-gray-400 px-1 uppercase tracking-widest">Cover Picture</label>
             <div class="relative group cursor-pointer border-2 border-dashed border-gray-200 rounded-xl overflow-hidden h-32 flex items-center justify-center bg-gray-50 hover:border-primary transition-colors" @click="triggerFileUpload">
                <img v-if="form.image" :src="form.image" class="absolute inset-0 w-full h-full object-cover" />
                <div v-else class="text-center">
                   <PhotoIcon class="h-6 w-6 text-gray-400 mx-auto mb-1 group-hover:text-primary transition-colors" />
                   <span class="text-[10px] font-bold text-gray-400">{{ uploading ? 'Uploading...' : 'Click to Upload Cover' }}</span>
                </div>
                <div v-if="form.image" class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span class="text-[10px] font-bold text-white">Change Cover</span>
                </div>
                <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileUpload" />
             </div>
          </div>

          <div class="space-y-1.5">
             <label class="text-[10px] font-bold text-gray-400 px-1">Offer Title</label>
             <input v-model="form.title" placeholder="e.g., Ultimate Maldives Retreat" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold outline-none focus:border-primary transition-all" />
          </div>
          
          <div class="space-y-1.5">
             <label class="text-[10px] font-bold text-gray-400 px-1">Captivating Description</label>
             <textarea v-model="form.description" rows="3" placeholder="Describe the holiday experience..." class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold outline-none focus:border-primary transition-all resize-none"></textarea>
          </div>

          <div class="space-y-1.5">
             <label class="text-[10px] font-bold text-gray-400 px-1">Offer Tag (E.g. Premium)</label>
             <input v-model="form.tag" placeholder="e.g., Best Seller" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold outline-none focus:border-primary transition-all" />
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-gray-400 px-1">Retail Price (USD)</label>
                <input v-model="form.price" type="number" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold outline-none focus:border-primary transition-all" />
             </div>
             <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-gray-400 px-1">Markup Percentage</label>
                <input v-model="form.commission" type="number" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold outline-none focus:border-primary transition-all" />
             </div>
          </div>

          <div class="space-y-3">
             <label class="text-[10px] font-bold text-gray-400 px-1 uppercase tracking-widest">Included Services</label>
             <div class="grid grid-cols-2 gap-3">
                <button type="button" v-for="srv in services" :key="srv.id" @click="toggleService(srv.id)" class="flex items-center space-x-3 p-3 rounded-xl border transition-all" :class="form.includes.includes(srv.id) ? 'border-primary bg-primary/5' : 'border-gray-50 bg-gray-50'">
                   <component :is="srv.icon" class="h-4 w-4" :class="form.includes.includes(srv.id) ? 'text-primary' : 'text-gray-400'" />
                   <span class="text-[10px] font-bold" :class="form.includes.includes(srv.id) ? 'text-primary' : 'text-gray-400'">{{ srv.label }}</span>
                </button>
             </div>
          </div>

          <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start space-x-3">
             <InformationCircleIcon class="h-4 w-4 text-emerald-500 mt-0.5" />
             <p class="text-[10px] text-emerald-700 font-bold leading-relaxed">Dynamic packages are instantly indexed for your marketplace and shared with your traveler directory.</p>
          </div>

          <button type="submit" :disabled="saving || uploading" class="w-full py-3.5 bg-primary text-white text-[11px] font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-black transition-all mt-4 disabled:opacity-50">
            {{ saving ? 'Deploying...' : 'Deploy Global Offer' }}
          </button>
       </form>
    </BaseSidedrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import SearchWidget from '@/components/SearchWidget.vue'
import BaseSidedrawer from '@/components/ui/BaseSidedrawer.vue'
import { 
  PlusIcon, 
  PaperAirplaneIcon, 
  BuildingOfficeIcon, 
  TruckIcon, 
  TicketIcon, 
  InformationCircleIcon,
  PhotoIcon
} from '@heroicons/vue/24/outline'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { usePackages } from '@/composables/modules/packages/usePackages'

definePageMeta({
  layout: 'dashboard'
})

const { packagesList, loading, saving, uploading, fetchPackages, createPackage, updatePackage, uploadCoverImage } = usePackages()

const { showToast } = useCustomToast()
const isCreateDrawerOpen = ref(false)
const editingId = ref(null)
const fileInput = ref<HTMLInputElement | null>(null)

const form = reactive({
   title: '',
   description: '',
   tag: 'Standard',
   price: 0,
   commission: 10,
   image: '',
   includes: ['flight', 'hotel'] as string[]
})

const services = [
   { id: 'flight', label: 'Flights', icon: PaperAirplaneIcon },
   { id: 'hotel', label: 'Accommodation', icon: BuildingOfficeIcon },
   { id: 'transfer', label: 'Transfers', icon: TruckIcon },
   { id: 'activity', label: 'Experiences', icon: TicketIcon },
]

const startNewOffer = () => {
   editingId.value = null
   Object.assign(form, { title: '', description: '', tag: 'Standard', price: 0, commission: 10, image: '', includes: ['flight', 'hotel'] })
   isCreateDrawerOpen.value = true
}

const editOffer = (pkg: any) => {
   editingId.value = pkg._id
   Object.assign(form, { 
       title: pkg.title || '', 
       description: pkg.description || '', 
       tag: pkg.tag || 'Standard', 
       price: pkg.price || 0, 
       commission: pkg.commission || 0, 
       image: pkg.image || '', 
       includes: JSON.parse(JSON.stringify(pkg.includes || [])) 
   })
   isCreateDrawerOpen.value = true
}

const triggerFileUpload = () => {
   fileInput.value?.click()
}

const handleFileUpload = async (e: Event) => {
   const target = e.target as HTMLInputElement
   if (target.files && target.files[0]) {
      try {
         const url = await uploadCoverImage(target.files[0])
         if (url) form.image = url
      } catch (e) {
         console.error(e)
      }
   }
}

const toggleService = (id: string) => {
   const idx = form.includes.indexOf(id)
   if (idx > -1) form.includes.splice(idx, 1)
   else form.includes.push(id)
}

const getIcon = (id: string) => {
   return services.find(s => s.id === id)?.icon
}

const handleCreatePackage = async () => {
   try {
      if (!form.title) {
          showToast('Offer explicitly requires a title', 'error')
          return
      }

      const payload = {
          title: form.title,
          description: form.description,
          tag: form.tag,
          basePrice: form.price,
          price: form.price,
          commission: form.commission,
          image: form.image,
          includes: form.includes
      }

      if (editingId.value) {
          await updatePackage(editingId.value, payload)
      } else {
          await createPackage(payload)
      }
      isCreateDrawerOpen.value = false
   } catch (e) {
      console.error(e)
   }
}

onMounted(() => {
   fetchPackages()
})
</script>
