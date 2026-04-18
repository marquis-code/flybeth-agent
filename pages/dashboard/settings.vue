<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <!-- Header - Condensed -->
    <div class="border-b border-gray-100 pb-4">
      <h2 class="text-2xl font-bold text-gray-900 ">Account Configurations</h2>
      <p class="text-[10px] text-gray-400 font-bold  ">Manage your agent profile, security, and preferences</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Sidebar Navigation for Settings -->
      <div class="space-y-1">
        <button 
          v-for="s in settingTabs" 
          :key="s.id"
          @click="activeSection = s.id"
          class="w-full flex items-center px-4 py-2.5 rounded-lg text-xs font-bold transition-all text-left"
          :class="activeSection === s.id ? 'bg-primary/5 text-primary border border-primary/10' : 'text-gray-500 hover:bg-gray-50'"
        >
          <component :is="s.icon" class="h-4 w-4 mr-3" />
          {{ s.label }}
        </button>
      </div>

      <!-- Main Settings Form Area -->
      <div class="md:col-span-2 space-y-8">
        <!-- 1. Profile Section -->
        <div v-if="activeSection === 'profile'" class="space-y-6">
           <div class="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-xl relative overflow-hidden group">
              <div class="relative group cursor-pointer" @click="triggerPhotoUpload">
                 <img v-if="user?.avatar" :src="user.avatar" class="h-20 w-20 rounded-2xl bg-gray-50 object-cover border border-gray-100" />
                 <div v-else class="h-20 w-20 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl font-bold text-primary border border-gray-100">
                    {{ user?.firstName?.[0] }}
                 </div>
                 <div class="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <CameraIcon class="h-6 w-6 text-white" />
                 </div>
                 <input type="file" ref="photoInput" class="hidden" accept="image/*" @change="handlePhotoChange" />
              </div>
              <div>
                 <h4 class="text-sm font-bold text-gray-900">{{ user?.firstName }} {{ user?.lastName }}</h4>
                 <p class="text-xs text-gray-400 font-medium">{{ user?.email }}</p>
                 <span class="inline-block mt-2 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-bold rounded border border-emerald-100 uppercase">Verified Agent</span>
              </div>
              <div v-if="localLoading" class="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                 <div class="flex flex-col items-center">
                    <div class="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span class="mt-2 text-[8px] font-bold text-primary uppercase">Synchronizing...</span>
                 </div>
              </div>
           </div>

           <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1.5">
                 <label class="text-[10px] font-bold text-gray-400 px-1">First Name</label>
                 <input v-model="profileForm.firstName" type="text" class="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-900 outline-none focus:border-primary transition-colors" />
              </div>
              <div class="space-y-1.5">
                 <label class="text-[10px] font-bold text-gray-400 px-1">Last Name</label>
                 <input v-model="profileForm.lastName" type="text" class="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-900 outline-none focus:border-primary transition-colors" />
              </div>
           </div>
           
           <div class="space-y-1.5">
              <label class="text-[10px] font-bold text-gray-400 px-1">Phone Number</label>
              <input v-model="profileForm.phone" type="tel" class="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-900 outline-none focus:border-primary transition-colors" />
           </div>

           <div class="space-y-1.5">
              <label class="text-[10px] font-bold text-gray-400 px-1">Email Address</label>
              <input :value="user?.email" type="email" disabled class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-400 outline-none cursor-not-allowed" />
           </div>

           <div class="pt-2">
              <button class="px-6 py-2.5 bg-primary-dark text-white text-xs font-bold rounded-lg hover:bg-black transition-colors" @click="handleUpdateProfile">
                 Save Profile Changes
              </button>
           </div>
        </div>

        <!-- 1.5 Agency / Business Section -->
        <div v-if="activeSection === 'agency'" class="space-y-6">
           <div class="p-6 bg-white border border-gray-100 rounded-xl space-y-6">
              <h4 class="text-xs font-bold text-gray-900 border-b border-gray-50 pb-4">Business Information</h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div class="space-y-1.5 md:col-span-2">
                    <label class="text-[10px] font-bold text-gray-400 px-1">Agency / Company Name</label>
                    <input v-model="agencyForm.agencyName" type="text" placeholder="e.g. Dream Travels Ltd." class="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-900 outline-none focus:border-primary transition-colors" />
                 </div>
                 <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-gray-400 px-1">Registration Number</label>
                    <input v-model="agencyForm.registrationNumber" type="text" class="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-900 outline-none focus:border-primary transition-colors" />
                 </div>
                 <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-gray-400 px-1">Country of Operation</label>
                    <input v-model="agencyForm.country" type="text" class="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-900 outline-none focus:border-primary transition-colors" />
                 </div>
                 <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-gray-400 px-1">Business Website</label>
                    <input v-model="agencyForm.website" type="url" placeholder="https://" class="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-900 outline-none focus:border-primary transition-colors" />
                 </div>
                 <div class="space-y-1.5">
                    <label class="text-[10px] font-bold text-gray-400 px-1">WhatsApp Business Number</label>
                    <input v-model="agencyForm.whatsappNumber" type="tel" class="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-900 outline-none focus:border-primary transition-colors" />
                 </div>
                 <div class="space-y-1.5 md:col-span-2">
                    <label class="text-[10px] font-bold text-gray-400 px-1">Official Business Address</label>
                    <textarea v-model="agencyForm.businessAddress" rows="2" class="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-900 outline-none focus:border-primary transition-colors"></textarea>
                 </div>
              </div>
              
              <div class="pt-2">
                 <button class="px-6 py-2.5 bg-primary-dark text-white text-xs font-bold rounded-lg hover:bg-black transition-colors" @click="handleUpdateAgency">
                    Save Business Profile
                 </button>
              </div>
           </div>
        </div>

        <!-- 2. Security Section -->
        <div v-if="activeSection === 'security'" class="space-y-6">
           <div class="p-6 bg-white border border-gray-100 rounded-xl space-y-4">
              <div class="flex items-center justify-between">
                 <h4 class="text-xs font-bold text-gray-900">Multi-Factor Authentication</h4>
                 <div 
                   @click="toggle2FA"
                   class="w-10 h-5 rounded-full p-1 cursor-pointer transition-colors duration-200"
                   :class="user?.twoFactorEnabled ? 'bg-primary' : 'bg-gray-200'"
                 >
                   <div class="bg-white w-3 h-3 rounded-full shadow-sm transform transition-transform duration-200" :class="{ 'translate-x-5': user?.twoFactorEnabled }"></div>
                 </div>
              </div>
              <p class="text-[11px] text-gray-500 leading-relaxed font-medium">Protect your account with an additional layer of security. We'll send a code to your mobile device whenever you log in from an unrecognized device.</p>
           </div>

           <div class="space-y-4 pt-4">
              <h4 class="text-xs font-bold text-gray-900 border-b border-gray-50 pb-2">Active Sessions</h4>
              <div v-for="(session, idx) in dummySessions" :key="idx" class="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
                 <div class="flex items-center gap-3">
                    <component :is="session.device === 'Mobile' ? DevicePhoneMobileIcon : ComputerDesktopIcon" class="h-4 w-4 text-gray-400" />
                    <div class="flex flex-col">
                       <span class="text-[11px] font-bold text-gray-800">{{ session.browser }} on {{ session.os }} • {{ session.location }}</span>
                       <span class="text-[9px] text-gray-400">Last active: {{ session.lastActive }}</span>
                    </div>
                 </div>
                 <span v-if="session.isCurrent" class="text-[9px] font-black text-emerald-500">Current</span>
                 <button v-else class="text-[9px] font-bold text-rose-500 hover:underline">Revoke</button>
              </div>
           </div>
        </div>

        <!-- 3. Alert Preferences Section -->
        <div v-if="activeSection === 'notifications'" class="space-y-6">
           <div class="p-6 bg-white border border-gray-100 rounded-xl space-y-6">
              <h4 class="text-xs font-bold text-gray-900">Communication Channels</h4>
              <div class="space-y-4">
                 <div v-for="channel in channels" :key="channel.key" class="flex items-center justify-between">
                    <div>
                       <h5 class="text-[11px] font-bold text-gray-800">{{ channel.label }}</h5>
                       <p class="text-[9px] text-gray-400 font-medium">{{ channel.description }}</p>
                    </div>
                    <div 
                      @click="toggleNotification(channel.key)"
                      class="w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors duration-200"
                      :class="user?.preferences?.[channel.key] ? 'bg-primary' : 'bg-gray-200'"
                    >
                      <div class="bg-white w-3 h-3 rounded-full shadow-sm transform transition-transform duration-200" :class="{ 'translate-x-4': user?.preferences?.[channel.key] }"></div>
                    </div>
                 </div>
              </div>
           </div>

           <div class="p-6 bg-white border border-gray-100 rounded-xl space-y-4">
              <h4 class="text-xs font-bold text-gray-900">Alert Categories</h4>
              <p class="text-[11px] text-gray-500 leading-relaxed font-medium">Select what activities you want to be notified about.</p>
              <div class="grid grid-cols-2 gap-3">
                 <div v-for="category in alertCategories" :key="category" class="flex items-center space-x-2">
                    <input type="checkbox" checked class="h-3 w-3 rounded text-primary border-gray-300 focus:ring-primary" />
                    <span class="text-[11px] font-medium text-gray-600">{{ category }}</span>
                 </div>
              </div>
           </div>
        </div>

        <!-- 4. Regional Settings Section -->
        <div v-if="activeSection === 'regional'" class="space-y-6">
           <div class="p-6 bg-white border border-gray-100 rounded-xl space-y-6">
              <div class="grid grid-cols-1 gap-6">
                 <BaseSelect 
                   v-model="regionalForm.language" 
                   label="Preferred Language"
                   :options="languageOptions"
                 />
                 <BaseSelect 
                   v-model="regionalForm.currency" 
                   label="Operation Currency"
                   :options="currencyOptions"
                 />
                 <BaseSelect 
                   v-model="regionalForm.timezone" 
                   label="Local Timezone"
                   :options="timezoneOptions"
                 />
              </div>
              
              <div class="pt-2">
                 <button class="px-6 py-2.5 bg-primary-dark text-white text-xs font-bold rounded-lg hover:bg-black transition-colors" @click="handleUpdateRegional">
                    Update Regional Config
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useUser } from '@/composables/modules/auth/user'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { 
  UserIcon, 
  ShieldCheckIcon, 
  BellIcon, 
  GlobeAltIcon, 
  CameraIcon,
  WindowIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  ChevronRightIcon,
  BriefcaseIcon
} from '@heroicons/vue/24/outline'

