<template>
  <div class="space-y-6">
    <!-- Breadcrumbs -->
    <nav class="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
      <NuxtLink to="/dashboard/customers" class="hover:text-primary transition-colors">Travelers</NuxtLink>
      <ChevronRightIcon class="h-3 w-3" />
      <span class="text-gray-900">{{ traveler?.firstName }} {{ traveler?.lastName }}</span>
    </nav>

    <div v-if="loading" class="flex items-center justify-center py-20">
       <div class="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else-if="traveler" class="space-y-8 pb-20">
      <!-- Header Profile Section -->
      <div class="bg-white rounded-3xl p-8 border border-gray-100 flex flex-col md:flex-row items-center md:items-start md:justify-between gap-8 shadow-sm">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="relative group">
            <img v-if="traveler.profilePicture" :src="traveler.profilePicture" class="h-32 w-32 rounded-[2.5rem] object-cover border-4 border-white shadow-xl" />
            <div v-else class="h-32 w-32 rounded-[2.5rem] bg-primary/5 flex items-center justify-center text-4xl font-black text-primary border-4 border-white shadow-xl uppercase">
              {{ traveler.firstName[0] }}{{ traveler.lastName[0] }}
            </div>
          </div>
          <div class="text-center md:text-left space-y-2">
            <div class="flex items-center justify-center md:justify-start gap-3">
              <h1 class="text-3xl font-black text-gray-900 tracking-tight">{{ traveler.firstName }} {{ traveler.lastName }}</h1>
              <span class="px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-black uppercase rounded border border-primary/10">{{ traveler.type }}</span>
            </div>
            <p class="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2">
              <EnvelopeIcon class="h-4 w-4 text-gray-400" />
              {{ traveler.email }}
            </p>
            <div class="flex items-center justify-center md:justify-start gap-4">
              <div class="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg border border-gray-100">
                <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                <span class="text-[9px] font-black text-gray-500 uppercase tracking-widest">Active Traveler</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button @click="openEditDrawer" class="px-6 py-2.5 bg-gray-900 text-white text-[11px] font-bold rounded-xl hover:bg-black transition-all flex items-center shadow-lg shadow-black/5">
            <PencilSquareIcon class="h-4 w-4 mr-2" />
            Edit Profile
          </button>
          <button @click="handleDelete" class="p-2.5 text-rose-500 bg-rose-50 border border-rose-100 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
            <TrashIcon class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="stat in personalStats" :key="stat.label" class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
           <div class="absolute -right-4 -top-4 opacity-5 rotate-12 transition-transform group-hover:scale-110">
              <component :is="stat.icon" class="h-20 w-20" />
           </div>
           <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{{ stat.label }}</p>
           <h4 class="text-2xl font-black text-gray-900">{{ stat.value }}</h4>
        </div>
      </div>

      <!-- Main Tabs Section -->
      <div class="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        <div class="flex items-center border-b border-gray-50 px-8">
           <button 
             v-for="tab in ['Personal Details', 'Travel Documents', 'Booking History']" 
             :key="tab" 
             @click="activeTab = tab"
             class="px-6 py-5 text-[11px] font-black uppercase tracking-[0.15em] relative transition-all"
             :class="activeTab === tab ? 'text-primary' : 'text-gray-400 hover:text-gray-600'"
           >
              {{ tab }}
              <div v-if="activeTab === tab" class="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></div>
           </button>
        </div>

        <div class="p-10">
          <!-- Personal Details Tab -->
          <div v-if="activeTab === 'Personal Details'" class="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div class="space-y-8">
                <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                   <UserIcon class="h-4 w-4 text-primary" />
                   Basic Information
                </h3>
                <div class="grid grid-cols-2 gap-6">
                   <div v-for="info in [
                      { l: 'Full Name', v: traveler.firstName + ' ' + traveler.lastName },
                      { l: 'Email Address', v: traveler.email },
                      { l: 'Phone Number', v: traveler.phone || 'Not provided' },
                      { l: 'Gender', v: traveler.gender },
                      { l: 'Date of Birth', v: formatDate(traveler.dateOfBirth) },
                      { l: 'Passport Number', v: traveler.passportNumber || 'Not provided' }
                   ]" :key="info.l" class="space-y-1">
                      <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{{ info.l }}</p>
                      <p class="text-sm font-bold text-gray-900">{{ info.v }}</p>
                   </div>
                </div>
             </div>
             
             <div class="space-y-6">
                <div class="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
                   <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest">Travel Notes</h3>
                   <div class="p-4 bg-white border border-gray-100 rounded-2xl italic text-[11px] text-gray-600 leading-relaxed">
                      "Highly valued customer. Prefers window seats and Marriott brand hotels. Always travels with extra baggage."
                   </div>
                </div>
             </div>
          </div>

          <!-- Travel Documents Tab -->
          <div v-if="activeTab === 'Travel Documents'" class="space-y-8">
             <div class="flex items-center justify-between">
                <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest">Saved Customer Documents</h3>
                <button @click="openEditDrawer('docs')" class="px-4 py-2 bg-gray-50 text-primary text-[10px] font-black uppercase rounded-lg border border-gray-100 hover:bg-primary hover:text-white transition-all">Add New Document</button>
             </div>

             <div v-if="traveler.documents?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="doc in traveler.documents" :key="doc.url" class="p-5 bg-white border border-gray-100 rounded-3xl space-y-4 group hover:border-primary transition-all relative">
                   <div class="h-40 bg-gray-50 rounded-2xl overflow-hidden relative">
                      <img v-if="doc.type?.includes('image')" :src="doc.url" class="w-full h-full object-cover" />
                      <div v-else class="w-full h-full flex flex-col items-center justify-center bg-primary/5">
                         <DocumentIcon class="h-10 w-10 text-primary" />
                         <span class="text-[9px] font-bold text-primary uppercase mt-2">PDF Document</span>
                      </div>
                      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                         <a :href="doc.url" target="_blank" class="p-2.5 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                            <ArrowTopRightOnSquareIcon class="h-4 w-4 text-gray-900" />
                         </a>
                         <button @click="handleDeleteDoc(doc)" class="p-2.5 bg-white rounded-lg hover:bg-rose-50 text-rose-500 transition-colors">
                            <TrashIcon class="h-4 w-4" />
                         </button>
                      </div>
                   </div>
                   <div>
                      <p class="text-xs font-black text-gray-900 uppercase tracking-tight truncate">{{ doc.name }}</p>
                      <p class="text-[9px] text-gray-400 font-bold uppercase mt-1 flex items-center gap-1.5">
                         <div class="h-1 w-1 rounded-full bg-emerald-500"></div>
                         Verified Document
                      </p>
                   </div>
                </div>
             </div>
             <div v-else class="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl space-y-4">
                <DocumentIcon class="h-12 w-12 text-gray-100 mx-auto" />
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No documents found for this traveler</p>
                <button @click="openEditDrawer('docs')" class="px-6 py-2.5 bg-gray-900 text-white text-[10px] font-bold rounded-xl">Upload First Document</button>
             </div>
          </div>

          <!-- Booking History Tab -->
          <div v-if="activeTab === 'Booking History'" class="space-y-6">
             <div v-if="historyLoading" v-for="i in 3" :key="i" class="h-24 bg-gray-50 rounded-3xl animate-pulse"></div>
             <template v-else-if="travelerHistory.length">
                <div v-for="booking in travelerHistory" :key="booking._id" class="p-6 bg-gray-50 rounded-3xl flex items-center justify-between group hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all border border-transparent hover:border-gray-50">
                    <div class="flex items-center space-x-6">
                       <div class="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all border border-gray-100">
                          <TicketIcon class="h-7 w-7" />
                       </div>
                       <div>
                          <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight">{{ booking.serviceDescription || 'Travel Booking' }}</h4>
                          <div class="flex items-center gap-4 mt-1.5">
                             <p class="text-[9px] text-gray-400 font-bold uppercase">{{ formatDate(booking.createdAt) }}</p>
                             <div class="h-1 w-1 rounded-full bg-gray-200"></div>
                             <p class="text-[9px] font-black uppercase" :class="statusClass(booking.status)">{{ booking.status }}</p>
                             <div class="h-1 w-1 rounded-full bg-gray-200"></div>
                             <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest">PNR: {{ booking.pnr }}</p>
                          </div>
                       </div>
                    </div>
                    <div class="text-right">
                       <p class="text-lg font-black text-gray-900">${{ booking.pricing?.totalAmount?.toLocaleString() }}</p>
                       <NuxtLink :to="'/dashboard/bookings?pnr=' + booking.pnr" class="text-[9px] font-black text-primary uppercase hover:underline">View Details</NuxtLink>
                    </div>
                </div>
             </template>
             <div v-else class="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl space-y-4">
                <TicketIcon class="h-12 w-12 text-gray-100 mx-auto" />
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No booking history yet</p>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Side Drawer (Shared with Add Document) -->
    <BaseSidedrawer :show="isEditDrawerOpen" :title="'Update ' + traveler?.firstName + '\'s Information'" @close="isEditDrawerOpen = false" width="max-w-[50vw]" :closeOnClickOutside="false">
       <form @submit.prevent="handleUpdate" class="space-y-10 p-10 pb-32">
          <!-- Profile Photo -->
          <div class="flex items-center space-x-10 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
             <div class="relative group cursor-pointer" @click="triggerUpload('pic')">
                <img v-if="editForm.profilePicture" :src="editForm.profilePicture" class="h-28 w-28 rounded-[2rem] object-cover border-4 border-white shadow-xl" />
                <div v-else class="h-28 w-28 rounded-[2rem] bg-white border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-300 hover:text-primary transition-all">
                   <div v-if="uploadingPic" class="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                   <template v-else>
                      <CameraIcon class="h-7 w-7 mb-1" />
                      <span class="text-[8px] font-black uppercase tracking-widest text-center px-4">Change Photo</span>
                   </template>
                </div>
                <div v-if="uploadingPic" class="absolute inset-0 bg-white/60 flex items-center justify-center rounded-[2rem]">
                   <div class="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
             </div>
             <div class="flex-1 space-y-2">
                <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight">Profile Photo</h4>
                <p class="text-[10px] text-gray-400 font-medium leading-relaxed">Update the traveler's photo for easier identification.</p>
             </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
             <div class="space-y-2">
                <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">First Name</label>
                <input v-model="editForm.firstName" required class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-sm shadow-black/5" />
             </div>
             <div class="space-y-2">
                <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Last Name</label>
                <input v-model="editForm.lastName" required class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-sm shadow-black/5" />
             </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
             <div class="space-y-2">
                <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                <input v-model="editForm.email" type="email" required class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-sm shadow-black/5" />
             </div>
             <div class="space-y-2">
                <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Phone Number</label>
                <input v-model="editForm.phone" type="tel" class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-sm shadow-black/5" />
             </div>
          </div>

          <div class="grid grid-cols-3 gap-6">
             <div class="space-y-2">
                <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Gender</label>
                <select v-model="editForm.gender" class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all uppercase shadow-sm shadow-black/5">
                   <option value="male">MALE</option>
                   <option value="female">FEMALE</option>
                   <option value="other">OTHER</option>
                </select>
             </div>
             <div class="space-y-2">
                <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Date of Birth</label>
                <input v-model="editForm.dateOfBirth" type="date" required class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-sm shadow-black/5" />
             </div>
             <div class="space-y-2">
                <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Passport Number</label>
                <input v-model="editForm.passportNumber" class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all uppercase shadow-sm shadow-black/5" />
             </div>
          </div>

          <!-- Documents Section in Edit -->
          <div class="space-y-6 pt-4">
             <div class="flex items-center justify-between border-b border-gray-50 pb-4">
                <h4 class="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Travel Documents</h4>
             </div>
             
             <div class="grid grid-cols-2 gap-4">
                <div v-for="(doc, idx) in editForm.documents" :key="idx" class="relative group p-4 bg-white border border-gray-100 rounded-3xl flex items-center space-x-4 hover:border-primary transition-all shadow-sm">
                   <div class="h-12 w-12 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center">
                      <img v-if="doc.type?.includes('image')" :src="doc.url" class="w-full h-full object-cover" />
                      <DocumentIcon v-else class="h-6 w-6 text-gray-300" />
                   </div>
                   <div class="flex-1 min-w-0">
                      <p class="text-[10px] font-black text-gray-900 truncate uppercase tracking-tighter">{{ doc.name }}</p>
                      <p class="text-[8px] text-gray-400 uppercase font-black tracking-tighter">Saved Document</p>
                   </div>
                   <button type="button" @click="editForm.documents.splice(idx, 1)" class="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><XMarkIcon class="h-4 w-4" /></button>
                </div>

                <div @click="triggerUpload('doc')" class="border-2 border-dashed border-gray-100 rounded-3xl p-5 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all cursor-pointer bg-gray-50/20">
                   <div v-if="uploadingDoc" class="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                   <template v-else>
                      <CloudArrowUpIcon class="h-6 w-6 mb-2" />
                      <span class="text-[9px] font-black uppercase tracking-widest text-center">Upload New Doc</span>
                   </template>
                </div>
             </div>
          </div>

          <input type="file" ref="picInput" class="hidden" accept="image/*" @change="handleFileUpload($event, 'pic')" />
          <input type="file" ref="docInput" class="hidden" @change="handleDocSelection($event)" />
       </form>

       <template #footer>
          <div class="flex items-center justify-end space-x-6 w-full px-6 py-2">
             <button type="button" @click="isEditDrawerOpen = false" class="px-10 py-4 bg-white text-gray-400 text-[10px] font-black uppercase rounded-2xl hover:bg-gray-50 transition-all border border-gray-100">Cancel</button>
             <button 
               @click="handleUpdate" 
               :disabled="updating"
               class="flex-grow max-w-[350px] py-5 bg-primary text-white text-[10px] font-black uppercase rounded-2xl hover:bg-black transition-all shadow-2xl shadow-primary/20 disabled:opacity-50"
             >
               {{ updating ? 'Saving Changes...' : 'Save Traveler Profile' }}
             </button>
          </div>
       </template>
    </BaseSidedrawer>

    <!-- Document Type Selector -->
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
  </div>

  <BaseModal 
    :show="isVisible" 
    :title="options.title" 
    @close="handleCancel"
  >
    <div class="text-center py-4">
      <p class="text-xs font-bold text-gray-500 leading-relaxed">
        {{ options.message }}
      </p>
    </div>
    <template #footer>
      <div class="flex items-center space-x-2 w-full">
        <BaseButton v-if="options.cancelText" variant="ghost" block @click="handleCancel" class="text-xs">{{ options.cancelText }}</BaseButton>
        <BaseButton variant="primary" block @click="handleConfirm" class="text-xs">{{ options.confirmText }}</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  ChevronRightIcon, 
  EnvelopeIcon, 
  TrashIcon, 
  PencilSquareIcon,
  UserIcon,
  DocumentIcon,
  TicketIcon,
  ArrowTopRightOnSquareIcon,
  ArrowRightIcon,
  CameraIcon,
  CloudArrowUpIcon,
  XMarkIcon,
  CurrencyDollarIcon,
  GlobeAltIcon
} from '@heroicons/vue/24/outline'
import { useTravelers } from '@/composables/modules/users/useTravelers'
import { useBookings } from '@/composables/modules/bookings/useBookings'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useUpload } from '@/composables/core/useUpload'
import { useConfirmation } from '@/composables/core/useConfirmation'
import BaseSidedrawer from '@/components/ui/BaseSidedrawer.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()
const { isVisible, options, handleConfirm, handleCancel, confirm } = useConfirmation()
const travelerId = route.params.id as string

