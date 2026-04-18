<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Traveler List</h2>
        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Manage your customers, their documents and booking history</p>
      </div>
      <button 
        @click="openAddDrawer"
        class="px-5 py-2.5 bg-primary text-white text-[11px] font-bold rounded-xl hover:bg-black transition-all flex items-center shadow-lg shadow-primary/10"
      >
        <PlusIcon class="h-4 w-4 mr-2" />
        Add New Traveler
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div v-for="stat in travelerStats" :key="stat.label" class="bg-white p-5 rounded-2xl border border-gray-100 flex items-center space-x-4">
        <div :class="stat.bg" class="p-3 rounded-xl">
           <component :is="stat.icon" class="h-6 w-6" :class="stat.color" />
        </div>
        <div class="space-y-0.5">
          <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{{ stat.label }}</p>
          <p class="text-xl font-bold text-gray-900">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm shadow-gray-100/10">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-gray-50/50 border-b border-gray-100">
               <th class="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">FullName</th>
               <th class="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Contact Details</th>
               <th class="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Gender & DOB</th>
               <th class="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Documents</th>
               <th class="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <template v-if="loading">
              <tr v-for="i in 8" :key="i" class="animate-pulse">
                <td v-for="j in 5" :key="j" class="px-6 py-4"><div class="h-4 bg-gray-50 rounded w-full"></div></td>
              </tr>
            </template>
            <template v-else-if="travelers.length > 0">
              <tr v-for="traveler in travelers" :key="traveler._id" class="hover:bg-gray-50/50 group transition-all cursor-pointer" @click="goToDetails(traveler._id || traveler.id)">
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-4">
                    <img v-if="traveler.profilePicture" :src="traveler.profilePicture" class="h-10 w-10 rounded-xl object-cover border border-gray-100" />
                    <div v-else class="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary text-xs font-black uppercase border border-primary/10">
                      {{ traveler.firstName[0] }}{{ traveler.lastName[0] }}
                    </div>
                    <div>
                      <p class="text-xs font-black text-gray-900 uppercase tracking-tight">{{ traveler.firstName }} {{ traveler.lastName }}</p>
                      <span class="text-[8px] px-1.5 py-0.5 bg-gray-50 text-gray-500 font-bold uppercase tracking-tighter rounded border border-gray-100">{{ traveler.type }}</span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-gray-700 leading-none">{{ traveler.email }}</span>
                    <span class="text-[10px] text-gray-400 font-medium mt-1">{{ traveler.phone || '--' }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <span class="px-2 py-0.5 bg-gray-50 rounded">{{ traveler.gender }}</span>
                    <span class="mx-2 opacity-20">/</span>
                    <span>{{ formatDate(traveler.dateOfBirth) }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                   <div class="flex items-center space-x-2">
                      <div :class="traveler.documents?.length ? 'bg-emerald-500' : 'bg-amber-400'" class="h-1.5 w-1.5 rounded-full"></div>
                      <span class="text-[9px] font-black text-gray-500 uppercase tracking-tighter">{{ traveler.documents?.length ? traveler.documents.length + ' Docs Saved' : 'No Docs' }}</span>
                   </div>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end space-x-2">
                    <NuxtLink :to="`/dashboard/customers/${traveler._id || traveler.id}`" class="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                      <EyeIcon class="h-4 w-4" />
                    </NuxtLink>
                    <button @click.stop="openEditDrawer(traveler)" class="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                      <PencilSquareIcon class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </template>
            <tr v-else>
               <td colspan="5" class="px-6 py-24 text-center">
                  <div class="flex flex-col items-center max-w-sm mx-auto">
                    <div class="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                       <UsersIcon class="h-8 w-8 text-gray-200" />
                    </div>
                    <h3 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">No Travelers Found</h3>
                    <p class="text-[10px] text-gray-400 mt-2 font-medium">Click the button below to add your first traveler.</p>
                    <button @click="openAddDrawer" class="mt-6 px-6 py-2.5 bg-gray-50 text-primary text-[10px] font-black uppercase rounded-xl border border-gray-100 hover:bg-primary hover:text-white hover:border-primary transition-all">Add First Traveler</button>
                  </div>
               </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Drawer -->
    <BaseSidedrawer :show="isAddDrawerOpen" :title="editMode ? 'Edit Traveler Information' : 'Add New Traveler'" @close="closeAddDrawer" width="max-w-[50vw]" :closeOnClickOutside="false">
      <form @submit.prevent="handleSubmit" class="space-y-10 p-10 pb-32 text-left">
        <!-- Photo -->
        <div class="flex items-center space-x-10 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
           <div class="relative group cursor-pointer" @click="triggerUpload('pic')">
              <img v-if="form.profilePicture" :src="form.profilePicture" class="h-28 w-28 rounded-[2rem] object-cover border-4 border-white shadow-xl" />
              <div v-else class="h-28 w-28 rounded-[2rem] bg-white border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-300 hover:text-primary transition-all">
                  <div v-if="uploadingPic" class="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <template v-else>
                     <CameraIcon class="h-7 w-7 mb-1" />
                     <span class="text-[8px] font-black uppercase tracking-widest text-center px-4">Upload Photo</span>
                  </template>
               </div>
               <div v-if="uploadingPic" class="absolute inset-0 bg-white/60 flex items-center justify-center rounded-[2rem]">
                  <div class="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
               </div>
           </div>
           <div class="flex-1 space-y-2 text-left">
              <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight">Traveler Details</h4>
              <p class="text-[10px] text-gray-400 font-medium leading-relaxed">Please make sure the names match the traveler's passport exactly to avoid issues during travel.</p>
           </div>
        </div>

        <div class="grid grid-cols-3 gap-6">
           <div class="space-y-2 text-left">
              <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">First Name</label>
              <input v-model="form.firstName" type="text" required class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-sm shadow-black/5" />
           </div>
           <div class="space-y-2 text-left">
              <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Last Name</label>
              <input v-model="form.lastName" type="text" required class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-sm shadow-black/5" />
           </div>
           <div class="space-y-2 text-left">
              <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Gender</label>
              <select v-model="form.gender" class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all uppercase shadow-sm shadow-black/5">
                 <option value="male">MALE</option>
                 <option value="female">FEMALE</option>
                 <option value="other">OTHER</option>
              </select>
           </div>
        </div>

        <div class="grid grid-cols-2 gap-6">
           <div class="space-y-2 text-left">
              <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
              <input v-model="form.email" type="email" required class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-sm shadow-black/5" />
           </div>
           <div class="space-y-2 text-left">
              <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Phone Number</label>
              <input v-model="form.phone" type="tel" class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-sm shadow-black/5" />
           </div>
        </div>

        <div class="grid grid-cols-3 gap-6">
           <div class="space-y-2 col-span-1 text-left">
              <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Date of Birth</label>
              <input v-model="form.dateOfBirth" type="date" required class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-sm shadow-black/5" />
           </div>
           <div class="space-y-2 col-span-2 text-left">
              <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Passport Number</label>
              <input v-model="form.passportNumber" type="text" placeholder="Enter Passport Number" class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all uppercase shadow-sm shadow-black/5" />
           </div>
        </div>

        <!-- Documents -->
        <div class="space-y-6 pt-4 text-left">
           <div class="flex items-center justify-between border-b border-gray-50 pb-4">
              <h4 class="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Travel Documents</h4>
              <p class="text-[9px] text-gray-400 font-bold uppercase">Upload IDs, Visas or Certificates</p>
           </div>
           
           <div class="grid grid-cols-2 gap-4">
              <div v-for="(doc, idx) in form.documents" :key="idx" class="relative group p-4 bg-white border border-gray-100 rounded-3xl flex items-center space-x-4 hover:border-primary transition-all shadow-sm">
                 <div class="h-12 w-12 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center">
                    <img v-if="doc.type?.includes('image')" :src="doc.url" class="w-full h-full object-cover" />
                    <DocumentIcon v-else class="h-6 w-6 text-gray-300" />
                 </div>
                 <div class="flex-1 min-w-0">
                    <p class="text-[10px] font-black text-gray-900 truncate uppercase tracking-tighter">{{ doc.name }}</p>
                    <p class="text-[8px] text-gray-400 uppercase font-black">Saved File</p>
                 </div>
                 <button type="button" @click="form.documents.splice(idx, 1)" class="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><XMarkIcon class="h-4 w-4" /></button>
              </div>

              <!-- Upload -->
               <div @click="triggerUpload('doc')" class="border-2 border-dashed border-gray-100 rounded-3xl p-5 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all cursor-pointer bg-gray-50/20">
                  <div v-if="uploadingDoc" class="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                  <template v-else>
                     <CloudArrowUpIcon class="h-6 w-6 mb-2" />
                     <span class="text-[9px] font-black uppercase tracking-widest text-center">Upload New Document</span>
                  </template>
               </div>
           </div>
        </div>

        <!-- Document Selection Modal -->
        <div v-if="isDocModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left">
            <div class="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl">
                <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest mb-6">Select Document Type</h3>
                <div class="space-y-3">
                    <button v-for="type in [
                        'Passport', 
                        'Visa', 
                        'Travel Insurance', 
                        'Yellow Fever Certificate', 
                        'Identity Card'
                    ]" :key="type" @click="confirmDocUpload(type)" class="w-full text-left p-4 rounded-2xl border border-gray-100 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-between group">
                        <span class="text-[11px] font-bold uppercase tracking-tight">{{ type }}</span>
                        <ArrowRightIcon class="h-4 w-4 text-gray-200 group-hover:text-white" />
                    </button>
                </div>
                <button @click="isDocModalOpen = false" class="mt-8 w-full py-4 text-[10px] font-black uppercase text-gray-400 hover:text-gray-900 transition-colors">Cancel</button>
            </div>
        </div>

        <input type="file" ref="picInput" class="hidden" accept="image/*" @change="handleFileUpload($event, 'pic')" />
        <input type="file" ref="docInput" class="hidden" @change="handleDocSelection($event)" />
      </form>
      
      <template #footer>
         <div class="flex items-center justify-end space-x-6 w-full px-6 py-2">
            <button type="button" @click="closeAddDrawer" class="px-10 py-4 bg-white text-gray-400 text-[10px] font-black uppercase rounded-2xl hover:bg-gray-50 transition-all border border-gray-100">Cancel</button>
            <button 
              @click="handleSubmit" 
              :disabled="creating || updating"
              class="flex-grow max-w-[350px] py-5 bg-primary text-white text-[10px] font-black uppercase rounded-2xl hover:bg-black transition-all shadow-2xl shadow-primary/20 disabled:opacity-50"
            >
              {{ creating || updating ? 'Saving...' : (editMode ? 'Save Changes' : 'Add Traveler') }}
            </button>
         </div>
      </template>
    </BaseSidedrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { 
  UsersIcon, 
  MapPinIcon, 
  GlobeAltIcon, 
  ArrowRightIcon, 
  TicketIcon, 
  PlusIcon,
  PencilSquareIcon,
  DocumentIcon,
  ArrowDownTrayIcon,
  CameraIcon,
  XMarkIcon,
  CloudArrowUpIcon,
  EyeIcon
} from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import { useTravelers } from '@/composables/modules/users/useTravelers'
import BaseSidedrawer from '@/components/ui/BaseSidedrawer.vue'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useUpload } from '@/composables/core/useUpload'

