<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Email Campaigns</h2>
        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Send newsletters and special offers to your travelers</p>
      </div>
      <button 
        @click="openCreateModal"
        class="px-5 py-2.5 bg-primary text-white text-[11px] font-bold rounded-xl hover:bg-black transition-all flex items-center shadow-lg shadow-primary/10"
      >
        <PlusIcon class="h-4 w-4 mr-2" />
        Create New Email
      </button>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
       <template v-if="loading">
          <div v-for="i in 4" :key="i" class="bg-white p-5 rounded-2xl border border-gray-100 flex items-center space-x-4 animate-pulse">
             <div class="h-12 w-12 bg-gray-50 rounded-xl"></div>
             <div class="space-y-2 flex-grow">
                <div class="h-2 bg-gray-50 rounded w-1/2"></div>
                <div class="h-4 bg-gray-100 rounded w-3/4"></div>
             </div>
          </div>
       </template>
       <template v-else>
          <div v-for="stat in marketingStatsList" :key="stat.label" class="bg-white p-5 rounded-2xl border border-gray-100 flex items-center space-x-4 shadow-sm">
             <div :class="stat.bg" class="p-4 rounded-2xl shadow-inner">
                <component :is="stat.icon" class="h-6 w-6" :class="stat.color" />
             </div>
             <div class="space-y-0.5">
                <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">{{ stat.label }}</p>
                <p class="text-xl font-black text-gray-900 tracking-tight">{{ stat.value }}</p>
             </div>
          </div>
       </template>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
       <div class="lg:col-span-12 space-y-4">
          <div class="flex items-center justify-between">
             <div class="flex items-center gap-1 p-1 bg-gray-50 rounded-xl">
                <button @click="activeTab = 'campaigns'" class="px-5 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all" :class="activeTab === 'campaigns' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'">My Campaigns</button>
                <button @click="activeTab = 'templates'" class="px-5 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all" :class="activeTab === 'templates' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'">Templates</button>
             </div>
             <button v-if="activeTab === 'templates' && templates.length === 0" @click="handleSeedTemplates" class="px-4 py-2 bg-violet-600 text-white text-[9px] font-black uppercase rounded-xl hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20">Generate Templates</button>
          </div>

          <div class="space-y-3">
              <SkeletonLoader v-if="loading" :rows="3" avatar />
             
             <div v-else-if="displayCampaigns.length === 0" class="bg-white border-2 border-dashed border-gray-100 rounded-3xl p-24 text-center">
                <div class="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                   <EnvelopeIcon class="h-8 w-8 text-gray-200" />
                </div>
                <h3 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">No Campaigns Found</h3>
                <p class="text-[10px] text-gray-400 mt-2 font-medium">Start engaging your customers with personalized email campaigns.</p>
                <button @click="openCreateModal" class="mt-8 px-6 py-2.5 bg-gray-900 text-white text-[10px] font-bold rounded-xl shadow-xl shadow-black/10 transition-all">Create your first campaign</button>
             </div>

             <div v-for="campaign in displayCampaigns" :key="campaign._id" class="bg-white border border-gray-100 p-6 rounded-3xl hover:border-primary/20 hover:shadow-lg transition-all group">
                <div class="flex items-center justify-between">
                   <div class="flex items-center space-x-6 flex-grow min-w-0">
                      <div class="h-14 w-14 shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-primary/5 transition-colors overflow-hidden border border-gray-100">
                         <img v-if="campaign.coverImage" :src="campaign.coverImage" class="w-full h-full object-cover" />
                         <component v-else :is="campaign.status === 'sent' ? CheckCircleIcon : (campaign.status === 'queued' ? ClockIcon : PaperAirplaneIcon)" class="h-6 w-6" :class="campaign.status === 'sent' ? 'text-emerald-500' : (campaign.status === 'queued' ? 'text-amber-500' : 'text-gray-400')" />
                      </div>
                      <div class="min-w-0 flex-grow">
                         <div class="flex items-center gap-3">
                            <h4 class="text-sm font-black text-gray-900 leading-tight tracking-tight truncate">{{ campaign.title }}</h4>
                            <span v-if="campaign.isTemplate" class="shrink-0 px-2 py-0.5 text-[7px] font-black uppercase tracking-wider rounded-full bg-violet-50 text-violet-600 border border-violet-100">Template</span>
                         </div>
                         <p class="text-[10px] text-gray-400 font-bold mt-1 truncate max-w-sm">{{ campaign.subject }}</p>
                         <div class="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2.5">
                            <span class="px-2.5 py-0.5 text-[8px] font-black uppercase tracking-tighter rounded-full border transition-colors" :class="statusClass(campaign.status)">{{ campaign.status }}</span>
                            <span class="text-[9px] font-bold text-gray-300 flex items-center gap-1">
                               <EnvelopeIcon class="h-3 w-3" />
                               {{ campaign.recipientCount || 0 }} recipients
                            </span>
                            <span class="text-[9px] font-bold flex items-center gap-1" :class="campaign.filters?.target === 'specific' ? 'text-blue-400' : 'text-gray-300'">
                               <UsersIcon class="h-3 w-3" />
                               {{ campaign.filters?.target === 'specific' ? 'Custom List' : 'All Travelers' }}
                            </span>
                            <span v-if="campaign.scheduledAt && campaign.status === 'queued'" class="text-[9px] font-bold text-amber-500 flex items-center gap-1">
                               <ClockIcon class="h-3 w-3" />
                               {{ formatDate(campaign.scheduledAt) }}
                            </span>
                            <span class="text-[9px] font-bold text-gray-300">{{ formatDate(campaign.createdAt) }}</span>
                         </div>
                         <div v-if="campaign.filters?.emails?.length" class="flex flex-wrap gap-1.5 mt-2">
                            <span v-for="email in campaign.filters.emails.slice(0, 3)" :key="email" class="px-2 py-0.5 bg-gray-50 text-[8px] font-bold text-gray-500 rounded-full border border-gray-100 truncate max-w-[160px]">{{ email }}</span>
                            <span v-if="campaign.filters.emails.length > 3" class="px-2 py-0.5 bg-gray-50 text-[8px] font-bold text-gray-400 rounded-full border border-gray-100">+{{ campaign.filters.emails.length - 3 }} more</span>
                         </div>
                      </div>
                   </div>
                   <div class="flex items-center space-x-2 shrink-0 ml-4">
                      <button v-if="campaign.status === 'draft' && !campaign.isTemplate" @click="handleSendCampaign(campaign._id)" class="px-4 py-2 bg-gray-900 text-white text-[9px] font-black uppercase rounded-lg hover:bg-primary transition-all shadow-lg shadow-black/5">
                         Send Now
                      </button>
                      <button v-if="campaign.isTemplate" @click="useTemplate(campaign)" class="px-4 py-2 bg-primary text-white text-[9px] font-black uppercase rounded-lg hover:bg-black transition-all shadow-lg shadow-primary/10">
                         Use Template
                      </button>
                      <button @click="openEditModal(campaign)" class="p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                         <PencilSquareIcon class="h-4 w-4" />
                      </button>
                      <button @click="handleDeleteCampaign(campaign._id)" class="p-2.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                         <TrashIcon class="h-4 w-4" />
                      </button>
                      <button @click="viewDetails(campaign)" class="p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                         <EyeIcon class="h-4 w-4" />
                      </button>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>

    <!-- Full Screen Creation Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-[60] bg-white flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-300">
       <header class="px-8 h-20 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div class="flex items-center space-x-6">
             <button @click="isModalOpen = false" class="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-900 transition-all">
                <XMarkIcon class="h-6 w-6" />
             </button>
             <div class="h-8 w-px bg-gray-100"></div>
             <div>
                <h3 class="text-lg font-black text-gray-900 tracking-tight uppercase">{{ editMode ? 'Update Campaign' : 'Create New Email Campaign' }}</h3>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{{ editMode ? 'Modify your existing draft or schedule' : 'Assemble a new newsletter or promotion for your travelers' }}</p>
             </div>
          </div>
          <div class="flex items-center space-x-4">
             <button @click="isModalOpen = false" class="px-6 py-3 text-[10px] font-black uppercase text-gray-400 hover:text-gray-900 transition-colors">Discard Draft</button>
             <button @click="handleSave(true)" :disabled="creating || updating" class="px-6 py-3 border border-gray-200 text-[10px] font-black uppercase text-gray-600 rounded-2xl hover:border-gray-900 transition-all disabled:opacity-50">Save as Draft</button>
             <button @click="handleSave(false)" :disabled="creating || updating" class="px-10 py-3 bg-primary text-white text-[10px] font-black uppercase rounded-2xl hover:bg-black transition-all shadow-2xl shadow-primary/20 disabled:opacity-50">
                {{ creating || updating ? 'Processing...' : (campaignForm.scheduledAt ? 'Schedule Transmission' : 'Send Immediately') }}
             </button>
          </div>
       </header>

       <main class="flex-grow overflow-y-auto no-scrollbar bg-gray-50/50 p-10">
          <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
             <!-- Sidebar Info -->
             <div class="space-y-8">
                <section class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                   <h4 class="text-[10px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                      <InformationCircleIcon class="h-4 w-4 text-primary" />
                      Campaign Setup
                   </h4>
                   
                   <div class="space-y-4">
                      <div class="space-y-1.5">
                         <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Campaign Name</label>
                         <input v-model="campaignForm.title" placeholder="e.g., Summer Holiday Flash Sale" class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-sm" />
                      </div>
                      <div class="space-y-1.5">
                         <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Email Subject</label>
                         <input v-model="campaignForm.subject" placeholder="What they see in their inbox" class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-sm" />
                      </div>
                   </div>
                </section>

                <section class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                   <h4 class="text-[10px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                      <UsersIcon class="h-4 w-4 text-primary" />
                      Target Audience
                   </h4>
                   
                   <div class="space-y-6">
                      <BaseSelect 
                        v-model="campaignForm.target"
                        label="Who to send to?"
                        :options="[
                          { label: 'ALL TRAVELERS', value: 'all' },
                          { label: 'ACTIVE TRAVELERS ONLY', value: 'active' },
                          { label: 'SPECIFIC LIST', value: 'specific' }
                        ]"
                      />
                      <div v-if="campaignForm.target === 'specific'" class="space-y-1.5">
                         <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Recipient List</label>
                         <TagInput 
                            v-model="campaignForm.customRecipients"
                            placeholder="Type email and press enter or comma..."
                         />
                      </div>
                   </div>
                </section>

                <section class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                   <h4 class="text-[10px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                      <ClockIcon class="h-4 w-4 text-primary" />
                      Transmission Timing
                   </h4>
                   
                   <div class="space-y-6">
                      <div class="grid grid-cols-2 gap-3 p-1.5 bg-gray-50 rounded-2xl">
                         <button 
                           v-for="mode in ['immediate', 'custom']" 
                           :key="mode"
                           @click="schedulingMode = mode"
                           class="py-3 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all"
                           :class="schedulingMode === mode ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'"
                         >
                            {{ mode === 'immediate' ? 'Send Now' : 'Schedule for later' }}
                         </button>
                      </div>

                      <div v-if="schedulingMode === 'custom'" class="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                         <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Specify Date & Time</label>
                         <input 
                           v-model="campaignForm.scheduledAt" 
                           type="datetime-local" 
                           class="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-sm" 
                         />
                      </div>
                      <p class="text-[8px] text-gray-400 font-medium px-1 leading-relaxed">
                         {{ schedulingMode === 'immediate' ? 'Your campaign will be dispatched to all selected recipients immediately upon deployment.' : 'Select a future date and time for automated transmission.' }}
                      </p>
                   </div>
                </section>
             </div>

             <!-- Main Content Area -->
             <div class="lg:col-span-2 space-y-8">
                <section class="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
                   <div class="flex items-center justify-between">
                      <h4 class="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Email Content & Design</h4>
                      <p class="text-[10px] text-gray-400 font-bold uppercase">Assemble your narrative</p>
                   </div>
                   
                   <div class="space-y-8">
                      <!-- Cover Image -->
                      <div class="relative h-64 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100 group overflow-hidden flex flex-col items-center justify-center transition-all hover:border-primary/20">
                         <img v-if="campaignForm.coverImage" :src="campaignForm.coverImage" class="absolute inset-0 w-full h-full object-cover" />
                         <div v-if="uploading" class="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                            <div class="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                         </div>
                         <div class="relative z-10 text-center space-y-3 p-10" :class="campaignForm.coverImage ? 'opacity-0 group-hover:opacity-100' : ''">
                            <div class="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl" @click="triggerUpload">
                               <CameraIcon class="h-8 w-8 text-primary" />
                            </div>
                            <div class="space-y-1">
                               <p class="text-xs font-black text-gray-900 uppercase tracking-widest">Header Image</p>
                               <p class="text-[10px] text-gray-400 font-bold uppercase">Best size: 1200x600px</p>
                            </div>
                         </div>
                         <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileUpload" />
                      </div>

                      <div class="space-y-4">
                         <label class="text-[10px] font-black text-gray-900 uppercase tracking-widest px-2">Email Body Content</label>
                         <RichTextEditor v-model="campaignForm.content" class="min-h-[500px]" />
                      </div>
                   </div>

                   <div class="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex items-start space-x-4">
                      <div class="p-2 bg-white rounded-xl shadow-sm">
                         <SparklesIcon class="h-5 w-5 text-primary" />
                      </div>
                      <div class="space-y-1">
                         <p class="text-[10px] font-black text-primary uppercase tracking-widest">Branding Engine Active</p>
                         <p class="text-[11px] text-primary/70 font-medium leading-relaxed">Flybeth will automatically attach your agency's logo, color palette, and contact signature to the footer of this transmission.</p>
                      </div>
                   </div>
                </section>
             </div>
          </div>
       </main>
    </div>

    <!-- Campaign Details Sidedrawer -->
    <BaseSidedrawer :show="!!selectedCampaign" :title="'Campaign Detail: ' + selectedCampaign?.title" @close="selectedCampaign = null" width="max-w-xl">
       <div v-if="selectedCampaign" class="p-8 space-y-8">
          <div class="relative h-48 bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-lg">
             <img v-if="selectedCampaign.coverImage" :src="selectedCampaign.coverImage" class="w-full h-full object-cover" />
             <div v-else class="w-full h-full flex items-center justify-center bg-primary/5">
                <component :is="selectedCampaign.status === 'sent' ? CheckCircleIcon : PaperAirplaneIcon" class="h-12 w-12 text-primary" />
             </div>
             <div class="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur shadow-sm rounded-lg text-[9px] font-black uppercase" :class="statusClass(selectedCampaign.status)">
                {{ selectedCampaign.status }}
             </div>
          </div>

          <div class="space-y-2">
             <h3 class="text-2xl font-black text-gray-900 tracking-tight">{{ selectedCampaign.title }}</h3>
             <p class="text-xs font-bold text-gray-500 uppercase tracking-widest">{{ selectedCampaign.subject }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
             <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Recipients</p>
                <p class="text-xl font-bold text-gray-900">{{ selectedCampaign.recipientCount || 0 }}</p>
             </div>
             <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Date Sent</p>
                <p class="text-xl font-bold text-gray-900">{{ selectedCampaign.sentAt ? formatDate(selectedCampaign.sentAt) : 'Pending' }}</p>
             </div>
             <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Target Audience</p>
                <p class="text-sm font-bold text-gray-900 capitalize">{{ selectedCampaign.filters?.target || 'All' }}</p>
             </div>
             <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Created</p>
                <p class="text-sm font-bold text-gray-900">{{ formatDate(selectedCampaign.createdAt) }}</p>
             </div>
          </div>

          <div v-if="selectedCampaign.filters?.emails?.length" class="space-y-3">
             <h4 class="text-[10px] font-black text-gray-900 uppercase tracking-widest">Recipient Emails</h4>
             <div class="flex flex-wrap gap-2">
                <span v-for="email in selectedCampaign.filters.emails" :key="email" class="px-3 py-1.5 bg-blue-50 text-[10px] font-bold text-blue-600 rounded-full border border-blue-100">{{ email }}</span>
             </div>
          </div>

          <div class="space-y-4">
             <h4 class="text-[10px] font-black text-gray-900 uppercase tracking-widest border-b border-gray-50 pb-2">Email Content Preview</h4>
             <div class="prose prose-sm max-w-none text-gray-600 rounded-2xl bg-gray-50/50 p-6 border border-gray-100" v-html="selectedCampaign.content"></div>
          </div>

          <div class="flex items-center gap-3 pt-6 border-t border-gray-50">
             <button v-if="selectedCampaign.status === 'draft'" @click="openEditModal(selectedCampaign)" class="flex-1 py-4 bg-gray-900 text-white text-[10px] font-black uppercase rounded-2xl">Edit Campaign</button>
             <button @click="handleDeleteCampaign(selectedCampaign._id)" class="px-6 py-4 bg-rose-50 text-rose-500 border border-rose-100 text-[10px] font-black uppercase rounded-2xl hover:bg-rose-500 hover:text-white transition-all">Delete Record</button>
          </div>
       </div>
    </BaseSidedrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { 
  PlusIcon, 
  EnvelopeIcon, 
  PaperAirplaneIcon, 
  CheckCircleIcon,
  PhotoIcon,
  UsersIcon,
  CursorArrowRaysIcon,
  ArrowUpRightIcon,
  InformationCircleIcon,
  XMarkIcon,
  CameraIcon,
  SparklesIcon,
  ClockIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/vue/24/outline'
import BaseSidedrawer from '@/components/ui/BaseSidedrawer.vue'
import RichTextEditor from '@/components/ui/RichTextEditor.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import TagInput from '@/components/ui/TagInput.vue'
import SkeletonLoader from '@/components/ui/SkeletonLoader.vue'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useMarketing } from '@/composables/modules/marketing/useMarketing'
import { useUpload } from '@/composables/core/useUpload'

definePageMeta({
  layout: 'dashboard'
})

const { campaigns, templates, stats, loading, creating, updating, loadingTemplates, fetchCampaigns, fetchStats, fetchTemplates, seedTemplates, createCampaign, updateCampaign, deleteCampaign, sendCampaign } = useMarketing()
const { showToast } = useCustomToast()
const { uploadFile, uploading } = useUpload()

const activeTab = ref<'campaigns' | 'templates'>('campaigns')

const displayCampaigns = computed(() => {
   if (activeTab.value === 'templates') return templates.value
   return campaigns.value.filter(c => !c.isTemplate)
})

const marketingStatsList = computed(() => [
  { label: 'Total Recipients', value: stats.value.totalRecipients?.toLocaleString() || '0', icon: UsersIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Avg Open Rate', value: stats.value.avgOpenRate || '0%', icon: CursorArrowRaysIcon, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Scheduled Email', value: stats.value.scheduled?.toString() || '0', icon: ClockIcon, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Total Conversion', value: stats.value.conversionRate || '0%', icon: ArrowUpRightIcon, color: 'text-rose-600', bg: 'bg-rose-50' },
])

const isModalOpen = ref(false)
const selectedCampaign = ref<any>(null)
const editMode = ref(false)
const schedulingMode = ref('immediate')
const fileInput = ref<HTMLInputElement | null>(null)

const campaignForm = reactive({
  _id: '',
  title: '',
  subject: '',
  content: '',
  coverImage: '',
  target: 'all',
  customRecipients: [] as string[],
  scheduledAt: ''
})

const openCreateModal = () => {
   editMode.value = false
   schedulingMode.value = 'immediate'
   Object.assign(campaignForm, {
      _id: '', title: '', subject: '', content: '', coverImage: '', target: 'all', customRecipients: [], scheduledAt: ''
   })
   isModalOpen.value = true
}

const openEditModal = (campaign: any) => {
   selectedCampaign.value = null
   editMode.value = true
   schedulingMode.value = campaign.scheduledAt ? 'custom' : 'immediate'
   const emailList = campaign.filters?.emails || []
   Object.assign(campaignForm, {
      _id: campaign._id,
      title: campaign.title || '',
      subject: campaign.subject || '',
      content: campaign.content || '',
      coverImage: campaign.coverImage || '',
      target: campaign.filters?.target || 'all',
      customRecipients: emailList,
      scheduledAt: campaign.scheduledAt ? new Date(campaign.scheduledAt).toISOString().slice(0, 16) : ''
   })
   isModalOpen.value = true
}

const useTemplate = (template: any) => {
   editMode.value = false
   schedulingMode.value = 'immediate'
   Object.assign(campaignForm, {
      _id: '',
      title: template.title || '',
      subject: template.subject || '',
      content: template.content || '',
      coverImage: template.coverImage || '',
      target: 'all',
      customRecipients: [],
      scheduledAt: ''
   })
   isModalOpen.value = true
   showToast({ title: 'Template Loaded', message: 'Edit the content and deploy when ready', toastType: 'success' })
}

const viewDetails = (campaign: any) => {
   selectedCampaign.value = campaign
}

const triggerUpload = () => {
   fileInput.value?.click()
}

const handleFileUpload = async (event: any) => {
   const file = event.target.files[0]
   if (!file) return
   try {
      const res = await uploadFile(file, 'image')
      campaignForm.coverImage = res.url || res.data?.url || res
   } catch (e) {
      console.error("Upload failed")
   }
}

const handleSave = async (isDraft: boolean) => {
   if (!campaignForm.title || !campaignForm.subject) {
      showToast({ title: 'Wait', message: 'Name and Subject are required', toastType: 'warning' })
      return
   }

   try {
      const finalScheduledAt = schedulingMode.value === 'custom' ? campaignForm.scheduledAt : ''
      const payload = { 
         ...campaignForm, 
         targetEmails: campaignForm.customRecipients.join(','),
         scheduledAt: finalScheduledAt,
         status: isDraft ? 'draft' : (finalScheduledAt ? 'queued' : 'sent') 
      }
      if (editMode.value) {
         await updateCampaign(campaignForm._id, payload)
         showToast({ title: 'Success', message: 'Campaign updated', toastType: 'success' })
      } else {
         await createCampaign(payload)
         showToast({ title: 'Success', message: isDraft ? 'Draft saved' : 'Campaign deployed', toastType: 'success' })
      }
      isModalOpen.value = false
      await fetchCampaigns()
      await fetchStats()
   } catch (e) {
      showToast({ title: 'Error', message: 'Action failed', toastType: 'error' })
   }
}

const handleDeleteCampaign = async (id: string) => {
   try {
      await deleteCampaign(id)
      showToast({ title: 'Deleted', message: 'Campaign removed from system', toastType: 'success' })
      selectedCampaign.value = null
      await fetchCampaigns()
      await fetchTemplates()
      await fetchStats()
   } catch (e) {
      showToast({ title: 'Error', message: 'Delete failed', toastType: 'error' })
   }
}

const handleSeedTemplates = async () => {
   await seedTemplates()
   showToast({ title: 'Templates Created', message: '4 campaign templates are now available', toastType: 'success' })
}

const handleSendCampaign = async (id: string) => {
   try {
      await sendCampaign(id)
      showToast({ title: 'Sent', message: 'Broadcast initiated successfully', toastType: 'success' })
      await fetchCampaigns()
      await fetchStats()
   } catch (e) {
      showToast({ title: 'Error', message: 'Broadcast failed', toastType: 'error' })
   }
}

const statusClass = (status: string) => {
   const s = status?.toLowerCase() || ''
   if (s === 'sent') return 'bg-emerald-50 text-emerald-600 border-emerald-100'
   if (s === 'queued') return 'bg-amber-50 text-amber-600 border-amber-100'
   if (s === 'draft') return 'bg-gray-50 text-gray-500 border-gray-100'
   return 'bg-rose-50 text-rose-600 border-rose-100'
}

const formatDate = (date: string) => {
   if (!date) return ''
   return new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  fetchCampaigns()
  fetchStats()
  fetchTemplates()
})
</script>