import BaseSelect from '@/components/ui/BaseSelect.vue'

definePageMeta({
  layout: 'dashboard'
})

const { user, updateProfile, uploadAvatar } = useUser()
const { showToast } = useCustomToast()
const activeSection = ref('profile')
const photoInput = ref(null)
const localLoading = ref(false)

const settingTabs = [
  { id: 'profile', label: 'My Profile', icon: UserIcon },
  { id: 'agency', label: 'Business Profile', icon: BriefcaseIcon },
  { id: 'security', label: 'Security & Auth', icon: ShieldCheckIcon },
  { id: 'notifications', label: 'Alert Preferences', icon: BellIcon },
  { id: 'regional', label: 'Regional Settings', icon: GlobeAltIcon },
]

const profileForm = reactive({
  firstName: user.value?.firstName || '',
  lastName: user.value?.lastName || '',
  phone: user.value?.phone || ''
})

const regionalForm = reactive({
  language: user.value?.preferences?.language || 'en',
  currency: user.value?.preferences?.currency || 'USD',
  timezone: 'UTC+1_Lagos'
})

const agencyForm = reactive({
  agencyName: user.value?.agencyName || '',
  registrationNumber: user.value?.agentProfile?.registrationNumber || '',
  country: user.value?.agentProfile?.country || '',
  businessAddress: user.value?.agentProfile?.businessAddress || '',
  website: user.value?.agentProfile?.website || '',
  whatsappNumber: user.value?.agentProfile?.whatsappNumber || ''
})