definePageMeta({
  layout: 'dashboard'
})

const router = useRouter()
const { travelers, stats, loading, creating, updating, fetchTravelers, fetchStats, createTraveler, updateTraveler } = useTravelers()
const { showToast } = useCustomToast()
const { uploadFile: uploadPic, uploading: uploadingPic } = useUpload()
const { uploadFile: uploadDoc, uploading: uploadingDoc } = useUpload()

const travelerStats = computed(() => [
  { label: 'Total Travelers', value: stats.value.total || 0, icon: UsersIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Adults', value: stats.value.adults || 0, icon: GlobeAltIcon, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Children/Infants', value: (stats.value.children || 0) + (stats.value.infants || 0), icon: TicketIcon, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Top Travelers', value: 'Active', icon: MapPinIcon, color: 'text-rose-600', bg: 'bg-rose-50' },
])

const isAddDrawerOpen = ref(false)
const editMode = ref(false)
const isDocModalOpen = ref(false)
const pendingDocFile = ref<File | null>(null)

const form = reactive({
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  gender: 'male',
  dateOfBirth: '',
  passportNumber: '',
  profilePicture: '',
  documents: [] as any[],
  type: 'adult'
})

const picInput = ref<HTMLInputElement | null>(null)
const docInput = ref<HTMLInputElement | null>(null)

const goToDetails = (id: string) => {
   navigateTo(`/dashboard/customers/${id}`)
}

const triggerUpload = (target: string) => {
   if (target === 'pic') picInput.value?.click()
   else docInput.value?.click()
}

const handleDocSelection = (event: any) => {
    const file = event.target.files[0]
    if (!file) return
    pendingDocFile.value = file
    isDocModalOpen.value = true
}

const confirmDocUpload = async (docName: string) => {
    isDocModalOpen.value = false
    if (!pendingDocFile.value) return
    
    try {
       const res = await uploadDoc(pendingDocFile.value, 'document')
       const url = res.url || res.data?.url || res
       form.documents.push({
          name: docName,
          url,
          type: pendingDocFile.value.type
       })
       showToast({ title: 'Success', message: 'Document added to list', toastType: 'success' })
    } catch (e) {
       showToast({ title: 'Error', message: 'Document upload failed', toastType: 'error' })
    } finally {
       pendingDocFile.value = null
    }
}

const handleFileUpload = async (event: any, target: string) => {
   const file = event.target.files[0]
   if (!file) return
   
   try {
      const res = await (target === 'pic' ? uploadPic(file, 'image') : uploadDoc(file, 'document'))
      const url = res.url || res.data?.url || res
      
      if (target === 'pic') {
         form.profilePicture = url
      }
      showToast({ title: 'Success', message: 'File uploaded', toastType: 'success' })
   } catch (e) {
      showToast({ title: 'Error', message: 'Upload failed', toastType: 'error' })
   }
}

const openAddDrawer = () => {
   editMode.value = false
   Object.assign(form, {
      _id: '', firstName: '', lastName: '', email: '', phone: '', gender: 'male', dateOfBirth: '', passportNumber: '', profilePicture: '', documents: [], type: 'adult'
   })
   isAddDrawerOpen.value = true
}

const openEditDrawer = (traveler: any) => {
   editMode.value = true
   Object.assign(form, {
      ...traveler,
      dateOfBirth: traveler.dateOfBirth ? new Date(traveler.dateOfBirth).toISOString().split('T')[0] : '',
      documents: JSON.parse(JSON.stringify(traveler.documents || []))
   })
   isAddDrawerOpen.value = true
}

const closeAddDrawer = () => {
   isAddDrawerOpen.value = false
}

const handleSubmit = async () => {
   try {
      if (editMode.value) {
         await updateTraveler(form._id, form)
         showToast({ title: 'Updated', message: 'Traveler updated', toastType: 'success' })
      } else {
         await createTraveler(form)
         showToast({ title: 'Created', message: 'Traveler added', toastType: 'success' })
      }
      isAddDrawerOpen.value = false
      fetchTravelers()
      fetchStats()
   } catch (e) {
      showToast({ title: 'Error', message: 'Action failed', toastType: 'error' })
   }
}

const formatDate = (date: string) => {
   if (!date) return 'N/A'
   return new Date(date).toLocaleDateString()
}

onMounted(() => {
  fetchTravelers()
  fetchStats()
})
</script>