const { loading, updating, fetchTravelerById, updateTraveler, deleteTraveler } = useTravelers()
const { bookings: allBookings, fetchBookings, loading: historyLoading } = useBookings()
const { showToast } = useCustomToast()
const { uploadFile: uploadPic, uploading: uploadingPic } = useUpload()
const { uploadFile: uploadDoc, uploading: uploadingDoc } = useUpload()

const traveler = ref<any>(null)
const travelerHistory = ref<any[]>([])
const activeTab = ref('Personal Details')
const isEditDrawerOpen = ref(false)
const isDocModalOpen = ref(false)
const pendingDocFile = ref<File | null>(null)

const editForm = reactive({
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

const loadData = async () => {
   try {
      traveler.value = await fetchTravelerById(travelerId)
      await fetchBookings()
      travelerHistory.value = allBookings.value.filter((b: any) => 
         b.contactDetails?.email === traveler.value.email || 
         b.user?.email === traveler.value.email
      )
   } catch (e) {
      showToast({ title: 'Error', message: 'Could not load traveler details', toastType: 'error' })
      router.push('/dashboard/customers')
   }
}

onMounted(loadData)

const personalStats = computed(() => [
  { label: 'Total Bookings', value: travelerHistory.value.length, icon: TicketIcon },
  { label: 'Total Money Spent', value: '$' + travelerHistory.value.reduce((acc, curr) => acc + (curr.pricing?.totalAmount || 0), 0).toLocaleString(), icon: CurrencyDollarIcon },
  { label: 'Frequent Destination', value: getFrequentDestination(), icon: GlobeAltIcon },
])

const getFrequentDestination = () => {
   if (!travelerHistory.value.length) return 'None'
   const dests = travelerHistory.value.map(b => b.flights?.[0]?.flight?.destination || b.stays?.[0]?.stay?.city || 'Unknown')
   const counts = dests.reduce((a, c) => ({ ...a, [c]: (a[c] || 0) + 1 }), {} as any)
   return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b)
}

const openEditDrawer = (section?: string) => {
   Object.assign(editForm, {
      ...traveler.value,
      dateOfBirth: traveler.value.dateOfBirth ? new Date(traveler.value.dateOfBirth).toISOString().split('T')[0] : '',
      documents: JSON.parse(JSON.stringify(traveler.value.documents || []))
   })
   isEditDrawerOpen.value = true
   if (section === 'docs') {
      activeTab.value = 'Travel Documents'
   }
}

const triggerUpload = (target: string) => {
   if (target === 'pic') picInput.value?.click()
   else docInput.value?.click()
}

const handleFileUpload = async (event: any, target: string) => {
   const file = event.target.files[0]
   if (!file) return
   
   try {
      const res = await (target === 'pic' ? uploadPic(file, 'image') : uploadDoc(file, 'document'))
      const url = res.url || res.data?.url || res
      if (target === 'pic') {
         editForm.profilePicture = url
      }
      showToast({ title: 'Success', message: 'File uploaded', toastType: 'success' })
   } catch (e) {
      showToast({ title: 'Error', message: 'Upload failed', toastType: 'error' })
   }
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
       editForm.documents.push({
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

const handleUpdate = async () => {
   try {
      await updateTraveler(travelerId, editForm)
      showToast({ title: 'Saved', message: 'Traveler information updated', toastType: 'success' })
      isEditDrawerOpen.value = false
      await loadData()
   } catch (e) {
      showToast({ title: 'Error', message: 'Failed to update traveler', toastType: 'error' })
   }
}

const handleDelete = async () => {
   const confirmed = await confirm({
      title: 'Delete Traveler?',
      message: `Are you sure you want to permanently delete ${traveler.value?.firstName}? This action cannot be undone.`,
      confirmText: 'Yes, Delete',
      cancelText: 'No, Keep'
   })
   
   if (!confirmed) return
   try {
      await deleteTraveler(travelerId)
      showToast({ title: 'Deleted', message: 'Traveler deleted successfully', toastType: 'success' })
      router.push('/dashboard/customers')
   } catch (e) {
      showToast({ title: 'Error', message: 'Delete failed', toastType: 'error' })
   }
}

const handleDeleteDoc = async (doc: any) => {
   const confirmed = await confirm({
      title: 'Remove Document?',
      message: `Are you sure you want to remove ${doc.name}?`,
      confirmText: 'Remove',
      cancelText: 'Cancel'
   })
   if (!confirmed) return
   const updatedDocs = traveler.value.documents.filter((d: any) => d.url !== doc.url)
   try {
      await updateTraveler(travelerId, { ...traveler.value, documents: updatedDocs })
      showToast({ title: 'Removed', message: 'Document removed', toastType: 'success' })
      await loadData()
   } catch (e) {
      showToast({ title: 'Error', message: 'Failed to remove document', toastType: 'error' })
   }
}

const statusClass = (status: string) => {
   const s = status?.toLowerCase() || ''
   if (s === 'confirmed' || s === 'ticketed') return 'text-emerald-500'
   if (s === 'pending') return 'text-amber-500'
   return 'text-gray-400'
}

const formatDate = (date: string) => {
   if (!date) return 'N/A'
   return new Date(date).toLocaleDateString()
}
</script>