watch(user, (newUser) => {
  if (newUser) {
    profileForm.firstName = newUser.firstName || ''
    profileForm.lastName = newUser.lastName || ''
    profileForm.phone = newUser.phone || ''
    
    agencyForm.agencyName = newUser.agencyName || ''
    agencyForm.registrationNumber = newUser.agentProfile?.registrationNumber || ''
    agencyForm.country = newUser.agentProfile?.country || ''
    agencyForm.businessAddress = newUser.agentProfile?.businessAddress || ''
    agencyForm.website = newUser.agentProfile?.website || ''
    agencyForm.whatsappNumber = newUser.agentProfile?.whatsappNumber || ''

    if (newUser.preferences) {
      regionalForm.language = newUser.preferences.language || 'en'
      regionalForm.currency = newUser.preferences.currency || 'USD'
    }
  }
}, { immediate: true })

const channels = [
  { key: 'emailNotifications', label: 'Email Alerts', description: 'Receive booking and security updates via email.' },
  { key: 'pushNotifications', label: 'Real-time Push', description: 'Stay updated with browser and app notifications.' }
]

const alertCategories = [
  'Booking Confirmation',
  'Payment Requests',
  'Market Adjustments',
  'Compliance Alerts',
  'Security Warnings',
  'Ticket Issuance'
]

const dummySessions = [
  { browser: 'Chrome', os: 'macOS', location: 'Lagos, NG', lastActive: 'Just now', isCurrent: true, device: 'Desktop' },
  { browser: 'Safari', os: 'iOS', location: 'Abuja, NG', lastActive: '2 hours ago', isCurrent: false, device: 'Mobile' }
]

const languageOptions = [
  { label: 'English (US)', value: 'en' },
  { label: 'French (FR)', value: 'fr' },
  { label: 'Spanish (ES)', value: 'es' }
]

const currencyOptions = [
  { label: 'United States Dollar (USD)', value: 'USD' },
  { label: 'Nigerian Naira (NGN)', value: 'NGN' },
  { label: 'British Pound (GBP)', value: 'GBP' },
  { label: 'Euro (EUR)', value: 'EUR' }
]

const timezoneOptions = [
  { label: '(UTC+01:00) West Central Africa', value: 'UTC+1_Lagos' },
  { label: '(UTC+00:00) London, Lisbon', value: 'UTC_London' },
  { label: '(UTC-05:00) Eastern Time (US & Canada)', value: 'UTC-5_NY' }
]

const triggerPhotoUpload = () => {
   photoInput.value?.click()
}

const handlePhotoChange = async (e: Event) => {
   const file = (e.target as HTMLInputElement).files?.[0]
   if (!file) return
   
   localLoading.value = true
   try {
      await uploadAvatar(file)
      showToast('Profile photo updated', 'success')
   } catch (e) {
      showToast('Photo upload failed', 'error')
   } finally {
      localLoading.value = false
   }
}

const handleUpdateProfile = async () => {
   localLoading.value = true
   try {
      await updateProfile(profileForm)
      showToast('Profile changes saved', 'success')
   } catch (e) {
      showToast('Failed to save changes', 'error')
   } finally {
      localLoading.value = false
   }
}

const handleUpdateAgency = async () => {
   localLoading.value = true
   try {
      await updateProfile({
         agencyName: agencyForm.agencyName,
         agentProfile: {
            registrationNumber: agencyForm.registrationNumber,
            country: agencyForm.country,
            businessAddress: agencyForm.businessAddress,
            website: agencyForm.website,
            whatsappNumber: agencyForm.whatsappNumber
         }
      })
      showToast('Business details updated', 'success')
   } catch (e) {
      showToast('Completed with errors', 'error')
   } finally {
      localLoading.value = false
   }
}

const toggle2FA = async () => {
   localLoading.value = true
   try {
      await updateProfile({ twoFactorEnabled: !user.value?.twoFactorEnabled })
      showToast(`2FA ${user.value?.twoFactorEnabled ? 'enabled' : 'disabled'}`, 'success')
   } catch (e) {
      showToast('2FA toggle failed', 'error')
   } finally {
      localLoading.value = false
   }
}

const toggleNotification = async (key: string) => {
   localLoading.value = true
   try {
      const prefs = { ...(user.value?.preferences || {}) }
      prefs[key] = !prefs[key]
      await updateProfile({ ...prefs })
      showToast('Preference updated', 'success')
   } catch (e) {
      showToast('Preference update failed', 'error')
   } finally {
      localLoading.value = false
   }
}

const handleUpdateRegional = async () => {
   localLoading.value = true
   try {
      await updateProfile({
         currency: regionalForm.currency,
         language: regionalForm.language
      })
      showToast('Regional settings saved', 'success')
   } catch (e) {
      showToast('Failed to update regional settings', 'error')
   } finally {
      localLoading.value = false
   }
}
</script>
